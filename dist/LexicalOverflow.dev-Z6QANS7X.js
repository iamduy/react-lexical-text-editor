import "./chunk-5WRI5ZAA.js";

// node_modules/@lexical/overflow/LexicalOverflow.dev.mjs
import { defineExtension, ElementNode, $applyNodeReplacement } from "lexical";
var OverflowNode = class extends ElementNode {
  /** @internal */
  $config() {
    return this.config("overflow", {
      $transform(node) {
        if (node.isEmpty()) {
          node.remove();
        }
      },
      extends: ElementNode
    });
  }
  createDOM(config) {
    const div = document.createElement("span");
    const className = config.theme.characterLimit;
    if (typeof className === "string") {
      div.className = className;
    }
    return div;
  }
  updateDOM(prevNode, dom) {
    return false;
  }
  insertNewAfter(selection, restoreSelection = true) {
    const parent = this.getParentOrThrow();
    return parent.insertNewAfter(selection, restoreSelection);
  }
  excludeFromCopy() {
    return true;
  }
};
function $createOverflowNode() {
  return $applyNodeReplacement(new OverflowNode());
}
function $isOverflowNode(node) {
  return node instanceof OverflowNode;
}
var OverflowExtension = defineExtension({
  name: "@lexical/overflow",
  nodes: () => [OverflowNode]
});
export {
  $createOverflowNode,
  $isOverflowNode,
  OverflowExtension,
  OverflowNode
};
//# sourceMappingURL=LexicalOverflow.dev-Z6QANS7X.js.map