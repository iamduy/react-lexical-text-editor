import "./chunk-5WRI5ZAA.js";

// node_modules/@lexical/text/LexicalText.prod.mjs
import { $getRoot as t, $isDecoratorNode as e, $isElementNode as n, $isParagraphNode as r, $isTextNode as i, TextNode as o, $createTextNode as l } from "lexical";
function s() {
  return t().getTextContent();
}
function f(t2, e2 = true) {
  if (t2) return false;
  let n2 = s();
  return e2 && (n2 = n2.trim()), "" === n2;
}
function u(t2, e2) {
  return () => f(t2, e2);
}
function c(o2) {
  if (!f(o2, false)) return false;
  const l2 = t().getChildren(), s2 = l2.length;
  if (s2 > 1) return false;
  for (let t2 = 0; t2 < s2; t2++) {
    const o3 = l2[t2];
    if (e(o3)) return false;
    if (n(o3)) {
      if (!r(o3)) return false;
      if (0 !== o3.__indent) return false;
      const e2 = o3.getChildren(), n2 = e2.length;
      for (let r2 = 0; r2 < n2; r2++) {
        const n3 = e2[t2];
        if (!i(n3)) return false;
      }
    }
  }
  return true;
}
function g(t2) {
  return () => c(t2);
}
function a(t2, e2) {
  let r2 = t2.getFirstChild(), o2 = 0;
  t: for (; null !== r2; ) {
    if (n(r2)) {
      const t4 = r2.getFirstChild();
      if (null !== t4) {
        r2 = t4;
        continue;
      }
    } else if (i(r2)) {
      const t4 = r2.getTextContentSize();
      if (o2 + t4 > e2) return { node: r2, offset: e2 - o2 };
      o2 += t4;
    }
    const t3 = r2.getNextSibling();
    if (null !== t3) {
      r2 = t3;
      continue;
    }
    let l2 = r2.getParent();
    for (; null !== l2; ) {
      const t4 = l2.getNextSibling();
      if (null !== t4) {
        r2 = t4;
        continue t;
      }
      l2 = l2.getParent();
    }
    break;
  }
  return null;
}
function d(t2, ...e2) {
  const n2 = new URL("https://lexical.dev/docs/error"), r2 = new URLSearchParams();
  r2.append("code", t2);
  for (const t3 of e2) r2.append("v", t3);
  throw n2.search = r2.toString(), Error(`Minified Lexical error #${t2}; visit ${n2.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function x(t2, e2, n2, r2) {
  const s2 = (t3) => t3 instanceof n2, f2 = (t3) => {
    const e3 = l(t3.getTextContent());
    e3.setFormat(t3.getFormat()), t3.replace(e3);
  };
  return [t2.registerNodeTransform(o, (t3) => {
    if (!t3.isSimpleText()) return;
    let n3, o2 = t3.getPreviousSibling(), l2 = t3.getTextContent(), u2 = t3;
    if (i(o2)) {
      const n4 = o2.getTextContent(), r3 = e2(n4 + l2);
      if (s2(o2)) {
        if (null === r3 || 0 !== ((t4) => t4.getLatest().__mode)(o2)) return void f2(o2);
        {
          const e3 = r3.end - n4.length;
          if (e3 > 0) {
            const r4 = n4 + l2.slice(0, e3);
            if (o2.select(), o2.setTextContent(r4), e3 === l2.length) t3.remove();
            else {
              const n5 = l2.slice(e3);
              t3.setTextContent(n5);
            }
            return;
          }
        }
      } else if (null === r3 || r3.start < n4.length) return;
    }
    let c2 = 0;
    for (; ; ) {
      n3 = e2(l2);
      let t4, g2 = null === n3 ? "" : l2.slice(n3.end);
      if (l2 = g2, "" === g2) {
        const t5 = u2.getNextSibling();
        if (i(t5)) {
          g2 = u2.getTextContent() + t5.getTextContent();
          const n4 = e2(g2);
          if (null === n4) return void (s2(t5) ? f2(t5) : t5.markDirty());
          if (0 !== n4.start) return;
        }
      }
      if (null === n3) return;
      if (0 === n3.start && i(o2) && o2.isTextEntity()) {
        c2 += n3.end;
        continue;
      }
      0 === n3.start ? [t4, u2] = u2.splitText(n3.end) : [, t4, u2] = u2.splitText(n3.start + c2, n3.end + c2), void 0 === t4 && d(165, "nodeToReplace");
      const a2 = r2(t4);
      if (a2.setFormat(t4.getFormat()), t4.replace(a2), null == u2) return;
      c2 = 0, o2 = a2;
    }
  }), t2.registerNodeTransform(n2, (t3) => {
    const n3 = t3.getTextContent(), r3 = e2(n3);
    if (null === r3 || 0 !== r3.start) return void f2(t3);
    if (n3.length > r3.end) return void t3.splitText(r3.end);
    const o2 = t3.getPreviousSibling();
    i(o2) && o2.isTextEntity() && (f2(o2), f2(t3));
    const l2 = t3.getNextSibling();
    i(l2) && l2.isTextEntity() && (f2(l2), s2(t3) && f2(t3));
  })];
}
export {
  c as $canShowPlaceholder,
  g as $canShowPlaceholderCurry,
  a as $findTextIntersectionFromCharacters,
  f as $isRootTextContentEmpty,
  u as $isRootTextContentEmptyCurry,
  s as $rootTextContent,
  x as registerLexicalTextEntity
};
//# sourceMappingURL=LexicalText.prod-H23KWO6H.js.map