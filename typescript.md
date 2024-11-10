# Typescript
- An Open Source Programming Language built on top of JavaScript. A Typed JavaScript to help developers speed up the development by catching errors before they even run the code.

TypeScript applications are run through a compiler which convertes the .ts code into a JavaScript code. Which will be then deployed.

## Why TypeScript?
1. Improved Productivity while helping avoid bugs.
TypeScript helps developer show the errors during compile time instead of runtime. If you have the following code:
```js
function add(x, y) {
   return x + y;
}

let result = add(input1.value, input2.value);
console.log(result); // result of concatenating strings
```
If the user entered ```10``` and ```20```, the function would return ```1020```

TypeScript can resolve unexpected errors during runtime by refactoring the code into this:
```ts
function add(x: number, y: number) {
   return x + y;
}

let result = add(input1.value, input2.value);
```

## Setup

You will need the following to run and compile TypeScript.
- Node.js
- TypeScript compiler. By running the following command:
```bash
npm install -g typescript
```
- tsx module (to run TypeScript without compiling).
```bash
npm install -g tsx
```

## Type
A type is a label that describe the properties and functions that a value has.

Example:
```js
'Hello'
/* 
 * The word 'Hello' is a string
 * a string has different properties (e.g., length) and methods (e.g., match(), indexOf())
*/
```
Type will help you determine all the properties and methods of a variable without showing it's value (e.g., "hello", true)

Purposes of types:
1. Types are used by TypeScript compiler to analyze errors.
2. Allows the developer to understand what are the available values, properties, and methods associated with variables.


## Primitive Types
The following are all primitive types of TypeScript:
- string: Text data
- number: numeric values
- boolean: eighter true or false
- null: have one value - null
- undefined: have one value - undefined. The default value for all uninitialized variables.
- symbol: unique constant value.

## Type Annotations
Type annotation is a way to specify the expected type for a variable, functions, object, etc.

Example:
```ts
let stringVariable : string = "hello" // initializing a string variable
stringVariable = 25 // will not work since the variable should only be string
````

Array:
```ts
let numberArray : number[] = [1, 2, 3, 4]
```

Objects:
```ts
let person: { // creating the shape of the object
   name: string,
   age: number
}

person = {
   name: "Mark"
}
```

Function arguments & return types
```ts
let greeting : (name: string) => string; // Assigning a type annotation for parameters and return type that accepts a string parameter and returns a string. Any function with the following properties will be assignable

greeting = function (name: string) {
   return `Hi ${name}`
}
```

## Type Interference
Type inference is a way for Typescript to assign a type annotation based on the variable values.

Example:
```ts
let stringVar = "Hello World" // same with stringVar : string = "Hello World"

function setCounter (max=100) {
   // ...
}
// is same with
function setCounter (max : number = 100) {
   // ...
}
```

The best common type
If you have the following assignment:
```ts
let items = [1, 2, 3, null]
// typescript will run an algorithm to automatically assign a type for the variable
// the type should be supported by all values in the array. Resulting in the following type:
let items : (number | null)[] = [1, 2, 3, null]
```

## Contextual Typing
TypeScript uses the locations of variables to infer their types.

Example:
```ts
document.addEventListener("click", (event) => {
   console.log(event.button)
})

// typescript knows that the "click" event is an instance of "MouseEvent"

document.addEventListener("scroll", (event) => {
   console.log(event.button)
})

// this will not working since MouseEvent and UIEvent are not the same and the "event.button" is only available in MouseEvent.
```
## TypeScript Number
All numbers has eighter a ```number``` type or ```bigint``` type.

The following are supported by the ```number``` type:
- number type:
```ts
let price : number;
price = 9.99 // or 10
```

- decimal numbers:
```ts
let counter : number;
counter = 100
```

- binary numbers:
Uses a leading by zero followed by lowercase or uppercase "B"
```ts
let bin : number;
bin = 0B010
```

- octal numbers
Uses a leading zero followed by the letter "o". Digits after ```0o``` are from 0 to 7
```ts
let octal : number;
octal = 0o10
```

- Hexadecimal numbers
Uses a leading zero followed by a lowercase or uppercase "X". Digits after ```0X``` are ```0123456789ABCDEF```
```ts
let hexa : number;
hexa = 0XA
```

The following are supported by the ```bigint``` type:

- big integers
Any whole numbers larget than 2^53 (9,007,199,254,740,992). Has the ```n``` character at the end of the integer.
```ts
let big : bigint;
big = 9007199254740992n
```

## String
Same with JavaScript, Typescript uses a double quotes (") and a single quote ('). Additionally, you can also use a template literil (`)

Example:
```ts
let firstName : string = "Mark Darius"
let lastName : string = "Pagaduan"
let fullName : string = `${firstName} ${lastName}` // Mark Darius Pagaduan
```

