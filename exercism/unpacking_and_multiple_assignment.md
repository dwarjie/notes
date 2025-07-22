# Unpacking and Multiple Assignments

Unpacking is an act of extracting the value or elements of a collection (e.g., list, tuple, or dict) using the ```*``` or ```**``` operator. When unpacking multiple elements in a collection, you may assign this elements to multiple variables reffered as Multiple Assignments.

> NOTE:
> Using the operator ```*``` and ```**``` is different from ```*<variable_name>``` and ```**<variable_name>```. Using ```*``` and ```**``` without any variable will result in multiplication and exponentiation.

## Multiple Assignment
Example of Multiple Assignment with different types.
```py
x, y, z = 1, "Hello", True
```
An example of swapping elements inside a list:
```py
number = [1, 2]
number[0], number[1] = number[1], number[0]
```

## Unpacking
It is possible to unpack list, tuple, and dict. Element values order will be also the same when assigned in multiple variables.
```py
fruits = ["apple", "orange", "grapes"]
x, y, z = fruits
print(x) # result to apple
```
You may use ```_``` to flag elements that are not needed
```py
fruits = ["apple", "orange", "grapes"]
_, _, z = fruits
print(z) # result to grapes
```

## Deep unpacking
Unpacking a nested list or tuple works the same with shalow unpacking.
```py
fruits_and_veggies = [["apple", "orange"], ["carrot", "potato"]]
[[a, b], [c, d]] = fruits_and_veggies
print(a) # apple
print(c) # carrot
```
Additionally, you can do the following to unpack only the portion of a nested list/tuple
```py
fruits_and_veggies = [["apple", "orange"], ["carrot", "potato"]]
[a, [c, d]] = fruits_and_veggies
print(a) # ["apple", "orange"]
print(c) # carrot
```

## Unpacking with *
Using ```*``` operator will capture the "leftover" elements without the unpacked elements.
```py
fruits = ["apple", "banna", "cherry", "grapes"]
x, *leftover = fruits
print(x) # "apple"
print(leftover) # ["banna", "cherry", "grapes"], only the left over elements are captured
```
This can also replace slicing, lets say we want to unpack the beginning and ending element but group the middle elements
```py
fruits = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
x, *rest, y, z = fruits
print(x) # "apple"
print(y) # "melon"
print(rest) # ["banana", "cherry", "orange", "kiwi"]
```
The ```*``` operator can also be used with deep unpacking.

## Unpacking Dictionary
When unpacking dictionary, it would normally return the keys of the dictionary only.
```py
fruits_inventory = {"apple": 6, "banana": 2, "cherry": 3}
x, y, z = fruits_inventory
print(x) = "apple"
```
To unpack the values, you may use the ```<dict>.values()``` method.
```py
fruits_inventory = {"apple": 6, "banana": 2, "cherry": 3}
x, y, z = fruits_inventory.values()
print(x) = 6
```

Additionally, you may use the ```<dict>.items()``` method to unpack both key value pairs in a tuple. This method will create a iterable view for the dictionary, same with the ```<dict>.values()```.
```py
fruits_inventory = {"apple": 6, "banana": 2, "cherry": 3}
x, y, z = fruits_inventory.items()
print(x) = ("apple", 6)
```

# Packing
Is the ability to group multiple values/elements into one list. This is useful if you want to merge 2 or more list/tuple/dictionary, or unpack a value, make changes, then pack the value into a single variable again.

## Packing a list/tuple with *
```py
fruits = ("apple", "banana", "cherry")
more_fruits = ["orange", "kiwi", "melon", "mango"]

# This code will combine both variables into a tuple. fruits and more_fruits will be unpacked using the * operator and will be assigned to the new variable in tuple.
combined_fruits = *fruits, *more_fruits
print(combined_fruits) # ("apple", "banana", "cherry", "orange", "kiwi", "melon", "mango")

# By adding a * operator at the left most or "=" and adding a comma, python will pack the elements into a list
*combined_fruits, = *fruits, *more_fruits
print(combined_fruits) # ['apple', 'banana', 'cherry', 'orange', 'kiwi', 'melon', 'mango']
```

## Packing a dictionary using **
When packing a dictionary, ```**``` should be used. This will combine 2 or more dictionary into 1.
```py
fruits_inventory = {"apple": 6, "banana": 2, "cherry": 3}
more_fruits_inventory = {"orange": 4, "kiwi": 1, "melon": 2, "mango": 3}

# This code will unpack both variables into key-value pairs and combined into 1 whole dictionary. After that, will be assigned to a new variable
combined_fruits_inventory = {**fruits_inventory, **more_fruits_inventory}
print(combined_fruits_inventory) # {"apple": 6, "banana": 2, "cherry": 3, "orange": 4, "kiwi": 1, "melon": 2, "mango": 3}
```

## Usage of * and ** in functions
When you want to accept arbitrary number of arguments in your function, you may use the ```*args``` and ```**kwargs```.

```*args``` will accept arbitrary number of positional arguments and pack them into a tuple.
```py
def my_function(*args):
  print(args)

my_function(1, 2, 3) ## (1, 2, 3)
```

```**kwards``` will accept arbitrary number of keyword arguments and pack them into a dictionary.
```py
def my_function(**kwargs):
  print(kwargs)

my_function(a=1, b=2, c=3) # {"a": 1, "b": 2, "c": 3}
```

You can combine both arguments, just make sure to follow the arguments structure below to not get an error:
```py
def my_function(<positional_args>, *args, <key-word_args>, **kwargs)

# <positional_args>: Are arguments that are not named and will based on the position
# ex: 
def my_function(x, y):
  print(x + y)

my_function(1, 2) # 3

# <key-word_args>: Are named arguments, they can be used without any sequence as long as you provide the proper name of the argument when used.
# ex: 
def my_function(name, age)
  print("Hi! I'm {} and my age is {}".format(name, age))

my_function(age=24, name="Mark") # Hi! I'm Mark and my age is 24
```

## Unpacking into function calls
You may also use the ```*``` to unpack values from list/tuple to be used as parameters. This is useful when the function does not accept an iterable.
```py
def my_function(a, b, c):
  print(a)
  print(b)
  print(c)

numbers = [1, 2, 3]
my_function(*numbers)
# 1
# 2
# 3
```
