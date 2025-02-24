import { EditorState, Facet, StateField } from "@codemirror/state";
import {
  EditorView,
  keymap,
  gutter,
  lineNumbers,
  highlightActiveLine,
} from "@codemirror/view";
import { cursorDocEnd, defaultKeymap } from "@codemirror/commands";

// FACET
let info = Facet.define();

// StateField
const changeCounterStateField = StateField.define({
  create: () => {
    return 0;
  },
  update: (currVal, transaction) => {
    let newValue = currVal;
    if (transaction.docChanged) {
      newValue += 1;
    }
    return newValue;
  },
});

let editorState = EditorState.create({
  doc: "*1*2*3*4\n hi",
  extensions: [
    keymap.of(defaultKeymap),
    lineNumbers(),
    gutter(),
    highlightActiveLine(),
    info.of("hello"),
    info.compute(
      ["selection"],
      (state) => `# of line: ${state.selection.mainIndex}`,
    ),
    changeCounterStateField.extension,
  ],
});

let view = new EditorView({
  state: editorState,
  parent: document.body,
});

// let updateDispatch = view.state.update({});

// view.dispatch(updateDispatch);
// view.dispatch({
//   changes: { from: 0, insert: "#!/usr/bin/env node\n" },
// });

// let editorDoc = view.state.doc.toString();
// let position = 0;
// let changes = [];

// for (let next; (next = editorDoc.indexOf("*", position)) > -1; ) {
//   changes.push({ from: next, to: next + 1, insert: "." });
//   position = next + 1;
// }

// view.dispatch({ changes });