## Boolean
Same with JavaScript, boolean types only have two values; ```true``` or ```false```.

Example of declaring a boolean
```ts
let hasError : boolean = true
```

Boolean operators:
- &&: Logical AND operator
- ||: Logical OR operator
- ! : Logical NOT operator

## Type annotation
You may annotate the type boolean but it is not required since typescript often infers types automatically
```ts
let hasError : boolean = true // type annotation

let hasError = true // will also work
```
## Object
```object``` type represens all values that are not primitive types.

Example of declaring an object variable
```ts
let employee : object

employee = {
   firstName: "Mark",
   lastName: "Pagaduan",
   age: 23,
   jobTitle: "Solution Architect"
}
```
When trying to re-assign to an employee variable, typeScript will give you an error

```ts
employee = "Hello" // will not work, since employee variable is an object type

employee.hireDate = new Date.now() // will not also work, since employee object has a fixed properties and hireDate is not one of them
```

When declaring an object variable, you may specify their properties types before assigning a value.
```ts
let employee: {
   firstName: string,
   lastName: string,
   age: number,
   jobTitle: string
}

employee = {
   firstName: "Mark",
   lastName: "Pagaduan",
   age: 23,
   jobTitle: "Solution Architect"
}

// or combining them

let employee: {
   firstName: string,
   lastName: string,
   age: number,
   jobTitle: string
} = {
   firstName: "Mark",
   lastName: "Pagaduan",
   ...
}
```
### object vs Object
The another type called ```Object``` with an uppercase "O" describes all the functionality of all objects, such as ```toString()``` or ```valueOf()``` methods that can be used by object variables.

### The empty type {}

You may also use the empty ```{}``` which means an empty object that has no property on it's own.
```ts
let vacant: {};
vacant.firsName = "Mark" // will not work

// But, you can use all the available Object type methods
console.log(vacant.toString())
```

## Array
Array type are ordered list of values with same types.

Example of an array of strings:
```ts
let arrayName: string[] = []
arrayName[0] = "Mark"
arrayName[1] = "John"

// or

let arrayName: string[] = ["Mark", "John"]

// when you tried to define a different type, typeScript will give you an error

arrayName.push(100) // Error: Argument of type 'number' is not assignable to parameter of type 'string'.
```
### TypeScript properties and methods
JavaScript array methods are also available in TypeScript array. Such as forEach(), map(), reduce(), and filter.

```ts
let series = [1, 2, 3]
console.log(series.length) // 3

let doubleIt = series.map(e => e * 2);
console.log(doubleIt) // [2, 4, 6]
```

### Storing values of mixed types
The following are example of storing multiple types in an array

```ts
let scores = ["Programming", 5, 4]
```

TypeScript will infer this array as ```string | number```
```ts
let scores : (string | number)[] = ["Programming", 5, 4]

// more than 2 types

let multiTypes : (string | number | boolean)[] = ["Mark", 12, true]
```

## Unknown type
The ```unknown``` type hold a value that is not known upfront but requires type checking. Unlike the type ```any```, typeScript checks the type before performing operations on it. Meaning, you cannot call a method or apply operator on an ```unknown``` type variable.

```ts
let result : unknown;

// will work
result = 1;
result = "hello";
result = true
result = [1, 2, 3]

// will not work, since typeScript does not allow calling a method in an unknown type variable
const total = result.reduce((a: number, b: number) => a + b, 0)
console.log(total)
```
To make this work, we need to explicitly tell typeScript compiler that the type of the result is array.
```ts
// ...
const total = (result as number[]).reduce((a: number, b: number) => a + b, 0)
```
## Tuples
Tuple types are same like array types but with some considerations:
- Number of elements are fixed
- The types of elements are known, and need not be the same.

Examples:
```ts
let skill : [string, number] = ["Programming", 5]
// order of the value are important on how you set the type annotation.
skill = [5, "Programming"] // Error: TS2322: Type 'string' is not assignable to type 'number'.
```
It's a good practice to use tuple only with data that are related to each other in specific order. Like defining an RGB color.
```ts
let color: [number, number, number] = [255, 0, 0]
```

