import "./style.css";
import { EditorView } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { xml, autoCloseTags } from "@codemirror/lang-xml";
import { python, pythonLanguage } from "@codemirror/lang-python";
import { Compartment, EditorState } from "@codemirror/state";
import { language } from "@codemirror/language";

let languageConf = new Compartment();
let xmlElements = [
  {
    name: "odoo",
    top: true,
    completion: { type: "keyword", label: "odoo" },
  },
  {
    name: "field",
    top: true,
    completion: { type: "keyword" },
    attributes: ["position"],
  },
];

let xmlAttrs = [
  {
    name: "position",
    values: ["before", "after", "attributes", "replace"],
    completion: { type: "constant" },
  },
];

let view = new EditorView({
  parent: document.body,
  extensions: [
    basicSetup,
    languageConf.of(
      xml({
        elements: xmlElements,
        attributes: xmlAttrs,
      }),
    ),
    autoCloseTags,
  ],
});

// const detectLanguageMode = () => {
//   let languageMode = document.getElementById("app").dataset.mode;
//   let language = null;
//   switch (languageMode) {
//     case "qweb":
//     case "xml":
//       language = xml;
//       break;
//     default:
//       language = python;
//   }

//   return view.dispatch({ effects: languageConf.reconfigure(language()) });
// };
// detectLanguageMode();
// console.log(view.state.facet(language));
