import { EditorState, Facet, StateEffect, StateField } from "@codemirror/state";
import {
  EditorView,
  keymap,
  gutter,
  lineNumbers,
  highlightActiveLine,
  showPanel,
  WidgetType,
  Decoration,
} from "@codemirror/view";
import { cursorDocEnd, defaultKeymap } from "@codemirror/commands";

// StateField panel creator helper
function createCounterPanel(value) {
  return () => {
    const dom = document.createElement("div");
    dom.textContent = `Current count is ${value}`;
    dom.className = "midpoint-widget";

    return { dom };
  };
}

// FACET
let info = Facet.define();

// StateEffect
let updateCounterStateEffectType = StateEffect.define();
let incrementCounterByFiveStateEffect = updateCounterStateEffectType.of(5);

// StateField
const changeCounterStateField = StateField.define({
  create: (state) => {
    return 0;
  },
  update: (currVal, transaction) => {
    let newValue = currVal;
    if (transaction.docChanged) {
      newValue += 1;
    }

    for (const effect of transaction.effects) {
      if (effect.is(updateCounterStateEffectType)) {
        newValue += effect.value;
      }
    }
    return newValue;
  },
  provide: (value) => showPanel.from(value, createCounterPanel),
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
    changeCounterStateField,
  ],
});

let view = new EditorView({
  state: editorState,
  parent: document.body,
});

// let updateDispatch = view.state.update({});

// view.dispatch(updateDispatch);
view.dispatch({
  changes: { from: 0, insert: "#!/usr/bin/env node\n" },
  effects: [incrementCounterByFiveStateEffect],
});

// let editorDoc = view.state.doc.toString();
// let position = 0;
// let changes = [];

// for (let next; (next = editorDoc.indexOf("*", position)) > -1; ) {
//   changes.push({ from: next, to: next + 1, insert: "." });
//   position = next + 1;
// }

// view.dispatch({ changes });
