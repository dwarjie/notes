import { EditorView, showPanel } from "@codemirror/view";
import { EditorState, StateEffect, StateField } from "@codemirror/state";
import "./style.css";

/* TODO:
  - Use updateListener extension. /
  - Create an instance of "changeLogStateEffectType" with an initial value of ""
  - Every change, dispatch a transaction with an effect type "changeLog"
  - Add a panel at the bottom of the editor
  - Every transaction, check if effect.is(changeLogStateEffectType)
  - then change the content of the panel and show the changes

  ADDITIONAL FEATURES:
  - Show if "insertion" change or "deletion" change
*/

const changeLogStateEffectType = StateEffect.define();
const incrementAdding = changeLogStateEffectType.of(1);
const incrementDeleting = changeLogStateEffectType.of(1);

function changeLogPanel(update) {
  return () => {
    let dom = document.createElement("div");
    dom.textContent = `${update}`;
    return { dom };
  };
}

const changeLogStateField = StateField.define({
  create() {
    return "No changes.";
  },
  update(update, transaction) {
    if (!transaction.docChanged) return;
    console.log(transaction);
    if (!transaction.changes.inserted.length) return "deleted character.";

    let newUpdate = transaction.changes.inserted.slice(-1);
    return newUpdate[0].text.toString();
  },
  provide: (f) => showPanel.from(f, changeLogPanel),
});

const state = EditorState.create({
  doc: `
    // Try editing this content
    const hello = 'world';
  `,
  extensions: [
    changeLogStateField,
    // EditorView.updateListener.of((viewUpdate) => {
    //   if (!viewUpdate.docChanged) return;
    //   console.log(viewUpdate);
    //   if (!viewUpdate.changes.inserted.length) return console.log("deleted");
    //   let addedChar = viewUpdate.changes.inserted.slice(-1);
    //   console.log(`add: ${addedChar[0].text.toString()}`);
    // }),
  ],
});

const view = new EditorView({
  state: state,
  parent: document.body,
});
