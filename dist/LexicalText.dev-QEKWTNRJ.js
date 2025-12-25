import "./chunk-5WRI5ZAA.js";

// node_modules/@lexical/text/LexicalText.dev.mjs
import { $getRoot, $isDecoratorNode, $isElementNode, $isParagraphNode, $isTextNode, TextNode, $createTextNode } from "lexical";
function $rootTextContent() {
  const root = $getRoot();
  return root.getTextContent();
}
function $isRootTextContentEmpty(isEditorComposing, trim = true) {
  if (isEditorComposing) {
    return false;
  }
  let text = $rootTextContent();
  if (trim) {
    text = text.trim();
  }
  return text === "";
}
function $isRootTextContentEmptyCurry(isEditorComposing, trim) {
  return () => $isRootTextContentEmpty(isEditorComposing, trim);
}
function $canShowPlaceholder(isComposing) {
  if (!$isRootTextContentEmpty(isComposing, false)) {
    return false;
  }
  const root = $getRoot();
  const children = root.getChildren();
  const childrenLength = children.length;
  if (childrenLength > 1) {
    return false;
  }
  for (let i = 0; i < childrenLength; i++) {
    const topBlock = children[i];
    if ($isDecoratorNode(topBlock)) {
      return false;
    }
    if ($isElementNode(topBlock)) {
      if (!$isParagraphNode(topBlock)) {
        return false;
      }
      if (topBlock.__indent !== 0) {
        return false;
      }
      const topBlockChildren = topBlock.getChildren();
      const topBlockChildrenLength = topBlockChildren.length;
      for (let s = 0; s < topBlockChildrenLength; s++) {
        const child = topBlockChildren[i];
        if (!$isTextNode(child)) {
          return false;
        }
      }
    }
  }
  return true;
}
function $canShowPlaceholderCurry(isEditorComposing) {
  return () => $canShowPlaceholder(isEditorComposing);
}
function $findTextIntersectionFromCharacters(root, targetCharacters) {
  let node = root.getFirstChild();
  let currentCharacters = 0;
  mainLoop: while (node !== null) {
    if ($isElementNode(node)) {
      const child = node.getFirstChild();
      if (child !== null) {
        node = child;
        continue;
      }
    } else if ($isTextNode(node)) {
      const characters = node.getTextContentSize();
      if (currentCharacters + characters > targetCharacters) {
        return {
          node,
          offset: targetCharacters - currentCharacters
        };
      }
      currentCharacters += characters;
    }
    const sibling = node.getNextSibling();
    if (sibling !== null) {
      node = sibling;
      continue;
    }
    let parent = node.getParent();
    while (parent !== null) {
      const parentSibling = parent.getNextSibling();
      if (parentSibling !== null) {
        node = parentSibling;
        continue mainLoop;
      }
      parent = parent.getParent();
    }
    break;
  }
  return null;
}
function formatDevErrorMessage(message) {
  throw new Error(message);
}
function registerLexicalTextEntity(editor, getMatch, targetNode, createNode) {
  const isTargetNode = (node) => {
    return node instanceof targetNode;
  };
  const $replaceWithSimpleText = (node) => {
    const textNode = $createTextNode(node.getTextContent());
    textNode.setFormat(node.getFormat());
    node.replace(textNode);
  };
  const getMode = (node) => {
    return node.getLatest().__mode;
  };
  const $textNodeTransform = (node) => {
    if (!node.isSimpleText()) {
      return;
    }
    let prevSibling = node.getPreviousSibling();
    let text = node.getTextContent();
    let currentNode = node;
    let match;
    if ($isTextNode(prevSibling)) {
      const previousText = prevSibling.getTextContent();
      const combinedText = previousText + text;
      const prevMatch = getMatch(combinedText);
      if (isTargetNode(prevSibling)) {
        if (prevMatch === null || getMode(prevSibling) !== 0) {
          $replaceWithSimpleText(prevSibling);
          return;
        } else {
          const diff = prevMatch.end - previousText.length;
          if (diff > 0) {
            const concatText = text.slice(0, diff);
            const newTextContent = previousText + concatText;
            prevSibling.select();
            prevSibling.setTextContent(newTextContent);
            if (diff === text.length) {
              node.remove();
            } else {
              const remainingText = text.slice(diff);
              node.setTextContent(remainingText);
            }
            return;
          }
        }
      } else if (prevMatch === null || prevMatch.start < previousText.length) {
        return;
      }
    }
    let prevMatchLengthToSkip = 0;
    while (true) {
      match = getMatch(text);
      let nextText = match === null ? "" : text.slice(match.end);
      text = nextText;
      if (nextText === "") {
        const nextSibling = currentNode.getNextSibling();
        if ($isTextNode(nextSibling)) {
          nextText = currentNode.getTextContent() + nextSibling.getTextContent();
          const nextMatch = getMatch(nextText);
          if (nextMatch === null) {
            if (isTargetNode(nextSibling)) {
              $replaceWithSimpleText(nextSibling);
            } else {
              nextSibling.markDirty();
            }
            return;
          } else if (nextMatch.start !== 0) {
            return;
          }
        }
      }
      if (match === null) {
        return;
      }
      if (match.start === 0 && $isTextNode(prevSibling) && prevSibling.isTextEntity()) {
        prevMatchLengthToSkip += match.end;
        continue;
      }
      let nodeToReplace;
      if (match.start === 0) {
        [nodeToReplace, currentNode] = currentNode.splitText(match.end);
      } else {
        [, nodeToReplace, currentNode] = currentNode.splitText(match.start + prevMatchLengthToSkip, match.end + prevMatchLengthToSkip);
      }
      if (!(nodeToReplace !== void 0)) {
        formatDevErrorMessage(`${"nodeToReplace"} should not be undefined. You may want to check splitOffsets passed to the splitText.`);
      }
      const replacementNode = createNode(nodeToReplace);
      replacementNode.setFormat(nodeToReplace.getFormat());
      nodeToReplace.replace(replacementNode);
      if (currentNode == null) {
        return;
      }
      prevMatchLengthToSkip = 0;
      prevSibling = replacementNode;
    }
  };
  const $reverseNodeTransform = (node) => {
    const text = node.getTextContent();
    const match = getMatch(text);
    if (match === null || match.start !== 0) {
      $replaceWithSimpleText(node);
      return;
    }
    if (text.length > match.end) {
      node.splitText(match.end);
      return;
    }
    const prevSibling = node.getPreviousSibling();
    if ($isTextNode(prevSibling) && prevSibling.isTextEntity()) {
      $replaceWithSimpleText(prevSibling);
      $replaceWithSimpleText(node);
    }
    const nextSibling = node.getNextSibling();
    if ($isTextNode(nextSibling) && nextSibling.isTextEntity()) {
      $replaceWithSimpleText(nextSibling);
      if (isTargetNode(node)) {
        $replaceWithSimpleText(node);
      }
    }
  };
  const removePlainTextTransform = editor.registerNodeTransform(TextNode, $textNodeTransform);
  const removeReverseNodeTransform = editor.registerNodeTransform(targetNode, $reverseNodeTransform);
  return [removePlainTextTransform, removeReverseNodeTransform];
}
export {
  $canShowPlaceholder,
  $canShowPlaceholderCurry,
  $findTextIntersectionFromCharacters,
  $isRootTextContentEmpty,
  $isRootTextContentEmptyCurry,
  $rootTextContent,
  registerLexicalTextEntity
};
//# sourceMappingURL=LexicalText.dev-QEKWTNRJ.js.map