### Optional Tuple Elements
Since TypeScript 3.0 you may now specify an optional element in Tuple with the use of questions mark (?) postfix
```ts
let bgColor, headerColor: [number, number, number, number?];
bgColor = [0, 255, 255, 0.5]
headerColor = [0, 255, 255]
```
## Enum
Enum is a group of named constant values. Stands for enumerated type.
```ts
enum Month {
   Jan,
   Feb,
   Mar,
   Apr,
   May,
   Jun,
   Jul,
   Aug,
   Sep,
   Oct,
   Nov,
   Dec
}

// you may use this function that uses the Month enum
function isItSummer(month: Month) {
  let isSummer: boolean;
  switch (month) {
    case Month.Jun:
    case Month.Jul:
    case Month.Aug:
      isSummer = true;
      break;
    default:
      isSummer = false;
      break;
  }
  return isSummer;
}
console.log(isItSummer(Month.Jun)); // true
```
The month enum can also be accessed like so
```ts
console.log(isItSummer(6)); // true
```
The reason is in JavaScript, enum are just object. Objects that has named properties declared in the enum. When you tried to log the Month variable in the console:
```ts
{
  '0': 'Jan', 
  '1': 'Feb', 
  '2': 'Mar', 
  '3': 'Apr', 
  '4': 'May', 
  '5': 'Jun', 
  '6': 'Jul', 
  '7': 'Aug', 
  '8': 'Sep', 
  '9': 'Oct', 
  '10': 'Nov',
  '11': 'Dec',
  Jan: 0,     
  Feb: 1,     
  Mar: 2,     
  Apr: 3,     
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11
}

// you may use Month.Jan or 0
```
## Any
Sometimes you may not know the type of a variable specially if it's from an API or user input. You may use the ```any```type and opt-out of the type checking of TypeScript and basically use the functionality of JavaScript.

```ts
let result : any;

result = 1;
console.log(result) // 1

result = "Hello World"
console.log(result) // Hello World

result = [1, 2, 3]
const total = result.reduce((a: number, b: number) => a + b, 0)
```

another example

```ts
// json may come from a third-party API
const json = `{"latitude": 10.11, "longitude":12.12}`;

// parse JSON to find location
const currentLocation = JSON.parse(json);
console.log(currentLocation); // { latitude: 10.11, longitude: 12.12 }


// if you try to access a non-existing property, TypeScript will only return an undefined instead of throwing an error
console.log(currentLocation.x)
```
## Void

Void type is useless when using with variables. You cannot assign anything to it beside from ```undefined```. It is usually useful for functions. ```void``` type for functions typically means it does not return anything.

```ts
function log(message : string) : void {
   console.log(message)
}
```
## Union

When your function parameters can be number or string, you can use the union type (e.g., string | number).

```ts
function add(a: string | number, b: string | number) : string | number {
   if (typeof a === "number" && typeof b === "number") {
      return a + b;
   }
   if (typeof a === "string" && typeof b === "string") {
      return a.concat(b)
   }

   throw new Error("Parameters must be numbers or strings!")
}
```
This is better than setting the parameter type as ```any```

## Type aliases
Type aliases allows you to create a new name or define an alias for an existing and complex types that will be used accross your application.

```ts
type alias = existingType // can be object, union, intersection, and function type
```

### Primitive types
```ts
type stringType = string;

let firstName : stringType;
let lastName : stringType;
```

### Object types
```ts
type Person = {
   name: string,
   age: number;
}

let person: Person = {
   name: "John",
   age: 23
}
```

### Intersection types
```ts
type Personal = {
   name: string;
   age: number;
}

type Contact = {
   email: string;
   phone: string;
}

type Candidate = Personal & Contact; // intersection type

let markInfo : Candidate = {
   name: "Mark",
   age: 23,
   email: "mark@gmail.com",
   phone: "090987178995"
}
```
### String Literal
This type is very useful when limiting the possible string values of a variable.
```ts
let click: 'click'; // the click is a string literal type that will only accept the string literal 'click'

click = "dblclick" // compile error
```

This type will combine nicely with union types
```ts
type MyMouseEvent = 'click' | 'dblclick' | 'mouseup' | 'mousedown';
let mouseEvent: MyMouseEvent;
mouseEvent = 'click'; // valid
mouseEvent = 'dblclick'; // valid
mouseEvent = 'mouseup'; // valid
mouseEvent = 'mousedown'; // valid
mouseEvent = 'mouseover'; // compiler error

let anotherEvent: MyMouseEvent;
```
## Never
```never``` type holds no value. It is like an empty set. Meaning, you cannot assign a value to a variable with the never type.

```ts
let empty: never = 'hello' // Type 'string' is not assignable to type 'never'
```
The useful way or reason why we will use the ```never``` type is for indicating unreachable code or guaranteed to never execute. This tells TypeScript that the code is unreachable and can prevent errors or warning.

```ts
type Role = 'admin' | 'user' | 'guest';

const unknownRole = (role: never): never => {
  throw new Error(`Invalid role: ${role}`);
};

const authorize = (role: Role): string => {
  switch (role) {
    case 'admin':
      return 'You can do anything';
    case 'user':
      return 'You can do something';
    case 'guest':
      return 'You can do nothing';
    default:
      // never reach here util we add a new role
      return unknownRole(role);
  }
};

console.log(authorize('admin'));
```
This code will prevent users that does not have a defined roles and will therefore prevent any errors or warning.
