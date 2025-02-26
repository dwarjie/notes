import "./style.css";
import {
  Decoration,
  EditorView,
  ViewPlugin,
  WidgetType,
} from "@codemirror/view";
import { EditorState, StateField } from "@codemirror/state";

/* This is a decoration widget method */

// class MidpointWidget extends WidgetType {
//   toDOM(view) {
//     const midpoint = Math.floor(view.state.doc.length / 2);

//     const dom = document.createElement("span");
//     dom.textContent = `${midpoint}`;
//     dom.className = "midpoint-widget";

//     return dom;
//   }
// }

// function getMidpointWidgetDecorationSet(midpoint) {
//   const widget = new MidpointWidget();

//   return Decoration.set([
//     Decoration.widget({
//       widget,
//     }).range(midpoint),
//   ]);
// }

// const midpointWidgetStateField = StateField.define({
//   create(state) {
//     const midpoint = Math.floor(state.doc.length / 2);

//     return getMidpointWidgetDecorationSet(midpoint);
//   },
//   update(currentDecorations, transaction) {
//     if (transaction.docChanged) {
//       const midpoint = Math.floor(transaction.newDoc.length / 2);

//       return getMidpointWidgetDecorationSet(midpoint);
//     }

//     return currentDecorations;
//   },
//   provide: (f) => EditorView.decorations.from(f),
// });

/* View Plugin Method */

const midpointViewPlugin = ViewPlugin.fromClass(
  class {
    #widget;

    constructor(view) {
      const div = document.createElement("div");
      this.#widget = view.dom.appendChild(div);
      this.#widget.classList.add("midpoint-widget");

      if (!view.hasFocus) {
        this.#widget.classList.add("hidden");
      }

      const midpoint = Math.floor(view.state.doc.length / 2);
      this.#widget.textContent = `${midpoint}`;
    }

    update(viewUpdate) {
      if (viewUpdate.docChanged) {
        this.#widget.textContent = Math.floor(viewUpdate.state.doc.length / 2);
      }

      if (!viewUpdate.focusChanged) {
        return;
      }

      if (viewUpdate.view.hasFocus) {
        this.#widget.classList.remove("hidden");
      } else {
        this.#widget.classList.add("hidden");
      }
    }

    destroy() {
      this.#widget.remove();
    }
  },
);

let state = EditorState.create({
  doc: `<p>hi</p>\n<p>hello</p>`,
  extensions: [midpointViewPlugin],
});

let view = new EditorView({
  state: state,
  parent: document.body,
});
