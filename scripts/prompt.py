SYSTEM_PROMPT = "You are a helpful assistant."

BASE_PROMPT = """In the Alternate Uses Task or AUT, subjects are asked to
think of as many alternate uses for a given target object as possible.

Eg:
Target object: brick
Alternate use: doorstop.
 
You will be scoring the utility of the responses determined by how feasible or usable the alternate use is. 
The utility score is represented by a score on the scale of 1 to 5.

The assignment of scores is as follows:  
(1) Unusable
(2) Difficult to realize
(3) Reasonably realizable
(4) Easily realized
(5) Always realizable

You are an expert reviewer. You will be provided with a response to the AUT task.

"""

CONTROL_ADDON = """Rate the utility of the response on a scale of 1-5 in {}.
End your response with "@"

"""

SEMANTIC_ADDON = """Step 1: List the features of the use case and target object, and match them to judge response feasibility.
Step 2: Rate the utility of the response on a scale of 1-5 in {}.
End your response with "@"

"""

EPISODIC_ADDON = """Step 1: Describe step-by-step what would happen if the target object is used as suggested in the response.
Step 2: Rate the utility of the response on a scale of 1-5 in {}.
End your response with "@"

"""

SEMANTIC_MODIF = """Step 1: Rate the utility of the response on a scale of 1-5 in {}.
Step 2: List the features of the use case and target object, and match them.
Step 3: If required, modify the utility rating and provide the new rating in []. If no modification is required, provide a new rating in [] same as the old rating. 
End your response with "@"

"""

EPISODIC_MODIF = """Step 1: Rate the utility of the response on a scale of 1-5 in {}.
Step 2: List the consequences of using the target object as suggested in the response. Will it work well?
Step 3: If required, modify the utility rating and provide the new rating in []. If no modification is required, provide a new rating in [] same as the old rating. 
End your response with "@"

"""
