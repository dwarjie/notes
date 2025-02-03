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

## Choosing the "Right" State Structure

### Group Related State
If you always have to update both state at the same time, you may consider grouping or merging them in one state variable.
```js
// wrong
const [x, setX] = useState(0);
const [y, setY] = useState(0);

// right
const [position, setPosition] = useState({ x: 0, y: 0 });
```

### Avoid contradictions in States
If your states are structured in a way that each of them may contradict with one another, you leave room for mistakes and confusion.

```jsx
export default function FeedbackForm() {
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSending(true);
    await sendMessage(text);
    setIsSending(false);
    setIsSent(true);
  }
```

If you forgot to call the setIsSending and setIsSent at the same time, you have a component that has setIsSending and setIsSent both True. This is not ideal since in our component both state should not have the same value set to True. It is better to replace them with one status state variable that may take one of three valid states: 'typing' (initial), 'sending', and 'sent':

```jsx
export default function FeedbackForm() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('typing');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    await sendMessage(text);
    setStatus('sent');
  }

  const isSending = status === 'sending';
  const isSent = status === 'sent';

  if (isSent) {
    return <h1>Thanks for feedback!</h1>
  }
```

### Avoid redundant state
If you can calculate the value during the re-rendering state, you should avoid adding/creating a specific state.
```jsx
export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('');

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
    setFullName(e.target.value + ' ' + lastName);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
    setFullName(firstName + ' ' + e.target.value);
  }
```

This is the right way.
```jsx
export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const fullName = firstName + ' ' + lastName; // calculate the value of fullName instead of creating a specific state variable

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }
```

### Dont mirror prop in state
```jsx
function Message({ messageColor }) {
  const [color, setColor] = useState(messageColor);
```

In the code above, the Message component has a prop called "messageColor" that was given by the parent component and assigned into a separate state.

This method is not good because the color state will not be synced with the parent component. Once the parent component passed a different value (e.g., red instead of blue), the color state will not be updated.

```jsx
function Message({ messageColor }) {
  const color = messageColor; // will always be synced with the parent component
```

This is only useful if you want the initial value of the color state will be from the parent component.

```jsx
function Message({ initialColor }) {
  // The `color` state variable holds the *first* value of `initialColor`.
  // Further changes to the `initialColor` prop are ignored.
  const [color, setColor] = useState(initialColor);
```

### Avoid duplication in state
Suppose that you have the following code:
```jsx
const initialItems = [
  { title: 'pretzels', id: 0 },
  { title: 'crispy seaweed', id: 1 },
  { title: 'granola bar', id: 2 },
];

export default function Menu() {
  const [items, setItems] = useState(initialItems);
  const [selectedItem, setSelectedItem] = useState(
    items[0]
  );
```

This code works but not great: the selectedItem state is the same object as one of the items inside the items list. This means the information is duplicated in two states.

The possible bug/error with this method is if the items became editable. Since the item is duplicated into 2 states (1 for the list, 1 for the output of selected item), once the list is edited the output for the selected item will not synced with the edited list item.

Possible solution to this is instead of setting the whole property value of the item into the selectedItem state, just use the id property and find the value of the id.

```jsx
export default function Menu() {
  const [items, setItems] = useState(initialItems);
  const [selectedId, setSelectedId] = useState(0);

  const selectedItem = items.find(item =>
    item.id === selectedId
  );
```

### Avoid deeply nested state
Suppose you have the following object to keep track of the countries you want to visit:
```jsx
export const initialTravelPlan = {
  id: 0,
  title: '(Root)',
  childPlaces: [{
    id: 1,
    title: 'Earth',
    childPlaces: [{
      id: 2,
      title: 'Africa',
      childPlaces: [{
        id: 3,
        title: 'Botswana',
        childPlaces: []
      }, {
        id: 4,
        title: 'Egypt',
        childPlaces: []
      }, {
        id: 5,
        title: 'Kenya',
        childPlaces: []
      }, {
        id: 6,
        title: 'Madagascar',
        childPlaces: []
      }, {
        id: 7,
        title: 'Morocco',
        childPlaces: []
      }, {
        id: 8,
        title: 'Nigeria',
        childPlaces: []
      }, {
        id: 9,
        title: 'South Africa',
        childPlaces: []
      }]
    }, {
    ...
```

This structure of object state requires a complicated code to update if you want to remove a place that you have already visited. If the state is too nested to be updated easily, consider making it "flat" or "normalized".

```jsx
export const initialTravelPlan = {
  0: {
    id: 0,
    title: '(Root)',
    childIds: [1, 42, 46],
  },
  1: {
    id: 1,
    title: 'Earth',
    childIds: [2, 10, 19, 26, 34]
  },
  2: {
    id: 2,
    title: 'Africa',
    childIds: [3, 4, 5, 6 , 7, 8, 9]
  }, 
  3: {
    id: 3,
    title: 'Botswana',
    childIds: []
  },
  4: {
    id: 4,
    title: 'Egypt',
    childIds: []
  },
  5: {
    id: 5,
    title: 'Kenya',
    childIds: []
  },
```

Instead of having an array of object for each place for the child place, consider using the id of the places. Now, when thinking of updating the state you just need to provide the updated parent place excluding the place id that you already visited.

```jsx
function handleComplete(parentId, childId) {
    const parent = plan[parentId];
    // Create a new version of the parent place
    // that doesn't include this child ID.
    const nextParent = {
      ...parent,
      childIds: parent.childIds
        .filter(id => id !== childId)
    };
    // Update the root state object...
    setPlan({
      ...plan,
      // ...so that it has the updated parent.
      [parentId]: nextParent
    });
  }
```
