# Implementing CodeMirror

## Modularity
CodeMirror is set up as a collection of separate modules. Which mean you have to import and setup all the pieces/modules together. On the bright side, you can customize the editor on how ever you want.

Here are the usual code packages required to create a simple editor:
- @codemirror/state:
  - An option passed when creating a new editor state. You can pass the default document, default selection (where the cursor is), and extensions you want to use.
- @codemirror/view:
  - The "view" that the user see and interacts with.
- @codemirror/commands:
  - This package exports a collection of mostly used generic editing commands and key bindings.

An example of minimal editor:
```js
import {EditorState} from "@codemirror/state"
import {EditorView, keymap, basicSetup} from "@codemirror/view"
import {javascript} from "@codemirror/lang-javascript"
import {defaultKeymap} from "@codemirror/commands"

let startState = EditorState.create({
  doc: "Hello World",
  extensions: [keymap.of(defaultKeymap)]
})

let view = new EditorView({
  state: startState,
  extensions: [basicSetup, javascript()],
  parent: document.body // editor will be attached to the document body
})
```
It is recommended to use rollup or Webpack to bundle the application.

## Functional Core, Imperative Shell
The architecture of CodeMirror is inspired with function code. Meaning, pure functional programming takes a input and will always return the same output without any side effect. But, since the browser is a very imperative-minded (the program tells the computer what to do step by step).

To resolve this contradiction, the library document and state are immutable and strictly functional. Whereas the view component (DOM) and command interface are wrapped in an imperative interface.

## State and Updates
Updating the state of the view is entirely determined by the EditorState value in it's state property. You are required to create a Transaction that will be dispatched to sync with the DOM representation of the new state.
```js
// (Assume view is an EditorView instance holding the document "123".)
let transaction = view.state.update({changes: {from: 0, insert: "0"}})
console.log(transaction.state.doc.toString()) // "0123"
// At this point the view still shows the old state.
view.dispatch(transaction)
// And now it shows the new state.
```
## Extension
The core library has minimal and generic features, that is why extensions are needed to define new fields in the state object, styling the editor (theme), or to inject a component into the view.

To add an extension you have to provide them during the creation of the view in an array values, or during runtime by creating a transactions. All extensions are deduplicated, if an extension is added multiple times it'll only take effect once.

```js
const view = new EditorView({
  doc: "1234",
  extensions: [
    basicSetup,
    javascript()
  ],
  parent: appDoc
})
```

## Document Offsets
Document Offsets uses plain numbers to identify the position of the document. Using UTF16 (astral characters are counted as two units), line breaks always count as single unit.

These offsets are used to determine the selection, position changes, decorate content, and so on.

If needed to determine where a position in a start document ends up in changed document, you may use the position mapping.
```js
import {EditorState} from "@codemirror/state"

let state = EditorState.create({doc: "1234"})
// Delete "23" and insert at "0" at the start.
let tr = state.update({changes: [{from: 1, to: 3}, {from: 0, insert: "0"}]})
// The position at the end of the old document is at 3 in the new document.
console.log(tr.changes.mapPos(4))
```

It's also allowed to index by lines instead of characters.
```js
import {Text} from "@codemirror/state"

let doc = Text.of(["line 1", "line 2", "line 3"])
// Get information about line 2
console.log(doc.line(2)) // {start: 7, end: 13, ...}
// Get the line around position 15
console.log(doc.lineAt(15)) // {start: 14, end: 20, ...}
```

## Selection
Editor state stores a current selection. Selections consist of multiple ranges, each of of which can be a cursor (empty, meaning the anchor and head has the same position), or cover a range between it's anchor and head.

Overlapping selections are automatically merged and sorted, so that selection always holds a sorted, non-overlapping array of ranges.
```js
import {EditorState, EditorSelection} from "@codemirror/state"

let state = EditorState.create({
  doc: "hello",
  selection: EditorSelection.create([
    EditorSelection.range(0, 4),
    EditorSelection.cursor(5)
  ]),
  extensions: EditorState.allowMultipleSelections.of(true)
})
console.log(state.selection.ranges.length) // 2

let tr = state.update(state.replaceSelection("!"))
console.log(tr.state.doc.toString()) // "!o!"
```

One of the ranges is marked as the main range/selection (which is the browser's DOM selection that you can see). Initially, CodeMirror only supports single selection, but you can use extension like drawSelection. By doing this, CodeMirror will hide the native browser selection and cursor and handle everything by the application.
