import "./chunk-5WRI5ZAA.js";

// node_modules/@lexical/clipboard/LexicalClipboard.prod.mjs
import { $generateHtmlFromNodes as t, $generateNodesFromDOM as e } from "@lexical/html";
import { $addNodeStyle as n, $sliceSelectedTextNodeContent as o } from "@lexical/selection";
import { objectKlassEquals as r } from "@lexical/utils";
import { $getSelection as i, $isRangeSelection as l, $createTabNode as s, SELECTION_INSERT_CLIPBOARD_NODES_COMMAND as c, $caretFromPoint as a, $isTextPointCaret as u, $getCaretRange as f, $getChildCaret as d, $getRoot as p, $isTextNode as g, $isElementNode as m, $parseSerializedNode as h, getDOMSelection as x, COPY_COMMAND as y, COMMAND_PRIORITY_CRITICAL as w, isSelectionWithinEditor as T, $getEditor as C } from "lexical";
function v(t2, ...e2) {
  const n2 = new URL("https://lexical.dev/docs/error"), o2 = new URLSearchParams();
  o2.append("code", t2);
  for (const t3 of e2) o2.append("v", t3);
  throw n2.search = o2.toString(), Error(`Minified Lexical error #${t2}; visit ${n2.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function D(e2, n2 = i()) {
  return null == n2 && v(166), l(n2) && n2.isCollapsed() || 0 === n2.getNodes().length ? "" : t(e2, n2);
}
function S(t2, e2 = i()) {
  return null == e2 && v(166), l(e2) && e2.isCollapsed() || 0 === e2.getNodes().length ? null : JSON.stringify(E(t2, e2));
}
function N(t2, e2) {
  const n2 = t2.getData("text/plain") || t2.getData("text/uri-list");
  null != n2 && e2.insertRawText(n2);
}
function R(t2, n2, o2) {
  const r2 = t2.getData("application/x-lexical-editor");
  if (r2) try {
    const t3 = JSON.parse(r2);
    if (t3.namespace === o2._config.namespace && Array.isArray(t3.nodes)) {
      return A(o2, L(t3.nodes), n2);
    }
  } catch (t3) {
    console.error(t3);
  }
  const c2 = t2.getData("text/html"), a2 = t2.getData("text/plain");
  if (c2 && a2 !== c2) try {
    const t3 = new DOMParser().parseFromString((function(t4) {
      if (window.trustedTypes && window.trustedTypes.createPolicy) {
        return window.trustedTypes.createPolicy("lexical", { createHTML: (t5) => t5 }).createHTML(t4);
      }
      return t4;
    })(c2), "text/html");
    return A(o2, e(o2, t3), n2);
  } catch (t3) {
    console.error(t3);
  }
  const u2 = a2 || t2.getData("text/uri-list");
  if (null != u2) if (l(n2)) {
    const t3 = u2.split(/(\r?\n|\t)/);
    "" === t3[t3.length - 1] && t3.pop();
    for (let e2 = 0; e2 < t3.length; e2++) {
      const n3 = i();
      if (l(n3)) {
        const o3 = t3[e2];
        "\n" === o3 || "\r\n" === o3 ? n3.insertParagraph() : "	" === o3 ? n3.insertNodes([s()]) : n3.insertText(o3);
      }
    }
  } else n2.insertRawText(u2);
}
function A(t2, e2, n2) {
  t2.dispatchCommand(c, { nodes: e2, selection: n2 }) || (n2.insertNodes(e2), (function(t3) {
    if (l(t3) && t3.isCollapsed()) {
      const e3 = t3.anchor;
      let n3 = null;
      const o2 = a(e3, "previous");
      if (o2) if (u(o2)) n3 = o2.origin;
      else {
        const t4 = f(o2, d(p(), "next").getFlipped());
        for (const e4 of t4) {
          if (g(e4.origin)) {
            n3 = e4.origin;
            break;
          }
          if (m(e4.origin) && !e4.origin.isInline()) break;
        }
      }
      if (n3 && g(n3)) {
        const e4 = n3.getFormat(), o3 = n3.getStyle();
        t3.format === e4 && t3.style === o3 || (t3.format = e4, t3.style = o3, t3.dirty = true);
      }
    }
  })(n2));
}
function P(t2, e2, n2, r2 = []) {
  let i2 = null === e2 || n2.isSelected(e2);
  const l2 = m(n2) && n2.excludeFromCopy("html");
  let s2 = n2;
  null !== e2 && g(s2) && (s2 = o(e2, s2, "clone"));
  const c2 = m(s2) ? s2.getChildren() : [], a2 = (function(t3) {
    const e3 = t3.exportJSON(), n3 = t3.constructor;
    if (e3.type !== n3.getType() && v(58, n3.name), m(t3)) {
      const t4 = e3.children;
      Array.isArray(t4) || v(59, n3.name);
    }
    return e3;
  })(s2);
  g(s2) && 0 === s2.getTextContentSize() && (i2 = false);
  for (let o2 = 0; o2 < c2.length; o2++) {
    const r3 = c2[o2], l3 = P(t2, e2, r3, a2.children);
    !i2 && m(n2) && l3 && n2.extractWithChild(r3, e2, "clone") && (i2 = true);
  }
  if (i2 && !l2) r2.push(a2);
  else if (Array.isArray(a2.children)) for (let t3 = 0; t3 < a2.children.length; t3++) {
    const e3 = a2.children[t3];
    r2.push(e3);
  }
  return i2;
}
function E(t2, e2) {
  const n2 = [], o2 = p().getChildren();
  for (let r2 = 0; r2 < o2.length; r2++) {
    P(t2, e2, o2[r2], n2);
  }
  return { namespace: t2._config.namespace, nodes: n2 };
}
function L(t2) {
  const e2 = [];
  for (let o2 = 0; o2 < t2.length; o2++) {
    const r2 = t2[o2], i2 = h(r2);
    g(i2) && n(i2), e2.push(i2);
  }
  return e2;
}
var b = null;
async function F(t2, e2, n2) {
  if (null !== b) return false;
  if (null !== e2) return new Promise((o3, r2) => {
    t2.update(() => {
      o3(M(t2, e2, n2));
    });
  });
  const o2 = t2.getRootElement(), i2 = t2._window || window, l2 = i2.document, s2 = x(i2);
  if (null === o2 || null === s2) return false;
  const c2 = l2.createElement("span");
  c2.style.cssText = "position: fixed; top: -1000px;", c2.append(l2.createTextNode("#")), o2.append(c2);
  const a2 = new Range();
  return a2.setStart(c2, 0), a2.setEnd(c2, 1), s2.removeAllRanges(), s2.addRange(a2), new Promise((e3, o3) => {
    const s3 = t2.registerCommand(y, (o4) => (r(o4, ClipboardEvent) && (s3(), null !== b && (i2.clearTimeout(b), b = null), e3(M(t2, o4, n2))), true), w);
    b = i2.setTimeout(() => {
      s3(), b = null, e3(false);
    }, 50), l2.execCommand("copy"), c2.remove();
  });
}
function M(t2, e2, n2) {
  if (void 0 === n2) {
    const e3 = x(t2._window), o3 = i();
    if (!o3 || o3.isCollapsed()) return false;
    if (!e3) return false;
    const r2 = e3.anchorNode, l2 = e3.focusNode;
    if (null !== r2 && null !== l2 && !T(t2, r2, l2)) return false;
    n2 = _(o3);
  }
  e2.preventDefault();
  const o2 = e2.clipboardData;
  return null !== o2 && (J(o2, n2), true);
}
var O = [["text/html", D], ["application/x-lexical-editor", S]];
function _(t2 = i()) {
  const e2 = { "text/plain": t2 ? t2.getTextContent() : "" };
  if (t2) {
    const n2 = C();
    for (const [o2, r2] of O) {
      const i2 = r2(n2, t2);
      null !== i2 && (e2[o2] = i2);
    }
  }
  return e2;
}
function J(t2, e2) {
  for (const [n2] of O) void 0 === e2[n2] && t2.setData(n2, "");
  for (const n2 in e2) {
    const o2 = e2[n2];
    void 0 !== o2 && t2.setData(n2, o2);
  }
}
export {
  E as $generateJSONFromSelectedNodes,
  L as $generateNodesFromSerializedNodes,
  _ as $getClipboardDataFromSelection,
  D as $getHtmlContent,
  S as $getLexicalContent,
  N as $insertDataTransferForPlainText,
  R as $insertDataTransferForRichText,
  A as $insertGeneratedNodes,
  F as copyToClipboard,
  J as setLexicalClipboardDataTransfer
};
//# sourceMappingURL=LexicalClipboard.prod-LWIGSZEH.js.map