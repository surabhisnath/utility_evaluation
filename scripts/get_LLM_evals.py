from prompt import *
import os
import together
import openai
import pandas as pd
import time
import warnings
from tqdm import tqdm

warnings.simplefilter(action="ignore")

# together.api_key = os.environ.get("TOGETHER_API_KEY")
openai.api_key = os.environ.get("OPENAI_API_KEY")


def together_call(prompt: str, model: str) -> str:
    """
    Calls TOGETHER API with input prompt.
    """
    output = together.Complete.create(
        prompt=prompt,
        model=model,
        temperature=0,
        max_tokens=512,
        # stop=[],
    )
    return output["choices"][0]["text"]


def gpt_call(prompt: str, model: str) -> str:
    """
    Calls OPENAI API with input and system prompt.
    """
    output = openai.OpenAI().chat.completions.create(
        model=model,
        temperature=0,
        max_tokens=512,
        stop=["@"],
        messages=[{"role": "user", "content": prompt}],
    )
    return output.choices[0].message.content


if __name__ == "__main__":

    aut_data = pd.read_csv("../data/aut.csv")
    # columns: target object, alternate use, GT utility r1, GT utility r2

    models = {
        # "llama3": "meta-llama/Llama-3-70b-chat-hf",
        "gpt4o": "gpt-4o",
    }

    prompts = {
        "control": BASE_PROMPT + CONTROL_ADDON,
        "semantic": BASE_PROMPT + SEMANTIC_ADDON,
        "episodic": BASE_PROMPT + EPISODIC_ADDON,
        # "semantic_modif": BASE_PROMPT + SEMANTIC_MODIF,
        # "episodic_modif": BASE_PROMPT + EPISODIC_MODIF,
    }

    for m in models:
        for p in prompts:
            if f"{m}_{p}" not in aut_data.columns:
                aut_data[f"{m}_{p}"] = "NA"

    filtered_data = aut_data[aut_data["target object"].isin(["belt", "book"])]
    outpath = "../data/aut_gpt.csv"

    try:
        cnt = 0
        for index, row in tqdm(filtered_data.iterrows(), total=len(filtered_data)):
            response_prompt = f"Target object: {row['target object']}\nAlternate use: {row['alternate use']}."
            for m in models:
                for p in prompts:
                    if aut_data.loc[index, f"{m}_{p}"] != "NA":
                        continue
                    if m[:3] == "gpt":
                        try:

                            LLM_output = gpt_call(
                                prompts[p] + response_prompt, models[m]
                            )
                        except Exception as e:
                            print("Error:", e)
                    else:
                        try:
                            LLM_output = together_call(
                                prompts[p] + response_prompt, models[m]
                            )
                        except Exception as e:
                            print("Error:", e)
                    aut_data.loc[index, f"{m}_{p}"] = LLM_output

                    # sleep to prevent rate limit
                    time.sleep(1)
            cnt += 1
            # if cnt == 2:
            #     break
        aut_data.to_csv(outpath, index=False)

    except:
        aut_data.to_csv(outpath, index=False)
