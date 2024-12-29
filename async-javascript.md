# Asynchronous JavaScript

## Table of Contents
1. [[#Introducing Asynchronous JavaScript]]
2. [[#Synchronous JavaScript]]
3. [[#Event Handlers]]
4. [[#Callback]]

## Introducing Asynchronous JavaScript
Asynchronous functions is a technique that allows you to perform a long process function and still being able to respond to other events instead of forcing the user to wait the result. Once the process is done, you will be presented with a result.

Example of long process functions:
- HTTP request ```fetch()```
- Accessing a user's camera ```getUserMedia()```
- Asking a user to select files ```showOpenFilePicker()```

## Synchronous JavaScript
The following code is an example of a synchronous code. The ```makeGreeting()``` has to be finished first before executing the next line of codes.

```js
function makeGreeting(name) {
  return `Hello, my name is ${name}!`;
}

const name = "Miriam";
const greeting = makeGreeting(name);
console.log(greeting);
// "Hello, my name is Miriam!"
```

To resolve the problem of a synchonous code, we need the following:

1. Start a long-running operation by calling a function.
2. Have that function start the operation and return immediately, so that our program can still be responsive to other events.
3. Have the function execute the operation in a way that does not block the main thread, for example by starting a new thread.
4. Notify us with the result of the operation when it eventually completes.

This is what asynchronous coding exactly do.

## Event Handlers
The given description the the top would remind you of an Event Listeners. You provide a callback function in an event listener, but it will not be called right away. Once the user/web trigerred the event listener that is the only time the callback function will be called and trigger it's statements.

```js
const log = document.querySelector(".event-log");

document.querySelector("#xhr").addEventListener("click", () => {
  log.textContent = "";

  const xhr = new XMLHttpRequest();

  xhr.addEventListener("loadend", () => {
    log.textContent = `${log.textContent}Finished with status: ${xhr.status}`;
  });

  xhr.open(
    "GET",
    "https://raw.githubusercontent.com/mdn/content/main/files/en-us/_wikihistory.json",
  );
  xhr.send();
  log.textContent = `${log.textContent}Started XHR request\n`;
});

document.querySelector("#reload").addEventListener("click", () => {
  log.textContent = "";
  document.location.reload();
});
```

In this example, we have ```XMLHttpRequest()``` API which enables you to make HTTP request to a remote servers using JavaScript. Sine requesting a data from a server takes a long time, this API is an asynchronous API where you get notified about the progress and eventual completion of a request by attaching an event listener to the ```XMLHttpRequest``` object.

## Callback
Callback is a function that is passed inside of another function with the exception that it will be called in the appropriate time.

```js
function doStep1(init, callback) {
  const result = init + 1;
  callback(result);
}

function doStep2(init, callback) {
  const result = init + 2;
  callback(result);
}

function doStep3(init, callback) {
  const result = init + 3;
  callback(result);
}

function doOperation() {
  doStep1(0, (result1) => {
    doStep2(result1, (result2) => {
      doStep3(result2, (result3) => {
        console.log(`result: ${result3}`);
      });
    });
  });
}

doOperation();
```
This is an example of a "callback hell" or the "pyramid of doom". Because we have a very deep callback calls inside our ```doOperation()``` function, it became hard to read and debug and hard to handle errors.

For these reasons, most modern asynchronous API don't use callbacks but instead Promise.

## Promise
Promises are a foundation of modern asynchronous programming. With promise based API, the asynchronous function starts the operation and returns a Promise object with the current state of the operation. You can attach an event handlers to this promise object that will then be executed once the operation has succeeded or failed.

## Using fetch() API
```js
const fetchPromise = fetch(
  "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);

console.log(fetchPromise);

fetchPromise.then((response) => {
  console.log(`Received response: ${response.status}`);
});

console.log("Started request…");
```

This sample code shows how asynchronouse API works:
1. We call the ```fetch()``` API which will return a Promise object;
2. Once we log the ```fetchPromise``` variable, it will log a promise object ```Promise { <state>: "pending" }```. What this means is that the operatio is not yet done, that is why it's in the "pending" state.
3. Passing a handler using the ```then()``` method to our Promise objetc. When (if) the promise succeeds, the promise will call our handler and pass the response object which contains the server response.
4. We log that the request has started.

The exact result of this code is:
```
Promise { <state>: "pending" }
Started request…
Received response: 200
```

## Chaining Promises
Let's say you have a function with ```fetch()``` API, but you need that response data in a json format. You can utilize the ```json()``` function to do this. It turns out, the ```json()``` function is also an asynchronous function. This means, we have an asynchronous function inside another asynchronous function.

```js
const fetchPromise = fetch(
  "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);

fetchPromise.then((response) => {
  const jsonPromise = response.json();
  jsonPromise.then((data) => {
    console.log(data[0].name);
  });
});
```

This code works perfectly fine, but this is another example of what we call a "callback hell" where we call another callback inside a callback function. But the elegant feature of the ```then()``` itself returns a promise. This mean we can rewrite this code much better:

```js
const fetchPromise = fetch(
  "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);

fetchPromise
  .then((response) => {
    if (!response.ok) { // I added a checking for the server response
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data[0].name);
  });
```
Instead of calling the second ```then()``` inside the first ```then()```. We can just pass the returned value of the ```response.json()``` from the first ```then()``` into the second ```then()```. Which works perfectly and better to understand. This technique is called **Promise Chaining**

## Catching e
