import {
  require_prism
} from "./chunk-DGONUQ7F.js";
import {
  __toESM
} from "./chunk-5WRI5ZAA.js";

// node_modules/@lexical/code/LexicalCode.prod.mjs
var import_prismjs = __toESM(require_prism(), 1);
import { isHTMLElement as t, addClassNamesToElement as e, removeClassNamesFromElement as n, $getAdjacentCaret as r, mergeRegister as i } from "@lexical/utils";
import { ElementNode as o, $createParagraphNode as s, $isTextNode as l, $isTabNode as u, $createTabNode as c, $createLineBreakNode as g, $create as a, TextNode as f, $applyNodeReplacement as p, $getSiblingCaret as h, getTextDirection as d, $isElementNode as m, $isLineBreakNode as y, defineExtension as x, $createTextNode as _, $getNodeByKey as S, $getSelection as v, $isRangeSelection as T, $createPoint as b, INDENT_CONTENT_COMMAND as C, OUTDENT_CONTENT_COMMAND as N, INSERT_TAB_COMMAND as j, $setSelectionFromCaretRange as w, $getCaretRangeInDirection as k, $getCaretRange as A, $getTextPointCaret as P, $normalizeCaret as L, KEY_ARROW_UP_COMMAND as O, MOVE_TO_START as H, KEY_TAB_COMMAND as E, COMMAND_PRIORITY_LOW as z, $insertNodes as B, KEY_ARROW_DOWN_COMMAND as D, MOVE_TO_END as F } from "lexical";
function I(t2, ...e2) {
  const n2 = new URL("https://lexical.dev/docs/error"), r2 = new URLSearchParams();
  r2.append("code", t2);
  for (const t3 of e2) r2.append("v", t3);
  throw n2.search = r2.toString(), Error(`Minified Lexical error #${t2}; visit ${n2.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
var M = "javascript";
var J = () => M;
function R(e2, n2) {
  for (const r2 of e2.childNodes) {
    if (t(r2) && r2.tagName === n2) return true;
    R(r2, n2);
  }
  return false;
}
var K = "data-language";
var $ = "data-highlight-language";
var W = "data-theme";
var q = class _q extends o {
  __language;
  __theme;
  __isSyntaxHighlightSupported;
  static getType() {
    return "code";
  }
  static clone(t2) {
    return new _q(t2.__language, t2.__key);
  }
  constructor(t2, e2) {
    super(e2), this.__language = t2 || void 0, this.__isSyntaxHighlightSupported = false, this.__theme = void 0;
  }
  afterCloneFrom(t2) {
    super.afterCloneFrom(t2), this.__language = t2.__language, this.__theme = t2.__theme, this.__isSyntaxHighlightSupported = t2.__isSyntaxHighlightSupported;
  }
  createDOM(t2) {
    const n2 = document.createElement("code");
    e(n2, t2.theme.code), n2.setAttribute("spellcheck", "false");
    const r2 = this.getLanguage();
    r2 && (n2.setAttribute(K, r2), this.getIsSyntaxHighlightSupported() && n2.setAttribute($, r2));
    const i2 = this.getTheme();
    i2 && n2.setAttribute(W, i2);
    const o2 = this.getStyle();
    return o2 && n2.setAttribute("style", o2), n2;
  }
  updateDOM(t2, e2, n2) {
    const r2 = this.__language, i2 = t2.__language;
    r2 ? r2 !== i2 && e2.setAttribute(K, r2) : i2 && e2.removeAttribute(K);
    const o2 = this.__isSyntaxHighlightSupported;
    t2.__isSyntaxHighlightSupported && i2 ? o2 && r2 ? r2 !== i2 && e2.setAttribute($, r2) : e2.removeAttribute($) : o2 && r2 && e2.setAttribute($, r2);
    const s2 = this.__theme, l2 = t2.__theme;
    s2 ? s2 !== l2 && e2.setAttribute(W, s2) : l2 && e2.removeAttribute(W);
    const u2 = this.__style, c2 = t2.__style;
    return u2 ? u2 !== c2 && e2.setAttribute("style", u2) : c2 && e2.removeAttribute("style"), false;
  }
  exportDOM(t2) {
    const n2 = document.createElement("pre");
    e(n2, t2._config.theme.code), n2.setAttribute("spellcheck", "false");
    const r2 = this.getLanguage();
    r2 && (n2.setAttribute(K, r2), this.getIsSyntaxHighlightSupported() && n2.setAttribute($, r2));
    const i2 = this.getTheme();
    i2 && n2.setAttribute(W, i2);
    const o2 = this.getStyle();
    return o2 && n2.setAttribute("style", o2), { element: n2 };
  }
  static importDOM() {
    return { code: (t2) => null != t2.textContent && (/\r?\n/.test(t2.textContent) || R(t2, "BR")) ? { conversion: Q, priority: 1 } : null, div: () => ({ conversion: G, priority: 1 }), pre: () => ({ conversion: Q, priority: 0 }), table: (t2) => tt(t2) ? { conversion: V, priority: 3 } : null, td: (t2) => {
      const e2 = t2, n2 = e2.closest("table");
      return e2.classList.contains("js-file-line") || n2 && tt(n2) ? { conversion: Y, priority: 3 } : null;
    }, tr: (t2) => {
      const e2 = t2.closest("table");
      return e2 && tt(e2) ? { conversion: Y, priority: 3 } : null;
    } };
  }
  static importJSON(t2) {
    return U().updateFromJSON(t2);
  }
  updateFromJSON(t2) {
    return super.updateFromJSON(t2).setLanguage(t2.language).setTheme(t2.theme);
  }
  exportJSON() {
    return { ...super.exportJSON(), language: this.getLanguage(), theme: this.getTheme() };
  }
  insertNewAfter(t2, e2 = true) {
    const n2 = this.getChildren(), r2 = n2.length;
    if (r2 >= 2 && "\n" === n2[r2 - 1].getTextContent() && "\n" === n2[r2 - 2].getTextContent() && t2.isCollapsed() && t2.anchor.key === this.__key && t2.anchor.offset === r2) {
      n2[r2 - 1].remove(), n2[r2 - 2].remove();
      const t3 = s();
      return this.insertAfter(t3, e2), t3;
    }
    const { anchor: i2, focus: o2 } = t2, a2 = (i2.isBefore(o2) ? i2 : o2).getNode();
    if (l(a2)) {
      let t3 = st(a2);
      const e3 = [];
      for (; ; ) if (u(t3)) e3.push(c()), t3 = t3.getNextSibling();
      else {
        if (!it(t3)) break;
        {
          let n4 = 0;
          const r4 = t3.getTextContent(), i3 = t3.getTextContentSize();
          for (; n4 < i3 && " " === r4[n4]; ) n4++;
          if (0 !== n4 && e3.push(rt(" ".repeat(n4))), n4 !== i3) break;
          t3 = t3.getNextSibling();
        }
      }
      const n3 = a2.splitText(i2.offset)[0], r3 = 0 === i2.offset ? 0 : 1, o3 = n3.getIndexWithinParent() + r3, s2 = a2.getParentOrThrow(), l2 = [g(), ...e3];
      s2.splice(o3, 0, l2);
      const f2 = e3[e3.length - 1];
      f2 ? f2.select() : 0 === i2.offset ? n3.selectPrevious() : n3.getNextSibling().selectNext(0, 0);
    }
    if (X(a2)) {
      const { offset: e3 } = t2.anchor;
      a2.splice(e3, 0, [g()]), a2.select(e3 + 1, e3 + 1);
    }
    return null;
  }
  canIndent() {
    return false;
  }
  collapseAtStart() {
    const t2 = s();
    return this.getChildren().forEach((e2) => t2.append(e2)), this.replace(t2), true;
  }
  setLanguage(t2) {
    const e2 = this.getWritable();
    return e2.__language = t2 || void 0, e2;
  }
  getLanguage() {
    return this.getLatest().__language;
  }
  setIsSyntaxHighlightSupported(t2) {
    const e2 = this.getWritable();
    return e2.__isSyntaxHighlightSupported = t2, e2;
  }
  getIsSyntaxHighlightSupported() {
    return this.getLatest().__isSyntaxHighlightSupported;
  }
  setTheme(t2) {
    const e2 = this.getWritable();
    return e2.__theme = t2 || void 0, e2;
  }
  getTheme() {
    return this.getLatest().__theme;
  }
};
function U(t2, e2) {
  return a(q).setLanguage(t2).setTheme(e2);
}
function X(t2) {
  return t2 instanceof q;
}
function Q(t2) {
  return { node: U(t2.getAttribute(K)) };
}
function G(t2) {
  const e2 = t2, n2 = Z(e2);
  return n2 || (function(t3) {
    let e3 = t3.parentElement;
    for (; null !== e3; ) {
      if (Z(e3)) return true;
      e3 = e3.parentElement;
    }
    return false;
  })(e2) ? { node: n2 ? U() : null } : { node: null };
}
function V() {
  return { node: U() };
}
function Y() {
  return { node: null };
}
function Z(t2) {
  return null !== t2.style.fontFamily.match("monospace");
}
function tt(t2) {
  return t2.classList.contains("js-file-line-container");
}
var et = class _et extends f {
  __highlightType;
  constructor(t2 = "", e2, n2) {
    super(t2, n2), this.__highlightType = e2;
  }
  static getType() {
    return "code-highlight";
  }
  static clone(t2) {
    return new _et(t2.__text, t2.__highlightType || void 0, t2.__key);
  }
  getHighlightType() {
    return this.getLatest().__highlightType;
  }
  setHighlightType(t2) {
    const e2 = this.getWritable();
    return e2.__highlightType = t2 || void 0, e2;
  }
  canHaveFormat() {
    return false;
  }
  createDOM(t2) {
    const n2 = super.createDOM(t2), r2 = nt(t2.theme, this.__highlightType);
    return e(n2, r2), n2;
  }
  updateDOM(t2, r2, i2) {
    const o2 = super.updateDOM(t2, r2, i2), s2 = nt(i2.theme, t2.__highlightType), l2 = nt(i2.theme, this.__highlightType);
    return s2 !== l2 && (s2 && n(r2, s2), l2 && e(r2, l2)), o2;
  }
  static importJSON(t2) {
    return rt().updateFromJSON(t2);
  }
  updateFromJSON(t2) {
    return super.updateFromJSON(t2).setHighlightType(t2.highlightType);
  }
  exportJSON() {
    return { ...super.exportJSON(), highlightType: this.getHighlightType() };
  }
  setFormat(t2) {
    return this;
  }
  isParentRequired() {
    return true;
  }
  createParentElementNode() {
    return U();
  }
};
function nt(t2, e2) {
  return e2 && t2 && t2.codeHighlight && t2.codeHighlight[e2];
}
function rt(t2 = "", e2) {
  return p(new et(t2, e2));
}
function it(t2) {
  return t2 instanceof et;
}
function ot(t2, e2) {
  let n2 = t2;
  for (let i2 = h(t2, e2); i2 && (it(i2.origin) || u(i2.origin)); i2 = r(i2)) n2 = i2.origin;
  return n2;
}
function st(t2) {
  return ot(t2, "previous");
}
function lt(t2) {
  return ot(t2, "next");
}
function ut(t2) {
  const e2 = st(t2), n2 = lt(t2);
  let r2 = e2;
  for (; null !== r2; ) {
    if (it(r2)) {
      const t3 = d(r2.getTextContent());
      if (null !== t3) return t3;
    }
    if (r2 === n2) break;
    r2 = r2.getNextSibling();
  }
  const i2 = e2.getParent();
  if (m(i2)) {
    const t3 = i2.getDirection();
    if ("ltr" === t3 || "rtl" === t3) return t3;
  }
  return null;
}
function ct(t2, e2) {
  let n2 = null, r2 = null, i2 = t2, o2 = e2, s2 = t2.getTextContent();
  for (; ; ) {
    if (0 === o2) {
      if (i2 = i2.getPreviousSibling(), null === i2) break;
      if (it(i2) || u(i2) || y(i2) || I(167), y(i2)) {
        n2 = { node: i2, offset: 1 };
        break;
      }
      o2 = Math.max(0, i2.getTextContentSize() - 1), s2 = i2.getTextContent();
    } else o2--;
    const t3 = s2[o2];
    it(i2) && " " !== t3 && (r2 = { node: i2, offset: o2 });
  }
  if (null !== r2) return r2;
  let l2 = null;
  if (e2 < t2.getTextContentSize()) it(t2) && (l2 = t2.getTextContent()[e2]);
  else {
    const e3 = t2.getNextSibling();
    it(e3) && (l2 = e3.getTextContent()[0]);
  }
  if (null !== l2 && " " !== l2) return n2;
  {
    const r3 = (function(t3, e3) {
      let n3 = t3, r4 = e3, i3 = t3.getTextContent(), o3 = t3.getTextContentSize();
      for (; ; ) {
        if (!it(n3) || r4 === o3) {
          if (n3 = n3.getNextSibling(), null === n3 || y(n3)) return null;
          it(n3) && (r4 = 0, i3 = n3.getTextContent(), o3 = n3.getTextContentSize());
        }
        if (it(n3)) {
          if (" " !== i3[r4]) return { node: n3, offset: r4 };
          r4++;
        }
      }
    })(t2, e2);
    return null !== r3 ? r3 : n2;
  }
}
function gt(t2) {
  const e2 = lt(t2);
  return y(e2) && I(168), e2;
}
var at = x({ name: "@lexical/code", nodes: () => [q, et] });
!(function(t2) {
  t2.languages.diff = { coord: [/^(?:\*{3}|-{3}|\+{3}).*$/m, /^@@.*@@$/m, /^\d.*$/m] };
  var e2 = { "deleted-sign": "-", "deleted-arrow": "<", "inserted-sign": "+", "inserted-arrow": ">", unchanged: " ", diff: "!" };
  Object.keys(e2).forEach(function(n2) {
    var r2 = e2[n2], i2 = [];
    /^\w+$/.test(n2) || i2.push(/\w+/.exec(n2)[0]), "diff" === n2 && i2.push("bold"), t2.languages.diff[n2] = { pattern: RegExp("^(?:[" + r2 + "].*(?:\r\n?|\n|(?![\\s\\S])))+", "m"), alias: i2, inside: { line: { pattern: /(.)(?=[\s\S]).*(?:\r\n?|\n)?/, lookbehind: true }, prefix: { pattern: /[\s\S]/, alias: /\w+/.exec(n2)[0] } } };
  }), Object.defineProperty(t2.languages.diff, "PREFIXES", { value: e2 });
})(Prism);
var ft = globalThis.Prism || window.Prism;
var pt = { c: "C", clike: "C-like", cpp: "C++", css: "CSS", html: "HTML", java: "Java", js: "JavaScript", markdown: "Markdown", objc: "Objective-C", plain: "Plain Text", powershell: "PowerShell", py: "Python", rust: "Rust", sql: "SQL", swift: "Swift", typescript: "TypeScript", xml: "XML" };
var ht = { cpp: "cpp", java: "java", javascript: "js", md: "markdown", plaintext: "plain", python: "py", text: "plain", ts: "typescript" };
function dt(t2) {
  return ht[t2] || t2;
}
function mt(t2) {
  const e2 = dt(t2);
  return pt[e2] || e2;
}
var yt = () => Object.keys(ft.languages).filter((t2) => "function" != typeof ft.languages[t2]).sort();
function xt() {
  const t2 = [];
  for (const [e2, n2] of Object.entries(pt)) t2.push([e2, n2]);
  return t2;
}
function _t() {
  return [];
}
function St(t2) {
  return "string" == typeof t2 ? t2 : Array.isArray(t2) ? t2.map(St).join("") : St(t2.content);
}
function vt(t2, e2) {
  const n2 = /^diff-([\w-]+)/i.exec(e2), r2 = t2.getTextContent();
  let i2 = ft.tokenize(r2, ft.languages[n2 ? "diff" : e2]);
  return n2 && (i2 = (function(t3, e3) {
    const n3 = e3, r3 = ft.languages[n3], i3 = { tokens: t3 }, o2 = ft.languages.diff.PREFIXES;
    for (const t4 of i3.tokens) {
      if ("string" == typeof t4 || !(t4.type in o2) || !Array.isArray(t4.content)) continue;
      const e4 = t4.type;
      let n4 = 0;
      const i4 = () => (n4++, new ft.Token("prefix", o2[e4], e4.replace(/^(\w+).*/, "$1"))), s2 = t4.content.filter((t5) => "string" == typeof t5 || "prefix" !== t5.type), l2 = t4.content.length - s2.length, u2 = ft.tokenize(St(s2), r3);
      u2.unshift(i4());
      const c2 = /\r\n|\n/g, g2 = (t5) => {
        const e5 = [];
        c2.lastIndex = 0;
        let r4, o3 = 0;
        for (; n4 < l2 && (r4 = c2.exec(t5)); ) {
          const n5 = r4.index + r4[0].length;
          e5.push(t5.slice(o3, n5)), o3 = n5, e5.push(i4());
        }
        if (0 !== e5.length) return o3 < t5.length && e5.push(t5.slice(o3)), e5;
      }, a2 = (t5) => {
        for (let e5 = 0; e5 < t5.length && n4 < l2; e5++) {
          const n5 = t5[e5];
          if ("string" == typeof n5) {
            const r4 = g2(n5);
            r4 && (t5.splice(e5, 1, ...r4), e5 += r4.length - 1);
          } else if ("string" == typeof n5.content) {
            const t6 = g2(n5.content);
            t6 && (n5.content = t6);
          } else Array.isArray(n5.content) ? a2(n5.content) : a2([n5.content]);
        }
      };
      a2(u2), n4 < l2 && u2.push(i4()), t4.content = u2;
    }
    return i3.tokens;
  })(i2, n2[1])), Tt(i2);
}
function Tt(t2, e2) {
  const n2 = [];
  for (const r2 of t2) if ("string" == typeof r2) {
    const t3 = r2.split(/(\n|\t)/), i2 = t3.length;
    for (let r3 = 0; r3 < i2; r3++) {
      const i3 = t3[r3];
      "\n" === i3 || "\r\n" === i3 ? n2.push(g()) : "	" === i3 ? n2.push(c()) : i3.length > 0 && n2.push(rt(i3, e2));
    }
  } else {
    const { content: t3, alias: e3 } = r2;
    "string" == typeof t3 ? n2.push(...Tt([t3], "prefix" === r2.type && "string" == typeof e3 ? e3 : r2.type)) : Array.isArray(t3) && n2.push(...Tt(t3, "unchanged" === r2.type ? void 0 : r2.type));
  }
  return n2;
}
var bt = { $tokenize(t2, e2) {
  return vt(t2, e2 || this.defaultLanguage);
}, defaultLanguage: M, tokenize(t2, e2) {
  return ft.tokenize(t2, ft.languages[e2 || ""] || ft.languages[this.defaultLanguage]);
} };
function Ct(t2, e2, n2) {
  const r2 = t2.getParent();
  X(r2) ? wt(r2, e2, n2) : it(t2) && t2.replace(_(t2.__text));
}
function Nt(t2, e2) {
  const n2 = e2.getElementByKey(t2.getKey());
  if (null === n2) return;
  const r2 = t2.getChildren(), i2 = r2.length;
  if (i2 === n2.__cachedChildrenLength) return;
  n2.__cachedChildrenLength = i2;
  let o2 = "1", s2 = 1;
  for (let t3 = 0; t3 < i2; t3++) y(r2[t3]) && (o2 += "\n" + ++s2);
  n2.setAttribute("data-gutter", o2);
}
var jt = /* @__PURE__ */ new Set();
function wt(t2, e2, n2) {
  const r2 = t2.getKey(), i2 = e2.getKey() + "/" + r2;
  void 0 === t2.getLanguage() && t2.setLanguage(n2.defaultLanguage);
  const o2 = t2.getLanguage() || n2.defaultLanguage;
  if (!(function(t3) {
    const e3 = (function(t4) {
      const e4 = /^diff-([\w-]+)/i.exec(t4);
      return e4 ? e4[1] : null;
    })(t3), n3 = e3 || t3;
    try {
      return !!n3 && ft.languages.hasOwnProperty(n3);
    } catch (t4) {
      return false;
    }
  })(o2)) return t2.getIsSyntaxHighlightSupported() && t2.setIsSyntaxHighlightSupported(false), void (async function() {
  })();
  t2.getIsSyntaxHighlightSupported() || t2.setIsSyntaxHighlightSupported(true), jt.has(i2) || (jt.add(i2), e2.update(() => {
    !(function(t3, e3) {
      const n3 = S(t3);
      if (!X(n3) || !n3.isAttached()) return;
      const r3 = v();
      if (!T(r3)) return void e3();
      const i3 = r3.anchor, o3 = i3.offset, s2 = "element" === i3.type && y(n3.getChildAtIndex(i3.offset - 1));
      let u2 = 0;
      if (!s2) {
        const t4 = i3.getNode();
        u2 = o3 + t4.getPreviousSiblings().reduce((t5, e4) => t5 + e4.getTextContentSize(), 0);
      }
      if (!e3()) return;
      if (s2) return void i3.getNode().select(o3, o3);
      n3.getChildren().some((t4) => {
        const e4 = l(t4);
        if (e4 || y(t4)) {
          const n4 = t4.getTextContentSize();
          if (e4 && n4 >= u2) return t4.select(u2, u2), true;
          u2 -= n4;
        }
        return false;
      });
    })(r2, () => {
      const e3 = S(r2);
      if (!X(e3) || !e3.isAttached()) return false;
      const i3 = e3.getLanguage() || n2.defaultLanguage, o3 = n2.$tokenize(e3, i3), s2 = (function(t3, e4) {
        let n3 = 0;
        for (; n3 < t3.length && kt(t3[n3], e4[n3]); ) n3++;
        const r3 = t3.length, i4 = e4.length, o4 = Math.min(r3, i4) - n3;
        let s3 = 0;
        for (; s3 < o4; ) if (s3++, !kt(t3[r3 - s3], e4[i4 - s3])) {
          s3--;
          break;
        }
        const l3 = n3, u3 = r3 - s3, c3 = e4.slice(n3, i4 - s3);
        return { from: l3, nodesForReplacement: c3, to: u3 };
      })(e3.getChildren(), o3), { from: l2, to: u2, nodesForReplacement: c2 } = s2;
      return !(l2 === u2 && !c2.length) && (t2.splice(l2, u2 - l2, c2), true);
    });
  }, { onUpdate: () => {
    jt.delete(i2);
  }, skipTransforms: true }));
}
function kt(t2, e2) {
  return it(t2) && it(e2) && t2.__text === e2.__text && t2.__highlightType === e2.__highlightType || u(t2) && u(e2) || y(t2) && y(e2);
}
function At(t2) {
  if (!T(t2)) return false;
  const e2 = t2.anchor.getNode(), n2 = X(e2) ? e2 : e2.getParent(), r2 = t2.focus.getNode(), i2 = X(r2) ? r2 : r2.getParent();
  return X(n2) && n2.is(i2);
}
function Pt(t2) {
  const e2 = t2.getNodes(), n2 = [];
  if (1 === e2.length && X(e2[0])) return n2;
  let r2 = [];
  for (let t3 = 0; t3 < e2.length; t3++) {
    const i2 = e2[t3];
    it(i2) || u(i2) || y(i2) || I(169), y(i2) ? r2.length > 0 && (n2.push(r2), r2 = []) : r2.push(i2);
  }
  if (r2.length > 0) {
    const e3 = t2.isBackward() ? t2.anchor : t2.focus, i2 = b(r2[0].getKey(), 0, "text");
    e3.is(i2) || n2.push(r2);
  }
  return n2;
}
function Lt(t2) {
  const e2 = v();
  if (!T(e2) || !At(e2)) return false;
  const n2 = Pt(e2), r2 = n2.length;
  if (0 === r2 && e2.isCollapsed()) return t2 === C && e2.insertNodes([c()]), true;
  if (0 === r2 && t2 === C && "\n" === e2.getTextContent()) {
    const t3 = c(), n3 = g(), r3 = e2.isBackward() ? "previous" : "next";
    return e2.insertNodes([t3, n3]), w(k(A(P(t3, "next", 0), L(h(n3, "next"))), r3)), true;
  }
  for (let i2 = 0; i2 < r2; i2++) {
    const r3 = n2[i2];
    if (r3.length > 0) {
      let n3 = r3[0];
      if (0 === i2 && (n3 = st(n3)), t2 === C) {
        const t3 = c();
        if (n3.insertBefore(t3), 0 === i2) {
          const r4 = e2.isBackward() ? "focus" : "anchor", i3 = b(n3.getKey(), 0, "text");
          e2[r4].is(i3) && e2[r4].set(t3.getKey(), 0, "text");
        }
      } else u(n3) && n3.remove();
    }
  }
  return true;
}
function Ot(t2, e2) {
  const n2 = v();
  if (!T(n2)) return false;
  const { anchor: r2, focus: i2 } = n2, o2 = r2.offset, s2 = i2.offset, l2 = r2.getNode(), c2 = i2.getNode(), g2 = t2 === O;
  if (!At(n2) || !it(l2) && !u(l2) || !it(c2) && !u(c2)) return false;
  if (!e2.altKey) {
    if (n2.isCollapsed()) {
      const t3 = l2.getParentOrThrow();
      if (g2 && 0 === o2 && null === l2.getPreviousSibling()) {
        if (null === t3.getPreviousSibling()) return t3.selectPrevious(), e2.preventDefault(), true;
      } else if (!g2 && o2 === l2.getTextContentSize() && null === l2.getNextSibling()) {
        if (null === t3.getNextSibling()) return t3.selectNext(), e2.preventDefault(), true;
      }
    }
    return false;
  }
  let a2, f2;
  if (l2.isBefore(c2) ? (a2 = st(l2), f2 = lt(c2)) : (a2 = st(c2), f2 = lt(l2)), null == a2 || null == f2) return false;
  const p2 = a2.getNodesBetween(f2);
  for (let t3 = 0; t3 < p2.length; t3++) {
    const e3 = p2[t3];
    if (!it(e3) && !u(e3) && !y(e3)) return false;
  }
  e2.preventDefault(), e2.stopPropagation();
  const h2 = g2 ? a2.getPreviousSibling() : f2.getNextSibling();
  if (!y(h2)) return true;
  const d2 = g2 ? h2.getPreviousSibling() : h2.getNextSibling();
  if (null == d2) return true;
  const m2 = it(d2) || u(d2) || y(d2) ? g2 ? st(d2) : lt(d2) : null;
  let x2 = null != m2 ? m2 : d2;
  return h2.remove(), p2.forEach((t3) => t3.remove()), t2 === O ? (p2.forEach((t3) => x2.insertBefore(t3)), x2.insertBefore(h2)) : (x2.insertAfter(h2), x2 = h2, p2.forEach((t3) => {
    x2.insertAfter(t3), x2 = t3;
  })), n2.setTextNodeRange(l2, o2, c2, s2), true;
}
function Ht(t2, e2) {
  const n2 = v();
  if (!T(n2)) return false;
  const { anchor: r2, focus: i2 } = n2, o2 = r2.getNode(), s2 = i2.getNode(), l2 = t2 === H;
  if (!At(n2) || !it(o2) && !u(o2) || !it(s2) && !u(s2)) return false;
  const c2 = s2;
  if ("rtl" === ut(c2) ? !l2 : l2) {
    const t3 = ct(c2, i2.offset);
    if (null !== t3) {
      const { node: e3, offset: r3 } = t3;
      y(e3) ? e3.selectNext(0, 0) : n2.setTextNodeRange(e3, r3, e3, r3);
    } else c2.getParentOrThrow().selectStart();
  } else {
    gt(c2).select();
  }
  return e2.preventDefault(), e2.stopPropagation(), true;
}
function Et(t2, e2) {
  if (!t2.hasNodes([q, et])) throw new Error("CodeHighlightPlugin: CodeNode or CodeHighlightNode not registered on editor");
  null == e2 && (e2 = bt);
  const n2 = [];
  return true !== t2._headless && n2.push(t2.registerMutationListener(q, (e3) => {
    t2.getEditorState().read(() => {
      for (const [n3, r2] of e3) if ("destroyed" !== r2) {
        const e4 = S(n3);
        null !== e4 && Nt(e4, t2);
      }
    });
  }, { skipInitialization: false })), n2.push(t2.registerNodeTransform(q, (n3) => wt(n3, t2, e2)), t2.registerNodeTransform(f, (n3) => Ct(n3, t2, e2)), t2.registerNodeTransform(et, (n3) => Ct(n3, t2, e2)), t2.registerCommand(E, (e3) => {
    const n3 = (function(t3) {
      const e4 = v();
      if (!T(e4) || !At(e4)) return null;
      const n4 = t3 ? N : C, r2 = t3 ? N : j, i2 = e4.anchor, o2 = e4.focus;
      if (i2.is(o2)) return r2;
      const s2 = Pt(e4);
      if (1 !== s2.length) return n4;
      const l2 = s2[0];
      let u2, c2;
      0 === l2.length && I(285), e4.isBackward() ? (u2 = o2, c2 = i2) : (u2 = i2, c2 = o2);
      const g2 = st(l2[0]), a2 = lt(l2[0]), f2 = b(g2.getKey(), 0, "text"), p2 = b(a2.getKey(), a2.getTextContentSize(), "text");
      return u2.isBefore(f2) || p2.isBefore(c2) ? n4 : f2.isBefore(u2) || c2.isBefore(p2) ? r2 : n4;
    })(e3.shiftKey);
    return null !== n3 && (e3.preventDefault(), t2.dispatchCommand(n3, void 0), true);
  }, z), t2.registerCommand(j, () => !!At(v()) && (B([c()]), true), z), t2.registerCommand(C, (t3) => Lt(C), z), t2.registerCommand(N, (t3) => Lt(N), z), t2.registerCommand(O, (t3) => {
    const e3 = v();
    if (!T(e3)) return false;
    const { anchor: n3 } = e3, r2 = n3.getNode();
    return !!At(e3) && (e3.isCollapsed() && 0 === n3.offset && null === r2.getPreviousSibling() && X(r2.getParentOrThrow()) ? (t3.preventDefault(), true) : Ot(O, t3));
  }, z), t2.registerCommand(D, (t3) => {
    const e3 = v();
    if (!T(e3)) return false;
    const { anchor: n3 } = e3, r2 = n3.getNode();
    return !!At(e3) && (e3.isCollapsed() && n3.offset === r2.getTextContentSize() && null === r2.getNextSibling() && X(r2.getParentOrThrow()) ? (t3.preventDefault(), true) : Ot(D, t3));
  }, z), t2.registerCommand(H, (t3) => Ht(H, t3), z), t2.registerCommand(F, (t3) => Ht(F, t3), z)), i(...n2);
}
var zt = st;
var Bt = lt;
var Dt = gt;
var Ft = ct;
export {
  rt as $createCodeHighlightNode,
  U as $createCodeNode,
  ut as $getCodeLineDirection,
  gt as $getEndOfCodeInLine,
  st as $getFirstCodeNodeOfLine,
  lt as $getLastCodeNodeOfLine,
  ct as $getStartOfCodeInLine,
  it as $isCodeHighlightNode,
  X as $isCodeNode,
  pt as CODE_LANGUAGE_FRIENDLY_NAME_MAP,
  ht as CODE_LANGUAGE_MAP,
  at as CodeExtension,
  et as CodeHighlightNode,
  q as CodeNode,
  M as DEFAULT_CODE_LANGUAGE,
  bt as PrismTokenizer,
  xt as getCodeLanguageOptions,
  yt as getCodeLanguages,
  _t as getCodeThemeOptions,
  J as getDefaultCodeLanguage,
  Dt as getEndOfCodeInLine,
  zt as getFirstCodeNodeOfLine,
  mt as getLanguageFriendlyName,
  Bt as getLastCodeNodeOfLine,
  Ft as getStartOfCodeInLine,
  dt as normalizeCodeLang,
  dt as normalizeCodeLanguage,
  Et as registerCodeHighlighting
};
//# sourceMappingURL=LexicalCode.prod-3JOHS3UI.js.map