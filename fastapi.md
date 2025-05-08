# FastAPI
FastAPI is a modern, fast (high-performance), web framework for building APIs with Python based on standard Python type hints.

## Creating a simple get route
```py
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "hello world"}
```

## Creating a get route with Parameters or Variabls
```py
@app.get("/items/{item_id}")
async def read_item(item_id):
  return {"item_id": item_id}
# with variable type
async def read_item(item_id: int):
  return ...
```

When you access the route with a string parameter, Pydantic will perform a Data Validation to make sure that you are passing the correct data type

## Creating a get route with Enum
By importing Enum from enum package and creating a sub-class that inherits str, you will be able to create a route parameter with pre-defined values. You need to inherit str for the API docs to know that you require string type data.
```py
from enum import Enum

class ModelName(str, Enum):
  value1 = "value1"
  value2 = "value2"

@app.get("/models/{model_name}")
async def get_model(model_name: ModelName):
  ...
```

## Creating a get route with file path
OpenAPI currently does not support away to indicate that the route path requires a file path in the documentation. Nevertheless, you can still perform this in FastAPI by using internal tools like Starlette. OpenAPI will still include the route in the docs, but won't specify that the expected data is a file path.

Using an option with Starlette, you can declare a path parameter containing a path
```py
@app.get("/files/{file_path:path}")
async def read_file(file_path: str):
    return {"file_path": file_path}
```

## Query Parameters
Query Parameters are not declared in the path and usually indicated by ```?``` and separated by ```&```.

```py
fake_items_db = [{"item_name": "Foo"}, {"item_name": "Bar"}, {"item_name": "Baz"}]

@app.get("/items/")
async def read_item(skip: int = 0, limit: int = 10):
    return fake_items_db[skip : skip + limit]
```

### Optional Query Parameters
You can also add an optional query parameters by using the Union or "|" sign.

```py
@app.get("/items/")
async def read_item(skip: int = 0, limit: int = 10, q: str | None = None):
    if q:
        return {"item": fake_items_db[skip : skip + limit], "q": q}
    return fake_items_db[skip : skip + limit]
```

### Query Type Conversions
Say we have the following code:

```py
async def read_item(item_id: int, short: bool = False):
    item = item_id
    if not short:
        return {"message": "This item is not a short item"}
    return {"item_id": item_id}
```

Where if the "short" query is set to False, it means the item is has a long description. If you put the following value in the short parameters, FastAPI is smart enough to convert it if it's False or True.
Will result to True:
- short=1
- short=True
- short=Yes
Will result to False:
- short=0
- short=False
- short=No

### Required Query Parameters
When adding a default value or using a Union (|), this sets the query parameters as optional. For you to create a required query parameters, you can just remove the default and Union (|) when defining the parameters.
```py
@app.get("/items/{item_id}")
async def read_user_item(item_id: str, needy: str):
    item = {"item_id": item_id, "needy": needy}
    return item
```

## Request Body
Request Body are usually data send by the client needed by the API route (e.g., creating an account). In FastAPI, adding a request body to a route you will use the Pydantic Base Model to create the shape of the dictionary.

```py
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None

# To use the Item Class and Request Parameter, you just have to add an argument in the route function
@app.post("/item/")
async create_item(item: Item):
    ...
```

### Request Body + Path Parameter + Query
Here's how FastAPI recognize which is which:
- If the parameter is also declared in the path, it will be used as a path parameter.
- If the parameter is of a singular type (like int, float, str, bool, etc) it will be interpreted as a query parameter.
- If the parameter is declared to be of the type of a Pydantic model, it will be interpreted as a request body.

```py
@app.put("/items/{item_id}")
async def update_item(item_id: int, item: Item, q: str | None = None):
    ...
```
