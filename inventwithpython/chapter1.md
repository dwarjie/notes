# Chapter 1 - Dealing with Error and asking for Help

## Understanding Error Messages

1. Examining the Traceback of the Error Message
2. Searching the Internet about the Error Message

These 2 steps are the stepping stones to finding your answers to your error messages.

### Examining the Traceback Message

Try running this program in your local machine.

```py
def a():
   print("Start of a()")
   b()

def b():
   print("Start of b()")
   c()

def c():
   print("Start of c")
   42 / 0

a()
```
It should show a result like so:
```bash
Start of a()
Start of b()
Start of c
Traceback (most recent call last):
  File "/home/ichini/notes/inventwithpython/exercise/abcTraceback.py", line 13, in <module>
    a()
  File "/home/ichini/notes/inventwithpython/exercise/abcTraceback.py", line 3, in a
    b()
  File "/home/ichini/notes/inventwithpython/exercise/abcTraceback.py", line 7, in b
    c()
  File "/home/ichini/notes/inventwithpython/exercise/abcTraceback.py", line 11, in c
    42 / 0
    ~~~^~~
ZeroDivisionError: division by zero
```
This is called a Traceback Message or Stack Trace. It shows the particular line of code on where the intepreter runs until it hits the error.

```bash
Traceback (most recent call last):
  File "/home/ichini/notes/inventwithpython/exercise/abcTraceback.py", line 13, in <module>
    a()
```

The line message ```Traceback (most recent call last):``` indicates that the following lines will show the function execution trail and the last line is the recent function that has been called.

```bash
  File "/home/ichini/notes/inventwithpython/exercise/abcTraceback.py", line 13, in <module>
    a()
  File "/home/ichini/notes/inventwithpython/exercise/abcTraceback.py", line 3, in a
    b()
  File "/home/ichini/notes/inventwithpython/exercise/abcTraceback.py", line 7, in b
    c()
  File "/home/ichini/notes/inventwithpython/exercise/abcTraceback.py", line 11, in c
    42 / 0
    ~~~^~~
ZeroDivisionError: division by zero
```
Meanwhile, this line is called a Frame Summary. A frame summary is a Frame Object that holds the local variables or any data associated with the function call. Frame Object is created when a functon is called and destroyed when the function returns. Indicated in the frame summary are the following:
- line of the code that was executed (e.g., line 13)
- where the function is called (e.g., <module>)
- the code that created the error
- error message
