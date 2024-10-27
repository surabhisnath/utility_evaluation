import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import tensorflow_hub as hub
from sentence_transformers import SentenceTransformer
import gensim.downloader as api
import ssl
import urllib.request

# Disable SSL certificate verification
ssl._create_default_https_context = ssl._create_unverified_context
import nltk

nltk.download("punkt")


# Define phrases
list1 = [
    "brick as a doorstop.",
    "use brick as a doorstop.",
    "use brick to keep door open.",
    "using a simple brick as a doorstop to prevent the door from closing.",
    "a common, reliable method to keep doors from closing is to use a heavy brick as a doorstop.",
    "in many households, one easy way to prevent a door from slamming shut in the wind is to place a sturdy brick as a doorstop right at the base of the door.",
]

list2 = [
    "brick for building.",
    "use bricks for building.",
    "use bricks to build walls.",
    "using brick as a primary material to construct walls and buildings.",
    "one of the most common materials used in construction is brick, ideal for building strong, durable structures.",
    "to create stable buildings, bricks are often chosen as a primary material because of their ability to withstand weather and wear over time, making them essential in the construction of walls and foundations.",
]


# Define a function to calculate cosine similarity
def calculate_similarity(embedding1, embedding2):
    return cosine_similarity([embedding1], [embedding2])[0][0]


# Function to get Word2Vec embeddings by averaging word embeddings
def get_word2vec_embedding(phrase, model):
    words = nltk.word_tokenize(phrase.lower())
    embeddings = [model[word] for word in words if word in model]
    if embeddings:
        return np.mean(embeddings, axis=0)
    else:
        return np.zeros(
            model.vector_size
        )  # Return zero vector if no words found in vocabulary


# Load Models
word2vec_model = api.load("word2vec-google-news-300")

# 1. Universal Sentence Encoder
# use_model = hub.load("https://tfhub.dev/google/universal-sentence-encoder/4")

# 2. Sentence Transformers
sbert_model = SentenceTransformer("all-MiniLM-L6-v2")

# Get embeddings and calculate similarities
results = []

for i in range(6):
    pair_results = {}

    # USE Embeddings
    # use_embedding1 = use_model([list1[i]]).numpy()[0]
    # use_embedding2 = use_model([list2[i]]).numpy()[0]
    # use_similarity = calculate_similarity(use_embedding1, use_embedding2)
    # pair_results["USE"] = use_similarity

    # Sentence Transformer Embeddings
    sbert_embedding1 = sbert_model.encode(list1[i])
    sbert_embedding2 = sbert_model.encode(list2[i])
    sbert_similarity = calculate_similarity(sbert_embedding1, sbert_embedding2)
    pair_results["SBERT"] = sbert_similarity

    # Word2Vec Embeddings
    w2v_embedding1 = get_word2vec_embedding(list1[i], word2vec_model)
    w2v_embedding2 = get_word2vec_embedding(list2[i], word2vec_model)
    w2v_similarity = calculate_similarity(w2v_embedding1, w2v_embedding2)
    pair_results["Word2Vec"] = w2v_similarity

    # Append results for this pair
    results.append(pair_results)

# Display results
for i, result in enumerate(results):
    print(f"Pair {i+1}-{i+1} Similarities: {result}")

for i in range(6):
    sbert_embedding1 = sbert_model.encode(list1[i])
    sbert_embedding2 = sbert_model.encode("brick")
    sbert_similarity = calculate_similarity(sbert_embedding1, sbert_embedding2)
    print(sbert_similarity)
print()
for i in range(6):
    w2v_embedding1 = get_word2vec_embedding(list1[i], word2vec_model)
    w2v_embedding2 = get_word2vec_embedding("brick", word2vec_model)
    w2v_similarity = calculate_similarity(w2v_embedding1, w2v_embedding2)
    print(w2v_similarity)
