import "./style.css";
import { Decoration, EditorView, WidgetType } from "@codemirror/view";
import { EditorState, StateField } from "@codemirror/state";

class MidpointWidget extends WidgetType {
  toDOM(view) {
    const midpoint = Math.floor(view.state.doc.length / 2);

    const dom = document.createElement("span");
    dom.textContent = `${midpoint}`;
    dom.className = "midpoint-widget";

    return dom;
  }
}

function getMidpointWidgetDecorationSet(midpoint) {
  const widget = new MidpointWidget();

  return Decoration.set([
    Decoration.widget({
      widget,
    }).range(midpoint),
  ]);
}

const midpointWidgetStateField = StateField.define({
  create(state) {
    const midpoint = Math.floor(state.doc.length / 2);

    return getMidpointWidgetDecorationSet(midpoint);
  },
  update(currentDecorations, transaction) {
    if (transaction.docChanged) {
      const midpoint = Math.floor(transaction.newDoc.length / 2);

      return getMidpointWidgetDecorationSet(midpoint);
    }

    return currentDecorations;
  },
  provide: (f) => EditorView.decorations.from(f),
});

let state = EditorState.create({
  doc: `<p>hi</p>\n<p>hello</p>`,
  extensions: [midpointWidgetStateField],
});

let view = new EditorView({
  state: state,
  parent: document.body,
});
