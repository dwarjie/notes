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
```js
let stringVariable : string = "hello" // initializing a string variable
stringVariable = 25 // will not work since the variable should only be string
```

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
Object type represents all values that are not primitive types.

Example of declaring an object variable
```tsx
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
Never type holds no value. It is like an empty set. Meaning, you cannot assign a value to a variable with the never type.

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

## Function types
TypeScript allows you to specify a function types.
```ts
let add: (x: number, y: number) => number;

// this means add variable expects a function with two number parameters and will return a number

add = function(x: number, y: number) {
   return x + y
}

let result = add(10, 20) // 30
```
## Optional Parameters
By default, JavaScript already supports optional parameters. When you initialized a function and do not pass all defined parameters your application wil still work properly.

But, with TypeScript the compiler will check the number of passed parameters and defined parameters and if the types are compatible. If not, this will issue an error.

So, to specify an optional parameters you may use the question mark (?).

```ts
function multiply(a: number, b: number, c?: number): number {

    if (typeof c !== 'undefined') {
        return a * b * c;
    }
    return a * b;
}
```

Make sure that the optional parameters must appear after the required parameters in the parameter list.

## Default parameters
Same with optional parameters, JavaScript already supports default paramaters. Same with typescript with the following syntax.
```ts
function name(parameter1:type=defaultvalue1, parameter2:type=defaultvalue2,...) {
   //
}

function applyDiscount(price: number, discount: number = 0.05): number {
    return price * (1 - discount);
}

console.log(applyDiscount(100)); // 95
```

Keep in mind that you cannot use default parameters with function types.

If you will define the default parameters before the required parameters, you have to explicitly pass ```undefined``` to get the default initialized value.

## Rest parameters
Rest parameters allows a function to accept zero or more arguments of the specified type. Here are the following rules:
- A function only has one rest parameter
- The rest parameters appear last in the parameter list
- The type of the rest parameter is an array type

```ts
function getTotal(...numbers: number[]): number {
    let total = 0;
    numbers.forEach((num) => total += num);
    return total;
}

console.log(getTotal()); // 0
console.log(getTotal(10, 20)); // 30
console.log(getTotal(10, 20, 30)); // 60
```

an example of rest parameters with multiple types

```ts
function combine(...args: (number | string)[]): [number, string] {
  let total = 0;
  let str = '';
  args.forEach((arg) => {
    if (typeof arg === 'number') {
      total += arg;
    } else if (typeof arg === 'string') {
      str += arg;
    }
  });

  return [total, str];
}

const [total, str] = combine(3, 'Happy', 2, 1, ' New Year');

console.log({ total });
console.log({ str });
```

## Function Overloading
TypeScript Function Overloading allows you to define multiple function signatures for a single function and provide one implementation that handles all signatures.

Compiler uses the function signatures to perform compile-time type checking to ensure type safety. 

Example of a single function overloading that returns sum of two numbers or strings.
```js
// function signatures
function add(a: number, b: number): number;
function add(a: string, b: string): string;

// function implementation

function add(a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
    } else if (typeof a === 'string' && typeof b === 'string') {
        return a + b;
    }
    throw new Error('Invalid arguments');
}

// usage
console.log(add(10, 20));  // 30
console.log(add('Hello, ', 'world!'));  // 'Hello, world!
```

### Function overload with optional parameters
When you overload a function, the number of required parameters must be the same. If an overload has more parameters than the other, you need to make the additional parameters optional.

```js
function sum(a: number, b: number): number;
function sum(a: number, b: number, c: number): number;
function sum(a: number, b: number, c?: number): number {
    if (c) return a + b + c;
    return a + b;
}
```

### Method Overloading
When a function is a property of a class, it is called a method. TypeScript also supports method overloading.

```js
class Counter {
  private current = 0;
  count(): number;
  count(target: number): number[];
  count(target?: number): number | number[] {
    if (target) {
      let values: number[] = [];
      for (let start = this.current; start <= target; start++) {
        values.push(start);
      }
      // set current to target
      this.current = target;
      return values;
    }
    return ++this.current;
  }
}
```

## Prototypal Inheritance (JavaScript)
JavaScript does not have a concept of classical inheritance like Java and C#. Instead, it uses prototypal inheritance using object.

In prototypal inheritance, an object "inherits" properties from another object via the prototype linkage.

The following defines a person object:
```js
let person = {
  name: "Mark",
  greet: function() {
    return `Hi! I'm ${this.name}`;
  }
}
```

The person object is linked to the ```Object()``` functions. The ```[[Prototype]]``` represents the linkage:
[Object Image with Linkage](https://www.javascripttutorial.net/wp-content/uploads/2022/01/JavaScript-prototypal-inheritance.svg)

It means that the person object can call any methods defines by the Object.prototype.

When calling the ```toString()``` method via person object:
```js
console.log(person.toString()) // result: [object Object]
```

The ```[object Object]``` is a default string representation of an object.

When you call the ```toString()``` method via person object, the JS engine cannot find it on the person object. Therefore, it follows the prototype chain and searches for the method in the ```Object.prototype``` object.

To access the prototype of the person object, you can use the ```__proto__``` property.
```js
console.log(person.__proto__)

