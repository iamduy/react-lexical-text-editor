import {
  require_prism
} from "./chunk-DGONUQ7F.js";
import {
  __toESM
} from "./chunk-5WRI5ZAA.js";

// node_modules/@lexical/code/LexicalCode.dev.mjs
var import_prismjs = __toESM(require_prism(), 1);
import { isHTMLElement, addClassNamesToElement, removeClassNamesFromElement, $getAdjacentCaret, mergeRegister } from "@lexical/utils";
import { ElementNode, $createParagraphNode, $isTextNode, $isTabNode, $createTabNode, $createLineBreakNode, $create, TextNode, $applyNodeReplacement, $getSiblingCaret, getTextDirection, $isElementNode, $isLineBreakNode, defineExtension, $createTextNode, $getNodeByKey, $getSelection, $isRangeSelection, $createPoint, INDENT_CONTENT_COMMAND, OUTDENT_CONTENT_COMMAND, INSERT_TAB_COMMAND, $setSelectionFromCaretRange, $getCaretRangeInDirection, $getCaretRange, $getTextPointCaret, $normalizeCaret, KEY_ARROW_UP_COMMAND, MOVE_TO_START, KEY_TAB_COMMAND, COMMAND_PRIORITY_LOW, $insertNodes, KEY_ARROW_DOWN_COMMAND, MOVE_TO_END } from "lexical";
function formatDevErrorMessage(message) {
  throw new Error(message);
}
var DEFAULT_CODE_LANGUAGE = "javascript";
var getDefaultCodeLanguage = () => DEFAULT_CODE_LANGUAGE;
function hasChildDOMNodeTag(node, tagName) {
  for (const child of node.childNodes) {
    if (isHTMLElement(child) && child.tagName === tagName) {
      return true;
    }
    hasChildDOMNodeTag(child, tagName);
  }
  return false;
}
var LANGUAGE_DATA_ATTRIBUTE = "data-language";
var HIGHLIGHT_LANGUAGE_DATA_ATTRIBUTE = "data-highlight-language";
var THEME_DATA_ATTRIBUTE = "data-theme";
var CodeNode = class _CodeNode extends ElementNode {
  /** @internal */
  __language;
  /** @internal */
  __theme;
  /** @internal */
  __isSyntaxHighlightSupported;
  static getType() {
    return "code";
  }
  static clone(node) {
    return new _CodeNode(node.__language, node.__key);
  }
  constructor(language, key) {
    super(key);
    this.__language = language || void 0;
    this.__isSyntaxHighlightSupported = false;
    this.__theme = void 0;
  }
  afterCloneFrom(prevNode) {
    super.afterCloneFrom(prevNode);
    this.__language = prevNode.__language;
    this.__theme = prevNode.__theme;
    this.__isSyntaxHighlightSupported = prevNode.__isSyntaxHighlightSupported;
  }
  // View
  createDOM(config) {
    const element = document.createElement("code");
    addClassNamesToElement(element, config.theme.code);
    element.setAttribute("spellcheck", "false");
    const language = this.getLanguage();
    if (language) {
      element.setAttribute(LANGUAGE_DATA_ATTRIBUTE, language);
      if (this.getIsSyntaxHighlightSupported()) {
        element.setAttribute(HIGHLIGHT_LANGUAGE_DATA_ATTRIBUTE, language);
      }
    }
    const theme = this.getTheme();
    if (theme) {
      element.setAttribute(THEME_DATA_ATTRIBUTE, theme);
    }
    const style = this.getStyle();
    if (style) {
      element.setAttribute("style", style);
    }
    return element;
  }
  updateDOM(prevNode, dom, config) {
    const language = this.__language;
    const prevLanguage = prevNode.__language;
    if (language) {
      if (language !== prevLanguage) {
        dom.setAttribute(LANGUAGE_DATA_ATTRIBUTE, language);
      }
    } else if (prevLanguage) {
      dom.removeAttribute(LANGUAGE_DATA_ATTRIBUTE);
    }
    const isSyntaxHighlightSupported = this.__isSyntaxHighlightSupported;
    const prevIsSyntaxHighlightSupported = prevNode.__isSyntaxHighlightSupported;
    if (prevIsSyntaxHighlightSupported && prevLanguage) {
      if (isSyntaxHighlightSupported && language) {
        if (language !== prevLanguage) {
          dom.setAttribute(HIGHLIGHT_LANGUAGE_DATA_ATTRIBUTE, language);
        }
      } else {
        dom.removeAttribute(HIGHLIGHT_LANGUAGE_DATA_ATTRIBUTE);
      }
    } else if (isSyntaxHighlightSupported && language) {
      dom.setAttribute(HIGHLIGHT_LANGUAGE_DATA_ATTRIBUTE, language);
    }
    const theme = this.__theme;
    const prevTheme = prevNode.__theme;
    if (theme) {
      if (theme !== prevTheme) {
        dom.setAttribute(THEME_DATA_ATTRIBUTE, theme);
      }
    } else if (prevTheme) {
      dom.removeAttribute(THEME_DATA_ATTRIBUTE);
    }
    const style = this.__style;
    const prevStyle = prevNode.__style;
    if (style) {
      if (style !== prevStyle) {
        dom.setAttribute("style", style);
      }
    } else if (prevStyle) {
      dom.removeAttribute("style");
    }
    return false;
  }
  exportDOM(editor) {
    const element = document.createElement("pre");
    addClassNamesToElement(element, editor._config.theme.code);
    element.setAttribute("spellcheck", "false");
    const language = this.getLanguage();
    if (language) {
      element.setAttribute(LANGUAGE_DATA_ATTRIBUTE, language);
      if (this.getIsSyntaxHighlightSupported()) {
        element.setAttribute(HIGHLIGHT_LANGUAGE_DATA_ATTRIBUTE, language);
      }
    }
    const theme = this.getTheme();
    if (theme) {
      element.setAttribute(THEME_DATA_ATTRIBUTE, theme);
    }
    const style = this.getStyle();
    if (style) {
      element.setAttribute("style", style);
    }
    return {
      element
    };
  }
  static importDOM() {
    return {
      // Typically <pre> is used for code blocks, and <code> for inline code styles
      // but if it's a multi line <code> we'll create a block. Pass through to
      // inline format handled by TextNode otherwise.
      code: (node) => {
        const isMultiLine = node.textContent != null && (/\r?\n/.test(node.textContent) || hasChildDOMNodeTag(node, "BR"));
        return isMultiLine ? {
          conversion: $convertPreElement,
          priority: 1
        } : null;
      },
      div: () => ({
        conversion: $convertDivElement,
        priority: 1
      }),
      pre: () => ({
        conversion: $convertPreElement,
        priority: 0
      }),
      table: (node) => {
        const table = node;
        if (isGitHubCodeTable(table)) {
          return {
            conversion: $convertTableElement,
            priority: 3
          };
        }
        return null;
      },
      td: (node) => {
        const td = node;
        const table = td.closest("table");
        if (isGitHubCodeCell(td) || table && isGitHubCodeTable(table)) {
          return {
            conversion: convertCodeNoop,
            priority: 3
          };
        }
        return null;
      },
      tr: (node) => {
        const tr = node;
        const table = tr.closest("table");
        if (table && isGitHubCodeTable(table)) {
          return {
            conversion: convertCodeNoop,
            priority: 3
          };
        }
        return null;
      }
    };
  }
  static importJSON(serializedNode) {
    return $createCodeNode().updateFromJSON(serializedNode);
  }
  updateFromJSON(serializedNode) {
    return super.updateFromJSON(serializedNode).setLanguage(serializedNode.language).setTheme(serializedNode.theme);
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      language: this.getLanguage(),
      theme: this.getTheme()
    };
  }
  // Mutation
  insertNewAfter(selection, restoreSelection = true) {
    const children = this.getChildren();
    const childrenLength = children.length;
    if (childrenLength >= 2 && children[childrenLength - 1].getTextContent() === "\n" && children[childrenLength - 2].getTextContent() === "\n" && selection.isCollapsed() && selection.anchor.key === this.__key && selection.anchor.offset === childrenLength) {
      children[childrenLength - 1].remove();
      children[childrenLength - 2].remove();
      const newElement = $createParagraphNode();
      this.insertAfter(newElement, restoreSelection);
      return newElement;
    }
    const {
      anchor,
      focus
    } = selection;
    const firstPoint = anchor.isBefore(focus) ? anchor : focus;
    const firstSelectionNode = firstPoint.getNode();
    if ($isTextNode(firstSelectionNode)) {
      let node = $getFirstCodeNodeOfLine(firstSelectionNode);
      const insertNodes = [];
      while (true) {
        if ($isTabNode(node)) {
          insertNodes.push($createTabNode());
          node = node.getNextSibling();
        } else if ($isCodeHighlightNode(node)) {
          let spaces = 0;
          const text = node.getTextContent();
          const textSize = node.getTextContentSize();
          while (spaces < textSize && text[spaces] === " ") {
            spaces++;
          }
          if (spaces !== 0) {
            insertNodes.push($createCodeHighlightNode(" ".repeat(spaces)));
          }
          if (spaces !== textSize) {
            break;
          }
          node = node.getNextSibling();
        } else {
          break;
        }
      }
      const split = firstSelectionNode.splitText(anchor.offset)[0];
      const x = anchor.offset === 0 ? 0 : 1;
      const index = split.getIndexWithinParent() + x;
      const codeNode = firstSelectionNode.getParentOrThrow();
      const nodesToInsert = [$createLineBreakNode(), ...insertNodes];
      codeNode.splice(index, 0, nodesToInsert);
      const last = insertNodes[insertNodes.length - 1];
      if (last) {
        last.select();
      } else if (anchor.offset === 0) {
        split.selectPrevious();
      } else {
        split.getNextSibling().selectNext(0, 0);
      }
    }
    if ($isCodeNode(firstSelectionNode)) {
      const {
        offset
      } = selection.anchor;
      firstSelectionNode.splice(offset, 0, [$createLineBreakNode()]);
      firstSelectionNode.select(offset + 1, offset + 1);
    }
    return null;
  }
  canIndent() {
    return false;
  }
  collapseAtStart() {
    const paragraph = $createParagraphNode();
    const children = this.getChildren();
    children.forEach((child) => paragraph.append(child));
    this.replace(paragraph);
    return true;
  }
  setLanguage(language) {
    const writable = this.getWritable();
    writable.__language = language || void 0;
    return writable;
  }
  getLanguage() {
    return this.getLatest().__language;
  }
  setIsSyntaxHighlightSupported(isSupported) {
    const writable = this.getWritable();
    writable.__isSyntaxHighlightSupported = isSupported;
    return writable;
  }
  getIsSyntaxHighlightSupported() {
    return this.getLatest().__isSyntaxHighlightSupported;
  }
  setTheme(theme) {
    const writable = this.getWritable();
    writable.__theme = theme || void 0;
    return writable;
  }
  getTheme() {
    return this.getLatest().__theme;
  }
};
function $createCodeNode(language, theme) {
  return $create(CodeNode).setLanguage(language).setTheme(theme);
}
function $isCodeNode(node) {
  return node instanceof CodeNode;
}
function $convertPreElement(domNode) {
  const language = domNode.getAttribute(LANGUAGE_DATA_ATTRIBUTE);
  return {
    node: $createCodeNode(language)
  };
}
function $convertDivElement(domNode) {
  const div = domNode;
  const isCode = isCodeElement(div);
  if (!isCode && !isCodeChildElement(div)) {
    return {
      node: null
    };
  }
  return {
    node: isCode ? $createCodeNode() : null
  };
}
function $convertTableElement() {
  return {
    node: $createCodeNode()
  };
}
function convertCodeNoop() {
  return {
    node: null
  };
}
function isCodeElement(div) {
  return div.style.fontFamily.match("monospace") !== null;
}
function isCodeChildElement(node) {
  let parent = node.parentElement;
  while (parent !== null) {
    if (isCodeElement(parent)) {
      return true;
    }
    parent = parent.parentElement;
  }
  return false;
}
function isGitHubCodeCell(cell) {
  return cell.classList.contains("js-file-line");
}
function isGitHubCodeTable(table) {
  return table.classList.contains("js-file-line-container");
}
var CodeHighlightNode = class _CodeHighlightNode extends TextNode {
  /** @internal */
  __highlightType;
  constructor(text = "", highlightType, key) {
    super(text, key);
    this.__highlightType = highlightType;
  }
  static getType() {
    return "code-highlight";
  }
  static clone(node) {
    return new _CodeHighlightNode(node.__text, node.__highlightType || void 0, node.__key);
  }
  getHighlightType() {
    const self = this.getLatest();
    return self.__highlightType;
  }
  setHighlightType(highlightType) {
    const self = this.getWritable();
    self.__highlightType = highlightType || void 0;
    return self;
  }
  canHaveFormat() {
    return false;
  }
  createDOM(config) {
    const element = super.createDOM(config);
    const className = getHighlightThemeClass(config.theme, this.__highlightType);
    addClassNamesToElement(element, className);
    return element;
  }
  updateDOM(prevNode, dom, config) {
    const update = super.updateDOM(prevNode, dom, config);
    const prevClassName = getHighlightThemeClass(config.theme, prevNode.__highlightType);
    const nextClassName = getHighlightThemeClass(config.theme, this.__highlightType);
    if (prevClassName !== nextClassName) {
      if (prevClassName) {
        removeClassNamesFromElement(dom, prevClassName);
      }
      if (nextClassName) {
        addClassNamesToElement(dom, nextClassName);
      }
    }
    return update;
  }
  static importJSON(serializedNode) {
    return $createCodeHighlightNode().updateFromJSON(serializedNode);
  }
  updateFromJSON(serializedNode) {
    return super.updateFromJSON(serializedNode).setHighlightType(serializedNode.highlightType);
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      highlightType: this.getHighlightType()
    };
  }
  // Prevent formatting (bold, underline, etc)
  setFormat(format) {
    return this;
  }
  isParentRequired() {
    return true;
  }
  createParentElementNode() {
    return $createCodeNode();
  }
};
function getHighlightThemeClass(theme, highlightType) {
  return highlightType && theme && theme.codeHighlight && theme.codeHighlight[highlightType];
}
function $createCodeHighlightNode(text = "", highlightType) {
  return $applyNodeReplacement(new CodeHighlightNode(text, highlightType));
}
function $isCodeHighlightNode(node) {
  return node instanceof CodeHighlightNode;
}
function $getLastMatchingCodeNode(anchor, direction) {
  let matchingNode = anchor;
  for (let caret = $getSiblingCaret(anchor, direction); caret && ($isCodeHighlightNode(caret.origin) || $isTabNode(caret.origin)); caret = $getAdjacentCaret(caret)) {
    matchingNode = caret.origin;
  }
  return matchingNode;
}
function $getFirstCodeNodeOfLine(anchor) {
  return $getLastMatchingCodeNode(anchor, "previous");
}
function $getLastCodeNodeOfLine(anchor) {
  return $getLastMatchingCodeNode(anchor, "next");
}
function $getCodeLineDirection(anchor) {
  const start = $getFirstCodeNodeOfLine(anchor);
  const end = $getLastCodeNodeOfLine(anchor);
  let node = start;
  while (node !== null) {
    if ($isCodeHighlightNode(node)) {
      const direction = getTextDirection(node.getTextContent());
      if (direction !== null) {
        return direction;
      }
    }
    if (node === end) {
      break;
    }
    node = node.getNextSibling();
  }
  const parent = start.getParent();
  if ($isElementNode(parent)) {
    const parentDirection = parent.getDirection();
    if (parentDirection === "ltr" || parentDirection === "rtl") {
      return parentDirection;
    }
  }
  return null;
}
function $getStartOfCodeInLine(anchor, offset) {
  let last = null;
  let lastNonBlank = null;
  let node = anchor;
  let nodeOffset = offset;
  let nodeTextContent = anchor.getTextContent();
  while (true) {
    if (nodeOffset === 0) {
      node = node.getPreviousSibling();
      if (node === null) {
        break;
      }
      if (!($isCodeHighlightNode(node) || $isTabNode(node) || $isLineBreakNode(node))) {
        formatDevErrorMessage(`Expected a valid Code Node: CodeHighlightNode, TabNode, LineBreakNode`);
      }
      if ($isLineBreakNode(node)) {
        last = {
          node,
          offset: 1
        };
        break;
      }
      nodeOffset = Math.max(0, node.getTextContentSize() - 1);
      nodeTextContent = node.getTextContent();
    } else {
      nodeOffset--;
    }
    const character = nodeTextContent[nodeOffset];
    if ($isCodeHighlightNode(node) && character !== " ") {
      lastNonBlank = {
        node,
        offset: nodeOffset
      };
    }
  }
  if (lastNonBlank !== null) {
    return lastNonBlank;
  }
  let codeCharacterAtAnchorOffset = null;
  if (offset < anchor.getTextContentSize()) {
    if ($isCodeHighlightNode(anchor)) {
      codeCharacterAtAnchorOffset = anchor.getTextContent()[offset];
    }
  } else {
    const nextSibling = anchor.getNextSibling();
    if ($isCodeHighlightNode(nextSibling)) {
      codeCharacterAtAnchorOffset = nextSibling.getTextContent()[0];
    }
  }
  if (codeCharacterAtAnchorOffset !== null && codeCharacterAtAnchorOffset !== " ") {
    return last;
  } else {
    const nextNonBlank = findNextNonBlankInLine(anchor, offset);
    if (nextNonBlank !== null) {
      return nextNonBlank;
    } else {
      return last;
    }
  }
}
function findNextNonBlankInLine(anchor, offset) {
  let node = anchor;
  let nodeOffset = offset;
  let nodeTextContent = anchor.getTextContent();
  let nodeTextContentSize = anchor.getTextContentSize();
  while (true) {
    if (!$isCodeHighlightNode(node) || nodeOffset === nodeTextContentSize) {
      node = node.getNextSibling();
      if (node === null || $isLineBreakNode(node)) {
        return null;
      }
      if ($isCodeHighlightNode(node)) {
        nodeOffset = 0;
        nodeTextContent = node.getTextContent();
        nodeTextContentSize = node.getTextContentSize();
      }
    }
    if ($isCodeHighlightNode(node)) {
      if (nodeTextContent[nodeOffset] !== " ") {
        return {
          node,
          offset: nodeOffset
        };
      }
      nodeOffset++;
    }
  }
}
function $getEndOfCodeInLine(anchor) {
  const lastNode = $getLastCodeNodeOfLine(anchor);
  if (!!$isLineBreakNode(lastNode)) {
    formatDevErrorMessage(`Unexpected lineBreakNode in getEndOfCodeInLine`);
  }
  return lastNode;
}
var CodeExtension = defineExtension({
  name: "@lexical/code",
  nodes: () => [CodeNode, CodeHighlightNode]
});
(function(Prism2) {
  Prism2.languages.diff = {
    "coord": [
      // Match all kinds of coord lines (prefixed by "+++", "---" or "***").
      /^(?:\*{3}|-{3}|\+{3}).*$/m,
      // Match "@@ ... @@" coord lines in unified diff.
      /^@@.*@@$/m,
      // Match coord lines in normal diff (starts with a number).
      /^\d.*$/m
    ]
    // deleted, inserted, unchanged, diff
  };
  var PREFIXES = {
    "deleted-sign": "-",
    "deleted-arrow": "<",
    "inserted-sign": "+",
    "inserted-arrow": ">",
    "unchanged": " ",
    "diff": "!"
  };
  Object.keys(PREFIXES).forEach(function(name) {
    var prefix = PREFIXES[name];
    var alias = [];
    if (!/^\w+$/.test(name)) {
      alias.push(/\w+/.exec(name)[0]);
    }
    if (name === "diff") {
      alias.push("bold");
    }
    Prism2.languages.diff[name] = {
      pattern: RegExp("^(?:[" + prefix + "].*(?:\r\n?|\n|(?![\\s\\S])))+", "m"),
      alias,
      inside: {
        "line": {
          pattern: /(.)(?=[\s\S]).*(?:\r\n?|\n)?/,
          lookbehind: true
        },
        "prefix": {
          pattern: /[\s\S]/,
          alias: /\w+/.exec(name)[0]
        }
      }
    };
  });
  Object.defineProperty(Prism2.languages.diff, "PREFIXES", {
    value: PREFIXES
  });
})(Prism);
var Prism$1 = globalThis.Prism || window.Prism;
var CODE_LANGUAGE_FRIENDLY_NAME_MAP = {
  c: "C",
  clike: "C-like",
  cpp: "C++",
  css: "CSS",
  html: "HTML",
  java: "Java",
  js: "JavaScript",
  markdown: "Markdown",
  objc: "Objective-C",
  plain: "Plain Text",
  powershell: "PowerShell",
  py: "Python",
  rust: "Rust",
  sql: "SQL",
  swift: "Swift",
  typescript: "TypeScript",
  xml: "XML"
};
var CODE_LANGUAGE_MAP = {
  cpp: "cpp",
  java: "java",
  javascript: "js",
  md: "markdown",
  plaintext: "plain",
  python: "py",
  text: "plain",
  ts: "typescript"
};
function normalizeCodeLang(lang) {
  return CODE_LANGUAGE_MAP[lang] || lang;
}
function getLanguageFriendlyName(lang) {
  const _lang = normalizeCodeLang(lang);
  return CODE_LANGUAGE_FRIENDLY_NAME_MAP[_lang] || _lang;
}
var getCodeLanguages = () => Object.keys(Prism$1.languages).filter(
  // Prism has several language helpers mixed into languages object
  // so filtering them out here to get langs list
  (language) => typeof Prism$1.languages[language] !== "function"
).sort();
function getCodeLanguageOptions() {
  const options = [];
  for (const [lang, friendlyName] of Object.entries(CODE_LANGUAGE_FRIENDLY_NAME_MAP)) {
    options.push([lang, friendlyName]);
  }
  return options;
}
function getCodeThemeOptions() {
  const options = [];
  return options;
}
function getDiffedLanguage(language) {
  const DIFF_LANGUAGE_REGEX = /^diff-([\w-]+)/i;
  const diffLanguageMatch = DIFF_LANGUAGE_REGEX.exec(language);
  return diffLanguageMatch ? diffLanguageMatch[1] : null;
}
function isCodeLanguageLoaded(language) {
  const diffedLanguage = getDiffedLanguage(language);
  const langId = diffedLanguage ? diffedLanguage : language;
  try {
    return langId ? Prism$1.languages.hasOwnProperty(langId) : false;
  } catch (_unused) {
    return false;
  }
}
async function loadCodeLanguage(language, editor, codeNodeKey) {
}
function getTextContent(token) {
  if (typeof token === "string") {
    return token;
  } else if (Array.isArray(token)) {
    return token.map(getTextContent).join("");
  } else {
    return getTextContent(token.content);
  }
}
function tokenizeDiffHighlight(tokens, language) {
  const diffLanguage = language;
  const diffGrammar = Prism$1.languages[diffLanguage];
  const env = {
    tokens
  };
  const PREFIXES = Prism$1.languages.diff.PREFIXES;
  for (const token of env.tokens) {
    if (typeof token === "string" || !(token.type in PREFIXES) || !Array.isArray(token.content)) {
      continue;
    }
    const type = token.type;
    let insertedPrefixes = 0;
    const getPrefixToken = () => {
      insertedPrefixes++;
      return new Prism$1.Token("prefix", PREFIXES[type], type.replace(/^(\w+).*/, "$1"));
    };
    const withoutPrefixes = token.content.filter((t) => typeof t === "string" || t.type !== "prefix");
    const prefixCount = token.content.length - withoutPrefixes.length;
    const diffTokens = Prism$1.tokenize(getTextContent(withoutPrefixes), diffGrammar);
    diffTokens.unshift(getPrefixToken());
    const LINE_BREAK = /\r\n|\n/g;
    const insertAfterLineBreakString = (text) => {
      const result = [];
      LINE_BREAK.lastIndex = 0;
      let last = 0;
      let m;
      while (insertedPrefixes < prefixCount && (m = LINE_BREAK.exec(text))) {
        const end = m.index + m[0].length;
        result.push(text.slice(last, end));
        last = end;
        result.push(getPrefixToken());
      }
      if (result.length === 0) {
        return void 0;
      }
      if (last < text.length) {
        result.push(text.slice(last));
      }
      return result;
    };
    const insertAfterLineBreak = (toks) => {
      for (let i = 0; i < toks.length && insertedPrefixes < prefixCount; i++) {
        const tok = toks[i];
        if (typeof tok === "string") {
          const inserted = insertAfterLineBreakString(tok);
          if (inserted) {
            toks.splice(i, 1, ...inserted);
            i += inserted.length - 1;
          }
        } else if (typeof tok.content === "string") {
          const inserted = insertAfterLineBreakString(tok.content);
          if (inserted) {
            tok.content = inserted;
          }
        } else if (Array.isArray(tok.content)) {
          insertAfterLineBreak(tok.content);
        } else {
          insertAfterLineBreak([tok.content]);
        }
      }
    };
    insertAfterLineBreak(diffTokens);
    if (insertedPrefixes < prefixCount) {
      diffTokens.push(getPrefixToken());
    }
    token.content = diffTokens;
  }
  return env.tokens;
}
function $getHighlightNodes(codeNode, language) {
  const DIFF_LANGUAGE_REGEX = /^diff-([\w-]+)/i;
  const diffLanguageMatch = DIFF_LANGUAGE_REGEX.exec(language);
  const code = codeNode.getTextContent();
  let tokens = Prism$1.tokenize(code, Prism$1.languages[diffLanguageMatch ? "diff" : language]);
  if (diffLanguageMatch) {
    tokens = tokenizeDiffHighlight(tokens, diffLanguageMatch[1]);
  }
  return $mapTokensToLexicalStructure(tokens);
}
function $mapTokensToLexicalStructure(tokens, type) {
  const nodes = [];
  for (const token of tokens) {
    if (typeof token === "string") {
      const partials = token.split(/(\n|\t)/);
      const partialsLength = partials.length;
      for (let i = 0; i < partialsLength; i++) {
        const part = partials[i];
        if (part === "\n" || part === "\r\n") {
          nodes.push($createLineBreakNode());
        } else if (part === "	") {
          nodes.push($createTabNode());
        } else if (part.length > 0) {
          nodes.push($createCodeHighlightNode(part, type));
        }
      }
    } else {
      const {
        content,
        alias
      } = token;
      if (typeof content === "string") {
        nodes.push(...$mapTokensToLexicalStructure([content], token.type === "prefix" && typeof alias === "string" ? alias : token.type));
      } else if (Array.isArray(content)) {
        nodes.push(...$mapTokensToLexicalStructure(content, token.type === "unchanged" ? void 0 : token.type));
      }
    }
  }
  return nodes;
}
var PrismTokenizer = {
  $tokenize(codeNode, language) {
    return $getHighlightNodes(codeNode, language || this.defaultLanguage);
  },
  defaultLanguage: DEFAULT_CODE_LANGUAGE,
  tokenize(code, language) {
    return Prism$1.tokenize(code, Prism$1.languages[language || ""] || Prism$1.languages[this.defaultLanguage]);
  }
};
function $textNodeTransform(node, editor, tokenizer) {
  const parentNode = node.getParent();
  if ($isCodeNode(parentNode)) {
    codeNodeTransform(parentNode, editor, tokenizer);
  } else if ($isCodeHighlightNode(node)) {
    node.replace($createTextNode(node.__text));
  }
}
function updateCodeGutter(node, editor) {
  const codeElement = editor.getElementByKey(node.getKey());
  if (codeElement === null) {
    return;
  }
  const children = node.getChildren();
  const childrenLength = children.length;
  if (childrenLength === codeElement.__cachedChildrenLength) {
    return;
  }
  codeElement.__cachedChildrenLength = childrenLength;
  let gutter = "1";
  let count = 1;
  for (let i = 0; i < childrenLength; i++) {
    if ($isLineBreakNode(children[i])) {
      gutter += "\n" + ++count;
    }
  }
  codeElement.setAttribute("data-gutter", gutter);
}
var nodesCurrentlyHighlighting = /* @__PURE__ */ new Set();
function codeNodeTransform(node, editor, tokenizer) {
  const nodeKey = node.getKey();
  const cacheKey = editor.getKey() + "/" + nodeKey;
  if (node.getLanguage() === void 0) {
    node.setLanguage(tokenizer.defaultLanguage);
  }
  const language = node.getLanguage() || tokenizer.defaultLanguage;
  if (isCodeLanguageLoaded(language)) {
    if (!node.getIsSyntaxHighlightSupported()) {
      node.setIsSyntaxHighlightSupported(true);
    }
  } else {
    if (node.getIsSyntaxHighlightSupported()) {
      node.setIsSyntaxHighlightSupported(false);
    }
    loadCodeLanguage(language, editor, nodeKey);
    return;
  }
  if (nodesCurrentlyHighlighting.has(cacheKey)) {
    return;
  }
  nodesCurrentlyHighlighting.add(cacheKey);
  editor.update(() => {
    $updateAndRetainSelection(nodeKey, () => {
      const currentNode = $getNodeByKey(nodeKey);
      if (!$isCodeNode(currentNode) || !currentNode.isAttached()) {
        return false;
      }
      const currentLanguage = currentNode.getLanguage() || tokenizer.defaultLanguage;
      const highlightNodes = tokenizer.$tokenize(currentNode, currentLanguage);
      const diffRange = getDiffRange(currentNode.getChildren(), highlightNodes);
      const {
        from,
        to,
        nodesForReplacement
      } = diffRange;
      if (from !== to || nodesForReplacement.length) {
        node.splice(from, to - from, nodesForReplacement);
        return true;
      }
      return false;
    });
  }, {
    onUpdate: () => {
      nodesCurrentlyHighlighting.delete(cacheKey);
    },
    skipTransforms: true
  });
}
function $updateAndRetainSelection(nodeKey, updateFn) {
  const node = $getNodeByKey(nodeKey);
  if (!$isCodeNode(node) || !node.isAttached()) {
    return;
  }
  const selection = $getSelection();
  if (!$isRangeSelection(selection)) {
    updateFn();
    return;
  }
  const anchor = selection.anchor;
  const anchorOffset = anchor.offset;
  const isNewLineAnchor = anchor.type === "element" && $isLineBreakNode(node.getChildAtIndex(anchor.offset - 1));
  let textOffset = 0;
  if (!isNewLineAnchor) {
    const anchorNode = anchor.getNode();
    textOffset = anchorOffset + anchorNode.getPreviousSiblings().reduce((offset, _node) => {
      return offset + _node.getTextContentSize();
    }, 0);
  }
  const hasChanges = updateFn();
  if (!hasChanges) {
    return;
  }
  if (isNewLineAnchor) {
    anchor.getNode().select(anchorOffset, anchorOffset);
    return;
  }
  node.getChildren().some((_node) => {
    const isText = $isTextNode(_node);
    if (isText || $isLineBreakNode(_node)) {
      const textContentSize = _node.getTextContentSize();
      if (isText && textContentSize >= textOffset) {
        _node.select(textOffset, textOffset);
        return true;
      }
      textOffset -= textContentSize;
    }
    return false;
  });
}
function getDiffRange(prevNodes, nextNodes) {
  let leadingMatch = 0;
  while (leadingMatch < prevNodes.length) {
    if (!isEqual(prevNodes[leadingMatch], nextNodes[leadingMatch])) {
      break;
    }
    leadingMatch++;
  }
  const prevNodesLength = prevNodes.length;
  const nextNodesLength = nextNodes.length;
  const maxTrailingMatch = Math.min(prevNodesLength, nextNodesLength) - leadingMatch;
  let trailingMatch = 0;
  while (trailingMatch < maxTrailingMatch) {
    trailingMatch++;
    if (!isEqual(prevNodes[prevNodesLength - trailingMatch], nextNodes[nextNodesLength - trailingMatch])) {
      trailingMatch--;
      break;
    }
  }
  const from = leadingMatch;
  const to = prevNodesLength - trailingMatch;
  const nodesForReplacement = nextNodes.slice(leadingMatch, nextNodesLength - trailingMatch);
  return {
    from,
    nodesForReplacement,
    to
  };
}
function isEqual(nodeA, nodeB) {
  return $isCodeHighlightNode(nodeA) && $isCodeHighlightNode(nodeB) && nodeA.__text === nodeB.__text && nodeA.__highlightType === nodeB.__highlightType || $isTabNode(nodeA) && $isTabNode(nodeB) || $isLineBreakNode(nodeA) && $isLineBreakNode(nodeB);
}
function $isSelectionInCode(selection) {
  if (!$isRangeSelection(selection)) {
    return false;
  }
  const anchorNode = selection.anchor.getNode();
  const maybeAnchorCodeNode = $isCodeNode(anchorNode) ? anchorNode : anchorNode.getParent();
  const focusNode = selection.focus.getNode();
  const maybeFocusCodeNode = $isCodeNode(focusNode) ? focusNode : focusNode.getParent();
  return $isCodeNode(maybeAnchorCodeNode) && maybeAnchorCodeNode.is(maybeFocusCodeNode);
}
function $getCodeLines(selection) {
  const nodes = selection.getNodes();
  const lines = [];
  if (nodes.length === 1 && $isCodeNode(nodes[0])) {
    return lines;
  }
  let lastLine = [];
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (!($isCodeHighlightNode(node) || $isTabNode(node) || $isLineBreakNode(node))) {
      formatDevErrorMessage(`Expected selection to be inside CodeBlock and consisting of CodeHighlightNode, TabNode and LineBreakNode`);
    }
    if ($isLineBreakNode(node)) {
      if (lastLine.length > 0) {
        lines.push(lastLine);
        lastLine = [];
      }
    } else {
      lastLine.push(node);
    }
  }
  if (lastLine.length > 0) {
    const selectionEnd = selection.isBackward() ? selection.anchor : selection.focus;
    const lastPoint = $createPoint(lastLine[0].getKey(), 0, "text");
    if (!selectionEnd.is(lastPoint)) {
      lines.push(lastLine);
    }
  }
  return lines;
}
function $handleTab(shiftKey) {
  const selection = $getSelection();
  if (!$isRangeSelection(selection) || !$isSelectionInCode(selection)) {
    return null;
  }
  const indentOrOutdent = !shiftKey ? INDENT_CONTENT_COMMAND : OUTDENT_CONTENT_COMMAND;
  const tabOrOutdent = !shiftKey ? INSERT_TAB_COMMAND : OUTDENT_CONTENT_COMMAND;
  const anchor = selection.anchor;
  const focus = selection.focus;
  if (anchor.is(focus)) {
    return tabOrOutdent;
  }
  const codeLines = $getCodeLines(selection);
  if (codeLines.length !== 1) {
    return indentOrOutdent;
  }
  const codeLine = codeLines[0];
  const codeLineLength = codeLine.length;
  if (!(codeLineLength !== 0)) {
    formatDevErrorMessage(`$getCodeLines only extracts non-empty lines`);
  }
  let selectionFirst;
  let selectionLast;
  if (selection.isBackward()) {
    selectionFirst = focus;
    selectionLast = anchor;
  } else {
    selectionFirst = anchor;
    selectionLast = focus;
  }
  const firstOfLine = $getFirstCodeNodeOfLine(codeLine[0]);
  const lastOfLine = $getLastCodeNodeOfLine(codeLine[0]);
  const anchorOfLine = $createPoint(firstOfLine.getKey(), 0, "text");
  const focusOfLine = $createPoint(lastOfLine.getKey(), lastOfLine.getTextContentSize(), "text");
  if (selectionFirst.isBefore(anchorOfLine)) {
    return indentOrOutdent;
  }
  if (focusOfLine.isBefore(selectionLast)) {
    return indentOrOutdent;
  }
  if (anchorOfLine.isBefore(selectionFirst) || selectionLast.isBefore(focusOfLine)) {
    return tabOrOutdent;
  }
  return indentOrOutdent;
}
function $handleMultilineIndent(type) {
  const selection = $getSelection();
  if (!$isRangeSelection(selection) || !$isSelectionInCode(selection)) {
    return false;
  }
  const codeLines = $getCodeLines(selection);
  const codeLinesLength = codeLines.length;
  if (codeLinesLength === 0 && selection.isCollapsed()) {
    if (type === INDENT_CONTENT_COMMAND) {
      selection.insertNodes([$createTabNode()]);
    }
    return true;
  }
  if (codeLinesLength === 0 && type === INDENT_CONTENT_COMMAND && selection.getTextContent() === "\n") {
    const tabNode = $createTabNode();
    const lineBreakNode = $createLineBreakNode();
    const direction = selection.isBackward() ? "previous" : "next";
    selection.insertNodes([tabNode, lineBreakNode]);
    $setSelectionFromCaretRange($getCaretRangeInDirection($getCaretRange($getTextPointCaret(tabNode, "next", 0), $normalizeCaret($getSiblingCaret(lineBreakNode, "next"))), direction));
    return true;
  }
  for (let i = 0; i < codeLinesLength; i++) {
    const line = codeLines[i];
    if (line.length > 0) {
      let firstOfLine = line[0];
      if (i === 0) {
        firstOfLine = $getFirstCodeNodeOfLine(firstOfLine);
      }
      if (type === INDENT_CONTENT_COMMAND) {
        const tabNode = $createTabNode();
        firstOfLine.insertBefore(tabNode);
        if (i === 0) {
          const anchorKey = selection.isBackward() ? "focus" : "anchor";
          const anchorLine = $createPoint(firstOfLine.getKey(), 0, "text");
          if (selection[anchorKey].is(anchorLine)) {
            selection[anchorKey].set(tabNode.getKey(), 0, "text");
          }
        }
      } else if ($isTabNode(firstOfLine)) {
        firstOfLine.remove();
      }
    }
  }
  return true;
}
function $handleShiftLines(type, event) {
  const selection = $getSelection();
  if (!$isRangeSelection(selection)) {
    return false;
  }
  const {
    anchor,
    focus
  } = selection;
  const anchorOffset = anchor.offset;
  const focusOffset = focus.offset;
  const anchorNode = anchor.getNode();
  const focusNode = focus.getNode();
  const arrowIsUp = type === KEY_ARROW_UP_COMMAND;
  if (!$isSelectionInCode(selection) || !($isCodeHighlightNode(anchorNode) || $isTabNode(anchorNode)) || !($isCodeHighlightNode(focusNode) || $isTabNode(focusNode))) {
    return false;
  }
  if (!event.altKey) {
    if (selection.isCollapsed()) {
      const codeNode = anchorNode.getParentOrThrow();
      if (arrowIsUp && anchorOffset === 0 && anchorNode.getPreviousSibling() === null) {
        const codeNodeSibling = codeNode.getPreviousSibling();
        if (codeNodeSibling === null) {
          codeNode.selectPrevious();
          event.preventDefault();
          return true;
        }
      } else if (!arrowIsUp && anchorOffset === anchorNode.getTextContentSize() && anchorNode.getNextSibling() === null) {
        const codeNodeSibling = codeNode.getNextSibling();
        if (codeNodeSibling === null) {
          codeNode.selectNext();
          event.preventDefault();
          return true;
        }
      }
    }
    return false;
  }
  let start;
  let end;
  if (anchorNode.isBefore(focusNode)) {
    start = $getFirstCodeNodeOfLine(anchorNode);
    end = $getLastCodeNodeOfLine(focusNode);
  } else {
    start = $getFirstCodeNodeOfLine(focusNode);
    end = $getLastCodeNodeOfLine(anchorNode);
  }
  if (start == null || end == null) {
    return false;
  }
  const range = start.getNodesBetween(end);
  for (let i = 0; i < range.length; i++) {
    const node = range[i];
    if (!$isCodeHighlightNode(node) && !$isTabNode(node) && !$isLineBreakNode(node)) {
      return false;
    }
  }
  event.preventDefault();
  event.stopPropagation();
  const linebreak = arrowIsUp ? start.getPreviousSibling() : end.getNextSibling();
  if (!$isLineBreakNode(linebreak)) {
    return true;
  }
  const sibling = arrowIsUp ? linebreak.getPreviousSibling() : linebreak.getNextSibling();
  if (sibling == null) {
    return true;
  }
  const maybeInsertionPoint = $isCodeHighlightNode(sibling) || $isTabNode(sibling) || $isLineBreakNode(sibling) ? arrowIsUp ? $getFirstCodeNodeOfLine(sibling) : $getLastCodeNodeOfLine(sibling) : null;
  let insertionPoint = maybeInsertionPoint != null ? maybeInsertionPoint : sibling;
  linebreak.remove();
  range.forEach((node) => node.remove());
  if (type === KEY_ARROW_UP_COMMAND) {
    range.forEach((node) => insertionPoint.insertBefore(node));
    insertionPoint.insertBefore(linebreak);
  } else {
    insertionPoint.insertAfter(linebreak);
    insertionPoint = linebreak;
    range.forEach((node) => {
      insertionPoint.insertAfter(node);
      insertionPoint = node;
    });
  }
  selection.setTextNodeRange(anchorNode, anchorOffset, focusNode, focusOffset);
  return true;
}
function $handleMoveTo(type, event) {
  const selection = $getSelection();
  if (!$isRangeSelection(selection)) {
    return false;
  }
  const {
    anchor,
    focus
  } = selection;
  const anchorNode = anchor.getNode();
  const focusNode = focus.getNode();
  const isMoveToStart = type === MOVE_TO_START;
  if (!$isSelectionInCode(selection) || !($isCodeHighlightNode(anchorNode) || $isTabNode(anchorNode)) || !($isCodeHighlightNode(focusNode) || $isTabNode(focusNode))) {
    return false;
  }
  const focusLineNode = focusNode;
  const direction = $getCodeLineDirection(focusLineNode);
  const moveToStart = direction === "rtl" ? !isMoveToStart : isMoveToStart;
  if (moveToStart) {
    const start = $getStartOfCodeInLine(focusLineNode, focus.offset);
    if (start !== null) {
      const {
        node,
        offset
      } = start;
      if ($isLineBreakNode(node)) {
        node.selectNext(0, 0);
      } else {
        selection.setTextNodeRange(node, offset, node, offset);
      }
    } else {
      focusLineNode.getParentOrThrow().selectStart();
    }
  } else {
    const node = $getEndOfCodeInLine(focusLineNode);
    node.select();
  }
  event.preventDefault();
  event.stopPropagation();
  return true;
}
function registerCodeHighlighting(editor, tokenizer) {
  if (!editor.hasNodes([CodeNode, CodeHighlightNode])) {
    throw new Error("CodeHighlightPlugin: CodeNode or CodeHighlightNode not registered on editor");
  }
  if (tokenizer == null) {
    tokenizer = PrismTokenizer;
  }
  const registrations = [];
  if (editor._headless !== true) {
    registrations.push(editor.registerMutationListener(CodeNode, (mutations) => {
      editor.getEditorState().read(() => {
        for (const [key, type] of mutations) {
          if (type !== "destroyed") {
            const node = $getNodeByKey(key);
            if (node !== null) {
              updateCodeGutter(node, editor);
            }
          }
        }
      });
    }, {
      skipInitialization: false
    }));
  }
  registrations.push(editor.registerNodeTransform(CodeNode, (node) => codeNodeTransform(node, editor, tokenizer)), editor.registerNodeTransform(TextNode, (node) => $textNodeTransform(node, editor, tokenizer)), editor.registerNodeTransform(CodeHighlightNode, (node) => $textNodeTransform(node, editor, tokenizer)), editor.registerCommand(KEY_TAB_COMMAND, (event) => {
    const command = $handleTab(event.shiftKey);
    if (command === null) {
      return false;
    }
    event.preventDefault();
    editor.dispatchCommand(command, void 0);
    return true;
  }, COMMAND_PRIORITY_LOW), editor.registerCommand(INSERT_TAB_COMMAND, () => {
    const selection = $getSelection();
    if (!$isSelectionInCode(selection)) {
      return false;
    }
    $insertNodes([$createTabNode()]);
    return true;
  }, COMMAND_PRIORITY_LOW), editor.registerCommand(INDENT_CONTENT_COMMAND, (payload) => $handleMultilineIndent(INDENT_CONTENT_COMMAND), COMMAND_PRIORITY_LOW), editor.registerCommand(OUTDENT_CONTENT_COMMAND, (payload) => $handleMultilineIndent(OUTDENT_CONTENT_COMMAND), COMMAND_PRIORITY_LOW), editor.registerCommand(KEY_ARROW_UP_COMMAND, (event) => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) {
      return false;
    }
    const {
      anchor
    } = selection;
    const anchorNode = anchor.getNode();
    if (!$isSelectionInCode(selection)) {
      return false;
    }
    if (selection.isCollapsed() && anchor.offset === 0 && anchorNode.getPreviousSibling() === null && $isCodeNode(anchorNode.getParentOrThrow())) {
      event.preventDefault();
      return true;
    }
    return $handleShiftLines(KEY_ARROW_UP_COMMAND, event);
  }, COMMAND_PRIORITY_LOW), editor.registerCommand(KEY_ARROW_DOWN_COMMAND, (event) => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) {
      return false;
    }
    const {
      anchor
    } = selection;
    const anchorNode = anchor.getNode();
    if (!$isSelectionInCode(selection)) {
      return false;
    }
    if (selection.isCollapsed() && anchor.offset === anchorNode.getTextContentSize() && anchorNode.getNextSibling() === null && $isCodeNode(anchorNode.getParentOrThrow())) {
      event.preventDefault();
      return true;
    }
    return $handleShiftLines(KEY_ARROW_DOWN_COMMAND, event);
  }, COMMAND_PRIORITY_LOW), editor.registerCommand(MOVE_TO_START, (event) => $handleMoveTo(MOVE_TO_START, event), COMMAND_PRIORITY_LOW), editor.registerCommand(MOVE_TO_END, (event) => $handleMoveTo(MOVE_TO_END, event), COMMAND_PRIORITY_LOW));
  return mergeRegister(...registrations);
}
var getFirstCodeNodeOfLine = $getFirstCodeNodeOfLine;
var getLastCodeNodeOfLine = $getLastCodeNodeOfLine;
var getEndOfCodeInLine = $getEndOfCodeInLine;
var getStartOfCodeInLine = $getStartOfCodeInLine;
export {
  $createCodeHighlightNode,
  $createCodeNode,
  $getCodeLineDirection,
  $getEndOfCodeInLine,
  $getFirstCodeNodeOfLine,
  $getLastCodeNodeOfLine,
  $getStartOfCodeInLine,
  $isCodeHighlightNode,
  $isCodeNode,
  CODE_LANGUAGE_FRIENDLY_NAME_MAP,
  CODE_LANGUAGE_MAP,
  CodeExtension,
  CodeHighlightNode,
  CodeNode,
  DEFAULT_CODE_LANGUAGE,
  PrismTokenizer,
  getCodeLanguageOptions,
  getCodeLanguages,
  getCodeThemeOptions,
  getDefaultCodeLanguage,
  getEndOfCodeInLine,
  getFirstCodeNodeOfLine,
  getLanguageFriendlyName,
  getLastCodeNodeOfLine,
  getStartOfCodeInLine,
  normalizeCodeLang,
  normalizeCodeLang as normalizeCodeLanguage,
  registerCodeHighlighting
};
//# sourceMappingURL=LexicalCode.dev-75NLLEKI.js.map