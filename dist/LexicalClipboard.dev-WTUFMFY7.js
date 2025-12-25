import "./chunk-5WRI5ZAA.js";

// node_modules/@lexical/clipboard/LexicalClipboard.dev.mjs
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { $addNodeStyle, $sliceSelectedTextNodeContent } from "@lexical/selection";
import { objectKlassEquals } from "@lexical/utils";
import { $getSelection, $isRangeSelection, $createTabNode, SELECTION_INSERT_CLIPBOARD_NODES_COMMAND, $caretFromPoint, $isTextPointCaret, $getCaretRange, $getChildCaret, $getRoot, $isTextNode, $isElementNode, $parseSerializedNode, getDOMSelection, COPY_COMMAND, COMMAND_PRIORITY_CRITICAL, isSelectionWithinEditor, $getEditor } from "lexical";
function formatDevErrorMessage(message) {
  throw new Error(message);
}
function $getHtmlContent(editor, selection = $getSelection()) {
  if (selection == null) {
    {
      formatDevErrorMessage(`Expected valid LexicalSelection`);
    }
  }
  if ($isRangeSelection(selection) && selection.isCollapsed() || selection.getNodes().length === 0) {
    return "";
  }
  return $generateHtmlFromNodes(editor, selection);
}
function $getLexicalContent(editor, selection = $getSelection()) {
  if (selection == null) {
    {
      formatDevErrorMessage(`Expected valid LexicalSelection`);
    }
  }
  if ($isRangeSelection(selection) && selection.isCollapsed() || selection.getNodes().length === 0) {
    return null;
  }
  return JSON.stringify($generateJSONFromSelectedNodes(editor, selection));
}
function $insertDataTransferForPlainText(dataTransfer, selection) {
  const text = dataTransfer.getData("text/plain") || dataTransfer.getData("text/uri-list");
  if (text != null) {
    selection.insertRawText(text);
  }
}
function $insertDataTransferForRichText(dataTransfer, selection, editor) {
  const lexicalString = dataTransfer.getData("application/x-lexical-editor");
  if (lexicalString) {
    try {
      const payload = JSON.parse(lexicalString);
      if (payload.namespace === editor._config.namespace && Array.isArray(payload.nodes)) {
        const nodes = $generateNodesFromSerializedNodes(payload.nodes);
        return $insertGeneratedNodes(editor, nodes, selection);
      }
    } catch (error) {
      console.error(error);
    }
  }
  const htmlString = dataTransfer.getData("text/html");
  const plainString = dataTransfer.getData("text/plain");
  if (htmlString && plainString !== htmlString) {
    try {
      const parser = new DOMParser();
      const dom = parser.parseFromString(trustHTML(htmlString), "text/html");
      const nodes = $generateNodesFromDOM(editor, dom);
      return $insertGeneratedNodes(editor, nodes, selection);
    } catch (error) {
      console.error(error);
    }
  }
  const text = plainString || dataTransfer.getData("text/uri-list");
  if (text != null) {
    if ($isRangeSelection(selection)) {
      const parts = text.split(/(\r?\n|\t)/);
      if (parts[parts.length - 1] === "") {
        parts.pop();
      }
      for (let i = 0; i < parts.length; i++) {
        const currentSelection = $getSelection();
        if ($isRangeSelection(currentSelection)) {
          const part = parts[i];
          if (part === "\n" || part === "\r\n") {
            currentSelection.insertParagraph();
          } else if (part === "	") {
            currentSelection.insertNodes([$createTabNode()]);
          } else {
            currentSelection.insertText(part);
          }
        }
      }
    } else {
      selection.insertRawText(text);
    }
  }
}
function trustHTML(html) {
  if (window.trustedTypes && window.trustedTypes.createPolicy) {
    const policy = window.trustedTypes.createPolicy("lexical", {
      createHTML: (input) => input
    });
    return policy.createHTML(html);
  }
  return html;
}
function $insertGeneratedNodes(editor, nodes, selection) {
  if (!editor.dispatchCommand(SELECTION_INSERT_CLIPBOARD_NODES_COMMAND, {
    nodes,
    selection
  })) {
    selection.insertNodes(nodes);
    $updateSelectionOnInsert(selection);
  }
  return;
}
function $updateSelectionOnInsert(selection) {
  if ($isRangeSelection(selection) && selection.isCollapsed()) {
    const anchor = selection.anchor;
    let nodeToInspect = null;
    const anchorCaret = $caretFromPoint(anchor, "previous");
    if (anchorCaret) {
      if ($isTextPointCaret(anchorCaret)) {
        nodeToInspect = anchorCaret.origin;
      } else {
        const range = $getCaretRange(anchorCaret, $getChildCaret($getRoot(), "next").getFlipped());
        for (const caret of range) {
          if ($isTextNode(caret.origin)) {
            nodeToInspect = caret.origin;
            break;
          } else if ($isElementNode(caret.origin) && !caret.origin.isInline()) {
            break;
          }
        }
      }
    }
    if (nodeToInspect && $isTextNode(nodeToInspect)) {
      const newFormat = nodeToInspect.getFormat();
      const newStyle = nodeToInspect.getStyle();
      if (selection.format !== newFormat || selection.style !== newStyle) {
        selection.format = newFormat;
        selection.style = newStyle;
        selection.dirty = true;
      }
    }
  }
}
function exportNodeToJSON(node) {
  const serializedNode = node.exportJSON();
  const nodeClass = node.constructor;
  if (serializedNode.type !== nodeClass.getType()) {
    {
      formatDevErrorMessage(`LexicalNode: Node ${nodeClass.name} does not implement .exportJSON().`);
    }
  }
  if ($isElementNode(node)) {
    const serializedChildren = serializedNode.children;
    if (!Array.isArray(serializedChildren)) {
      {
        formatDevErrorMessage(`LexicalNode: Node ${nodeClass.name} is an element but .exportJSON() does not have a children array.`);
      }
    }
  }
  return serializedNode;
}
function $appendNodesToJSON(editor, selection, currentNode, targetArray = []) {
  let shouldInclude = selection !== null ? currentNode.isSelected(selection) : true;
  const shouldExclude = $isElementNode(currentNode) && currentNode.excludeFromCopy("html");
  let target = currentNode;
  if (selection !== null && $isTextNode(target)) {
    target = $sliceSelectedTextNodeContent(selection, target, "clone");
  }
  const children = $isElementNode(target) ? target.getChildren() : [];
  const serializedNode = exportNodeToJSON(target);
  if ($isTextNode(target) && target.getTextContentSize() === 0) {
    shouldInclude = false;
  }
  for (let i = 0; i < children.length; i++) {
    const childNode = children[i];
    const shouldIncludeChild = $appendNodesToJSON(editor, selection, childNode, serializedNode.children);
    if (!shouldInclude && $isElementNode(currentNode) && shouldIncludeChild && currentNode.extractWithChild(childNode, selection, "clone")) {
      shouldInclude = true;
    }
  }
  if (shouldInclude && !shouldExclude) {
    targetArray.push(serializedNode);
  } else if (Array.isArray(serializedNode.children)) {
    for (let i = 0; i < serializedNode.children.length; i++) {
      const serializedChildNode = serializedNode.children[i];
      targetArray.push(serializedChildNode);
    }
  }
  return shouldInclude;
}
function $generateJSONFromSelectedNodes(editor, selection) {
  const nodes = [];
  const root = $getRoot();
  const topLevelChildren = root.getChildren();
  for (let i = 0; i < topLevelChildren.length; i++) {
    const topLevelNode = topLevelChildren[i];
    $appendNodesToJSON(editor, selection, topLevelNode, nodes);
  }
  return {
    namespace: editor._config.namespace,
    nodes
  };
}
function $generateNodesFromSerializedNodes(serializedNodes) {
  const nodes = [];
  for (let i = 0; i < serializedNodes.length; i++) {
    const serializedNode = serializedNodes[i];
    const node = $parseSerializedNode(serializedNode);
    if ($isTextNode(node)) {
      $addNodeStyle(node);
    }
    nodes.push(node);
  }
  return nodes;
}
var EVENT_LATENCY = 50;
var clipboardEventTimeout = null;
async function copyToClipboard(editor, event, data) {
  if (clipboardEventTimeout !== null) {
    return false;
  }
  if (event !== null) {
    return new Promise((resolve, reject) => {
      editor.update(() => {
        resolve($copyToClipboardEvent(editor, event, data));
      });
    });
  }
  const rootElement = editor.getRootElement();
  const editorWindow = editor._window || window;
  const windowDocument = editorWindow.document;
  const domSelection = getDOMSelection(editorWindow);
  if (rootElement === null || domSelection === null) {
    return false;
  }
  const element = windowDocument.createElement("span");
  element.style.cssText = "position: fixed; top: -1000px;";
  element.append(windowDocument.createTextNode("#"));
  rootElement.append(element);
  const range = new Range();
  range.setStart(element, 0);
  range.setEnd(element, 1);
  domSelection.removeAllRanges();
  domSelection.addRange(range);
  return new Promise((resolve, reject) => {
    const removeListener = editor.registerCommand(COPY_COMMAND, (secondEvent) => {
      if (objectKlassEquals(secondEvent, ClipboardEvent)) {
        removeListener();
        if (clipboardEventTimeout !== null) {
          editorWindow.clearTimeout(clipboardEventTimeout);
          clipboardEventTimeout = null;
        }
        resolve($copyToClipboardEvent(editor, secondEvent, data));
      }
      return true;
    }, COMMAND_PRIORITY_CRITICAL);
    clipboardEventTimeout = editorWindow.setTimeout(() => {
      removeListener();
      clipboardEventTimeout = null;
      resolve(false);
    }, EVENT_LATENCY);
    windowDocument.execCommand("copy");
    element.remove();
  });
}
function $copyToClipboardEvent(editor, event, data) {
  if (data === void 0) {
    const domSelection = getDOMSelection(editor._window);
    const selection = $getSelection();
    if (!selection || selection.isCollapsed()) {
      return false;
    }
    if (!domSelection) {
      return false;
    }
    const anchorDOM = domSelection.anchorNode;
    const focusDOM = domSelection.focusNode;
    if (anchorDOM !== null && focusDOM !== null && !isSelectionWithinEditor(editor, anchorDOM, focusDOM)) {
      return false;
    }
    data = $getClipboardDataFromSelection(selection);
  }
  event.preventDefault();
  const clipboardData = event.clipboardData;
  if (clipboardData === null) {
    return false;
  }
  setLexicalClipboardDataTransfer(clipboardData, data);
  return true;
}
var clipboardDataFunctions = [["text/html", $getHtmlContent], ["application/x-lexical-editor", $getLexicalContent]];
function $getClipboardDataFromSelection(selection = $getSelection()) {
  const clipboardData = {
    "text/plain": selection ? selection.getTextContent() : ""
  };
  if (selection) {
    const editor = $getEditor();
    for (const [mimeType, $editorFn] of clipboardDataFunctions) {
      const v = $editorFn(editor, selection);
      if (v !== null) {
        clipboardData[mimeType] = v;
      }
    }
  }
  return clipboardData;
}
function setLexicalClipboardDataTransfer(clipboardData, data) {
  for (const [k] of clipboardDataFunctions) {
    if (data[k] === void 0) {
      clipboardData.setData(k, "");
    }
  }
  for (const k in data) {
    const v = data[k];
    if (v !== void 0) {
      clipboardData.setData(k, v);
    }
  }
}
export {
  $generateJSONFromSelectedNodes,
  $generateNodesFromSerializedNodes,
  $getClipboardDataFromSelection,
  $getHtmlContent,
  $getLexicalContent,
  $insertDataTransferForPlainText,
  $insertDataTransferForRichText,
  $insertGeneratedNodes,
  copyToClipboard,
  setLexicalClipboardDataTransfer
};
//# sourceMappingURL=LexicalClipboard.dev-WTUFMFY7.js.map