// the following will also resolve into true
console.log(person.__proto__ === Object.prototype) // true
```

The following defines the teacher object with a ```teacher()``` method.
```js
let teacher = {
  teach: function (subject) {
    return `I can teach ${subject}`
  }
}
```

If you want the teacher object to access all methods and properties of the person object, you can set the prototype of teacher object to the person object.
```js
teacher.__proto__ = person;
```

Now, the teacher has access to the name property and ```greet()``` method from the person object via prototype chain.

### Standard way of Prototypal inheritance in ES5.
ES5 provided a standard way with protorypal inheritance using the ```Object.create()``` method.

> Note: now you should use the newer ES6 class and extends keyword.

The ```Object.create()``` method creates a new object and uses an existing object as a prototype of the new Object.

```js
Object.create(proto, [propertiesObject])

// person object
let person = {
  name: "Mark",
  greet: function () {
    return `Hi ..`
  }
}

// to perform the Prototypal Inheritance in ES5
let teacher = Object.create(person)

// the teacher object now has an access to the properties and methods of the person object

// you can also create the object with the needed properties
let teacher = Object.create(person, {
  name: { value: "Bianca" },
  teach: { value: function (subject) {
    return `I can teach ${subject}`
  }}
})
```

### ES6 class declaration
ES6 introduces a new syntax for declaring a class

```js
class Person {
  constructor(name) {
    this.name = name
  }

  getName() {
    return this.name
  }
}
```

This person object behaves like the the previous examples. However, instead of using a constructor/prototype pattern, it uses the class keyword.

### TypeScript Class
TypeScript class adds type annotations to the properties and methods of the class.
```js
class Person {
    ssn: string;
    firstName: string;
    lastName: string;

    constructor(ssn: string, firstName: string, lastName: string) {
        this.ssn = ssn;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}
```

## TypeScript Access Modifiers
The following Access modifiers change the visibility and accessibility of the properties and methods:
- private
- protected
- public

### Private
private modifiers limits the visibility and accessibility on the same class only.

```js
class Person {
  private ssn: string;
  private firstName: string;
  private lastName: string;

