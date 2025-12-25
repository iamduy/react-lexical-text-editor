import "./chunk-5WRI5ZAA.js";

// node_modules/@lexical/mark/LexicalMark.prod.mjs
import { ElementNode as t, $isRangeSelection as e, $applyNodeReplacement as r, defineExtension as n, $createRangeSelection as s, $isElementNode as i, $isTextNode as o, $isDecoratorNode as c } from "lexical";
import { addClassNamesToElement as u, removeClassNamesFromElement as l } from "@lexical/utils";
var a = [];
var f = class _f extends t {
  __ids;
  static getType() {
    return "mark";
  }
  static clone(t2) {
    return new _f(t2.__ids, t2.__key);
  }
  static importDOM() {
    return null;
  }
  static importJSON(t2) {
    return d().updateFromJSON(t2);
  }
  updateFromJSON(t2) {
    return super.updateFromJSON(t2).setIDs(t2.ids);
  }
  exportJSON() {
    return { ...super.exportJSON(), ids: this.getIDs() };
  }
  constructor(t2 = a, e2) {
    super(e2), this.__ids = t2;
  }
  createDOM(t2) {
    const e2 = document.createElement("mark");
    return u(e2, t2.theme.mark), this.__ids.length > 1 && u(e2, t2.theme.markOverlap), e2;
  }
  updateDOM(t2, e2, r2) {
    const n2 = t2.__ids, s2 = this.__ids, i2 = n2.length, o2 = s2.length, c2 = r2.theme.markOverlap;
    return i2 !== o2 && (1 === i2 ? 2 === o2 && u(e2, c2) : 1 === o2 && l(e2, c2)), false;
  }
  hasID(t2) {
    return this.getIDs().includes(t2);
  }
  getIDs() {
    return Array.from(this.getLatest().__ids);
  }
  setIDs(t2) {
    const e2 = this.getWritable();
    return e2.__ids = t2, e2;
  }
  addID(t2) {
    const e2 = this.getWritable();
    return e2.__ids.includes(t2) ? e2 : e2.setIDs([...e2.__ids, t2]);
  }
  deleteID(t2) {
    const e2 = this.getWritable(), r2 = e2.__ids.indexOf(t2);
    if (-1 === r2) return e2;
    const n2 = Array.from(e2.__ids);
    return n2.splice(r2, 1), e2.setIDs(n2);
  }
  insertNewAfter(t2, e2 = true) {
    const r2 = d(this.__ids);
    return this.insertAfter(r2, e2), r2;
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
  extractWithChild(t2, r2, n2) {
    if (!e(r2) || "html" === n2) return false;
    const s2 = r2.anchor, i2 = r2.focus, o2 = s2.getNode(), c2 = i2.getNode(), u2 = r2.isBackward() ? s2.offset - i2.offset : i2.offset - s2.offset;
    return this.isParentOf(o2) && this.isParentOf(c2) && this.getTextContent().length === u2;
  }
  excludeFromCopy(t2) {
    return "clone" !== t2;
  }
};
function d(t2 = a) {
  return r(new f(t2));
}
function h(t2) {
  return t2 instanceof f;
}
function _(t2) {
  const e2 = t2.getChildren();
  let r2 = null;
  for (let n2 = 0; n2 < e2.length; n2++) {
    const s2 = e2[n2];
    null === r2 ? t2.insertBefore(s2) : r2.insertAfter(s2), r2 = s2;
  }
  t2.remove();
}
function m(t2, e2, r2, n2) {
  const u2 = s(), [l2, a2] = t2.isBackward() ? [t2.focus, t2.anchor] : [t2.anchor, t2.focus];
  let f2, _2;
  u2.anchor.set(l2.key, l2.offset, l2.type), u2.focus.set(a2.key, a2.offset, a2.type);
  const m2 = u2.extract();
  for (const t3 of m2) {
    if (i(_2) && _2.isParentOf(t3)) continue;
    let e3 = null;
    if (o(t3)) e3 = t3;
    else {
      if (h(t3)) continue;
      (i(t3) || c(t3)) && t3.isInline() && (e3 = t3);
    }
    if (null !== e3) {
      if (e3 && e3.is(f2)) continue;
      const t4 = e3.getParent();
      if (null != t4 && t4.is(f2) || (_2 = void 0), f2 = t4, void 0 === _2) {
        _2 = (n2 || d)([r2]), e3.insertBefore(_2);
      }
      _2.append(e3);
    } else f2 = void 0, _2 = void 0;
  }
  i(_2) && (e2 ? _2.selectStart() : _2.selectEnd());
}
function g(t2, e2) {
  let r2 = t2;
  for (; null !== r2; ) {
    if (h(r2)) return r2.getIDs();
    if (o(r2) && e2 === r2.getTextContentSize()) {
      const t3 = r2.getNextSibling();
      if (h(t3)) return t3.getIDs();
    }
    r2 = r2.getParent();
  }
  return null;
}
var p = n({ name: "@lexical/mark", nodes: () => [f] });
export {
  d as $createMarkNode,
  g as $getMarkIDs,
  h as $isMarkNode,
  _ as $unwrapMarkNode,
  m as $wrapSelectionInMarkNode,
  p as MarkExtension,
  f as MarkNode
};
//# sourceMappingURL=LexicalMark.prod-3S45EM3S.js.map