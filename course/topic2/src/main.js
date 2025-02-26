import { EditorView } from "@codemirror/view";
import { EditorState, StateEffect, StateField } from "@codemirror/state";
import "./style.css";

/* TODO:
  - Use updateListener extension.
  - Create an instance of "changeLogStateEffectType" with an initial value of ""
  - Every change, dispatch a transaction with an effect type "changeLog"
  - Add a panel at the bottom of the editor
  - Every transaction, check if effect.is(changeLogStateEffectType)
  - then change the content of the panel and show the changes

  ADDITIONAL FEATURES:
  - Show if "insertion" change or "deletion" change
*/

// const changeLogStateEffectType = StateEffect.define()
// const changeLog = changeLogStateEffectType.of("No changes.")
// const changeLogStateField = StateField.define({
//   create() {
//     return
//   }
// })

const state = EditorState.create({
  doc: `
    // Try editing this content
    const hello = 'world';
  `,
  extensions: [
    EditorView.updateListener.of((viewUpdate) => {
      if (!viewUpdate.docChanged) return;

      // if ()
      console.log(viewUpdate.transactions);
    }),
  ],
});

const view = new EditorView({
  state: state,
  parent: document.body,
});
