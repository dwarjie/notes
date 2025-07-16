# HuggingFace

## Transformers
In my understanding and with a help of ChatGPT (create a PR if i'm wrong), transformers models are the new revolutionary models. It is designed to process multiple tokens at a time instead of one token at a time (e.g., old models).

Old models are slow (since it needs to process thousands of tokens and does it one at a time) and has some trouble remembering the context in a sentence.

## pipeline()
Accoring to HuggingFace:
  > pipeline() function connects a specific model with it's necessary preprocessing and postprocessing steps, allowing us to directly input any text and get an intelligible answer.

The ```pipeline()``` function wraps or hide all the necessary code for us to use a model.

This is an example of ```pipeline()``` usage, where we just passed a specific task (in this case sentiment-analysis) and it gives us the prediction if the given sentence is positive or negative.
```py
from transformers import pipeline

classifier = pipeline("sentiment-analysis")
classifier("I've been waiting for a HuggingFace course my whole life.")
```
Result:
```bash
>>> [{'label': 'POSITIVE', 'score': 0.9598047137260437}]
```

Once the program is run, the pipeline will select a pretrained model specifically for the sentiment-analysis task. This model will then be downloaded and cached for future use.

You can also specify the specific model you want to use:
```py
from transformers import pipeline

image_classifier = pipeline(
    task="image-classification", model="google/vit-base-patch16-224"
)
result = image_classifier(
    "https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/pipeline-cat-chonk.jpeg"
)
print(result)
```
This is an example of image-classification task where we used the model of google/vit-base-patch16-224. Here is the sample result:
```bash
>>> [{'label': 'lynx, catamount', 'score': 0.43350091576576233},
 {'label': 'cougar, puma, catamount, mountain lion, painter, panther, Felis concolor',
  'score': 0.034796204417943954},
 {'label': 'snow leopard, ounce, Panthera uncia',
  'score': 0.03240183740854263},
 {'label': 'Egyptian cat', 'score': 0.02394474856555462},
 {'label': 'tiger cat', 'score': 0.02288915030658245}]
```

Are you curious what is the actual code needed to run this without the 
```pipeline()```` function? Here's an example:
```py
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

# 1. Set the device (GPU here)
torch.set_default_device("cuda")

# 2. Load the model and tokenizer manually
model = AutoModelForCausalLM.from_pretrained("microsoft/phi-2", ...)
tokenizer = AutoTokenizer.from_pretrained("microsoft/phi-2", ...)

# 3. Tokenize the input manually
inputs = tokenizer("some input", return_tensors="pt", return_attention_mask=False)

# 4. Run inference manually
outputs = model.generate(**inputs, max_length=200)

# 5. Decode the output manually
text = tokenizer.batch_decode(outputs)[0]
print(text)
```
I don't even know what this does. But, basically the ```pipeline()``` function is also a wrapper of AutoModel and AutoTokenizer.
- Automodel: Loads the correct transfomer architecture (microsoft/phi-2)
- AutoTokenizer: Tokenizes the input/output into small chunks

## Transformer Architecture
Transformer Architecture has drastically changed over the past years due to new models being introduce (e.g., GPT, BERT, GPT-2, etc.). It's original focus was translation tasks, now it's being used for large LLM's.

How does transformer work? It's better for you to watch this [video](https://www.youtube.com/watch?v=H39Z_720T5s)

But basically, Transformer Models has two primary blocks:
- Encoder: Receives a text inputs which will be then encoded into numerical representation (since computer can only understand numbers!)
- Decoder: Can also receives a text input or the high-level numerical representation from the encoder. This data can be used for generating predictions for more iterations until coming up with a best answer.

This two blocks can be used independently or combined.

# Loading Models
Transformers provide many pretrained models that you can use with just a single line of code with the use of ```from_pretrained()``` function

> from_pretrained() method downloads and load the model weight's stored in a safetensor file (pickle if not available) and configuration stored in the HuggingFace Hub.

There are two general types to load a model:
1. AutoModel or LlamaModel: Barebone models that outputs hidden states.
2. AutoModelForCasualLM or LlamaForCasualLM: Models with specific head attached for performing specific tasks.

There are separate classes for each ML frameworks (e.g., PyTorch, TensorFlow, Flax) but we will focus on PyTorch for now.

```py
from transformers import AutoModelForCausalLM, MistralForCausalLM

# load with AutoClass or model-specific class
model = AutoModelForCausalLM.from_pretrained("mistralai/Mistral-7B-v0.1", torch_dtype="auto", device_map="auto")
model = MistralForCausalLM.from_pretrained("mistralai/Mistral-7B-v0.1", torch_dtype="auto", device_map="auto")
```

> There are different terms you need to understand. 
> An architecture refers to the model's skeleton or type of neural network the model uses (it's brain design) if it's for generation, classification, etc.
> A checkpoint is the model's weight for the architecture. Model weight defines the model's brain.

## AutoModel
```AutoModel``` class is a convenient way of loading an architecture without knowing it's model name (since there are a ton of available models). You can just specify the name of the task you want to do (e.g., text-generation, summarization, etc.) and the specific checkpoint you want to use (e.g., meta-llama/Llama-2-7b0hf, google/gemma-7b, etc.) and the ```AutoModel``` class will automatically load the architecture based on the model's configuration file:

Sample config from ```microsoft/phi-2```:
```json
{
  "_name_or_path": "microsoft/phi-2",
  "architectures": [
    "PhiForCausalLM" <- this is the architecture/model name
  ],
  "attention_dropout": 0.0,
  "bos_token_id": 50256,
  "embd_pdrop": 0.0,
  "eos_token_id": 50256,
  "hidden_act": "gelu_new",
  "hidden_size": 2560,
  //...
```

Example of using ```AutoModel```
```py
from transformers import AutoModel

gpt_model = AutoModel.from_pretrained("gpt-2")
# This code will automatically load the architecture to run gpt-2 checkpoint
```

There are also model-specific classes if you know what task you want to do

Example of using model-specific class with AutoModel:
```py
from transformers import AutoModelForCausalLM, AutoModelForSequenceClassification, AutoModelForQuestionAnswering

# use the same API for 3 different tasks
model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-2-7b-hf")
model = AutoModelForSequenceClassification.from_pretrained("meta-llama/Llama-2-7b-hf")
model = AutoModelForQuestionAnswering.from_pretrained("meta-llama/Llama-2-7b-hf")
```

## Tokenizer
Tokenizer converts text into an array of numbers (since computers can only understand numbers!). There are different tokenizer algorithms depending on the model, but they all share the same goal. Split text into smaller words the converts it into numbers (called input ids) which are used to give as an input to the models.

In hugging face, you can call ```from_pretrained()``` method to load the tokenizer and config file (present in the pretrained model file).

```py
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("google/gemma-2-2b")
tokenizer("We are very happy to show you the 🤗 Transformers library", return_tensors="pt")
{'input_ids': tensor([[     2,   1734,    708,   1508,   4915,    577,   1500,    692,    573,
         156808, 128149,   9581, 235265]]), 
 'attention_mask': tensor([[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]])
}
```

