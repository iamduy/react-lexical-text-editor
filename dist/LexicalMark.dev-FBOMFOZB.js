import "./chunk-5WRI5ZAA.js";

// node_modules/@lexical/mark/LexicalMark.dev.mjs
import { ElementNode, $isRangeSelection, $applyNodeReplacement, defineExtension, $createRangeSelection, $isElementNode, $isTextNode, $isDecoratorNode } from "lexical";
import { addClassNamesToElement, removeClassNamesFromElement } from "@lexical/utils";
var NO_IDS = [];
var MarkNode = class _MarkNode extends ElementNode {
  /** @internal */
  __ids;
  static getType() {
    return "mark";
  }
  static clone(node) {
    return new _MarkNode(node.__ids, node.__key);
  }
  static importDOM() {
    return null;
  }
  static importJSON(serializedNode) {
    return $createMarkNode().updateFromJSON(serializedNode);
  }
  updateFromJSON(serializedNode) {
    return super.updateFromJSON(serializedNode).setIDs(serializedNode.ids);
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      ids: this.getIDs()
    };
  }
  constructor(ids = NO_IDS, key) {
    super(key);
    this.__ids = ids;
  }
  createDOM(config) {
    const element = document.createElement("mark");
    addClassNamesToElement(element, config.theme.mark);
    if (this.__ids.length > 1) {
      addClassNamesToElement(element, config.theme.markOverlap);
    }
    return element;
  }
  updateDOM(prevNode, element, config) {
    const prevIDs = prevNode.__ids;
    const nextIDs = this.__ids;
    const prevIDsCount = prevIDs.length;
    const nextIDsCount = nextIDs.length;
    const overlapTheme = config.theme.markOverlap;
    if (prevIDsCount !== nextIDsCount) {
      if (prevIDsCount === 1) {
        if (nextIDsCount === 2) {
          addClassNamesToElement(element, overlapTheme);
        }
      } else if (nextIDsCount === 1) {
        removeClassNamesFromElement(element, overlapTheme);
      }
    }
    return false;
  }
  hasID(id) {
    return this.getIDs().includes(id);
  }
  getIDs() {
    return Array.from(this.getLatest().__ids);
  }
  setIDs(ids) {
    const self = this.getWritable();
    self.__ids = ids;
    return self;
  }
  addID(id) {
    const self = this.getWritable();
    return self.__ids.includes(id) ? self : self.setIDs([...self.__ids, id]);
  }
  deleteID(id) {
    const self = this.getWritable();
    const idx = self.__ids.indexOf(id);
    if (idx === -1) {
      return self;
    }
    const ids = Array.from(self.__ids);
    ids.splice(idx, 1);
    return self.setIDs(ids);
  }
  insertNewAfter(selection, restoreSelection = true) {
    const markNode = $createMarkNode(this.__ids);
    this.insertAfter(markNode, restoreSelection);
    return markNode;
  }
  canInsertTextBefore() {
    return false;
  }
  canInsertTextAfter() {
    return false;
  }
  canBeEmpty() {
    return false;
  }
  isInline() {
    return true;
  }
  extractWithChild(child, selection, destination) {
    if (!$isRangeSelection(selection) || destination === "html") {
      return false;
    }
    const anchor = selection.anchor;
    const focus = selection.focus;
    const anchorNode = anchor.getNode();
    const focusNode = focus.getNode();
    const isBackward = selection.isBackward();
    const selectionLength = isBackward ? anchor.offset - focus.offset : focus.offset - anchor.offset;
    return this.isParentOf(anchorNode) && this.isParentOf(focusNode) && this.getTextContent().length === selectionLength;
  }
  excludeFromCopy(destination) {
    return destination !== "clone";
  }
};
function $createMarkNode(ids = NO_IDS) {
  return $applyNodeReplacement(new MarkNode(ids));
}
function $isMarkNode(node) {
  return node instanceof MarkNode;
}
function $unwrapMarkNode(node) {
  const children = node.getChildren();
  let target = null;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (target === null) {
      node.insertBefore(child);
    } else {
      target.insertAfter(child);
    }
    target = child;
  }
  node.remove();
}
function $wrapSelectionInMarkNode(selection, isBackward, id, createNode) {
  const forwardSelection = $createRangeSelection();
  const [startPoint, endPoint] = selection.isBackward() ? [selection.focus, selection.anchor] : [selection.anchor, selection.focus];
  forwardSelection.anchor.set(startPoint.key, startPoint.offset, startPoint.type);
  forwardSelection.focus.set(endPoint.key, endPoint.offset, endPoint.type);
  let currentNodeParent;
  let lastCreatedMarkNode;
  const nodes = forwardSelection.extract();
  for (const node of nodes) {
    if ($isElementNode(lastCreatedMarkNode) && lastCreatedMarkNode.isParentOf(node)) {
      continue;
    }
    let targetNode = null;
    if ($isTextNode(node)) {
      targetNode = node;
    } else if ($isMarkNode(node)) {
      continue;
    } else if (($isElementNode(node) || $isDecoratorNode(node)) && node.isInline()) {
      targetNode = node;
    }
    if (targetNode !== null) {
      if (targetNode && targetNode.is(currentNodeParent)) {
        continue;
      }
      const parentNode = targetNode.getParent();
      if (parentNode == null || !parentNode.is(currentNodeParent)) {
        lastCreatedMarkNode = void 0;
      }
      currentNodeParent = parentNode;
      if (lastCreatedMarkNode === void 0) {
        const createMarkNode = createNode || $createMarkNode;
        lastCreatedMarkNode = createMarkNode([id]);
        targetNode.insertBefore(lastCreatedMarkNode);
      }
      lastCreatedMarkNode.append(targetNode);
    } else {
      currentNodeParent = void 0;
      lastCreatedMarkNode = void 0;
    }
  }
  if ($isElementNode(lastCreatedMarkNode)) {
    if (isBackward) {
      lastCreatedMarkNode.selectStart();
    } else {
      lastCreatedMarkNode.selectEnd();
    }
  }
}
function $getMarkIDs(node, offset) {
  let currentNode = node;
  while (currentNode !== null) {
    if ($isMarkNode(currentNode)) {
      return currentNode.getIDs();
    } else if ($isTextNode(currentNode) && offset === currentNode.getTextContentSize()) {
      const nextSibling = currentNode.getNextSibling();
      if ($isMarkNode(nextSibling)) {
        return nextSibling.getIDs();
      }
    }
    currentNode = currentNode.getParent();
  }
  return null;
}
var MarkExtension = defineExtension({
  name: "@lexical/mark",
  nodes: () => [MarkNode]
});
export {
  $createMarkNode,
  $getMarkIDs,
  $isMarkNode,
  $unwrapMarkNode,
  $wrapSelectionInMarkNode,
  MarkExtension,
  MarkNode
};
//# sourceMappingURL=LexicalMark.dev-FBOMFOZB.js.map