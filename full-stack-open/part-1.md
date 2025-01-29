# Introduction to React & JavaScript

## Object Methods and "this"
The "this" keyword pertains to the object itself.
```js
const arto = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',

  greet: function() {
    console.log('hello, my name is ' + this.name)
  },
}

arto.greet()  // "hello, my name is Arto Hellas" gets printed
```

Arrow functions or functions (defined with the keyword "function") vary substantially when it come to how they behave with respect to the keyword "this".

```js
const arto = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
  greet: function() {
    console.log('hello, my name is ' + this.name)
  },

  doAddition: function(a, b) {
    console.log(a + b)
  },
}

arto.doAddition(1, 4)        // 5 is printed

const referenceToAddition = arto.doAddition
referenceToAddition(10, 15)   // 25 is printed
```

The following code creates a reference to the ```doAddition``` method of the object arto. This will run properly and will output what we expect. But, if we perform the following code:

```js
arto.greet()       // "hello, my name is Arto Hellas" gets printed

const referenceToGreet = arto.greet
referenceToGreet() // prints "hello, my name is undefined"
```

When calling the method through a reference, the method loses it's knowledge of what the original "this" was and usually becomes the "global-object".

Depending on the Context on where you run the "this" keyword, the global object will change.

For the Browser:
```js
this === window // true
```

For the Node:
```js
this === global // true
```

For the Module:
```js
this === module.exports // true
```

There are several ways to preserve the value of "this". One way is by using the ```bind()``` method.
```js
setTimeout(arto.greet.bind(arto), 1000)
```

## Classes


