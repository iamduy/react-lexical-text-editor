import "./chunk-5WRI5ZAA.js";

// node_modules/@lexical/overflow/LexicalOverflow.prod.mjs
import { defineExtension as e, ElementNode as t, $applyNodeReplacement as r } from "lexical";
var n = class extends t {
  $config() {
    return this.config("overflow", { $transform(e2) {
      e2.isEmpty() && e2.remove();
    }, extends: t });
  }
  createDOM(e2) {
    const t2 = document.createElement("span"), r2 = e2.theme.characterLimit;
    return "string" == typeof r2 && (t2.className = r2), t2;
  }
  updateDOM(e2, t2) {
    return false;
  }
  insertNewAfter(e2, t2 = true) {
    return this.getParentOrThrow().insertNewAfter(e2, t2);
  }
  excludeFromCopy() {
    return true;
  }
};
function o() {
  return r(new n());
}
function s(e2) {
  return e2 instanceof n;
}
var c = e({ name: "@lexical/overflow", nodes: () => [n] });
export {
  o as $createOverflowNode,
  s as $isOverflowNode,
  c as OverflowExtension,
  n as OverflowNode
};
//# sourceMappingURL=LexicalOverflow.prod-OUA7NRJS.js.map