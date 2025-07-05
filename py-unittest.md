# Python Unittest Library
Unittest is a Class Based unit testing library of Python.

## Creating a simple Test Case
You have to inherit the ```unittest.TestCase``` class in order to create a new Test Case.
```py
import unittest

class TestAbsFunction(unittest.TestCase):
    def test_positive_number(self):
        self.assertEqual(abs(10), 10)

    def test_negative_number(self):
        self.assertEqual(abs(-10), 10)

    def test_zero(self):
        self.assertEqual(abs(0), 0)
```

## Making Test Executable
In order to run your test, you have to make it executable
```py
# ... your test case
if __name__ == "__main__":
  unittest.main(verbosity=2)
  # verbosity param: determines the information the cli will show you during test
```

> TIP: You can add docstring to your test methods to add more informations to your test summaries

## Test Discovery
unittest has test discovery functionality. This will automatically find/discover all your test files in the current directory
, group them into a test suite, then run based on the glob pattern (defaults into test*.py).
```bash
$ python3 -m unittest discover
# or
$ python3 -m unittest
```

## Skip Test
It is very important to skip test if you know it will result an error due to unfinished feature or depending on the condition.
You can use the following methods decorators to skip test from the unittest library:
- @unittest.skip(reason: str)
- @unittest.skipIf(condition: any, reason: str)
- @unittest.skipUnless(condition: any, reason: str)
```py
import sys
import unittest

class SkipTestExample(unittest.TestCase):
    @unittest.skip("Unconditionally skipped test")
    def test_unimportant(self):
        self.fail("The test should be skipped")

    @unittest.skipIf(sys.version_info < (3, 12), "Requires Python >= 3.12")
    def test_using_calendar_constants(self):
        import calendar

        self.assertEqual(calendar.Month(10), calendar.OCTOBER)

    @unittest.skipUnless(sys.platform.startswith("win"), "Requires Windows")
    def test_windows_support(self):
        from ctypes import WinDLL, windll

        self.assertIsInstance(windll.kernel32, WinDLL)
```

## Sub Tests
When you want to perform multiple similar tests, you can either create multiple similar test methods or use ```subTest()```.
The ```subTest()``` method of unittest returns a context manager that executes the enclodes codes on it's block.
```py
import unittest

from even import is_even

class TestIsEven(unittest.TestCase):
    def test_even_number(self):
        for number in [2, 4, 6, -8, -10, -12]:
            with self.subTest(number=number):
                self.assertEqual(is_even(number), True)

    def test_odd_number(self):
        for number in [1, 3, 5, -7, -9, -11]:
            with self.subTest(number=number):
                self.assertEqual(is_even(number), False)
```

## Exploring different Assert Methods

### Comparing Values
- assertEqual()
- assertNotEqual()
- assertTrue()
- assertFalse()

You have already seen the usage of ```assertEqual()``` method at the above code. The ```assertNotEqual()``` has the similar logic but the opposite.

To illustrate the usage of boolean methods, here is a simple example:
```py
def is_num_zero(number):
  return number == 0

import unittest

class TestNumberZero(unittest.TestCase):
  def test_num_zero(self):
    self.assertTrue(is_num_zero(0), 0)

  def test_num_one(self):
    self.assertFalse(is_num_zero(1), 0)
```

### Comparing Objects by their Identity
Everything in python is an object. But, every object has 3 core characteristics:
- Values
- Identity
- Type

Values and Type are self explanatory as I assume you have already encountered those, but we have Identity.
Identity is where the object lives in your computer memory address. If you tried the following:
```bash
>>> a = 1
>>> id(a)
130889670459632
>>> b = a
>>> id(b)
130889670459632
>>> a is b
True
>>> c = 1
>>> id(c)
130889670459632
>>> c is a
True # Authors Note: The reason why it returns true is becasue Python internally caches small integers and some strings to save memory and improve performance.
>>> d = 1000
>>> e = 1000
>>> d is e
False
```
Using the ```id()``` method, we where able to get the unique identifier of the variable a and b.

With unittest, we have the following assert methods to check the identities:
- assertIs()
- assertIsNot()

```py
import unittest

class TestIdentity(unittest.TestCase):
    def test_same_list_identity(self):
        a = ["Odev is awesome"]
        b = a
        self.assertIs(a, b)

    def test_diff_list_identity(self):
        a = ["Odev is awesome"]
        b = ["Odev is awesome"]
        self.assertIsNot(a, b)
```
> NOTE: This test is useful when checking methods that returns cached values

### Comparing None Objects
When comparing an object with None value, you may use the following methods:
- assertIsNone()
- assertIsNotNone()

```py
import unittest

class TestNull(unittest.TestCase):
    def test_null(self):
        a = None
        b = a
        self.assertIsNone(b)

    def test_not_null(self):
        a = "I'm not empty"
        self.assertIsNotNone(a)

    def test_empty_list(self): # This will fail, empty list is not None
        a = []
        self.assertIsNone(a)

    def test_list(self):
        a = [1, 2, 3]
        self.assertIsNotNone(a)
```

