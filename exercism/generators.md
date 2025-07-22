# Generators

Generator functions returns a special type of **iterators**. This iterators are called **Generator Iteratos** which are lazy (meaning, it does not save the value in memory) but, returns the value when needed.

Usually, generator functions includes a ```yield expression```. This expression pauses the execution of the generator function and returns the yield value. Example:
```py
def gen():
  yield 123
  yield 456

gen_obj = gen()
print(next(gen())) # 123
print(next(gen())) # 456
```

When the Generator Function is called, it returns an iterator (known as generator) which controls the execution of the generator function. ```yield expression``` saves the current state of the function when suspended (e.g., local variables, try and catch statements) unliked normal functions. When generator method is called again using (```next(), for```) it will resume the execution from the state where it left of.

> Use Generator Function when you don't need the to produce whole value at once.

Comparison of Normal Function vs Generator Function:
```py
# Normal Function: You need to process the whole input before returning the processed data
def squares(list_of_numbers):
  squares = []
  for number in list_of_numbers:
    squares.append(number ** 2)
  return squares

# Generator Function: You don't need to wait for the whole function to process the input before getting a result
def squares_generator(list_of_numbers):
  for number in list_of_numbers:
    yield number ** 2 # will return the result immidiately and suspends the execution
```

## Why use Generator?
Generators are useful in a lot of applications.

When working with a potentially large collection of values, you might not want to put all of them into memory. A generator can be used to work on larger data piece-by-piece, saving memory and improving performance.

Generators are also very helpful when a process or calculation is complex, expensive, or infinite.
