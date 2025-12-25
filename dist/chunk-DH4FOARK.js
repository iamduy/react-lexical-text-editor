// src/context/SharedHistoryContext.tsx
import { createEmptyHistoryState } from "@lexical/react/LexicalHistoryPlugin";
import { createContext, useContext, useMemo } from "react";
import { jsx } from "react/jsx-runtime";
var Context = createContext({});
var SharedHistoryContext = ({ children }) => {
  const historyContext = useMemo(() => ({ historyState: createEmptyHistoryState() }), []);
  return /* @__PURE__ */ jsx(Context.Provider, { value: historyContext, children });
};
var useSharedHistoryContext = () => {
  return useContext(Context);
};

// src/ui/ContentEditable.tsx
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { jsx as jsx2 } from "react/jsx-runtime";
function LexicalContentEditable({
  className,
  placeholder,
  placeholderClassName,
  style
}) {
  return /* @__PURE__ */ jsx2(
    ContentEditable,
    {
      style,
      className: className ?? "ContentEditable__root",
      "aria-placeholder": placeholder,
      placeholder: /* @__PURE__ */ jsx2("div", { className: placeholderClassName ?? "ContentEditable__placeholder", children: placeholder })
    }
  );
}

// node_modules/@lexical/clipboard/LexicalClipboard.node.mjs
var mod = await (process.env.NODE_ENV !== "production" ? import("./LexicalClipboard.dev-WTUFMFY7.js") : import("./LexicalClipboard.prod-LWIGSZEH.js"));
var $generateJSONFromSelectedNodes = mod.$generateJSONFromSelectedNodes;
var $generateNodesFromSerializedNodes = mod.$generateNodesFromSerializedNodes;
var $getClipboardDataFromSelection = mod.$getClipboardDataFromSelection;
var $getHtmlContent = mod.$getHtmlContent;
var $getLexicalContent = mod.$getLexicalContent;
var $insertDataTransferForPlainText = mod.$insertDataTransferForPlainText;
var $insertDataTransferForRichText = mod.$insertDataTransferForRichText;
var $insertGeneratedNodes = mod.$insertGeneratedNodes;
var copyToClipboard = mod.copyToClipboard;
var setLexicalClipboardDataTransfer = mod.setLexicalClipboardDataTransfer;

// node_modules/@lexical/hashtag/LexicalHashtag.node.mjs
var mod2 = await (process.env.NODE_ENV !== "production" ? import("./LexicalHashtag.dev-2CFYVRV5.js") : import("./LexicalHashtag.prod-MQ4DH4CI.js"));
var $createHashtagNode = mod2.$createHashtagNode;
var $isHashtagNode = mod2.$isHashtagNode;
var HashtagExtension = mod2.HashtagExtension;
var HashtagNode = mod2.HashtagNode;
var registerLexicalHashtag = mod2.registerLexicalHashtag;

// src/nodes/ImageNode.tsx
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { LinkNode } from "@lexical/link";
import {
  $applyNodeReplacement as $applyNodeReplacement3,
  $createRangeSelection,
  $extendCaretToRange,
  $getChildCaret,
  $getEditor,
  $getRoot,
  $isElementNode,
  $isParagraphNode,
  $selectAll,
  $setSelection,
  createEditor,
  DecoratorNode,
  LineBreakNode,
  ParagraphNode,
  RootNode,
  SKIP_DOM_SELECTION_TAG,
  TextNode as TextNode3
} from "lexical";
import * as React from "react";

// src/nodes/EmojiNode.tsx
import { $applyNodeReplacement, TextNode } from "lexical";
var EmojiNode = class _EmojiNode extends TextNode {
  __className;
  static getType() {
    return "emoji";
  }
  static clone(node) {
    return new _EmojiNode(node.__className, node.__text, node.__key);
  }
  constructor(className, text, key) {
    super(text, key);
    this.__className = className;
  }
  createDOM(config) {
    const dom = document.createElement("span");
    const inner = super.createDOM(config);
    dom.className = this.__className;
    inner.className = "emoji-inner";
    dom.appendChild(inner);
    return dom;
  }
  updateDOM(prevNode, dom, config) {
    const inner = dom.firstChild;
    if (inner === null) {
      return true;
    }
    super.updateDOM(prevNode, inner, config);
    return false;
  }
  static importJSON(serializedNode) {
    return $createEmojiNode(serializedNode.className, serializedNode.text).updateFromJSON(
      serializedNode
    );
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      className: this.getClassName()
    };
  }
  getClassName() {
    const self = this.getLatest();
    return self.__className;
  }
};
function $createEmojiNode(className, emojiText) {
  const node = new EmojiNode(className, emojiText).setMode("token");
  return $applyNodeReplacement(node);
}