### Comparing Collections
The following methods will compare collections (e.g., strings, list, tuples, sets, dict) values. Unlike the methods used from the previous part where we compare object identities.
- assertSequenceEqual()
- assertMultiLineEqual()
- assertListEqual()
- assertTupleEqual()
- assertDictEqual()
- assertSetEqual()

> NOTE: the assertEqual() method will automatically the following methods. Meaning, you don't have to use them specifically but it is still useful if you want to make your code clearer.

```py
import unittest

class TestCollections(unittest.TestCase):
    def test_tuple_sequence_collection(self):
        a = ("O", "D", "E", "V")
        b = ("O", "D", "E", "V")
        # This assert method can't be performed with assertEqual() so this is a very specialized method
        self.assertSequenceEqual(a, b, seq_type=tuple)

    def test_any_sequence_collection(self):
        a = ("O", "D", "E", "V")
        b = "ODEV"
        self.assertSequenceEqual(a, b)

    def test_multi_line_collection(self):
        a = "Hello \n Odev"
        b = "Hello \n Odev"
        c = "Hello Odev"
        self.assertMultiLineEqual(a, b)
        self.assertMultiLineEqual(a, c)  # Will fail

    def test_list_collection(self):
        a = [1, 2, 3, 4]
        b = [1, 2, 3, 4]
        c = [1, 2, 3, 5]
        self.assertListEqual(a, b)
        self.assertListEqual(c, a)  # Will fail

    def test_tuple_collection(self):
        a = ("odoo", "number", 1)
        b = ("odoo", "number", 1)
        c = ("SAP", "number", 100)
        self.assertTupleEqual(a, b)
        self.assertTupleEqual(c, a)  # Will fail

    def test_dict_collection(self):
        a = {"name": "Mark", "user_id": 1}
        b = {"name": "Mark", "user_id": 1}
        c = {"name": "Mark", "user_id": 3}
        self.assertDictEqual(a, b)
        self.assertDictEqual(c, a)  # Will fail

    def test_set_collection(self):
        a = {1, 2, 3, 4}
        b = {1, 2, 3, 4}
        c = {1, 2, 3, 5}
        self.assertSetEqual(a, b)
        self.assertSetEqual(c, b)  # Will fail
```
> NOTE: assertDictEqual() and assertSetEqual() only checks the value, not the sequence

### Membership Test
Membership test checks if the specified value is or is not in the collection values
- assertIn()
- assertNotIn()

```py
import unittest

class TestMembership(unittest.TestCase):
    def test_in_collection(self):
        a = 1
        b = [1, 2, 3, 4]
        self.assertIn(a, b)

    def test_not_in_collection(self):
        a = 100
        b = [1, 2, 3, 4]
        self.assertNotIn(a, b)
```

### Checking of Object's Type
The following methods are based on ```isInstance()``` method of python
- assertIsInstance()
- assertNotIsInstance()

```py
class Human:
    def __init__(self, gender, age):
        self.gender = gender
        self.age = age

class Person(Human):
    def __init__(self, gender, age, name):
        super().__init__(gender, age)
        self.name = name

import unittest

class TestInstance(unittest.TestCase):
    def test_person_instance(self):
        p1 = Person("Male", 24, "Mark")
        self.assertIsInstance(p1, Person)
        self.assertIsInstance(p1, Human)

    def test_string_instance(self):
        a = "This is a string"
        self.assertIsInstance(a, str)

    def test_not_instance(self):
        a = 100
        self.assertNotIsInstance(a, str)

```

### Testing for Exceptions
Sometimes, you're feature is expected to throw an Exception (e.g., UserError, ValidationError). There is an available method in unittest to assert this.
- assertRaises(exc, func, *args, *kwargs): This checks the provided exception without considering the associated error message
- assertRaisesRegex(exc, r, func, *args, *kwargs): This checks the provided exception with consideration of the associated error message using regex

```assertRaisesRegex()``` doesn't seem to be useful for me right now so I won't add it here. But, you can check it on your own.

Using ```assertRaises()``` method needs to be called in a context manager for it to catch the exception properly. Another way is lamdba, you may check this [link](https://ongspxm.gitlab.io/blog/2016/11/assertraises-testing-for-errors-in-unittest/)

```py
def check_if_num_1(number):
    if not isinstance(number, int):
        raise TypeError("Accepted value should be a number")

    if number != 1:
        raise ValueError("Accepted number is only 1")

    return true

import unittest

class TestException(unittest.TestCase):
    def test_type_error(self):
        with self.assertRaises(TypeError):
            check_if_num_1("this is a string")

    def test_value_error(self):
        with self.assertRaises(ValueError):
            check_if_num_1(2)

    def test_no_error(self):  # will fail, since the method won't raise an error
        with self.assertRaises(ValueError):
            check_if_num_1(1)
```
