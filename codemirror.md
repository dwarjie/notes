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