  constructor(ssn: string, firstName: string, lastName: string) {
    this.ssn = ssn;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

let person = new Person('153-07-3130', 'John', 'Doe');
console.log(person.ssn); // compile error
```

### Public
public modifiers allows class properties and methods to be access from all locations. By default, when not specifying an access modifier it will be set as public.
```js
class Person {
    // ...
    public getFullName(): string {
        return `${this.firstName} ${this.lastName}`; 
    }
    // ...
}
```

### Protected
protected modifiers allows properties and methods of a class to be accessible within the same class and subclasses (class who inherits the parent class)
```js
class Person {
  protected ssn: string;
  private firstName: string;
  private lastName: string;

  constructor(ssn: string, firstName: string, lastName: string) {
    this.ssn = ssn;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
```

To make the code shorter, you can also both declare and initialize the properties:
```js
class Person {
  constructor(
    protected ssn: string,
    private firstName: string,
    private lastName: string
  ) {}

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
```

## readonly
The readonly access modifiers allows you to mark the class properties as immutable property.

The assignment to a readonly property can only occue in one of the two places:
- In the property declaration
- In the constructor of the same class

```js
class Person {
    readonly birthDate: Date;

    constructor(birthDate: Date) {
        this.birthDate = birthDate;
    }
}

let person = new Person(new Date(1990, 12, 25));
person.birthDate = new Date(1991, 12, 25); // Compile error
```

Like other access modifiers, you can consolidate the declaration and initialization of a readonly property:
```js
class Person {
    constructor(readonly birthDate: Date) {
    }
}
```

### readonly vs const

readonly:
- Used for: Class properties
- Initialization: In the declaration or in the constructor of the same class

const:
- Used for: Variable
- Initialization: In the declaration

## Getters and Setters
Getters method returns the value of the property's value. A getter is also called an accessor.
Setter method updates the property's value. A setter is also called a mutator.

```js
class Person {
  private _age: number;
  private _firstName: string;
  private _lastName: string;

  constructor(age: number, firstName: string, lastName: string) {
    this._age = age;
    this._firstName = firstName;
    this._lastName = lastName;
  }

  public get age() {
    return this._age;
  }

  public set age(theAge: number) {
    if (theAge <= 0 || theAge >= 200) {
      throw new Error('The age is invalid');
    }
    this._age = theAge;
  }

  public get fullName() {
    return `${this._firstName} ${this._lastName}`;
  }
}

let person = new Person(22, "John", "Doe");
person.age = 23 // will access the setter function
person.age = 0 // Error: The age is invalid
console.log(person.fullName) // John Doe
```

## Inheritance
Inheritance makes it possible to reuse the properties and methods of another class without recreating them.

The class who's inherits the properties and methods are called "child class" and the class who's properties and methods are inherited from are called "parent class"

In JavaScript and Typescript there's no inheritance like C# and Java, we use prototypal inheritance. ES6 provides a ```class``` syntax, which is a syntactical sugar of the prototypal inheritance.

Suppose we have a class Person:
```js
class Person {
  constructor(private firstName: string, private lastName: string) {}
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
  describe(): string {
    return `This is ${this.firstName} ${this.lastName}.`;
  }
}
```

To inherit the Person class, we use the ```extend``` keyword:

```js
class Employees extends Person {
  //...
}
```

### Constructor
Since the Person class has a constructor that initializes the firstName and lastName properties, you need to initialize these properties in the constructor of the child class (in our case, the Employee class).

```js
class Employees extends Person {
    constructor(
        firstName: string,
        lastName: string,
        private jobTitle: string) {

        super(firstName, lastName)
    }
}

let employee = new Employees("John", "Doe", "IT")
console.log(employee.getFullName()) // John Doe
```

### Method Overriding
If you called the ```describe()``` method in the Employee class, the ```describe()``` method of the Person class will be invoked.If you want for the Employee class to has its own ```describe()``` method, you can define it like so:

```js
class Employees extends Person {
    constructor(
        firstName: string,
        lastName: string,
        private jobTitle: string) {

        super(firstName, lastName)
    }

    describe(): string {
        return `${super.describe()} I am a ${this.jobTitle}`
    }
}

let employee = new Employees("John", "Doe", "IT")
console.log(employee.describe()) // This is John Doe. I am IT
```

or don't call the parent method

```js
//...
describe(): string {
        return `I am a ${this.jobTitle}`
}

let employee = new Employees("John", "Doe", "IT")
console.log(employee.describe()) // I am IT
```

## Statis Methods and Properties

### Static Properties
Unlike an instance property, a static property is shared among all instances of a class.
```js
class Employee {
    static headcount: number = 0;

    constructor(
        private firstName: string,
        private lastName: string,
        private jobTitle: string) {

        Employee.headcount++;
    }
}

let john = new Employee('John', 'Doe', 'Front-end Developer');
let jane = new Employee('Jane', 'Doe', 'Back-end Developer');

console.log(Employee.headcount); // 2
```

This code will initialize the ```headcount``` property into zero. It's value is increased by 1 whenever a new object is created.

### Static Methods
Static methods is also shared across instances of the class.

```js
class Employee {
    private static headcount: number = 0;

    constructor(
        private firstName: string,
        private lastName: string,
        private jobTitle: string) {

        Employee.headcount++;
    }

    public static getHeadcount() {
        return Employee.headcount;
    }
}

let john = new Employee('John', 'Doe', 'Front-end Developer');
let jane = new Employee('Jane', 'Doe', 'Back-end Developer');

console.log(Employee.getHeadcount); // 2
```

## Abstract Classes
Abstract class are used to define common behaviors for derived/normals class to extend. Unlike derived classes, they cannot be instantiated directly.

```js
abstract class Employee {
  // one or more abstract methods
}
```

Abstract method does not contain implementations. It only defines the method signature that must be implemented by the derived class.

```js
abstract class Employee {
  constructor(private firstName: string, private lastName: string) {}

  abstract getSalary(): number;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  compensationStatement(): string {
    return `${this.fullName} makes ${this.getSalary()} a month.`;
  }
}
```

Since the employee class is an Abstract class, you cannot create a new object from it.
```js
let employee = new Employee('John','Doe'); // Error: TS2511: Cannot create an instance of an abstract class.
```

The following code shows how to extend an Abstract class and use an abstract method.
```js
class FullTimeEmployee extends Employee {
  constructor(firstName: string, lastName: string, private salary: number) {
    super(firstName, lastName);
  }

  getSalary(): number {
      return this.salary;
  }
}
```

> **NOTE** It’s a good practice to use abstract classes when you want to share code among some related classes.