// src/nodes/KeywordNode.tsx
import { $applyNodeReplacement as $applyNodeReplacement2, TextNode as TextNode2 } from "lexical";
var KeywordNode = class _KeywordNode extends TextNode2 {
  static getType() {
    return "keyword";
  }
  static clone(node) {
    return new _KeywordNode(node.__text, node.__key);
  }
  static importJSON(serializedNode) {
    return $createKeywordNode().updateFromJSON(serializedNode);
  }
  createDOM(config) {
    const dom = super.createDOM(config);
    dom.style.cursor = "default";
    dom.className = "keyword";
    return dom;
  }
  canInsertTextBefore() {
    return false;
  }
  canInsertTextAfter() {
    return false;
  }
  isTextEntity() {
    return true;
  }
};
function $createKeywordNode(keyword = "") {
  return $applyNodeReplacement2(new KeywordNode(keyword));
}

// src/nodes/ImageNode.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var ImageComponent = React.lazy(() => import("./ImageComponent-6WTH5ITU.js"));
function isGoogleDocCheckboxImg(img) {
  return img.parentElement != null && img.parentElement.tagName === "LI" && img.previousSibling === null && img.getAttribute("aria-roledescription") === "checkbox";
}
function $convertImageElement(domNode) {
  const img = domNode;
  const src = img.getAttribute("src");
  if (!src || src.startsWith("file:///") || isGoogleDocCheckboxImg(img)) {
    return null;
  }
  const { alt: altText, width, height } = img;
  const node = $createImageNode({ altText, height, src, width });
  return { node };
}
function $isCaptionEditorEmpty() {
  for (const { origin } of $extendCaretToRange($getChildCaret($getRoot(), "next"))) {
    if (!$isElementNode(origin)) {
      return false;
    }
  }
  return true;
}
var ImageNode = class _ImageNode extends DecoratorNode {
  __src;
  __altText;
  __width;
  __height;
  __maxWidth;
  __showCaption;
  __caption;
  // Captions cannot yet be used within editor cells
  __captionsEnabled;
  static getType() {
    return "image";
  }
  static clone(node) {
    return new _ImageNode(
      node.__src,
      node.__altText,
      node.__maxWidth,
      node.__width,
      node.__height,
      node.__showCaption,
      node.__caption,
      node.__captionsEnabled,
      node.__key
    );
  }
  static importJSON(serializedNode) {
    const { altText, height, width, maxWidth, src, showCaption } = serializedNode;
    return $createImageNode({
      altText,
      height,
      maxWidth,
      showCaption,
      src,
      width
    }).updateFromJSON(serializedNode);
  }
  updateFromJSON(serializedNode) {
    const node = super.updateFromJSON(serializedNode);
    const { caption } = serializedNode;
    const nestedEditor = node.__caption;
    const editorState = nestedEditor.parseEditorState(caption.editorState);
    if (!editorState.isEmpty()) {
      nestedEditor.setEditorState(editorState);
    }
    return node;
  }
  exportDOM() {
    const imgElement = document.createElement("img");
    imgElement.setAttribute("src", this.__src);
    imgElement.setAttribute("alt", this.__altText);
    imgElement.setAttribute("width", this.__width.toString());
    imgElement.setAttribute("height", this.__height.toString());
    if (this.__showCaption && this.__caption) {
      const captionEditor = this.__caption;
      const captionHtml = captionEditor.read(() => {
        if ($isCaptionEditorEmpty()) {
          return null;
        }
        let selection = null;
        const firstChild = $getRoot().getFirstChild();
        if ($isParagraphNode(firstChild) && firstChild.getNextSibling() === null) {
          selection = $createRangeSelection();
          selection.anchor.set(firstChild.getKey(), 0, "element");
          selection.focus.set(firstChild.getKey(), firstChild.getChildrenSize(), "element");
        }
        return $generateHtmlFromNodes(captionEditor, selection);
      });
      if (captionHtml) {
        const figureElement = document.createElement("figure");
        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerHTML = captionHtml;
        figureElement.appendChild(imgElement);
        figureElement.appendChild(figcaptionElement);
        return { element: figureElement };
      }
    }
    return { element: imgElement };
  }
  static importDOM() {
    return {
      figcaption: () => ({
        conversion: () => ({ node: null }),
        priority: 0
      }),
      figure: () => ({
        conversion: (node) => {
          return {
            after: (childNodes) => {
              const imageNodes = childNodes.filter($isImageNode);
              const figcaption = node.querySelector("figcaption");
              if (figcaption) {
                for (const imgNode of imageNodes) {
                  imgNode.setShowCaption(true);
                  imgNode.__caption.update(
                    () => {
                      const editor = $getEditor();
                      $insertGeneratedNodes(
                        editor,
                        $generateNodesFromDOM(editor, figcaption),
                        $selectAll()
                      );
                      $setSelection(null);
                    },
                    { tag: SKIP_DOM_SELECTION_TAG }
                  );
                }
              }
              return imageNodes;
            },
            node: null
          };
        },
        priority: 0
      }),
      img: () => ({
        conversion: $convertImageElement,
        priority: 0
      })
    };
  }
  constructor(src, altText, maxWidth, width, height, showCaption, caption, captionsEnabled, key) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__maxWidth = maxWidth;
    this.__width = width || "inherit";
    this.__height = height || "inherit";
    this.__showCaption = showCaption || false;
    this.__caption = caption || createEditor({
      namespace: "Playground/ImageNodeCaption",
      nodes: [
        RootNode,
        TextNode3,
        LineBreakNode,
        ParagraphNode,
        LinkNode,
        EmojiNode,
        HashtagNode,
        KeywordNode
      ]
    });
    this.__captionsEnabled = captionsEnabled || captionsEnabled === void 0;
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      altText: this.getAltText(),
      caption: this.__caption.toJSON(),
      height: this.__height === "inherit" ? 0 : this.__height,
      maxWidth: this.__maxWidth,
      showCaption: this.__showCaption,
      src: this.getSrc(),
      width: this.__width === "inherit" ? 0 : this.__width
    };
  }
  setWidthAndHeight(width, height) {
    const writable = this.getWritable();
    writable.__width = width;
    writable.__height = height;
  }
  setShowCaption(showCaption) {
    const writable = this.getWritable();
    writable.__showCaption = showCaption;
  }
  // View
  createDOM(config) {
    const span = document.createElement("span");
    const theme = config.theme;
    const className = theme.image;
    if (className !== void 0) {
      span.className = className;
    }
    return span;
  }
  updateDOM() {
    return false;
  }
  getSrc() {
    return this.__src;
  }
  getAltText() {
    return this.__altText;
  }
  decorate() {
    return /* @__PURE__ */ jsx3(
      ImageComponent,
      {
        src: this.__src,
        altText: this.__altText,
        width: this.__width,
        height: this.__height,
        maxWidth: this.__maxWidth,
        nodeKey: this.getKey(),
        showCaption: this.__showCaption,
        caption: this.__caption,
        captionsEnabled: this.__captionsEnabled,
        resizable: true
      }
    );
  }
};
function $createImageNode({
  altText,
  height,
  maxWidth = 500,
  captionsEnabled,
  src,
  width,
  showCaption,
  caption,
  key
}) {
  return $applyNodeReplacement3(
    new ImageNode(src, altText, maxWidth, width, height, showCaption, caption, captionsEnabled, key)
  );
}
function $isImageNode(node) {
  return node instanceof ImageNode;
}

export {
  SharedHistoryContext,
  useSharedHistoryContext,
  KeywordNode,
  LexicalContentEditable,
  $isCaptionEditorEmpty,
  ImageNode,
  $createImageNode,
  $isImageNode
};
//# sourceMappingURL=chunk-DH4FOARK.js.map