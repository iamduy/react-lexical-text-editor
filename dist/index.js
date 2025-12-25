import {
  $createImageNode,
  $isImageNode,
  ImageNode,
  KeywordNode,
  LexicalContentEditable,
  SharedHistoryContext,
  useSharedHistoryContext
} from "./chunk-DH4FOARK.js";
import "./chunk-5WRI5ZAA.js";

// src/App.tsx
import { LexicalCollaboration } from "@lexical/react/LexicalCollaborationContext";
import { LexicalComposer } from "@lexical/react/LexicalComposer";

// src/context/SettingsContext.tsx
import { createContext, useCallback, useContext, useMemo, useState } from "react";

// src/appSettings.ts
var DEFAULT_SETTINGS = {
  disableBeforeInput: false,
  emptyEditor: false,
  hasLinkAttributes: false,
  hasNestedTables: false,
  isAutocomplete: false,
  isCharLimit: false,
  isCharLimitUtf8: false,
  isCodeHighlighted: true,
  isCodeShiki: false,
  isCollab: false,
  isMaxLength: false,
  isRichText: true,
  listStrictIndent: false,
  measureTypingPerf: false,
  selectionAlwaysOnDisplay: false,
  shouldAllowHighlightingWithBrackets: false,
  shouldPreserveNewLinesInMarkdown: false,
  shouldUseLexicalContextMenu: false,
  showNestedEditorTreeView: false,
  showTableOfContents: false,
  showTreeView: true,
  tableCellBackgroundColor: true,
  tableCellMerge: true,
  tableHorizontalScroll: true,
  useCollabV2: false
};
var INITIAL_SETTINGS = {
  ...DEFAULT_SETTINGS
};

// src/context/SettingsContext.tsx
import { jsx } from "react/jsx-runtime";
var Context = createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setOption: (setting, value) => {
    return;
  },
  settings: INITIAL_SETTINGS
});
var SettingsContext = ({ children }) => {
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const setOption = useCallback((setting, value) => {
    setSettings((options) => ({
      ...options,
      [setting]: value
    }));
    setURLParam(setting, value);
  }, []);
  const contextValue = useMemo(() => {
    return { setOption, settings };
  }, [setOption, settings]);
  return /* @__PURE__ */ jsx(Context.Provider, { value: contextValue, children });
};
var useSettings = () => {
  return useContext(Context);
};
function setURLParam(param, value) {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  if (value !== DEFAULT_SETTINGS[param]) {
    params.set(param, String(value));
  } else {
    params.delete(param);
  }
  url.search = params.toString();
  window.history.pushState(null, "", url.toString());
}

// src/context/ToolbarContext.tsx
import {
  createContext as createContext2,
  useCallback as useCallback2,
  useContext as useContext2,
  useEffect,
  useMemo as useMemo2,
  useState as useState2
} from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var MIN_ALLOWED_FONT_SIZE = 8;
var MAX_ALLOWED_FONT_SIZE = 72;
var DEFAULT_FONT_SIZE = 15;
var blockTypeToBlockName = {
  bullet: "Bulleted List",
  check: "Check List",
  code: "Code Block",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
  number: "Numbered List",
  paragraph: "Normal",
  quote: "Quote"
};
var INITIAL_TOOLBAR_STATE = {
  bgColor: "#fff",
  blockType: "paragraph",
  canRedo: false,
  canUndo: false,
  codeLanguage: "",
  codeTheme: "",
  elementFormat: "left",
  fontColor: "#000",
  fontFamily: "Arial",
  // Current font size in px
  fontSize: `${DEFAULT_FONT_SIZE}px`,
  // Font size input value - for controlled input
  fontSizeInputValue: `${DEFAULT_FONT_SIZE}`,
  isBold: false,
  isCode: false,
  isHighlight: false,
  isImageCaption: false,
  isItalic: false,
  isLink: false,
  isRTL: false,
  isStrikethrough: false,
  isSubscript: false,
  isSuperscript: false,
  isUnderline: false,
  isLowercase: false,
  isUppercase: false,
  isCapitalize: false,
  rootType: "root",
  listStartNumber: null
};
var Context2 = createContext2(void 0);
var ToolbarContext = ({ children }) => {
  const [toolbarState, setToolbarState] = useState2(INITIAL_TOOLBAR_STATE);
  const selectionFontSize = toolbarState.fontSize;
  const updateToolbarState = useCallback2(
    (key, value) => {
      setToolbarState((prev) => ({
        ...prev,
        [key]: value
      }));
    },
    []
  );
  useEffect(() => {
    updateToolbarState("fontSizeInputValue", selectionFontSize.slice(0, -2));
  }, [selectionFontSize, updateToolbarState]);
  const contextValue = useMemo2(() => {
    return {
      toolbarState,
      updateToolbarState
    };
  }, [toolbarState, updateToolbarState]);
  return /* @__PURE__ */ jsx2(Context2.Provider, { value: contextValue, children });
};
var useToolbarState = () => {
  const context = useContext2(Context2);
  if (context === void 0) {
    throw new Error("useToolbarState must be used within a ToolbarProvider");
  }
  return context;
};

// src/ReactLexicalEditor.tsx
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { memo, useState as useState15 } from "react";

// src/plugins/DragDropPlugin.tsx
import { useLexicalComposerContext as useLexicalComposerContext2 } from "@lexical/react/LexicalComposerContext";
import { COMMAND_PRIORITY_LOW as COMMAND_PRIORITY_LOW2, DRAGOVER_COMMAND as DRAGOVER_COMMAND2, DROP_COMMAND as DROP_COMMAND2 } from "lexical";
import { useEffect as useEffect3 } from "react";

// src/plugins/ImagesPlugin/index.tsx
import { $isAutoLinkNode, $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $findMatchingParent, $wrapNodeInElement, mergeRegister } from "@lexical/utils";
import {
  $createParagraphNode,
  $createRangeSelection,
  $getSelection,
  $insertNodes,
  $isNodeSelection,
  $isRootOrShadowRoot,
  $setSelection,
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  createCommand,
  DRAGOVER_COMMAND,
  DRAGSTART_COMMAND,
  DROP_COMMAND,
  getDOMSelectionFromTarget,
  isHTMLElement
} from "lexical";
import { useEffect as useEffect2, useRef, useState as useState3 } from "react";

// src/utils/joinClasses.ts
function joinClasses(...args) {
  return args.filter(Boolean).join(" ");
}

// src/ui/Button.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Button({
  "data-test-id": dataTestId,
  children,
  className,
  onClick,
  disabled,
  small,
  title
}) {
  return /* @__PURE__ */ jsx3(
    "button",
    {
      disabled,
      className: joinClasses(
        "Button__root",
        disabled && "Button__disabled",
        small && "Button__small",
        className
      ),
      onClick,
      title,
      "aria-label": title,
      ...dataTestId && { "data-test-id": dataTestId },
      children
    }
  );
}

// src/ui/Dialog.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
function DialogButtonsList({ children }) {
  return /* @__PURE__ */ jsx4("div", { className: "DialogButtonsList", children });
}
function DialogActions({ "data-test-id": dataTestId, children }) {
  return /* @__PURE__ */ jsx4("div", { className: "DialogActions", "data-test-id": dataTestId, children });
}

// src/ui/FileInput.tsx
import { jsx as jsx5, jsxs } from "react/jsx-runtime";
function FileInput({
  accept,
  label,
  onChange,
  "data-test-id": dataTestId,
  disabled
}) {
  return /* @__PURE__ */ jsxs("div", { className: "Input__wrapper", children: [
    /* @__PURE__ */ jsx5("label", { className: "Input__label", children: label }),
    /* @__PURE__ */ jsx5(
      "input",
      {
        type: "file",
        accept,
        className: "Input__input",
        onChange: (e) => onChange(e.target.files),
        "data-test-id": dataTestId,
        disabled
      }
    )
  ] });
}

// src/ui/TextInput.tsx
import { jsx as jsx6, jsxs as jsxs2 } from "react/jsx-runtime";
function TextInput({
  label,
  value,
  onChange,
  placeholder = "",
  "data-test-id": dataTestId,
  type = "text",
  disabled
}) {
  return /* @__PURE__ */ jsxs2("div", { className: "Input__wrapper", children: [
    /* @__PURE__ */ jsx6("label", { className: "Input__label", children: label }),
    /* @__PURE__ */ jsx6(
      "input",
      {
        type,
        className: "Input__input",
        placeholder,
        value,
        onChange: (e) => {
          onChange(e.target.value);
        },
        "data-test-id": dataTestId,
        disabled
      }
    )
  ] });
}

// src/plugins/ImagesPlugin/index.tsx
import { Fragment, jsx as jsx7, jsxs as jsxs3 } from "react/jsx-runtime";
var INSERT_IMAGE_COMMAND = createCommand("INSERT_IMAGE_COMMAND");
function InsertImageUriDialogBody({
  onClick
}) {
  const [src, setSrc] = useState3("");
  const [altText, setAltText] = useState3("");
  const isDisabled = src === "";
  return /* @__PURE__ */ jsxs3(Fragment, { children: [
    /* @__PURE__ */ jsx7(
      TextInput,
      {
        label: "Image URL",
        placeholder: "i.e. https://source.unsplash.com/random",
        onChange: setSrc,
        value: src,
        "data-test-id": "image-modal-url-input"
      }
    ),
    /* @__PURE__ */ jsx7(
      TextInput,
      {
        label: "Alt Text",
        placeholder: "Random unsplash image",
        onChange: setAltText,
        value: altText,
        "data-test-id": "image-modal-alt-text-input"
      }
    ),
    /* @__PURE__ */ jsx7(DialogActions, { children: /* @__PURE__ */ jsx7(
      Button,
      {
        "data-test-id": "image-modal-confirm-btn",
        disabled: isDisabled,
        onClick: () => onClick({ altText, src }),
        children: "Confirm"
      }
    ) })
  ] });
}
function InsertImageUploadedDialogBody({
  onClick,
  onUpload
}) {
  const [src, setSrc] = useState3("");
  const [altText, setAltText] = useState3("");
  const [isUploading, setIsUploading] = useState3(false);
  const isDisabled = src === "" || isUploading;
  const loadImage = (files) => {
    if (files !== null && files.length > 0) {
      setIsUploading(true);
      onUpload?.(files[0]).then((url) => {
        if (url) {
          setSrc(url);
        }
        setIsUploading(false);
      }).catch(() => {
        setIsUploading(false);
      });
    }
  };
  return /* @__PURE__ */ jsxs3(Fragment, { children: [
    /* @__PURE__ */ jsx7(
      FileInput,
      {
        label: "Image Upload",
        onChange: loadImage,
        accept: "image/*",
        "data-test-id": "image-modal-file-upload",
        disabled: isUploading
      }
    ),
    /* @__PURE__ */ jsx7(
      TextInput,
      {
        label: "Alt Text",
        placeholder: "Descriptive alternative text",
        onChange: setAltText,
        value: altText,
        "data-test-id": "image-modal-alt-text-input",
        disabled: isUploading
      }
    ),
    /* @__PURE__ */ jsx7(DialogActions, { children: /* @__PURE__ */ jsx7(
      Button,
      {
        "data-test-id": "image-modal-file-upload-btn",
        disabled: isDisabled,
        onClick: () => {
          onClick({ altText, src });
        },
        children: "Confirm"
      }
    ) })
  ] });
}
function InsertImageDialog({
  activeEditor,
  onClose,
  onUpload
}) {
  const [mode, setMode] = useState3(null);
  const hasModifier = useRef(false);
  useEffect2(() => {
    hasModifier.current = false;
    const handler = (e) => {
      hasModifier.current = e.altKey;
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [activeEditor]);
  const onClick = (payload) => {
    activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
    onClose();
  };
  return /* @__PURE__ */ jsxs3(Fragment, { children: [
    !mode && /* @__PURE__ */ jsxs3(DialogButtonsList, { children: [
      /* @__PURE__ */ jsx7(Button, { "data-test-id": "image-modal-option-url", onClick: () => setMode("url"), children: "URL" }),
      /* @__PURE__ */ jsx7(Button, { "data-test-id": "image-modal-option-file", onClick: () => setMode("file"), children: "File" })
    ] }),
    mode === "url" && /* @__PURE__ */ jsx7(InsertImageUriDialogBody, { onClick }),
    mode === "file" && /* @__PURE__ */ jsx7(InsertImageUploadedDialogBody, { onClick, onUpload })
  ] });
}
function ImagesPlugin({
  captionsEnabled
}) {
  const [editor] = useLexicalComposerContext();
  useEffect2(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error("ImagesPlugin: ImageNode not registered on editor");
    }
    return mergeRegister(
      editor.registerCommand(
        INSERT_IMAGE_COMMAND,
        (payload) => {
          const imageNode = $createImageNode(payload);
          $insertNodes([imageNode]);
          if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
            $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
          }
          return true;
        },
        COMMAND_PRIORITY_EDITOR
      ),
      editor.registerCommand(
        DRAGSTART_COMMAND,
        (event) => {
          return $onDragStart(event);
        },
        COMMAND_PRIORITY_HIGH
      ),
      editor.registerCommand(
        DRAGOVER_COMMAND,
        (event) => {
          return $onDragover(event);
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        DROP_COMMAND,
        (event) => {
          return $onDrop(event, editor);
        },
        COMMAND_PRIORITY_HIGH
      )
    );
  }, [captionsEnabled, editor]);
  return null;
}
var TRANSPARENT_IMAGE = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
function $onDragStart(event) {
  const node = $getImageNodeInSelection();
  if (!node) {
    return false;
  }
  const dataTransfer = event.dataTransfer;
  if (!dataTransfer) {
    return false;
  }
  dataTransfer.setData("text/plain", "_");
  const img = document.createElement("img");
  img.src = TRANSPARENT_IMAGE;
  dataTransfer.setDragImage(img, 0, 0);
  dataTransfer.setData(
    "application/x-lexical-drag",
    JSON.stringify({
      data: {
        altText: node.__altText,
        caption: node.__caption,
        height: node.__height,
        key: node.getKey(),
        maxWidth: node.__maxWidth,
        showCaption: node.__showCaption,
        src: node.__src,
        width: node.__width
      },
      type: "image"
    })
  );
  return true;
}
function $onDragover(event) {
  const node = $getImageNodeInSelection();
  if (!node) {
    return false;
  }
  if (!canDropImage(event)) {
    event.preventDefault();
  }
  return false;
}
function $onDrop(event, editor) {
  const node = $getImageNodeInSelection();
  if (!node) {
    return false;
  }
  const data = getDragImageData(event);
  if (!data) {
    return false;
  }
  const existingLink = $findMatchingParent(
    node,
    (parent) => !$isAutoLinkNode(parent) && $isLinkNode(parent)
  );
  event.preventDefault();
  if (canDropImage(event)) {
    const range = getDragSelection(event);
    node.remove();
    const rangeSelection = $createRangeSelection();
    if (range !== null && range !== void 0) {
      rangeSelection.applyDOMRange(range);
    }
    $setSelection(rangeSelection);
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, data);
    if (existingLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, existingLink.getURL());
    }
  }
  return true;
}
function $getImageNodeInSelection() {
  const selection = $getSelection();
  if (!$isNodeSelection(selection)) {
    return null;
  }
  const nodes = selection.getNodes();
  const node = nodes[0];
  return $isImageNode(node) ? node : null;
}
function getDragImageData(event) {
  const dragData = event.dataTransfer?.getData("application/x-lexical-drag");
  if (!dragData) {
    return null;
  }
  const { type, data } = JSON.parse(dragData);
  if (type !== "image") {
    return null;
  }
  return data;
}
function canDropImage(event) {
  const target = event.target;
  return !!(isHTMLElement(target) && !target.closest("code, span.editor-image") && isHTMLElement(target.parentElement) && target.parentElement.closest("div.ContentEditable__root"));
}
function getDragSelection(event) {
  let range;
  const domSelection = getDOMSelectionFromTarget(event.target);
  if (document.caretRangeFromPoint) {
    range = document.caretRangeFromPoint(event.clientX, event.clientY);
  } else if (event.rangeParent && domSelection !== null) {
    domSelection.collapse(event.rangeParent, event.rangeOffset || 0);
    range = domSelection.getRangeAt(0);
  } else {
    throw Error(`Cannot get the selection when dragging`);
  }
  return range;
}

// src/plugins/DragDropPlugin.tsx
function DragDropPastePlugin({
  onUpload
}) {
  const [editor] = useLexicalComposerContext2();
  useEffect3(() => {
    return editor.registerCommand(
      DRAGOVER_COMMAND2,
      (event) => {
        event.preventDefault();
        return true;
      },
      COMMAND_PRIORITY_LOW2
    );
  }, [editor]);
  useEffect3(() => {
    return editor.registerCommand(
      DROP_COMMAND2,
      (event) => {
        event.preventDefault();
        const files = event.dataTransfer?.files;
        if (files && files.length > 0) {
          const file = files[0];
          if (file.type.startsWith("image/")) {
            onUpload?.(file).then((url) => {
              if (url) {
                editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                  altText: file.name,
                  src: url
                });
              }
            });
          }
        }
        return true;
      },
      COMMAND_PRIORITY_LOW2
    );
  }, [editor, onUpload]);
  useEffect3(() => {
    const handlePaste = (event) => {
      const items = event.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            const file = items[i].getAsFile();
            if (file) {
              onUpload?.(file).then((url) => {
                if (url) {
                  editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                    altText: file.name,
                    src: url
                  });
                }
              });
            }
          }
        }
      }
    };
    return editor.registerRootListener((rootElement, prevRootElement) => {
      if (prevRootElement) {
        prevRootElement.removeEventListener("paste", handlePaste);
      }
      if (rootElement) {
        rootElement.addEventListener("paste", handlePaste);
      }
    });
  }, [editor, onUpload]);
  return null;
}

// src/plugins/FloatingLinkEditorPlugin/index.tsx
import { $createLinkNode, $isAutoLinkNode as $isAutoLinkNode2, $isLinkNode as $isLinkNode2, TOGGLE_LINK_COMMAND as TOGGLE_LINK_COMMAND2 } from "@lexical/link";
import { useLexicalComposerContext as useLexicalComposerContext3 } from "@lexical/react/LexicalComposerContext";
import { $findMatchingParent as $findMatchingParent2, mergeRegister as mergeRegister2 } from "@lexical/utils";
import {
  $getSelection as $getSelection2,
  $isLineBreakNode,
  $isNodeSelection as $isNodeSelection2,
  $isRangeSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_HIGH as COMMAND_PRIORITY_HIGH2,
  COMMAND_PRIORITY_LOW as COMMAND_PRIORITY_LOW3,
  getDOMSelection,
  KEY_ESCAPE_COMMAND,
  SELECTION_CHANGE_COMMAND
} from "lexical";
import { useCallback as useCallback3, useEffect as useEffect4, useRef as useRef2, useState as useState4 } from "react";
import { createPortal } from "react-dom";

// src/utils/getSelectedNode.ts
import { $isAtNodeEnd } from "@lexical/selection";
function getSelectedNode(selection) {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  } else {
    return $isAtNodeEnd(anchor) ? anchorNode : focusNode;
  }
}

// src/utils/setFloatingElemPositionForLinkEditor.ts
var VERTICAL_GAP = 10;
var HORIZONTAL_OFFSET = 5;
function setFloatingElemPositionForLinkEditor(targetRect, floatingElem, anchorElem, verticalGap = VERTICAL_GAP, horizontalOffset = HORIZONTAL_OFFSET) {
  const scrollerElem = anchorElem.parentElement;
  if (targetRect === null || !scrollerElem) {
    floatingElem.style.opacity = "0";
    floatingElem.style.transform = "translate(-10000px, -10000px)";
    return;
  }
  const floatingElemRect = floatingElem.getBoundingClientRect();
  const anchorElementRect = anchorElem.getBoundingClientRect();
  const editorScrollerRect = scrollerElem.getBoundingClientRect();
  let top = targetRect.top - verticalGap;
  let left = targetRect.left - horizontalOffset;
  if (top < editorScrollerRect.top) {
    top += floatingElemRect.height + targetRect.height + verticalGap * 2;
  }
  if (left + floatingElemRect.width > editorScrollerRect.right) {
    left = editorScrollerRect.right - floatingElemRect.width - horizontalOffset;
  }
  top -= anchorElementRect.top;
  left -= anchorElementRect.left;
  floatingElem.style.opacity = "1";
  floatingElem.style.transform = `translate(${left}px, ${top}px)`;
}

// src/utils/url.ts
var SUPPORTED_URL_PROTOCOLS = /* @__PURE__ */ new Set(["http:", "https:", "mailto:", "sms:", "tel:"]);
function sanitizeUrl(url) {
  try {
    const parsedUrl = new URL(url);
    if (!SUPPORTED_URL_PROTOCOLS.has(parsedUrl.protocol)) {
      return "about:blank";
    }
  } catch {
    return url;
  }
  return url;
}
var urlRegExp = new RegExp(
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/
);

// src/plugins/FloatingLinkEditorPlugin/index.tsx
import { Fragment as Fragment2, jsx as jsx8, jsxs as jsxs4 } from "react/jsx-runtime";
function preventDefault(event) {
  event.preventDefault();
}
function FloatingLinkEditor({
  editor,
  isLink,
  setIsLink,
  anchorElem,
  isLinkEditMode,
  setIsLinkEditMode
}) {
  const editorRef = useRef2(null);
  const inputRef = useRef2(null);
  const [linkUrl, setLinkUrl] = useState4("");
  const [editedLinkUrl, setEditedLinkUrl] = useState4("https://");
  const [lastSelection, setLastSelection] = useState4(null);
  const $updateLinkEditor = useCallback3(() => {
    const selection = $getSelection2();
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      const linkParent = $findMatchingParent2(node, $isLinkNode2);
      if (linkParent) {
        setLinkUrl(linkParent.getURL());
      } else if ($isLinkNode2(node)) {
        setLinkUrl(node.getURL());
      } else {
        setLinkUrl("");
      }
      if (isLinkEditMode) {
        setEditedLinkUrl(linkUrl);
      }
    } else if ($isNodeSelection2(selection)) {
      const nodes = selection.getNodes();
      if (nodes.length > 0) {
        const node = nodes[0];
        const parent = node.getParent();
        if ($isLinkNode2(parent)) {
          setLinkUrl(parent.getURL());
        } else if ($isLinkNode2(node)) {
          setLinkUrl(node.getURL());
        } else {
          setLinkUrl("");
        }
        if (isLinkEditMode) {
          setEditedLinkUrl(linkUrl);
        }
      }
    }
    const editorElem = editorRef.current;
    const nativeSelection = getDOMSelection(editor._window);
    const activeElement = document.activeElement;
    if (editorElem === null) {
      return;
    }
    const rootElement = editor.getRootElement();
    if (selection !== null && rootElement !== null && editor.isEditable()) {
      let domRect;
      if ($isNodeSelection2(selection)) {
        const nodes = selection.getNodes();
        if (nodes.length > 0) {
          const element = editor.getElementByKey(nodes[0].getKey());
          if (element) {
            domRect = element.getBoundingClientRect();
          }
        }
      } else if (nativeSelection !== null && rootElement.contains(nativeSelection.anchorNode)) {
        domRect = nativeSelection.focusNode?.parentElement?.getBoundingClientRect();
      }
      if (domRect) {
        domRect.y += 40;
        setFloatingElemPositionForLinkEditor(domRect, editorElem, anchorElem);
      }
      setLastSelection(selection);
    } else if (!activeElement || activeElement.className !== "link-input") {
      if (rootElement !== null) {
        setFloatingElemPositionForLinkEditor(null, editorElem, anchorElem);
      }
      setLastSelection(null);
      setIsLinkEditMode(false);
      setLinkUrl("");
    }
    return true;
  }, [anchorElem, editor, setIsLinkEditMode, isLinkEditMode, linkUrl]);
  useEffect4(() => {
    const scrollerElem = anchorElem.parentElement;
    const update = () => {
      editor.getEditorState().read(() => {
        $updateLinkEditor();
      });
    };
    window.addEventListener("resize", update);
    if (scrollerElem) {
      scrollerElem.addEventListener("scroll", update);
    }
    return () => {
      window.removeEventListener("resize", update);
      if (scrollerElem) {
        scrollerElem.removeEventListener("scroll", update);
      }
    };
  }, [anchorElem.parentElement, editor, $updateLinkEditor]);
  useEffect4(() => {
    return mergeRegister2(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateLinkEditor();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          $updateLinkEditor();
          return true;
        },
        COMMAND_PRIORITY_LOW3
      ),
      editor.registerCommand(
        KEY_ESCAPE_COMMAND,
        () => {
          if (isLink) {
            setIsLink(false);
            return true;
          }
          return false;
        },
        COMMAND_PRIORITY_HIGH2
      )
    );
  }, [editor, $updateLinkEditor, setIsLink, isLink]);
  useEffect4(() => {
    editor.getEditorState().read(() => {
      $updateLinkEditor();
    });
  }, [editor, $updateLinkEditor]);
  useEffect4(() => {
    if (isLinkEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLinkEditMode, isLink]);
  useEffect4(() => {
    const editorElement = editorRef.current;
    if (editorElement === null) {
      return;
    }
    const handleBlur = (event) => {
      if (!editorElement.contains(event.relatedTarget) && isLink) {
        setIsLink(false);
        setIsLinkEditMode(false);
      }
    };
    editorElement.addEventListener("focusout", handleBlur);
    return () => {
      editorElement.removeEventListener("focusout", handleBlur);
    };
  }, [editorRef, setIsLink, setIsLinkEditMode, isLink]);
  const monitorInputInteraction = (event) => {
    if (event.key === "Enter") {
      handleLinkSubmission(event);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setIsLinkEditMode(false);
    }
  };
  const handleLinkSubmission = (event) => {
    event.preventDefault();
    if (lastSelection !== null) {
      if (linkUrl !== "") {
        editor.update(() => {
          editor.dispatchCommand(TOGGLE_LINK_COMMAND2, sanitizeUrl(editedLinkUrl));
          const selection = $getSelection2();
          if ($isRangeSelection(selection)) {
            const parent = getSelectedNode(selection).getParent();
            if ($isAutoLinkNode2(parent)) {
              const linkNode = $createLinkNode(parent.getURL(), {
                rel: parent.__rel,
                target: parent.__target,
                title: parent.__title
              });
              parent.replace(linkNode, true);
            }
          }
        });
      }
      setEditedLinkUrl("https://");
      setIsLinkEditMode(false);
    }
  };
  return /* @__PURE__ */ jsx8("div", { ref: editorRef, className: "link-editor", children: !isLink ? null : isLinkEditMode ? /* @__PURE__ */ jsxs4(Fragment2, { children: [
    /* @__PURE__ */ jsx8(
      "input",
      {
        ref: inputRef,
        className: "link-input",
        value: editedLinkUrl,
        onChange: (event) => {
          setEditedLinkUrl(event.target.value);
        },
        onKeyDown: (event) => {
          monitorInputInteraction(event);
        }
      }
    ),
    /* @__PURE__ */ jsxs4("div", { children: [
      /* @__PURE__ */ jsx8(
        "div",
        {
          className: "link-cancel",
          role: "button",
          tabIndex: 0,
          onMouseDown: preventDefault,
          onClick: () => {
            setIsLinkEditMode(false);
          }
        }
      ),
      /* @__PURE__ */ jsx8(
        "div",
        {
          className: "link-confirm",
          role: "button",
          tabIndex: 0,
          onMouseDown: preventDefault,
          onClick: handleLinkSubmission
        }
      )
    ] })
  ] }) : /* @__PURE__ */ jsxs4("div", { className: "link-view", children: [
    /* @__PURE__ */ jsx8("a", { href: sanitizeUrl(linkUrl), target: "_blank", rel: "noopener noreferrer", children: linkUrl }),
    /* @__PURE__ */ jsx8(
      "div",
      {
        className: "link-edit",
        role: "button",
        tabIndex: 0,
        onMouseDown: preventDefault,
        onClick: (event) => {
          event.preventDefault();
          setEditedLinkUrl(linkUrl);
          setIsLinkEditMode(true);
        }
      }
    ),
    /* @__PURE__ */ jsx8(
      "div",
      {
        className: "link-trash",
        role: "button",
        tabIndex: 0,
        onMouseDown: preventDefault,
        onClick: () => {
          editor.dispatchCommand(TOGGLE_LINK_COMMAND2, null);
        }
      }
    )
  ] }) });
}
function useFloatingLinkEditorToolbar(editor, anchorElem, isLinkEditMode, setIsLinkEditMode) {
  const [activeEditor, setActiveEditor] = useState4(editor);
  const [isLink, setIsLink] = useState4(false);
  useEffect4(() => {
    function $updateToolbar() {
      const selection = $getSelection2();
      if ($isRangeSelection(selection)) {
        const focusNode = getSelectedNode(selection);
        const focusLinkNode = $findMatchingParent2(focusNode, $isLinkNode2);
        const focusAutoLinkNode = $findMatchingParent2(focusNode, $isAutoLinkNode2);
        if (!(focusLinkNode || focusAutoLinkNode)) {
          setIsLink(false);
          return;
        }
        const badNode = selection.getNodes().filter((node) => !$isLineBreakNode(node)).find((node) => {
          const linkNode = $findMatchingParent2(node, $isLinkNode2);
          const autoLinkNode = $findMatchingParent2(node, $isAutoLinkNode2);
          return focusLinkNode && !focusLinkNode.is(linkNode) || linkNode && !linkNode.is(focusLinkNode) || focusAutoLinkNode && !focusAutoLinkNode.is(autoLinkNode) || autoLinkNode && (!autoLinkNode.is(focusAutoLinkNode) || autoLinkNode.getIsUnlinked());
        });
        if (!badNode) {
          setIsLink(true);
        } else {
          setIsLink(false);
        }
      } else if ($isNodeSelection2(selection)) {
        const nodes = selection.getNodes();
        if (nodes.length === 0) {
          setIsLink(false);
          return;
        }
        const node = nodes[0];
        const parent = node.getParent();
        if ($isLinkNode2(parent) || $isLinkNode2(node)) {
          setIsLink(true);
        } else {
          setIsLink(false);
        }
      }
    }
    return mergeRegister2(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          $updateToolbar();
          setActiveEditor(newEditor);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      editor.registerCommand(
        CLICK_COMMAND,
        (payload) => {
          const selection = $getSelection2();
          if ($isRangeSelection(selection)) {
            const node = getSelectedNode(selection);
            const linkNode = $findMatchingParent2(node, $isLinkNode2);
            if ($isLinkNode2(linkNode) && (payload.metaKey || payload.ctrlKey)) {
              window.open(linkNode.getURL(), "_blank");
              return true;
            }
          }
          return false;
        },
        COMMAND_PRIORITY_LOW3
      )
    );
  }, [editor]);
  return createPortal(
    /* @__PURE__ */ jsx8(
      FloatingLinkEditor,
      {
        editor: activeEditor,
        isLink,
        anchorElem,
        setIsLink,
        isLinkEditMode,
        setIsLinkEditMode
      }
    ),
    anchorElem
  );
}
function FloatingLinkEditorPlugin({
  anchorElem = document.body,
  isLinkEditMode,
  setIsLinkEditMode
}) {
  const [editor] = useLexicalComposerContext3();
  return useFloatingLinkEditorToolbar(editor, anchorElem, isLinkEditMode, setIsLinkEditMode);
}

// src/plugins/InitialValuePlugin.tsx
import { useLexicalComposerContext as useLexicalComposerContext4 } from "@lexical/react/LexicalComposerContext";
import { useEffect as useEffect5, useState as useState5 } from "react";

// src/utils/htmlSerializer.ts
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { $getRoot } from "lexical";
var lexicalToHtml = (editor, editorState) => {
  let html = "";
  editorState.read(() => {
    html = $generateHtmlFromNodes(editor, null);
  });
  if (html === '<p class="editor-paragraph"><br></p>' || html === '<p class="editor-paragraph"></p>') {
    return "";
  }
  return html;
};
var htmlToLexical = (editor, html) => {
  editor.update(() => {
    const parser = new DOMParser();
    const dom = parser.parseFromString(html || "", "text/html");
    const nodes = $generateNodesFromDOM(editor, dom);
    const root = $getRoot();
    root.clear();
    root.append(...nodes);
  });
};

// src/plugins/InitialValuePlugin.tsx
function InitialValuePlugin({ value }) {
  const [editor] = useLexicalComposerContext4();
  const [isFirstRender, setIsFirstRender] = useState5(true);
  useEffect5(() => {
    if (isFirstRender && value) {
      htmlToLexical(editor, value);
      setIsFirstRender(false);
    }
  }, [editor, value, isFirstRender]);
  return null;
}

// src/plugins/TableActionMenuPlugin/index.tsx
import { useLexicalComposerContext as useLexicalComposerContext5 } from "@lexical/react/LexicalComposerContext";
import { useLexicalEditable } from "@lexical/react/useLexicalEditable";
import {
  $computeTableMapSkipCellCheck,
  $deleteTableColumnAtSelection,
  $deleteTableRowAtSelection,
  $getNodeTriplet,
  $getTableCellNodeFromLexicalNode,
  $getTableColumnIndexFromTableCellNode,
  $getTableNodeFromLexicalNodeOrThrow,
  $getTableRowIndexFromTableCellNode,
  $insertTableColumnAtSelection,
  $insertTableRowAtSelection,
  $isTableCellNode,
  $isTableSelection,
  $mergeCells,
  $unmergeCell,
  getTableElement,
  getTableObserverFromTableElement,
  TableCellHeaderStates,
  TableCellNode
} from "@lexical/table";
import { mergeRegister as mergeRegister3 } from "@lexical/utils";
import {
  $getSelection as $getSelection3,
  $isElementNode,
  $isRangeSelection as $isRangeSelection2,
  $isTextNode,
  $setSelection as $setSelection2,
  COMMAND_PRIORITY_CRITICAL as COMMAND_PRIORITY_CRITICAL2,
  getDOMSelection as getDOMSelection2,
  isDOMNode as isDOMNode3,
  SELECTION_CHANGE_COMMAND as SELECTION_CHANGE_COMMAND2
} from "lexical";
import { useCallback as useCallback6, useEffect as useEffect8, useRef as useRef6, useState as useState9 } from "react";
import { createPortal as createPortal4 } from "react-dom";

// src/ui/DropDown.tsx
import { isDOMNode } from "lexical";
import * as React2 from "react";
import { useCallback as useCallback4, useEffect as useEffect6, useMemo as useMemo3, useRef as useRef3, useState as useState6 } from "react";
import { createPortal as createPortal2 } from "react-dom";

// src/utils/focusUtils.ts
var findFirstFocusableDescendant = (startElement) => {
  const focusableSelector = "button, a[href], input, select, textarea, details, summary [tabindex], [contenteditable]";
  const focusableDescendants = startElement.querySelector(focusableSelector);
  return focusableDescendants;
};
var focusNearestDescendant = (startElement) => {
  const el = findFirstFocusableDescendant(startElement);
  el?.focus();
  return el;
};
var isKeyboardInput = (event) => {
  if ("pointerId" in event && "pointerType" in event) {
    return event.pointerId === -1 && event.pointerType === "";
  }
  return event?.detail === 0;
};

// src/ui/DropDown.tsx
import { Fragment as Fragment3, jsx as jsx9, jsxs as jsxs5 } from "react/jsx-runtime";
var DropDownContext = React2.createContext(null);
var dropDownPadding = 4;
function DropDownItem({
  children,
  className,
  onClick,
  title
}) {
  const ref = useRef3(null);
  const dropDownContext = React2.useContext(DropDownContext);
  if (dropDownContext === null) {
    throw new Error("DropDownItem must be used within a DropDown");
  }
  const { registerItem } = dropDownContext;
  useEffect6(() => {
    if (ref && ref.current) {
      registerItem(ref);
    }
  }, [ref, registerItem]);
  return /* @__PURE__ */ jsx9("button", { className, onClick, ref, title, type: "button", children });
}
function DropDownItems({
  children,
  dropDownRef,
  onClose,
  autofocus
}) {
  const [items, setItems] = useState6();
  const [highlightedItem, setHighlightedItem] = useState6();
  const registerItem = useCallback4(
    (itemRef) => {
      setItems((prev) => prev ? [...prev, itemRef] : [itemRef]);
    },
    [setItems]
  );
  const handleKeyDown = (event) => {
    const key = event.key;
    if (key === "Escape") {
      onClose();
    }
    if (!items) {
      return;
    }
    if (["Escape", "ArrowUp", "ArrowDown", "Tab"].includes(key)) {
      event.preventDefault();
    }
    if (key === "Escape" || key === "Tab") {
      onClose();
    } else if (key === "ArrowUp") {
      setHighlightedItem((prev) => {
        if (!prev) {
          return items[0];
        }
        const index = items.indexOf(prev) - 1;
        return items[index === -1 ? items.length - 1 : index];
      });
    } else if (key === "ArrowDown") {
      setHighlightedItem((prev) => {
        if (!prev) {
          return items[0];
        }
        return items[items.indexOf(prev) + 1];
      });
    }
  };
  const contextValue = useMemo3(
    () => ({
      registerItem
    }),
    [registerItem]
  );
  useEffect6(() => {
    if (items && !highlightedItem) {
      setHighlightedItem(items[0]);
    }
    if (highlightedItem && highlightedItem.current) {
      highlightedItem.current.focus();
    }
  }, [items, highlightedItem]);
  useEffect6(() => {
    if (autofocus && dropDownRef.current) {
      focusNearestDescendant(dropDownRef.current);
    }
  }, [autofocus, dropDownRef]);
  return /* @__PURE__ */ jsx9(DropDownContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx9("div", { className: "_dropdown", ref: dropDownRef, onKeyDown: handleKeyDown, children }) });
}
function DropDown({
  disabled = false,
  buttonLabel,
  buttonAriaLabel,
  buttonClassName,
  buttonIconClassName,
  children,
  stopCloseOnClickSelf
}) {
  const dropDownRef = useRef3(null);
  const buttonRef = useRef3(null);
  const [showDropDown, setShowDropDown] = useState6(false);
  const [shouldAutofocus, setShouldAutofocus] = useState6(false);
  const handleClose = () => {
    setShowDropDown(false);
    if (buttonRef && buttonRef.current) {
      buttonRef.current.focus();
    }
  };
  useEffect6(() => {
    const button = buttonRef.current;
    const dropDown = dropDownRef.current;
    if (showDropDown && button !== null && dropDown !== null) {
      const { top, left } = button.getBoundingClientRect();
      dropDown.style.top = `${top + button.offsetHeight + dropDownPadding}px`;
      dropDown.style.left = `${Math.min(left, window.innerWidth - dropDown.offsetWidth - 20)}px`;
    }
  }, [dropDownRef, buttonRef, showDropDown]);
  useEffect6(() => {
    const button = buttonRef.current;
    if (button !== null && showDropDown) {
      const handle = (event) => {
        const target = event.target;
        if (!isDOMNode(target)) {
          return;
        }
        const targetIsDropDownItem = dropDownRef.current && dropDownRef.current.contains(target);
        if (stopCloseOnClickSelf && targetIsDropDownItem) {
          return;
        }
        if (!button.contains(target)) {
          setShowDropDown(false);
          if (targetIsDropDownItem && isKeyboardInput(event)) {
            button.focus();
          }
        }
      };
      document.addEventListener("click", handle);
      return () => {
        document.removeEventListener("click", handle);
      };
    }
  }, [dropDownRef, buttonRef, showDropDown, stopCloseOnClickSelf]);
  useEffect6(() => {
    const handleButtonPositionUpdate = () => {
      if (showDropDown) {
        const button = buttonRef.current;
        const dropDown = dropDownRef.current;
        if (button !== null && dropDown !== null) {
          const { top } = button.getBoundingClientRect();
          const newPosition = top + button.offsetHeight + dropDownPadding;
          if (newPosition !== dropDown.getBoundingClientRect().top) {
            dropDown.style.top = `${newPosition}px`;
          }
        }
      }
    };
    document.addEventListener("scroll", handleButtonPositionUpdate);
    return () => {
      document.removeEventListener("scroll", handleButtonPositionUpdate);
    };
  }, [buttonRef, dropDownRef, showDropDown]);
  const handleOnClick = (e) => {
    setShowDropDown(!showDropDown);
    setShouldAutofocus(isKeyboardInput(e));
  };
  return /* @__PURE__ */ jsxs5(Fragment3, { children: [
    /* @__PURE__ */ jsxs5(
      "button",
      {
        type: "button",
        disabled,
        "aria-label": buttonAriaLabel || buttonLabel,
        className: buttonClassName,
        onClick: handleOnClick,
        ref: buttonRef,
        children: [
          buttonIconClassName && /* @__PURE__ */ jsx9("span", { className: buttonIconClassName }),
          buttonLabel && /* @__PURE__ */ jsx9("span", { className: "text dropdown-button-text", children: buttonLabel }),
          /* @__PURE__ */ jsx9("i", { className: "chevron-down" })
        ]
      }
    ),
    showDropDown && createPortal2(
      /* @__PURE__ */ jsx9(
        DropDownItems,
        {
          dropDownRef,
          onClose: handleClose,
          autofocus: shouldAutofocus,
          children
        }
      ),
      document.body
    )
  ] });
}

// src/hooks/useModal.tsx
import { useCallback as useCallback5, useMemo as useMemo4, useState as useState7 } from "react";

// src/ui/Modal.tsx
import { isDOMNode as isDOMNode2 } from "lexical";
import { useEffect as useEffect7, useRef as useRef4 } from "react";
import { createPortal as createPortal3 } from "react-dom";
import { jsx as jsx10, jsxs as jsxs6 } from "react/jsx-runtime";
function PortalImpl({
  onClose,
  children,
  title,
  closeOnClickOutside
}) {
  const modalRef = useRef4(null);
  useEffect7(() => {
    if (modalRef.current !== null) {
      modalRef.current.focus();
    }
  }, []);
  useEffect7(() => {
    let modalOverlayElement = null;
    const handler = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    const clickOutsideHandler = (event) => {
      const target = event.target;
      if (modalRef.current !== null && isDOMNode2(target) && !modalRef.current.contains(target) && closeOnClickOutside) {
        onClose();
      }
    };
    const modelElement = modalRef.current;
    if (modelElement !== null) {
      modalOverlayElement = modelElement.parentElement;
      if (modalOverlayElement !== null) {
        modalOverlayElement.addEventListener("click", clickOutsideHandler);
      }
    }
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      if (modalOverlayElement !== null) {
        modalOverlayElement?.removeEventListener("click", clickOutsideHandler);
      }
    };
  }, [closeOnClickOutside, onClose]);
  return /* @__PURE__ */ jsx10("div", { className: "Modal__overlay", role: "dialog", children: /* @__PURE__ */ jsxs6("div", { className: "Modal__modal", tabIndex: -1, ref: modalRef, children: [
    /* @__PURE__ */ jsx10("h2", { className: "Modal__title", children: title }),
    /* @__PURE__ */ jsx10(
      "button",
      {
        className: "Modal__closeButton",
        "aria-label": "Close modal",
        type: "button",
        onClick: onClose,
        children: "X"
      }
    ),
    /* @__PURE__ */ jsx10("div", { className: "Modal__content", children })
  ] }) });
}
function Modal({
  onClose,
  children,
  title,
  closeOnClickOutside = false
}) {
  return createPortal3(
    /* @__PURE__ */ jsx10(PortalImpl, { onClose, title, closeOnClickOutside, children }),
    document.body
  );
}

// src/hooks/useModal.tsx
import { jsx as jsx11 } from "react/jsx-runtime";
function useModal() {
  const [modalContent, setModalContent] = useState7(null);
  const onClose = useCallback5(() => {
    setModalContent(null);
  }, []);
  const modal = useMemo4(() => {
    if (modalContent === null) {
      return null;
    }
    const { title, content, closeOnClickOutside } = modalContent;
    return /* @__PURE__ */ jsx11(Modal, { onClose, title, closeOnClickOutside, children: content });
  }, [modalContent, onClose]);
  const showModal = useCallback5(
    (title, getContent, closeOnClickOutside = false) => {
      setModalContent({
        closeOnClickOutside,
        content: getContent(onClose),
        title
      });
    },
    [onClose]
  );
  return [modal, showModal];
}

// src/ui/ColorPicker.tsx
import { calculateZoomLevel } from "@lexical/utils";
import { useMemo as useMemo5, useRef as useRef5, useState as useState8 } from "react";
import { jsx as jsx12, jsxs as jsxs7 } from "react/jsx-runtime";
var skipAddingToHistoryStack = false;
var basicColors = [
  "#d0021b",
  "#f5a623",
  "#f8e71c",
  "#8b572a",
  "#7ed321",
  "#417505",
  "#bd10e0",
  "#9013fe",
  "#4a90e2",
  "#50e3c2",
  "#b8e986",
  "#000000",
  "#4a4a4a",
  "#9b9b9b",
  "#ffffff"
];
var WIDTH = 214;
var HEIGHT = 150;
function ColorPicker({ color, onChange }) {
  const [selfColor, setSelfColor] = useState8(transformColor("hex", color));
  const [inputColor, setInputColor] = useState8(transformColor("hex", color).hex);
  const innerDivRef = useRef5(null);
  const saturationPosition = useMemo5(
    () => ({
      x: selfColor.hsv.s / 100 * WIDTH,
      y: (100 - selfColor.hsv.v) / 100 * HEIGHT
    }),
    [selfColor.hsv.s, selfColor.hsv.v]
  );
  const huePosition = useMemo5(
    () => ({
      x: selfColor.hsv.h / 360 * WIDTH
    }),
    [selfColor.hsv]
  );
  const emitOnChange = (newColor, skipRefocus = false) => {
    if (innerDivRef.current !== null && onChange) {
      onChange(newColor, skipAddingToHistoryStack, skipRefocus);
    }
  };
  const onSetHex = (hex) => {
    setInputColor(hex);
    if (/^#[0-9A-Fa-f]{6}$/i.test(hex)) {
      const newColor = transformColor("hex", hex);
      setSelfColor(newColor);
      emitOnChange(newColor.hex);
    }
  };
  const onMoveSaturation = ({ x, y }) => {
    const newHsv = {
      ...selfColor.hsv,
      s: x / WIDTH * 100,
      v: 100 - y / HEIGHT * 100
    };
    const newColor = transformColor("hsv", newHsv);
    setSelfColor(newColor);
    setInputColor(newColor.hex);
    emitOnChange(newColor.hex);
  };
  const onMoveHue = ({ x }) => {
    const newHsv = { ...selfColor.hsv, h: x / WIDTH * 360 };
    const newColor = transformColor("hsv", newHsv);
    setSelfColor(newColor);
    setInputColor(newColor.hex);
    emitOnChange(newColor.hex);
  };
  const onBasicColorClick = (e, basicColor) => {
    const newColor = transformColor("hex", basicColor);
    setSelfColor(newColor);
    setInputColor(newColor.hex);
    emitOnChange(newColor.hex, isKeyboardInput(e));
  };
  return /* @__PURE__ */ jsxs7("div", { className: "color-picker-wrapper", style: { width: WIDTH }, ref: innerDivRef, children: [
    /* @__PURE__ */ jsx12(TextInput, { label: "Hex", onChange: onSetHex, value: inputColor }),
    /* @__PURE__ */ jsx12("div", { className: "color-picker-basic-color", children: basicColors.map((basicColor) => /* @__PURE__ */ jsx12(
      "button",
      {
        className: basicColor === selfColor.hex ? "active" : "",
        style: { backgroundColor: basicColor },
        onClick: (e) => onBasicColorClick(e, basicColor)
      },
      basicColor
    )) }),
    /* @__PURE__ */ jsx12(
      MoveWrapper,
      {
        className: "color-picker-saturation",
        style: { backgroundColor: `hsl(${selfColor.hsv.h}, 100%, 50%)` },
        onChange: onMoveSaturation,
        children: /* @__PURE__ */ jsx12(
          "div",
          {
            className: "color-picker-saturation_cursor",
            style: {
              backgroundColor: selfColor.hex,
              left: saturationPosition.x,
              top: saturationPosition.y
            }
          }
        )
      }
    ),
    /* @__PURE__ */ jsx12(MoveWrapper, { className: "color-picker-hue", onChange: onMoveHue, children: /* @__PURE__ */ jsx12(
      "div",
      {
        className: "color-picker-hue_cursor",
        style: {
          backgroundColor: `hsl(${selfColor.hsv.h}, 100%, 50%)`,
          left: huePosition.x
        }
      }
    ) }),
    /* @__PURE__ */ jsx12("div", { className: "color-picker-color", style: { backgroundColor: selfColor.hex } })
  ] });
}
function MoveWrapper({ className, style, onChange, children }) {
  const divRef = useRef5(null);
  const draggedRef = useRef5(false);
  const move = (e) => {
    if (divRef.current) {
      const { current: div } = divRef;
      const { width, height, left, top } = div.getBoundingClientRect();
      const zoom = calculateZoomLevel(div);
      const x = clamp(e.clientX / zoom - left, width, 0);
      const y = clamp(e.clientY / zoom - top, height, 0);
      onChange({ x, y });
    }
  };
  const onMouseDown = (e) => {
    if (e.button !== 0) {
      return;
    }
    move(e);
    const onMouseMove = (_e) => {
      draggedRef.current = true;
      skipAddingToHistoryStack = true;
      move(_e);
    };
    const onMouseUp = (_e) => {
      if (draggedRef.current) {
        skipAddingToHistoryStack = false;
      }
      document.removeEventListener("mousemove", onMouseMove, false);
      document.removeEventListener("mouseup", onMouseUp, false);
      move(_e);
      draggedRef.current = false;
    };
    document.addEventListener("mousemove", onMouseMove, false);
    document.addEventListener("mouseup", onMouseUp, false);
  };
  return /* @__PURE__ */ jsx12("div", { ref: divRef, className, style, onMouseDown, children });
}
function clamp(value, max, min) {
  return value > max ? max : value < min ? min : value;
}
function toHex(value) {
  if (!value.startsWith("#")) {
    const ctx = document.createElement("canvas").getContext("2d");
    if (!ctx) {
      throw new Error("2d context not supported or canvas already initialized");
    }
    ctx.fillStyle = value;
    return ctx.fillStyle;
  } else if (value.length === 4 || value.length === 5) {
    value = value.split("").map((v, i) => i ? v + v : "#").join("");
    return value;
  } else if (value.length === 7 || value.length === 9) {
    return value;
  }
  return "#000000";
}
function hex2rgb(hex) {
  const rbgArr = (hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => "#" + r + r + g + g + b + b).substring(1).match(/.{2}/g) || []).map((x) => parseInt(x, 16));
  return {
    b: rbgArr[2],
    g: rbgArr[1],
    r: rbgArr[0]
  };
}
function rgb2hsv({ r, g, b }) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const d = max - Math.min(r, g, b);
  const h = d ? (max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? 2 + (b - r) / d : 4 + (r - g) / d) * 60 : 0;
  const s = max ? d / max * 100 : 0;
  const v = max * 100;
  return { h, s, v };
}
function hsv2rgb({ h, s, v }) {
  s /= 100;
  v /= 100;
  const i = ~~(h / 60);
  const f = h / 60 - i;
  const p = v * (1 - s);
  const q = v * (1 - s * f);
  const t = v * (1 - s * (1 - f));
  const index = i % 6;
  const r = Math.round([v, q, p, p, t, v][index] * 255);
  const g = Math.round([t, v, v, q, p, p][index] * 255);
  const b = Math.round([p, p, t, v, v, q][index] * 255);
  return { b, g, r };
}
function rgb2hex({ b, g, r }) {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}
function transformColor(format, color) {
  let hex = toHex("#121212");
  let rgb = hex2rgb(hex);
  let hsv = rgb2hsv(rgb);
  if (format === "hex") {
    const value = color;
    hex = toHex(value);
    rgb = hex2rgb(hex);
    hsv = rgb2hsv(rgb);
  } else if (format === "rgb") {
    const value = color;
    rgb = value;
    hex = rgb2hex(rgb);
    hsv = rgb2hsv(rgb);
  } else if (format === "hsv") {
    const value = color;
    hsv = value;
    rgb = hsv2rgb(hsv);
    hex = rgb2hex(rgb);
  }
  return { hex, hsv, rgb };
}

// src/plugins/TableActionMenuPlugin/index.tsx
import { Fragment as Fragment4, jsx as jsx13, jsxs as jsxs8 } from "react/jsx-runtime";
function computeSelectionCount(selection) {
  const selectionShape = selection.getShape();
  return {
    columns: selectionShape.toX - selectionShape.fromX + 1,
    rows: selectionShape.toY - selectionShape.fromY + 1
  };
}
function $canUnmerge() {
  const selection = $getSelection3();
  if ($isRangeSelection2(selection) && !selection.isCollapsed() || $isTableSelection(selection) && !selection.anchor.is(selection.focus) || !$isRangeSelection2(selection) && !$isTableSelection(selection)) {
    return false;
  }
  const [cell] = $getNodeTriplet(selection.anchor);
  return cell.__colSpan > 1 || cell.__rowSpan > 1;
}
function $selectLastDescendant(node) {
  const lastDescendant = node.getLastDescendant();
  if ($isTextNode(lastDescendant)) {
    lastDescendant.select();
  } else if ($isElementNode(lastDescendant)) {
    lastDescendant.selectEnd();
  } else if (lastDescendant !== null) {
    lastDescendant.selectNext();
  }
}
function currentCellBackgroundColor(editor) {
  return editor.getEditorState().read(() => {
    const selection = $getSelection3();
    if ($isRangeSelection2(selection) || $isTableSelection(selection)) {
      const [cell] = $getNodeTriplet(selection.anchor);
      if ($isTableCellNode(cell)) {
        return cell.getBackgroundColor();
      }
    }
    return null;
  });
}
function TableActionMenu({
  onClose,
  tableCellNode: _tableCellNode,
  setIsMenuOpen,
  contextRef,
  cellMerge,
  showColorPickerModal
}) {
  const [editor] = useLexicalComposerContext5();
  const dropDownRef = useRef6(null);
  const [tableCellNode, updateTableCellNode] = useState9(_tableCellNode);
  const [selectionCounts, updateSelectionCounts] = useState9({
    columns: 1,
    rows: 1
  });
  const [canMergeCells, setCanMergeCells] = useState9(false);
  const [canUnmergeCell, setCanUnmergeCell] = useState9(false);
  const [backgroundColor, setBackgroundColor] = useState9(
    () => currentCellBackgroundColor(editor) || ""
  );
  useEffect8(() => {
    return editor.registerMutationListener(
      TableCellNode,
      (nodeMutations) => {
        const nodeUpdated = nodeMutations.get(tableCellNode.getKey()) === "updated";
        if (nodeUpdated) {
          editor.getEditorState().read(() => {
            updateTableCellNode(tableCellNode.getLatest());
          });
          setBackgroundColor(currentCellBackgroundColor(editor) || "");
        }
      },
      { skipInitialization: true }
    );
  }, [editor, tableCellNode]);
  useEffect8(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection3();
      if ($isTableSelection(selection)) {
        const currentSelectionCounts = computeSelectionCount(selection);
        updateSelectionCounts(computeSelectionCount(selection));
        setCanMergeCells(currentSelectionCounts.columns > 1 || currentSelectionCounts.rows > 1);
      }
      setCanUnmergeCell($canUnmerge());
    });
  }, [editor]);
  useEffect8(() => {
    const menuButtonElement = contextRef.current;
    const dropDownElement = dropDownRef.current;
    const rootElement = editor.getRootElement();
    if (menuButtonElement != null && dropDownElement != null && rootElement != null) {
      const rootEleRect = rootElement.getBoundingClientRect();
      const menuButtonRect = menuButtonElement.getBoundingClientRect();
      dropDownElement.style.opacity = "1";
      const dropDownElementRect = dropDownElement.getBoundingClientRect();
      const margin = 5;
      let leftPosition = menuButtonRect.right + margin;
      if (leftPosition + dropDownElementRect.width > window.innerWidth || leftPosition + dropDownElementRect.width > rootEleRect.right) {
        const position = menuButtonRect.left - dropDownElementRect.width - margin;
        leftPosition = (position < 0 ? margin : position) + window.pageXOffset;
      }
      dropDownElement.style.left = `${leftPosition + window.pageXOffset}px`;
      let topPosition = menuButtonRect.top;
      if (topPosition + dropDownElementRect.height > window.innerHeight) {
        const position = menuButtonRect.bottom - dropDownElementRect.height;
        topPosition = position < 0 ? margin : position;
      }
      dropDownElement.style.top = `${topPosition}px`;
    }
  }, [contextRef, dropDownRef, editor]);
  useEffect8(() => {
    function handleClickOutside(event) {
      if (dropDownRef.current != null && contextRef.current != null && isDOMNode3(event.target) && !dropDownRef.current.contains(event.target) && !contextRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [setIsMenuOpen, contextRef]);
  const clearTableSelection = useCallback6(() => {
    editor.update(() => {
      if (tableCellNode.isAttached()) {
        const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
        const tableElement = getTableElement(tableNode, editor.getElementByKey(tableNode.getKey()));
        if (tableElement === null) {
          throw new Error("TableActionMenu: Expected to find tableElement in DOM");
        }
        const tableObserver = getTableObserverFromTableElement(tableElement);
        if (tableObserver !== null) {
          tableObserver.$clearHighlight();
        }
        tableNode.markDirty();
        updateTableCellNode(tableCellNode.getLatest());
      }
      $setSelection2(null);
    });
  }, [editor, tableCellNode]);
  const mergeTableCellsAtSelection = () => {
    editor.update(() => {
      const selection = $getSelection3();
      if (!$isTableSelection(selection)) {
        return;
      }
      const nodes = selection.getNodes();
      const tableCells = nodes.filter($isTableCellNode);
      const targetCell = $mergeCells(tableCells);
      if (targetCell) {
        $selectLastDescendant(targetCell);
        onClose();
      }
    });
  };
  const unmergeTableCellsAtSelection = () => {
    editor.update(() => {
      $unmergeCell();
    });
  };
  const insertTableRowAtSelection = useCallback6(
    (shouldInsertAfter) => {
      editor.update(() => {
        for (let i = 0; i < selectionCounts.rows; i++) {
          $insertTableRowAtSelection(shouldInsertAfter);
        }
        onClose();
      });
    },
    [editor, onClose, selectionCounts.rows]
  );
  const insertTableColumnAtSelection = useCallback6(
    (shouldInsertAfter) => {
      editor.update(() => {
        for (let i = 0; i < selectionCounts.columns; i++) {
          $insertTableColumnAtSelection(shouldInsertAfter);
        }
        onClose();
      });
    },
    [editor, onClose, selectionCounts.columns]
  );
  const deleteTableRowAtSelection = useCallback6(() => {
    editor.update(() => {
      $deleteTableRowAtSelection();
      onClose();
    });
  }, [editor, onClose]);
  const deleteTableAtSelection = useCallback6(() => {
    editor.update(() => {
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
      tableNode.remove();
      clearTableSelection();
      onClose();
    });
  }, [editor, tableCellNode, clearTableSelection, onClose]);
  const deleteTableColumnAtSelection = useCallback6(() => {
    editor.update(() => {
      $deleteTableColumnAtSelection();
      onClose();
    });
  }, [editor, onClose]);
  const toggleTableRowIsHeader = useCallback6(() => {
    editor.update(() => {
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
      const tableRowIndex = $getTableRowIndexFromTableCellNode(tableCellNode);
      const [gridMap] = $computeTableMapSkipCellCheck(tableNode, null, null);
      const rowCells = /* @__PURE__ */ new Set();
      const newStyle = tableCellNode.getHeaderStyles() ^ TableCellHeaderStates.ROW;
      for (let col = 0; col < gridMap[tableRowIndex].length; col++) {
        const mapCell = gridMap[tableRowIndex][col];
        if (!mapCell?.cell) {
          continue;
        }
        if (!rowCells.has(mapCell.cell)) {
          rowCells.add(mapCell.cell);
          mapCell.cell.setHeaderStyles(newStyle, TableCellHeaderStates.ROW);
        }
      }
      clearTableSelection();
      onClose();
    });
  }, [editor, tableCellNode, clearTableSelection, onClose]);
  const toggleTableColumnIsHeader = useCallback6(() => {
    editor.update(() => {
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
      const tableColumnIndex = $getTableColumnIndexFromTableCellNode(tableCellNode);
      const [gridMap] = $computeTableMapSkipCellCheck(tableNode, null, null);
      const columnCells = /* @__PURE__ */ new Set();
      const newStyle = tableCellNode.getHeaderStyles() ^ TableCellHeaderStates.COLUMN;
      for (let row = 0; row < gridMap.length; row++) {
        const mapCell = gridMap[row][tableColumnIndex];
        if (!mapCell?.cell) {
          continue;
        }
        if (!columnCells.has(mapCell.cell)) {
          columnCells.add(mapCell.cell);
          mapCell.cell.setHeaderStyles(newStyle, TableCellHeaderStates.COLUMN);
        }
      }
      clearTableSelection();
      onClose();
    });
  }, [editor, tableCellNode, clearTableSelection, onClose]);
  const toggleRowStriping = useCallback6(() => {
    editor.update(() => {
      if (tableCellNode.isAttached()) {
        const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
        if (tableNode) {
          tableNode.setRowStriping(!tableNode.getRowStriping());
        }
      }
      clearTableSelection();
      onClose();
    });
  }, [editor, tableCellNode, clearTableSelection, onClose]);
  const toggleFirstRowFreeze = useCallback6(() => {
    editor.update(() => {
      if (tableCellNode.isAttached()) {
        const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
        if (tableNode) {
          tableNode.setFrozenRows(tableNode.getFrozenRows() === 0 ? 1 : 0);
        }
      }
      clearTableSelection();
      onClose();
    });
  }, [editor, tableCellNode, clearTableSelection, onClose]);
  const toggleFirstColumnFreeze = useCallback6(() => {
    editor.update(() => {
      if (tableCellNode.isAttached()) {
        const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
        if (tableNode) {
          tableNode.setFrozenColumns(tableNode.getFrozenColumns() === 0 ? 1 : 0);
        }
      }
      clearTableSelection();
      onClose();
    });
  }, [editor, tableCellNode, clearTableSelection, onClose]);
  const handleCellBackgroundColor = useCallback6(
    (value) => {
      editor.update(() => {
        const selection = $getSelection3();
        if ($isRangeSelection2(selection) || $isTableSelection(selection)) {
          const [cell] = $getNodeTriplet(selection.anchor);
          if ($isTableCellNode(cell)) {
            cell.setBackgroundColor(value);
          }
          if ($isTableSelection(selection)) {
            const nodes = selection.getNodes();
            for (let i = 0; i < nodes.length; i++) {
              const node = nodes[i];
              if ($isTableCellNode(node)) {
                node.setBackgroundColor(value);
              }
            }
          }
        }
      });
    },
    [editor]
  );
  const formatVerticalAlign = (value) => {
    editor.update(() => {
      const selection = $getSelection3();
      if ($isRangeSelection2(selection) || $isTableSelection(selection)) {
        const [cell] = $getNodeTriplet(selection.anchor);
        if ($isTableCellNode(cell)) {
          cell.setVerticalAlign(value);
        }
        if ($isTableSelection(selection)) {
          const nodes = selection.getNodes();
          for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            if ($isTableCellNode(node)) {
              node.setVerticalAlign(value);
            }
          }
        }
      }
    });
  };
  let mergeCellButton = null;
  if (cellMerge) {
    if (canMergeCells) {
      mergeCellButton = /* @__PURE__ */ jsx13(
        "button",
        {
          type: "button",
          className: "item",
          onClick: () => mergeTableCellsAtSelection(),
          "data-test-id": "table-merge-cells",
          children: /* @__PURE__ */ jsx13("span", { className: "text", children: "Merge cells" })
        }
      );
    } else if (canUnmergeCell) {
      mergeCellButton = /* @__PURE__ */ jsx13(
        "button",
        {
          type: "button",
          className: "item",
          onClick: () => unmergeTableCellsAtSelection(),
          "data-test-id": "table-unmerge-cells",
          children: /* @__PURE__ */ jsx13("span", { className: "text", children: "Unmerge cells" })
        }
      );
    }
  }
  return createPortal4(
    /* @__PURE__ */ jsxs8(
      "div",
      {
        className: "_dropdown",
        ref: dropDownRef,
        onClick: (e) => {
          e.stopPropagation();
        },
        children: [
          mergeCellButton,
          /* @__PURE__ */ jsx13(
            "button",
            {
              type: "button",
              className: "item",
              onClick: () => showColorPickerModal("Cell background color", () => /* @__PURE__ */ jsx13(ColorPicker, { color: backgroundColor, onChange: handleCellBackgroundColor })),
              "data-test-id": "table-background-color",
              children: /* @__PURE__ */ jsx13("span", { className: "text", children: "Background color" })
            }
          ),
          /* @__PURE__ */ jsx13(
            "button",
            {
              type: "button",
              className: "item",
              onClick: () => toggleRowStriping(),
              "data-test-id": "table-row-striping",
              children: /* @__PURE__ */ jsx13("span", { className: "text", children: "Toggle Row Striping" })
            }
          ),
          /* @__PURE__ */ jsxs8(
            DropDown,
            {
              buttonLabel: "Vertical Align",
              buttonClassName: "item",
              buttonAriaLabel: "Formatting options for vertical alignment",
              children: [
                /* @__PURE__ */ jsx13(
                  DropDownItem,
                  {
                    onClick: () => {
                      formatVerticalAlign("top");
                    },
                    className: "item wide",
                    children: /* @__PURE__ */ jsxs8("div", { className: "icon-text-container", children: [
                      /* @__PURE__ */ jsx13("i", { className: "icon vertical-top" }),
                      /* @__PURE__ */ jsx13("span", { className: "text", children: "Top Align" })
                    ] })
                  }
                ),
                /* @__PURE__ */ jsx13(
                  DropDownItem,
                  {
                    onClick: () => {
                      formatVerticalAlign("middle");
                    },
                    className: "item wide",
                    children: /* @__PURE__ */ jsxs8("div", { className: "icon-text-container", children: [
                      /* @__PURE__ */ jsx13("i", { className: "icon vertical-middle" }),
                      /* @__PURE__ */ jsx13("span", { className: "text", children: "Middle Align" })
                    ] })
                  }
                ),
                /* @__PURE__ */ jsx13(
                  DropDownItem,
                  {
                    onClick: () => {
                      formatVerticalAlign("bottom");
                    },
                    className: "item wide",
                    children: /* @__PURE__ */ jsxs8("div", { className: "icon-text-container", children: [
                      /* @__PURE__ */ jsx13("i", { className: "icon vertical-bottom" }),
                      /* @__PURE__ */ jsx13("span", { className: "text", children: "Bottom Align" })
                    ] })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx13(
            "button",
            {
              type: "button",
              className: "item",
              onClick: () => toggleFirstRowFreeze(),
              "data-test-id": "table-freeze-first-row",
              children: /* @__PURE__ */ jsx13("span", { className: "text", children: "Toggle First Row Freeze" })
            }
          ),
          /* @__PURE__ */ jsx13(
            "button",
            {
              type: "button",
              className: "item",
              onClick: () => toggleFirstColumnFreeze(),
              "data-test-id": "table-freeze-first-column",
              children: /* @__PURE__ */ jsx13("span", { className: "text", children: "Toggle First Column Freeze" })
            }
          ),
          /* @__PURE__ */ jsx13("hr", {}),
          /* @__PURE__ */ jsx13(
            "button",
            {
              type: "button",
              className: "item",
              onClick: () => insertTableRowAtSelection(false),
              "data-test-id": "table-insert-row-above",
              children: /* @__PURE__ */ jsxs8("span", { className: "text", children: [
                "Insert ",
                selectionCounts.rows === 1 ? "row" : `${selectionCounts.rows} rows`,
                " above"
              ] })
            }
          ),
          /* @__PURE__ */ jsx13(
            "button",
            {
              type: "button",
              className: "item",
              onClick: () => insertTableRowAtSelection(true),
              "data-test-id": "table-insert-row-below",
              children: /* @__PURE__ */ jsxs8("span", { className: "text", children: [
                "Insert ",
                selectionCounts.rows === 1 ? "row" : `${selectionCounts.rows} rows`,
                " below"
              ] })
            }
          ),
          /* @__PURE__ */ jsx13("hr", {}),
          /* @__PURE__ */ jsx13(
            "button",
            {
              type: "button",
              className: "item",
              onClick: () => insertTableColumnAtSelection(false),
              "data-test-id": "table-insert-column-before",
              children: /* @__PURE__ */ jsxs8("span", { className: "text", children: [
                "Insert ",
                selectionCounts.columns === 1 ? "column" : `${selectionCounts.columns} columns`,
                " ",
                "left"
              ] })
            }
          ),
          /* @__PURE__ */ jsx13(
            "button",
            {
              type: "button",
              className: "item",
              onClick: () => insertTableColumnAtSelection(true),
              "data-test-id": "table-insert-column-after",
              children: /* @__PURE__ */ jsxs8("span", { className: "text", children: [
                "Insert ",
                selectionCounts.columns === 1 ? "column" : `${selectionCounts.columns} columns`,
                " ",
                "right"
              ] })
            }
          ),
          /* @__PURE__ */ jsx13("hr", {}),
          /* @__PURE__ */ jsx13(
            "button",
            {
              type: "button",
              className: "item",
              onClick: () => deleteTableColumnAtSelection(),
              "data-test-id": "table-delete-columns",
              children: /* @__PURE__ */ jsx13("span", { className: "text", children: "Delete column" })
            }
          ),
          /* @__PURE__ */ jsx13(
            "button",
            {
              type: "button",
              className: "item",
              onClick: () => deleteTableRowAtSelection(),
              "data-test-id": "table-delete-rows",
              children: /* @__PURE__ */ jsx13("span", { className: "text", children: "Delete row" })
            }
          ),
          /* @__PURE__ */ jsx13(
            "button",
            {
              type: "button",
              className: "item",
              onClick: () => deleteTableAtSelection(),
              "data-test-id": "table-delete",
              children: /* @__PURE__ */ jsx13("span", { className: "text", children: "Delete table" })
            }
          ),
          /* @__PURE__ */ jsx13("hr", {}),
          /* @__PURE__ */ jsx13(
            "button",
            {
              type: "button",
              className: "item",
              onClick: () => toggleTableRowIsHeader(),
              "data-test-id": "table-row-header",
              children: /* @__PURE__ */ jsxs8("span", { className: "text", children: [
                (tableCellNode.__headerState & TableCellHeaderStates.ROW) === TableCellHeaderStates.ROW ? "Remove" : "Add",
                " ",
                "row header"
              ] })
            }
          ),
          /* @__PURE__ */ jsx13(
            "button",
            {
              type: "button",
              className: "item",
              onClick: () => toggleTableColumnIsHeader(),
              "data-test-id": "table-column-header",
              children: /* @__PURE__ */ jsxs8("span", { className: "text", children: [
                (tableCellNode.__headerState & TableCellHeaderStates.COLUMN) === TableCellHeaderStates.COLUMN ? "Remove" : "Add",
                " ",
                "column header"
              ] })
            }
          )
        ]
      }
    ),
    document.body
  );
}
function TableCellActionMenuContainer({
  anchorElem,
  cellMerge
}) {
  const [editor] = useLexicalComposerContext5();
  const menuButtonRef = useRef6(null);
  const menuRootRef = useRef6(null);
  const [isMenuOpen, setIsMenuOpen] = useState9(false);
  const [tableCellNode, setTableMenuCellNode] = useState9(null);
  const [colorPickerModal, showColorPickerModal] = useModal();
  const checkTableCellOverflow = useCallback6((tableCellParentNodeDOM) => {
    const scrollableContainer = tableCellParentNodeDOM.closest(
      ".PlaygroundEditorTheme__tableScrollableWrapper"
    );
    if (scrollableContainer) {
      const containerRect = scrollableContainer.getBoundingClientRect();
      const cellRect = tableCellParentNodeDOM.getBoundingClientRect();
      const actionButtonRight = cellRect.right - 5;
      const actionButtonLeft = actionButtonRight - 28;
      if (actionButtonRight > containerRect.right || actionButtonLeft < containerRect.left) {
        return true;
      }
    }
    return false;
  }, []);
  const $moveMenu = useCallback6(() => {
    const menu = menuButtonRef.current;
    const selection = $getSelection3();
    const nativeSelection = getDOMSelection2(editor._window);
    const activeElement = document.activeElement;
    function disable() {
      if (menu) {
        menu.classList.remove("table-cell-action-button-container--active");
        menu.classList.add("table-cell-action-button-container--inactive");
      }
      setTableMenuCellNode(null);
    }
    if (selection == null || menu == null) {
      return disable();
    }
    const rootElement = editor.getRootElement();
    let tableObserver = null;
    let tableCellParentNodeDOM = null;
    if ($isRangeSelection2(selection) && rootElement !== null && nativeSelection !== null && rootElement.contains(nativeSelection.anchorNode)) {
      const tableCellNodeFromSelection = $getTableCellNodeFromLexicalNode(
        selection.anchor.getNode()
      );
      if (tableCellNodeFromSelection == null) {
        return disable();
      }
      tableCellParentNodeDOM = editor.getElementByKey(tableCellNodeFromSelection.getKey());
      if (tableCellParentNodeDOM == null || !tableCellNodeFromSelection.isAttached()) {
        return disable();
      }
      if (checkTableCellOverflow(tableCellParentNodeDOM)) {
        return disable();
      }
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNodeFromSelection);
      const tableElement = getTableElement(tableNode, editor.getElementByKey(tableNode.getKey()));
      if (tableElement === null) {
        throw new Error("TableActionMenu: Expected to find tableElement in DOM");
      }
      tableObserver = getTableObserverFromTableElement(tableElement);
      setTableMenuCellNode(tableCellNodeFromSelection);
    } else if ($isTableSelection(selection)) {
      const anchorNode = $getTableCellNodeFromLexicalNode(selection.anchor.getNode());
      if (!$isTableCellNode(anchorNode)) {
        throw new Error("TableSelection anchorNode must be a TableCellNode");
      }
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(anchorNode);
      const tableElement = getTableElement(tableNode, editor.getElementByKey(tableNode.getKey()));
      if (tableElement === null) {
        throw new Error("TableActionMenu: Expected to find tableElement in DOM");
      }
      tableObserver = getTableObserverFromTableElement(tableElement);
      tableCellParentNodeDOM = editor.getElementByKey(anchorNode.getKey());
      if (tableCellParentNodeDOM === null) {
        return disable();
      }
      if (checkTableCellOverflow(tableCellParentNodeDOM)) {
        return disable();
      }
    } else if (!activeElement) {
      return disable();
    }
    if (tableObserver === null || tableCellParentNodeDOM === null) {
      return disable();
    }
    const enabled = !tableObserver || !tableObserver.isSelecting;
    menu.classList.toggle("table-cell-action-button-container--active", enabled);
    menu.classList.toggle("table-cell-action-button-container--inactive", !enabled);
    if (enabled) {
      const tableCellRect = tableCellParentNodeDOM.getBoundingClientRect();
      const anchorRect = anchorElem.getBoundingClientRect();
      const top = tableCellRect.top - anchorRect.top;
      const left = tableCellRect.right - anchorRect.left;
      menu.style.transform = `translate(${left}px, ${top}px)`;
    }
  }, [editor, anchorElem, checkTableCellOverflow]);
  useEffect8(() => {
    let timeoutId = void 0;
    const callback = () => {
      timeoutId = void 0;
      editor.getEditorState().read($moveMenu);
    };
    const delayedCallback = () => {
      if (timeoutId === void 0) {
        timeoutId = setTimeout(callback, 0);
      }
      return false;
    };
    return mergeRegister3(
      editor.registerUpdateListener(delayedCallback),
      editor.registerCommand(SELECTION_CHANGE_COMMAND2, delayedCallback, COMMAND_PRIORITY_CRITICAL2),
      editor.registerRootListener((rootElement, prevRootElement) => {
        if (prevRootElement) {
          prevRootElement.removeEventListener("pointerup", delayedCallback);
        }
        if (rootElement) {
          rootElement.addEventListener("pointerup", delayedCallback);
          delayedCallback();
        }
      }),
      () => clearTimeout(timeoutId)
    );
  });
  const prevTableCellDOM = useRef6(tableCellNode);
  useEffect8(() => {
    if (prevTableCellDOM.current !== tableCellNode) {
      setIsMenuOpen(false);
    }
    prevTableCellDOM.current = tableCellNode;
  }, [prevTableCellDOM, tableCellNode]);
  return /* @__PURE__ */ jsx13("div", { className: "table-cell-action-button-container", ref: menuButtonRef, children: tableCellNode != null && /* @__PURE__ */ jsxs8(Fragment4, { children: [
    /* @__PURE__ */ jsx13(
      "button",
      {
        type: "button",
        className: "table-cell-action-button chevron-down",
        onClick: (e) => {
          e.stopPropagation();
          setIsMenuOpen(!isMenuOpen);
        },
        ref: menuRootRef,
        children: /* @__PURE__ */ jsx13("i", { className: "chevron-down" })
      }
    ),
    colorPickerModal,
    isMenuOpen && /* @__PURE__ */ jsx13(
      TableActionMenu,
      {
        contextRef: menuRootRef,
        setIsMenuOpen,
        onClose: () => setIsMenuOpen(false),
        tableCellNode,
        cellMerge,
        showColorPickerModal
      }
    )
  ] }) });
}
function TableActionMenuPlugin({
  anchorElem = document.body,
  cellMerge = false
}) {
  const isEditable = useLexicalEditable();
  return createPortal4(
    isEditable ? /* @__PURE__ */ jsx13(TableCellActionMenuContainer, { anchorElem, cellMerge }) : null,
    anchorElem
  );
}

// src/plugins/TableCellResizer/index.tsx
import { useLexicalComposerContext as useLexicalComposerContext6 } from "@lexical/react/LexicalComposerContext";
import { useLexicalEditable as useLexicalEditable2 } from "@lexical/react/useLexicalEditable";
import {
  $computeTableMapSkipCellCheck as $computeTableMapSkipCellCheck2,
  $getTableNodeFromLexicalNodeOrThrow as $getTableNodeFromLexicalNodeOrThrow2,
  $getTableRowIndexFromTableCellNode as $getTableRowIndexFromTableCellNode2,
  $isTableCellNode as $isTableCellNode2,
  $isTableRowNode,
  getDOMCellFromTarget,
  getTableElement as getTableElement2,
  TableNode
} from "@lexical/table";
import { calculateZoomLevel as calculateZoomLevel2, mergeRegister as mergeRegister4 } from "@lexical/utils";
import { $getNearestNodeFromDOMNode, isHTMLElement as isHTMLElement2, SKIP_SCROLL_INTO_VIEW_TAG } from "lexical";
import {
  useCallback as useCallback7,
  useEffect as useEffect9,
  useMemo as useMemo6,
  useRef as useRef7,
  useState as useState10
} from "react";
import { createPortal as createPortal5 } from "react-dom";
import { Fragment as Fragment5, jsx as jsx14, jsxs as jsxs9 } from "react/jsx-runtime";
var MIN_ROW_HEIGHT = 33;
var MIN_COLUMN_WIDTH = 92;
var ACTIVE_RESIZER_COLOR = "#76b6ff";
function TableCellResizer({ editor }) {
  const targetRef = useRef7(null);
  const resizerRef = useRef7(null);
  const tableRectRef = useRef7(null);
  const [hasTable, setHasTable] = useState10(false);
  const pointerStartPosRef = useRef7(null);
  const [pointerCurrentPos, updatePointerCurrentPos] = useState10(null);
  const [activeCell, updateActiveCell] = useState10(null);
  const [draggingDirection, updateDraggingDirection] = useState10(
    null
  );
  const [hoveredDirection, updateHoveredDirection] = useState10(
    null
  );
  const resetState = useCallback7(() => {
    updateActiveCell(null);
    targetRef.current = null;
    updateDraggingDirection(null);
    updateHoveredDirection(null);
    pointerStartPosRef.current = null;
    tableRectRef.current = null;
  }, []);
  useEffect9(() => {
    const tableKeys = /* @__PURE__ */ new Set();
    return mergeRegister4(
      editor.registerMutationListener(TableNode, (nodeMutations) => {
        for (const [nodeKey, mutation] of nodeMutations) {
          if (mutation === "destroyed") {
            tableKeys.delete(nodeKey);
          } else {
            tableKeys.add(nodeKey);
          }
        }
        setHasTable(tableKeys.size > 0);
      }),
      editor.registerNodeTransform(TableNode, (tableNode) => {
        if (tableNode.getColWidths()) {
          return tableNode;
        }
        const numColumns = tableNode.getColumnCount();
        const columnWidth = MIN_COLUMN_WIDTH;
        tableNode.setColWidths(Array(numColumns).fill(columnWidth));
        return tableNode;
      })
    );
  }, [editor]);
  useEffect9(() => {
    if (!hasTable) {
      return;
    }
    const onPointerMove = (event) => {
      const target = event.target;
      if (!isHTMLElement2(target)) {
        return;
      }
      if (draggingDirection) {
        event.preventDefault();
        event.stopPropagation();
        updatePointerCurrentPos({
          x: event.clientX,
          y: event.clientY
        });
        return;
      }
      if (resizerRef.current && resizerRef.current.contains(target)) {
        return;
      }
      if (targetRef.current !== target) {
        targetRef.current = target;
        const cell = getDOMCellFromTarget(target);
        if (cell && activeCell !== cell) {
          editor.getEditorState().read(
            () => {
              const tableCellNode = $getNearestNodeFromDOMNode(cell.elem);
              if (!tableCellNode) {
                throw new Error("TableCellResizer: Table cell node not found.");
              }
              const tableNode = $getTableNodeFromLexicalNodeOrThrow2(tableCellNode);
              const tableElement = getTableElement2(
                tableNode,
                editor.getElementByKey(tableNode.getKey())
              );
              if (!tableElement) {
                throw new Error("TableCellResizer: Table element not found.");
              }
              targetRef.current = target;
              tableRectRef.current = tableElement.getBoundingClientRect();
              updateActiveCell(cell);
            },
            { editor }
          );
        } else if (cell == null) {
          resetState();
        }
      }
    };
    const onPointerDown = (event) => {
      const isTouchEvent = event.pointerType === "touch";
      if (isTouchEvent) {
        onPointerMove(event);
      }
    };
    const resizerContainer = resizerRef.current;
    resizerContainer?.addEventListener("pointermove", onPointerMove, {
      capture: true
    });
    const removeRootListener = editor.registerRootListener((rootElement, prevRootElement) => {
      prevRootElement?.removeEventListener("pointermove", onPointerMove);
      prevRootElement?.removeEventListener("pointerdown", onPointerDown);
      rootElement?.addEventListener("pointermove", onPointerMove);
      rootElement?.addEventListener("pointerdown", onPointerDown);
    });
    return () => {
      removeRootListener();
      resizerContainer?.removeEventListener("pointermove", onPointerMove);
    };
  }, [activeCell, draggingDirection, editor, resetState, hasTable]);
  const isHeightChanging = (direction) => {
    if (direction === "bottom") {
      return true;
    }
    return false;
  };
  const updateRowHeight = useCallback7(
    (heightChange) => {
      if (!activeCell) {
        throw new Error("TableCellResizer: Expected active cell.");
      }
      editor.update(
        () => {
          const tableCellNode = $getNearestNodeFromDOMNode(activeCell.elem);
          if (!$isTableCellNode2(tableCellNode)) {
            throw new Error("TableCellResizer: Table cell node not found.");
          }
          const tableNode = $getTableNodeFromLexicalNodeOrThrow2(tableCellNode);
          const baseRowIndex = $getTableRowIndexFromTableCellNode2(tableCellNode);
          const tableRows = tableNode.getChildren();
          const isFullRowMerge = tableCellNode.getColSpan() === tableNode.getColumnCount();
          const tableRowIndex = isFullRowMerge ? baseRowIndex : baseRowIndex + tableCellNode.getRowSpan() - 1;
          if (tableRowIndex >= tableRows.length || tableRowIndex < 0) {
            throw new Error("Expected table cell to be inside of table row.");
          }
          const tableRow = tableRows[tableRowIndex];
          if (!$isTableRowNode(tableRow)) {
            throw new Error("Expected table row");
          }
          let height = tableRow.getHeight();
          if (height === void 0) {
            const rowCells = tableRow.getChildren();
            height = Math.min(
              ...rowCells.map((cell) => getCellNodeHeight(cell, editor) ?? Infinity)
            );
          }
          const newHeight = Math.max(height + heightChange, MIN_ROW_HEIGHT);
          tableRow.setHeight(newHeight);
        },
        { tag: SKIP_SCROLL_INTO_VIEW_TAG }
      );
    },
    [activeCell, editor]
  );
  const getCellNodeHeight = (cell, activeEditor) => {
    const domCellNode = activeEditor.getElementByKey(cell.getKey());
    return domCellNode?.clientHeight;
  };
  const getCellColumnIndex = (tableCellNode, tableMap) => {
    for (let row = 0; row < tableMap.length; row++) {
      for (let column = 0; column < tableMap[row].length; column++) {
        if (tableMap[row][column].cell === tableCellNode) {
          return column;
        }
      }
    }
  };
  const updateColumnWidth = useCallback7(
    (widthChange) => {
      if (!activeCell) {
        throw new Error("TableCellResizer: Expected active cell.");
      }
      editor.update(
        () => {
          const tableCellNode = $getNearestNodeFromDOMNode(activeCell.elem);
          if (!$isTableCellNode2(tableCellNode)) {
            throw new Error("TableCellResizer: Table cell node not found.");
          }
          const tableNode = $getTableNodeFromLexicalNodeOrThrow2(tableCellNode);
          const [tableMap] = $computeTableMapSkipCellCheck2(tableNode, null, null);
          const columnIndex = getCellColumnIndex(tableCellNode, tableMap);
          if (columnIndex === void 0) {
            throw new Error("TableCellResizer: Table column not found.");
          }
          const colWidths = tableNode.getColWidths();
          if (!colWidths) {
            return;
          }
          const width = colWidths[columnIndex];
          if (width === void 0) {
            return;
          }
          const newColWidths = [...colWidths];
          const newWidth = Math.max(width + widthChange, MIN_COLUMN_WIDTH);
          newColWidths[columnIndex] = newWidth;
          tableNode.setColWidths(newColWidths);
        },
        { tag: SKIP_SCROLL_INTO_VIEW_TAG }
      );
    },
    [activeCell, editor]
  );
  const pointerUpHandler = useCallback7(
    (direction) => {
      const handler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!activeCell) {
          throw new Error("TableCellResizer: Expected active cell.");
        }
        if (pointerStartPosRef.current) {
          const { x, y } = pointerStartPosRef.current;
          if (activeCell === null) {
            return;
          }
          const zoom = calculateZoomLevel2(event.target);
          if (isHeightChanging(direction)) {
            const heightChange = (event.clientY - y) / zoom;
            updateRowHeight(heightChange);
          } else {
            const widthChange = (event.clientX - x) / zoom;
            updateColumnWidth(widthChange);
          }
          resetState();
          document.removeEventListener("pointerup", handler);
        }
      };
      return handler;
    },
    [activeCell, resetState, updateColumnWidth, updateRowHeight]
  );
  const toggleResize = useCallback7(
    (direction) => (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (!activeCell) {
        throw new Error("TableCellResizer: Expected active cell.");
      }
      pointerStartPosRef.current = {
        x: event.clientX,
        y: event.clientY
      };
      updatePointerCurrentPos(pointerStartPosRef.current);
      updateDraggingDirection(direction);
      document.addEventListener("pointerup", pointerUpHandler(direction));
    },
    [activeCell, pointerUpHandler]
  );
  const getResizers = useCallback7(() => {
    if (activeCell) {
      const { height, width, top, left } = activeCell.elem.getBoundingClientRect();
      const zoom = calculateZoomLevel2(activeCell.elem);
      const zoneWidth = 16;
      const styles = {
        bottom: {
          backgroundColor: "none",
          cursor: "row-resize",
          height: `${zoneWidth}px`,
          left: `${window.scrollX + left}px`,
          top: `${window.scrollY + top + height - zoneWidth / 2}px`,
          width: `${width}px`
        },
        right: {
          backgroundColor: "none",
          cursor: "col-resize",
          height: `${height}px`,
          left: `${window.scrollX + left + width - zoneWidth / 2}px`,
          top: `${window.scrollY + top}px`,
          width: `${zoneWidth}px`
        }
      };
      const tableRect = tableRectRef.current;
      if (draggingDirection && pointerCurrentPos && tableRect) {
        if (isHeightChanging(draggingDirection)) {
          styles[draggingDirection].left = `${window.scrollX + tableRect.left}px`;
          styles[draggingDirection].top = `${window.scrollY + pointerCurrentPos.y / zoom}px`;
          styles[draggingDirection].height = "3px";
          styles[draggingDirection].width = `${tableRect.width}px`;
        } else {
          styles[draggingDirection].top = `${window.scrollY + tableRect.top}px`;
          styles[draggingDirection].left = `${window.scrollX + pointerCurrentPos.x / zoom}px`;
          styles[draggingDirection].width = "3px";
          styles[draggingDirection].height = `${tableRect.height}px`;
        }
        styles[draggingDirection].backgroundColor = "#adf";
        styles[draggingDirection].mixBlendMode = "unset";
      } else if (!draggingDirection && hoveredDirection === "right") {
        const halfZoneWidth = zoneWidth / 2;
        const highlightWidth = 2;
        const highlightStart = halfZoneWidth - highlightWidth / 2;
        styles.right.background = `linear-gradient(90deg, transparent ${highlightStart}px, ${ACTIVE_RESIZER_COLOR} ${highlightStart}px, ${ACTIVE_RESIZER_COLOR} ${highlightStart + highlightWidth}px, transparent ${highlightStart + highlightWidth}px)`;
        styles.right.mixBlendMode = "unset";
        if (tableRect) {
          styles.right.top = `${window.scrollY + tableRect.top}px`;
          styles.right.height = `${tableRect.height}px`;
        }
      }
      return styles;
    }
    return {
      bottom: null,
      left: null,
      right: null,
      top: null
    };
  }, [activeCell, draggingDirection, hoveredDirection, pointerCurrentPos]);
  const handlePointerEnter = useCallback7(
    (direction) => () => {
      if (!draggingDirection) {
        updateHoveredDirection(direction);
      }
    },
    [draggingDirection]
  );
  const handlePointerLeave = useCallback7(() => {
    if (!draggingDirection) {
      updateHoveredDirection(null);
    }
  }, [draggingDirection]);
  const resizerStyles = getResizers();
  return /* @__PURE__ */ jsx14("div", { ref: resizerRef, children: activeCell != null && /* @__PURE__ */ jsxs9(Fragment5, { children: [
    /* @__PURE__ */ jsx14(
      "div",
      {
        className: "TableCellResizer__resizer TableCellResizer__ui",
        style: resizerStyles.right || void 0,
        onPointerEnter: handlePointerEnter("right"),
        onPointerLeave: handlePointerLeave,
        onPointerDown: toggleResize("right")
      }
    ),
    /* @__PURE__ */ jsx14(
      "div",
      {
        className: "TableCellResizer__resizer TableCellResizer__ui",
        style: resizerStyles.bottom || void 0,
        onPointerDown: toggleResize("bottom")
      }
    )
  ] }) });
}
function TableCellResizerPlugin() {
  const [editor] = useLexicalComposerContext6();
  const isEditable = useLexicalEditable2();
  return useMemo6(
    () => isEditable ? createPortal5(/* @__PURE__ */ jsx14(TableCellResizer, { editor }), document.body) : null,
    [editor, isEditable]
  );
}

// src/plugins/ToolbarPlugin/index.tsx
import { $isLinkNode as $isLinkNode3, TOGGLE_LINK_COMMAND as TOGGLE_LINK_COMMAND3 } from "@lexical/link";
import { $isListNode, ListNode } from "@lexical/list";
import { $isHeadingNode as $isHeadingNode2 } from "@lexical/rich-text";
import {
  $getSelectionStyleValueForProperty,
  $isParentElementRTL,
  $patchStyleText as $patchStyleText2
} from "@lexical/selection";
import { $isTableNode, $isTableSelection as $isTableSelection3 } from "@lexical/table";
import {
  $findMatchingParent as $findMatchingParent4,
  $getNearestNodeOfType,
  $isEditorIsNestedEditor,
  IS_APPLE,
  mergeRegister as mergeRegister6
} from "@lexical/utils";
import {
  $addUpdateTag as $addUpdateTag2,
  $getSelection as $getSelection6,
  $isElementNode as $isElementNode2,
  $isNodeSelection as $isNodeSelection3,
  $isRangeSelection as $isRangeSelection5,
  $isRootOrShadowRoot as $isRootOrShadowRoot2,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL as COMMAND_PRIORITY_CRITICAL3,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  HISTORIC_TAG,
  INDENT_CONTENT_COMMAND,
  OUTDENT_CONTENT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND as SELECTION_CHANGE_COMMAND3,
  SKIP_DOM_SELECTION_TAG as SKIP_DOM_SELECTION_TAG2,
  SKIP_SELECTION_FOCUS_TAG as SKIP_SELECTION_FOCUS_TAG2,
  UNDO_COMMAND
} from "lexical";
import { useCallback as useCallback8, useEffect as useEffect13, useState as useState14 } from "react";

// src/ui/DropdownColorPicker.tsx
import { jsx as jsx15 } from "react/jsx-runtime";
function DropdownColorPicker({
  disabled = false,
  stopCloseOnClickSelf = true,
  color,
  onChange,
  ...rest
}) {
  return /* @__PURE__ */ jsx15(DropDown, { ...rest, disabled, stopCloseOnClickSelf, children: /* @__PURE__ */ jsx15(ColorPicker, { color, onChange }) });
}

// src/plugins/LayoutPlugin/InsertLayoutDialog.tsx
import { useState as useState11 } from "react";

// src/plugins/LayoutPlugin/LayoutPlugin.tsx
import { useLexicalComposerContext as useLexicalComposerContext7 } from "@lexical/react/LexicalComposerContext";
import { $findMatchingParent as $findMatchingParent3, $insertNodeToNearestRoot, mergeRegister as mergeRegister5 } from "@lexical/utils";
import {
  $createParagraphNode as $createParagraphNode2,
  $getNodeByKey,
  $getSelection as $getSelection4,
  $isRangeSelection as $isRangeSelection3,
  COMMAND_PRIORITY_EDITOR as COMMAND_PRIORITY_EDITOR2,
  COMMAND_PRIORITY_LOW as COMMAND_PRIORITY_LOW4,
  createCommand as createCommand2,
  KEY_ARROW_DOWN_COMMAND,
  KEY_ARROW_LEFT_COMMAND,
  KEY_ARROW_RIGHT_COMMAND,
  KEY_ARROW_UP_COMMAND
} from "lexical";
import { useEffect as useEffect10 } from "react";

// src/nodes/LayoutContainerNode.tsx
import { addClassNamesToElement } from "@lexical/utils";
import { ElementNode } from "lexical";
function $convertLayoutContainerElement(domNode) {
  const styleAttributes = window.getComputedStyle(domNode);
  const templateColumns = styleAttributes.getPropertyValue("grid-template-columns");
  if (templateColumns) {
    const node = $createLayoutContainerNode(templateColumns);
    return { node };
  }
  return null;
}
var LayoutContainerNode = class _LayoutContainerNode extends ElementNode {
  __templateColumns;
  constructor(templateColumns, key) {
    super(key);
    this.__templateColumns = templateColumns;
  }
  static getType() {
    return "layout-container";
  }
  static clone(node) {
    return new _LayoutContainerNode(node.__templateColumns, node.__key);
  }
  createDOM(config) {
    const dom = document.createElement("div");
    dom.style.gridTemplateColumns = this.__templateColumns;
    if (typeof config.theme.layoutContainer === "string") {
      addClassNamesToElement(dom, config.theme.layoutContainer);
    }
    return dom;
  }
  exportDOM() {
    const element = document.createElement("div");
    element.style.gridTemplateColumns = this.__templateColumns;
    element.setAttribute("data-lexical-layout-container", "true");
    return { element };
  }
  updateDOM(prevNode, dom) {
    if (prevNode.__templateColumns !== this.__templateColumns) {
      dom.style.gridTemplateColumns = this.__templateColumns;
    }
    return false;
  }
  static importDOM() {
    return {
      div: (domNode) => {
        if (!domNode.hasAttribute("data-lexical-layout-container")) {
          return null;
        }
        return {
          conversion: $convertLayoutContainerElement,
          priority: 2
        };
      }
    };
  }
  static importJSON(json) {
    return $createLayoutContainerNode().updateFromJSON(json);
  }
  updateFromJSON(serializedNode) {
    return super.updateFromJSON(serializedNode).setTemplateColumns(serializedNode.templateColumns);
  }
  isShadowRoot() {
    return true;
  }
  canBeEmpty() {
    return false;
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      templateColumns: this.__templateColumns
    };
  }
  getTemplateColumns() {
    return this.getLatest().__templateColumns;
  }
  setTemplateColumns(templateColumns) {
    const self = this.getWritable();
    self.__templateColumns = templateColumns;
    return self;
  }
};
function $createLayoutContainerNode(templateColumns = "") {
  return new LayoutContainerNode(templateColumns);
}

// src/nodes/LayoutItemNode.ts
import { addClassNamesToElement as addClassNamesToElement2 } from "@lexical/utils";
import { $isParagraphNode, ElementNode as ElementNode2 } from "lexical";
function $convertLayoutItemElement() {
  return { node: $createLayoutItemNode() };
}
function $isEmptyLayoutItemNode(node) {
  if (!$isLayoutItemNode(node) || node.getChildrenSize() !== 1) {
    return false;
  }
  const firstChild = node.getFirstChild();
  return $isParagraphNode(firstChild) && firstChild.isEmpty();
}
var LayoutItemNode = class _LayoutItemNode extends ElementNode2 {
  static getType() {
    return "layout-item";
  }
  static clone(node) {
    return new _LayoutItemNode(node.__key);
  }
  createDOM(config) {
    const dom = document.createElement("div");
    dom.setAttribute("data-lexical-layout-item", "true");
    if (typeof config.theme.layoutItem === "string") {
      addClassNamesToElement2(dom, config.theme.layoutItem);
    }
    return dom;
  }
  updateDOM() {
    return false;
  }
  collapseAtStart() {
    const parent = this.getParentOrThrow();
    if (this.is(parent.getFirstChild()) && parent.getChildren().every($isEmptyLayoutItemNode)) {
      parent.remove();
      return true;
    }
    return false;
  }
  static importDOM() {
    return {
      div: (domNode) => {
        if (!domNode.hasAttribute("data-lexical-layout-item")) {
          return null;
        }
        return {
          conversion: $convertLayoutItemElement,
          priority: 2
        };
      }
    };
  }
  static importJSON(serializedNode) {
    return $createLayoutItemNode().updateFromJSON(serializedNode);
  }
  isShadowRoot() {
    return true;
  }
};
function $createLayoutItemNode() {
  return new LayoutItemNode();
}
function $isLayoutItemNode(node) {
  return node instanceof LayoutItemNode;
}

// src/plugins/LayoutPlugin/LayoutPlugin.tsx
var INSERT_LAYOUT_COMMAND = createCommand2();
var UPDATE_LAYOUT_COMMAND = createCommand2();

// src/plugins/LayoutPlugin/InsertLayoutDialog.tsx
import { Fragment as Fragment6, jsx as jsx16, jsxs as jsxs10 } from "react/jsx-runtime";
var LAYOUTS = [
  { label: "2 columns (equal width)", value: "1fr 1fr" },
  { label: "2 columns (25% - 75%)", value: "1fr 3fr" },
  { label: "3 columns (equal width)", value: "1fr 1fr 1fr" },
  { label: "3 columns (25% - 50% - 25%)", value: "1fr 2fr 1fr" },
  { label: "4 columns (equal width)", value: "1fr 1fr 1fr 1fr" }
];
function InsertLayoutDialog({
  activeEditor,
  onClose
}) {
  const [layout, setLayout] = useState11(LAYOUTS[0].value);
  const buttonLabel = LAYOUTS.find((item) => item.value === layout)?.label;
  const onClick = () => {
    activeEditor.dispatchCommand(INSERT_LAYOUT_COMMAND, layout);
    onClose();
  };
  return /* @__PURE__ */ jsxs10(Fragment6, { children: [
    /* @__PURE__ */ jsx16(DropDown, { buttonClassName: "toolbar-item dialog-dropdown", buttonLabel, children: LAYOUTS.map(({ label, value }) => /* @__PURE__ */ jsx16(DropDownItem, { className: "item", onClick: () => setLayout(value), children: /* @__PURE__ */ jsx16("span", { className: "text", children: label }) }, value)) }),
    /* @__PURE__ */ jsx16(Button, { onClick, children: "Insert" })
  ] });
}

// src/plugins/TablePlugin.tsx
import { useLexicalComposerContext as useLexicalComposerContext8 } from "@lexical/react/LexicalComposerContext";
import { INSERT_TABLE_COMMAND, TableCellNode as TableCellNode2, TableNode as TableNode2, TableRowNode } from "@lexical/table";
import { createContext as createContext4, useContext as useContext4, useEffect as useEffect11, useMemo as useMemo7, useState as useState12 } from "react";
import { Fragment as Fragment7, jsx as jsx17, jsxs as jsxs11 } from "react/jsx-runtime";
var CellContext = createContext4({
  cellEditorConfig: null,
  cellEditorPlugins: null,
  set: () => {
  }
});
function TableContext({ children }) {
  const [contextValue, setContextValue] = useState12({
    cellEditorConfig: null,
    cellEditorPlugins: null
  });
  return /* @__PURE__ */ jsx17(
    CellContext.Provider,
    {
      value: useMemo7(
        () => ({
          cellEditorConfig: contextValue.cellEditorConfig,
          cellEditorPlugins: contextValue.cellEditorPlugins,
          set: (cellEditorConfig, cellEditorPlugins) => {
            setContextValue({ cellEditorConfig, cellEditorPlugins });
          }
        }),
        [contextValue.cellEditorConfig, contextValue.cellEditorPlugins]
      ),
      children
    }
  );
}
function InsertTableDialog({
  activeEditor,
  onClose
}) {
  const [rows, setRows] = useState12("5");
  const [columns, setColumns] = useState12("5");
  const [isDisabled, setIsDisabled] = useState12(true);
  useEffect11(() => {
    const row = Number(rows);
    const column = Number(columns);
    if (row && row > 0 && row <= 500 && column && column > 0 && column <= 50) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [rows, columns]);
  const onClick = () => {
    activeEditor.dispatchCommand(INSERT_TABLE_COMMAND, {
      columns,
      rows
    });
    onClose();
  };
  return /* @__PURE__ */ jsxs11(Fragment7, { children: [
    /* @__PURE__ */ jsx17(
      TextInput,
      {
        placeholder: "# of rows (1-500)",
        label: "Rows",
        onChange: setRows,
        value: rows,
        "data-test-id": "table-modal-rows",
        type: "number"
      }
    ),
    /* @__PURE__ */ jsx17(
      TextInput,
      {
        placeholder: "# of columns (1-50)",
        label: "Columns",
        onChange: setColumns,
        value: columns,
        "data-test-id": "table-modal-columns",
        type: "number"
      }
    ),
    /* @__PURE__ */ jsx17(DialogActions, { "data-test-id": "table-model-confirm-insert", children: /* @__PURE__ */ jsx17(Button, { disabled: isDisabled, onClick, children: "Confirm" }) })
  ] });
}

// src/plugins/ToolbarPlugin/fontSize.tsx
import * as React3 from "react";

// node_modules/@lexical/code/LexicalCode.node.mjs
var mod = await (process.env.NODE_ENV !== "production" ? import("./LexicalCode.dev-75NLLEKI.js") : import("./LexicalCode.prod-3JOHS3UI.js"));
var $createCodeHighlightNode = mod.$createCodeHighlightNode;
var $createCodeNode = mod.$createCodeNode;
var $getCodeLineDirection = mod.$getCodeLineDirection;
var $getEndOfCodeInLine = mod.$getEndOfCodeInLine;
var $getFirstCodeNodeOfLine = mod.$getFirstCodeNodeOfLine;
var $getLastCodeNodeOfLine = mod.$getLastCodeNodeOfLine;
var $getStartOfCodeInLine = mod.$getStartOfCodeInLine;
var $isCodeHighlightNode = mod.$isCodeHighlightNode;
var $isCodeNode = mod.$isCodeNode;
var CODE_LANGUAGE_FRIENDLY_NAME_MAP = mod.CODE_LANGUAGE_FRIENDLY_NAME_MAP;
var CODE_LANGUAGE_MAP = mod.CODE_LANGUAGE_MAP;
var CodeExtension = mod.CodeExtension;
var CodeHighlightNode = mod.CodeHighlightNode;
var CodeNode = mod.CodeNode;
var DEFAULT_CODE_LANGUAGE = mod.DEFAULT_CODE_LANGUAGE;
var PrismTokenizer = mod.PrismTokenizer;
var getCodeLanguageOptions = mod.getCodeLanguageOptions;
var getCodeLanguages = mod.getCodeLanguages;
var getCodeThemeOptions = mod.getCodeThemeOptions;
var getDefaultCodeLanguage = mod.getDefaultCodeLanguage;
var getEndOfCodeInLine = mod.getEndOfCodeInLine;
var getFirstCodeNodeOfLine = mod.getFirstCodeNodeOfLine;
var getLanguageFriendlyName = mod.getLanguageFriendlyName;
var getLastCodeNodeOfLine = mod.getLastCodeNodeOfLine;
var getStartOfCodeInLine = mod.getStartOfCodeInLine;
var normalizeCodeLang = mod.normalizeCodeLang;
var normalizeCodeLanguage = mod.normalizeCodeLanguage;
var registerCodeHighlighting = mod.registerCodeHighlighting;

// src/plugins/ToolbarPlugin/utils.ts
import {
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND
} from "@lexical/list";
import { $isDecoratorBlockNode } from "@lexical/react/LexicalDecoratorBlockNode";
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  $isQuoteNode
} from "@lexical/rich-text";
import { $patchStyleText, $setBlocksType } from "@lexical/selection";
import { $isTableSelection as $isTableSelection2 } from "@lexical/table";
import { $getNearestBlockElementAncestorOrThrow } from "@lexical/utils";
import {
  $addUpdateTag,
  $createParagraphNode as $createParagraphNode3,
  $getSelection as $getSelection5,
  $isRangeSelection as $isRangeSelection4,
  $isTextNode as $isTextNode2,
  SKIP_DOM_SELECTION_TAG,
  SKIP_SELECTION_FOCUS_TAG
} from "lexical";
var calculateNextFontSize = (currentFontSize, updateType) => {
  if (!updateType) {
    return currentFontSize;
  }
  let updatedFontSize = currentFontSize;
  switch (updateType) {
    case 2 /* decrement */:
      switch (true) {
        case currentFontSize > MAX_ALLOWED_FONT_SIZE:
          updatedFontSize = MAX_ALLOWED_FONT_SIZE;
          break;
        case currentFontSize >= 48:
          updatedFontSize -= 12;
          break;
        case currentFontSize >= 24:
          updatedFontSize -= 4;
          break;
        case currentFontSize >= 14:
          updatedFontSize -= 2;
          break;
        case currentFontSize >= 9:
          updatedFontSize -= 1;
          break;
        default:
          updatedFontSize = MIN_ALLOWED_FONT_SIZE;
          break;
      }
      break;
    case 1 /* increment */:
      switch (true) {
        case currentFontSize < MIN_ALLOWED_FONT_SIZE:
          updatedFontSize = MIN_ALLOWED_FONT_SIZE;
          break;
        case currentFontSize < 12:
          updatedFontSize += 1;
          break;
        case currentFontSize < 20:
          updatedFontSize += 2;
          break;
        case currentFontSize < 36:
          updatedFontSize += 4;
          break;
        case currentFontSize <= 60:
          updatedFontSize += 12;
          break;
        default:
          updatedFontSize = MAX_ALLOWED_FONT_SIZE;
          break;
      }
      break;
    default:
      break;
  }
  return updatedFontSize;
};
var updateFontSizeInSelection = (editor, newFontSize, updateType, skipRefocus) => {
  const getNextFontSize = (prevFontSize) => {
    if (!prevFontSize) {
      prevFontSize = `${DEFAULT_FONT_SIZE}px`;
    }
    prevFontSize = prevFontSize.slice(0, -2);
    const nextFontSize = calculateNextFontSize(Number(prevFontSize), updateType);
    return `${nextFontSize}px`;
  };
  editor.update(() => {
    if (skipRefocus) {
      $addUpdateTag(SKIP_DOM_SELECTION_TAG);
    }
    if (editor.isEditable()) {
      const selection = $getSelection5();
      if (selection !== null) {
        $patchStyleText(selection, {
          "font-size": newFontSize || getNextFontSize
        });
      }
    }
  });
};
var updateFontSize = (editor, updateType, inputValue, skipRefocus = false) => {
  if (inputValue !== "") {
    const nextFontSize = calculateNextFontSize(Number(inputValue), updateType);
    updateFontSizeInSelection(editor, String(nextFontSize) + "px", null, skipRefocus);
  } else {
    updateFontSizeInSelection(editor, null, updateType, skipRefocus);
  }
};
var formatParagraph = (editor) => {
  editor.update(() => {
    $addUpdateTag(SKIP_SELECTION_FOCUS_TAG);
    const selection = $getSelection5();
    $setBlocksType(selection, () => $createParagraphNode3());
  });
};
var formatHeading = (editor, blockType, headingSize) => {
  if (blockType !== headingSize) {
    editor.update(() => {
      $addUpdateTag(SKIP_SELECTION_FOCUS_TAG);
      const selection = $getSelection5();
      $setBlocksType(selection, () => $createHeadingNode(headingSize));
    });
  }
};
var formatBulletList = (editor, blockType) => {
  if (blockType !== "bullet") {
    editor.update(() => {
      $addUpdateTag(SKIP_SELECTION_FOCUS_TAG);
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, void 0);
    });
  } else {
    formatParagraph(editor);
  }
};
var formatNumberedList = (editor, blockType) => {
  if (blockType !== "number") {
    editor.update(() => {
      $addUpdateTag(SKIP_SELECTION_FOCUS_TAG);
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, void 0);
    });
  } else {
    formatParagraph(editor);
  }
};
var formatQuote = (editor, blockType) => {
  if (blockType !== "quote") {
    editor.update(() => {
      $addUpdateTag(SKIP_SELECTION_FOCUS_TAG);
      const selection = $getSelection5();
      $setBlocksType(selection, () => $createQuoteNode());
    });
  }
};
var clearFormatting = (editor, skipRefocus = false) => {
  editor.update(() => {
    if (skipRefocus) {
      $addUpdateTag(SKIP_DOM_SELECTION_TAG);
    }
    const selection = $getSelection5();
    if ($isRangeSelection4(selection) || $isTableSelection2(selection)) {
      const anchor = selection.anchor;
      const focus = selection.focus;
      const nodes = selection.getNodes();
      const extractedNodes = selection.extract();
      if (anchor.key === focus.key && anchor.offset === focus.offset) {
        return;
      }
      nodes.forEach((node, idx) => {
        if ($isTextNode2(node)) {
          let textNode = node;
          if (idx === 0 && anchor.offset !== 0) {
            textNode = textNode.splitText(anchor.offset)[1] || textNode;
          }
          if (idx === nodes.length - 1) {
            textNode = textNode.splitText(focus.offset)[0] || textNode;
          }
          const extractedTextNode = extractedNodes[0];
          if (nodes.length === 1 && $isTextNode2(extractedTextNode)) {
            textNode = extractedTextNode;
          }
          if (textNode.__style !== "") {
            textNode.setStyle("");
          }
          if (textNode.__format !== 0) {
            textNode.setFormat(0);
          }
          const nearestBlockElement = $getNearestBlockElementAncestorOrThrow(textNode);
          if (nearestBlockElement.__format !== 0) {
            nearestBlockElement.setFormat("");
          }
          if (nearestBlockElement.__indent !== 0) {
            nearestBlockElement.setIndent(0);
          }
          node = textNode;
        } else if ($isHeadingNode(node) || $isQuoteNode(node)) {
          node.replace($createParagraphNode3(), true);
        } else if ($isDecoratorBlockNode(node)) {
          node.setFormat("");
        }
      });
    }
  });
};

// src/plugins/ToolbarPlugin/fontSize.tsx
import { Fragment as Fragment8, jsx as jsx18, jsxs as jsxs12 } from "react/jsx-runtime";
function parseFontSize(input) {
  const match = input.match(/^(\d+(?:\.\d+)?)(px|pt)$/);
  return match ? [Number(match[1]), match[2]] : null;
}
function normalizeToPx(fontSize, unit) {
  return unit === "pt" ? Math.round(fontSize * 4 / 3) : fontSize;
}
function parseFontSizeForToolbar(input) {
  const parsed = parseFontSize(input);
  if (!parsed) {
    return "";
  }
  const [fontSize, unit] = parsed;
  const fontSizePx = normalizeToPx(fontSize, unit);
  return `${fontSizePx}px`;
}
function FontSize({
  selectionFontSize,
  disabled,
  editor
}) {
  const [inputValue, setInputValue] = React3.useState(selectionFontSize);
  const [inputChangeFlag, setInputChangeFlag] = React3.useState(false);
  const [isMouseMode, setIsMouseMode] = React3.useState(false);
  const handleKeyPress = (e) => {
    const inputValueNumber = Number(inputValue);
    if (e.key === "Tab") {
      return;
    }
    if (["e", "E", "+", "-"].includes(e.key) || isNaN(inputValueNumber)) {
      e.preventDefault();
      setInputValue("");
      return;
    }
    setInputChangeFlag(true);
    if (e.key === "Enter" || e.key === "Escape") {
      e.preventDefault();
      updateFontSizeByInputValue(inputValueNumber, !isMouseMode);
    }
  };
  const handleInputBlur = () => {
    setIsMouseMode(false);
    if (inputValue !== "" && inputChangeFlag) {
      const inputValueNumber = Number(inputValue);
      updateFontSizeByInputValue(inputValueNumber);
    }
  };
  const handleClick = () => {
    setIsMouseMode(true);
  };
  const updateFontSizeByInputValue = (inputValueNumber, skipRefocus = false) => {
    let updatedFontSize = inputValueNumber;
    if (inputValueNumber > MAX_ALLOWED_FONT_SIZE) {
      updatedFontSize = MAX_ALLOWED_FONT_SIZE;
    } else if (inputValueNumber < MIN_ALLOWED_FONT_SIZE) {
      updatedFontSize = MIN_ALLOWED_FONT_SIZE;
    }
    setInputValue(String(updatedFontSize));
    updateFontSizeInSelection(editor, String(updatedFontSize) + "px", null, skipRefocus);
    setInputChangeFlag(false);
  };
  React3.useEffect(() => {
    setInputValue(selectionFontSize);
  }, [selectionFontSize]);
  return /* @__PURE__ */ jsxs12(Fragment8, { children: [
    /* @__PURE__ */ jsx18(
      "button",
      {
        type: "button",
        disabled: disabled || selectionFontSize !== "" && Number(inputValue) <= MIN_ALLOWED_FONT_SIZE,
        onClick: (e) => {
          updateFontSize(editor, 2 /* decrement */, inputValue, isKeyboardInput(e));
        },
        className: "toolbar-item font-decrement",
        "aria-label": "Decrease font size",
        children: /* @__PURE__ */ jsx18("i", { className: "format minus-icon" })
      }
    ),
    /* @__PURE__ */ jsx18(
      "input",
      {
        type: "number",
        title: "Font size",
        value: inputValue,
        disabled,
        className: "toolbar-item font-size-input",
        min: MIN_ALLOWED_FONT_SIZE,
        max: MAX_ALLOWED_FONT_SIZE,
        onChange: (e) => setInputValue(e.target.value),
        onClick: handleClick,
        onKeyDown: handleKeyPress,
        onBlur: handleInputBlur
      }
    ),
    /* @__PURE__ */ jsx18(
      "button",
      {
        type: "button",
        disabled: disabled || selectionFontSize !== "" && Number(inputValue) >= MAX_ALLOWED_FONT_SIZE,
        onClick: (e) => {
          updateFontSize(editor, 1 /* increment */, inputValue, isKeyboardInput(e));
        },
        className: "toolbar-item font-increment",
        "aria-label": "Increase font size",
        children: /* @__PURE__ */ jsx18("i", { className: "format add-icon" })
      }
    )
  ] });
}

// src/plugins/ToolbarPlugin/index.tsx
import { useLexicalComposerContext as useLexicalComposerContext9 } from "@lexical/react/LexicalComposerContext";
import { Fragment as Fragment9, jsx as jsx19, jsxs as jsxs13 } from "react/jsx-runtime";
var FONT_FAMILY_OPTIONS = [
  ["Arial", "Arial"],
  ["Courier New", "Courier New"],
  ["Georgia", "Georgia"],
  ["Times New Roman", "Times New Roman"],
  ["Trebuchet MS", "Trebuchet MS"],
  ["Verdana", "Verdana"]
];
var FONT_SIZE_OPTIONS = [
  ["10px", "10px"],
  ["11px", "11px"],
  ["12px", "12px"],
  ["13px", "13px"],
  ["14px", "14px"],
  ["15px", "15px"],
  ["16px", "16px"],
  ["17px", "17px"],
  ["18px", "18px"],
  ["19px", "19px"],
  ["20px", "20px"]
];
var ELEMENT_FORMAT_OPTIONS = {
  center: {
    icon: "center-align",
    iconRTL: "center-align",
    name: "Center Align"
  },
  end: {
    icon: "right-align",
    iconRTL: "left-align",
    name: "End Align"
  },
  justify: {
    icon: "justify-align",
    iconRTL: "justify-align",
    name: "Justify Align"
  },
  left: {
    icon: "left-align",
    iconRTL: "left-align",
    name: "Left Align"
  },
  right: {
    icon: "right-align",
    iconRTL: "right-align",
    name: "Right Align"
  },
  start: {
    icon: "left-align",
    iconRTL: "right-align",
    name: "Start Align"
  }
};
function dropDownActiveClass(active) {
  if (active) {
    return "active dropdown-item-active";
  } else {
    return "";
  }
}
function BlockFormatDropDown({
  editor,
  blockType,
  disabled = false
}) {
  return /* @__PURE__ */ jsxs13(
    DropDown,
    {
      disabled,
      buttonClassName: "toolbar-item block-controls",
      buttonIconClassName: "icon block-type " + blockType,
      buttonLabel: blockTypeToBlockName[blockType],
      buttonAriaLabel: "Formatting options for text style",
      children: [
        /* @__PURE__ */ jsx19(
          DropDownItem,
          {
            className: "item wide " + dropDownActiveClass(blockType === "paragraph"),
            onClick: () => formatParagraph(editor),
            children: /* @__PURE__ */ jsxs13("div", { className: "icon-text-container", children: [
              /* @__PURE__ */ jsx19("i", { className: "icon paragraph" }),
              /* @__PURE__ */ jsx19("span", { className: "text", children: "Normal" })
            ] })
          }
        ),
        /* @__PURE__ */ jsx19(
          DropDownItem,
          {
            className: "item wide " + dropDownActiveClass(blockType === "h1"),
            onClick: () => formatHeading(editor, blockType, "h1"),
            children: /* @__PURE__ */ jsxs13("div", { className: "icon-text-container", children: [
              /* @__PURE__ */ jsx19("i", { className: "icon h1" }),
              /* @__PURE__ */ jsx19("span", { className: "text", children: "Heading 1" })
            ] })
          }
        ),
        /* @__PURE__ */ jsx19(
          DropDownItem,
          {
            className: "item wide " + dropDownActiveClass(blockType === "h2"),
            onClick: () => formatHeading(editor, blockType, "h2"),
            children: /* @__PURE__ */ jsxs13("div", { className: "icon-text-container", children: [
              /* @__PURE__ */ jsx19("i", { className: "icon h2" }),
              /* @__PURE__ */ jsx19("span", { className: "text", children: "Heading 2" })
            ] })
          }
        ),
        /* @__PURE__ */ jsx19(
          DropDownItem,
          {
            className: "item wide " + dropDownActiveClass(blockType === "h3"),
            onClick: () => formatHeading(editor, blockType, "h3"),
            children: /* @__PURE__ */ jsxs13("div", { className: "icon-text-container", children: [
              /* @__PURE__ */ jsx19("i", { className: "icon h3" }),
              /* @__PURE__ */ jsx19("span", { className: "text", children: "Heading 3" })
            ] })
          }
        ),
        /* @__PURE__ */ jsx19(
          DropDownItem,
          {
            className: "item wide " + dropDownActiveClass(blockType === "number"),
            onClick: () => formatNumberedList(editor, blockType),
            children: /* @__PURE__ */ jsxs13("div", { className: "icon-text-container", children: [
              /* @__PURE__ */ jsx19("i", { className: "icon numbered-list" }),
              /* @__PURE__ */ jsx19("span", { className: "text", children: "Numbered List" })
            ] })
          }
        ),
        /* @__PURE__ */ jsx19(
          DropDownItem,
          {
            className: "item wide " + dropDownActiveClass(blockType === "bullet"),
            onClick: () => formatBulletList(editor, blockType),
            children: /* @__PURE__ */ jsxs13("div", { className: "icon-text-container", children: [
              /* @__PURE__ */ jsx19("i", { className: "icon bullet-list" }),
              /* @__PURE__ */ jsx19("span", { className: "text", children: "Bullet List" })
            ] })
          }
        ),
        /* @__PURE__ */ jsx19(
          DropDownItem,
          {
            className: "item wide " + dropDownActiveClass(blockType === "quote"),
            onClick: () => formatQuote(editor, blockType),
            children: /* @__PURE__ */ jsxs13("div", { className: "icon-text-container", children: [
              /* @__PURE__ */ jsx19("i", { className: "icon quote" }),
              /* @__PURE__ */ jsx19("span", { className: "text", children: "Quote" })
            ] })
          }
        )
      ]
    }
  );
}
function Divider() {
  return /* @__PURE__ */ jsx19("div", { className: "divider" });
}
function FontDropDown({
  editor,
  value,
  style,
  disabled = false
}) {
  const handleClick = useCallback8(
    (option) => {
      editor.update(() => {
        $addUpdateTag2(SKIP_SELECTION_FOCUS_TAG2);
        const selection = $getSelection6();
        if (selection !== null) {
          $patchStyleText2(selection, {
            [style]: option
          });
        }
      });
    },
    [editor, style]
  );
  const buttonAriaLabel = style === "font-family" ? "Formatting options for font family" : "Formatting options for font size";
  return /* @__PURE__ */ jsx19(
    DropDown,
    {
      disabled,
      buttonClassName: "toolbar-item " + style,
      buttonLabel: value,
      buttonIconClassName: style === "font-family" ? "icon block-type font-family" : "",
      buttonAriaLabel,
      children: (style === "font-family" ? FONT_FAMILY_OPTIONS : FONT_SIZE_OPTIONS).map(([option, text]) => /* @__PURE__ */ jsx19(
        DropDownItem,
        {
          className: `item ${dropDownActiveClass(value === option)} ${style === "font-size" ? "fontsize-item" : ""}`,
          onClick: () => handleClick(option),
          children: /* @__PURE__ */ jsx19("span", { className: "text", children: text })
        },
        option
      ))
    }
  );
}
function ElementFormatDropdown({
  editor,
  value,
  isRTL,
  disabled = false
}) {
  const formatOption = ELEMENT_FORMAT_OPTIONS[value || "left"];
  return /* @__PURE__ */ jsxs13(
    DropDown,
    {
      disabled,
      buttonLabel: formatOption.name,
      buttonIconClassName: `icon ${isRTL ? formatOption.iconRTL : formatOption.icon}`,
      buttonClassName: "toolbar-item spaced alignment",
      buttonAriaLabel: "Formatting options for text alignment",
      children: [
        /* @__PURE__ */ jsx19(
          DropDownItem,
          {
            onClick: () => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
            },
            className: "item wide",
            children: /* @__PURE__ */ jsxs13("div", { className: "icon-text-container", children: [
              /* @__PURE__ */ jsx19("i", { className: "icon left-align" }),
              /* @__PURE__ */ jsx19("span", { className: "text", children: "Left Align" })
            ] })
          }
        ),
        /* @__PURE__ */ jsx19(
          DropDownItem,
          {
            onClick: () => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
            },
            className: "item wide",
            children: /* @__PURE__ */ jsxs13("div", { className: "icon-text-container", children: [
              /* @__PURE__ */ jsx19("i", { className: "icon center-align" }),
              /* @__PURE__ */ jsx19("span", { className: "text", children: "Center Align" })
            ] })
          }
        ),
        /* @__PURE__ */ jsx19(
          DropDownItem,
          {
            onClick: () => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
            },
            className: "item wide",
            children: /* @__PURE__ */ jsxs13("div", { className: "icon-text-container", children: [
              /* @__PURE__ */ jsx19("i", { className: "icon right-align" }),
              /* @__PURE__ */ jsx19("span", { className: "text", children: "Right Align" })
            ] })
          }
        ),
        /* @__PURE__ */ jsx19(
          DropDownItem,
          {
            onClick: () => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
            },
            className: "item wide",
            children: /* @__PURE__ */ jsxs13("div", { className: "icon-text-container", children: [
              /* @__PURE__ */ jsx19("i", { className: "icon justify-align" }),
              /* @__PURE__ */ jsx19("span", { className: "text", children: "Justify Align" })
            ] })
          }
        ),
        /* @__PURE__ */ jsxs13(
          DropDownItem,
          {
            onClick: () => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "start");
            },
            className: "item wide",
            children: [
              /* @__PURE__ */ jsx19(
                "i",
                {
                  className: `icon ${isRTL ? ELEMENT_FORMAT_OPTIONS.start.iconRTL : ELEMENT_FORMAT_OPTIONS.start.icon}`
                }
              ),
              /* @__PURE__ */ jsx19("span", { className: "text", children: "Start Align" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs13(
          DropDownItem,
          {
            onClick: () => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "end");
            },
            className: "item wide",
            children: [
              /* @__PURE__ */ jsx19(
                "i",
                {
                  className: `icon ${isRTL ? ELEMENT_FORMAT_OPTIONS.end.iconRTL : ELEMENT_FORMAT_OPTIONS.end.icon}`
                }
              ),
              /* @__PURE__ */ jsx19("span", { className: "text", children: "End Align" })
            ]
          }
        ),
        /* @__PURE__ */ jsx19(Divider, {}),
        /* @__PURE__ */ jsx19(
          DropDownItem,
          {
            onClick: () => {
              editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, void 0);
            },
            className: "item wide",
            children: /* @__PURE__ */ jsxs13("div", { className: "icon-text-container", children: [
              /* @__PURE__ */ jsx19("i", { className: "icon " + (isRTL ? "indent" : "outdent") }),
              /* @__PURE__ */ jsx19("span", { className: "text", children: "Outdent" })
            ] })
          }
        ),
        /* @__PURE__ */ jsx19(
          DropDownItem,
          {
            onClick: () => {
              editor.dispatchCommand(INDENT_CONTENT_COMMAND, void 0);
            },
            className: "item wide",
            children: /* @__PURE__ */ jsxs13("div", { className: "icon-text-container", children: [
              /* @__PURE__ */ jsx19("i", { className: "icon " + (isRTL ? "outdent" : "indent") }),
              /* @__PURE__ */ jsx19("span", { className: "text", children: "Indent" })
            ] })
          }
        )
      ]
    }
  );
}
function $findTopLevelElement(node) {
  let topLevelElement = node.getKey() === "root" ? node : $findMatchingParent4(node, (e) => {
    const parent = e.getParent();
    return parent !== null && $isRootOrShadowRoot2(parent);
  });
  if (topLevelElement === null) {
    topLevelElement = node.getTopLevelElementOrThrow();
  }
  return topLevelElement;
}
function ToolbarPlugin({
  setIsLinkEditMode,
  onUpload
}) {
  const [editor] = useLexicalComposerContext9();
  const [activeEditor, setActiveEditor] = useState14(editor);
  const [modal, showModal] = useModal();
  const [isEditable, setIsEditable] = useState14(() => editor.isEditable());
  const { toolbarState, updateToolbarState } = useToolbarState();
  const dispatchToolbarCommand = (command, payload = void 0, skipRefocus = false) => {
    activeEditor.update(() => {
      if (skipRefocus) {
        $addUpdateTag2(SKIP_DOM_SELECTION_TAG2);
      }
      activeEditor.dispatchCommand(command, payload);
    });
  };
  const dispatchFormatTextCommand = (payload, skipRefocus = false) => dispatchToolbarCommand(FORMAT_TEXT_COMMAND, payload, skipRefocus);
  const $handleHeadingNode = useCallback8(
    (selectedElement) => {
      const type = $isHeadingNode2(selectedElement) ? selectedElement.getTag() : selectedElement.getType();
      if (type in blockTypeToBlockName) {
        updateToolbarState("blockType", type);
      }
    },
    [updateToolbarState]
  );
  const $updateToolbar = useCallback8(() => {
    const selection = $getSelection6();
    if ($isRangeSelection5(selection)) {
      if (activeEditor !== editor && $isEditorIsNestedEditor(activeEditor)) {
        const rootElement = activeEditor.getRootElement();
        updateToolbarState(
          "isImageCaption",
          !!rootElement?.parentElement?.classList.contains("image-caption-container")
        );
      } else {
        updateToolbarState("isImageCaption", false);
      }
      const anchorNode = selection.anchor.getNode();
      const element = $findTopLevelElement(anchorNode);
      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);
      updateToolbarState("isRTL", $isParentElementRTL(selection));
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      const isLink = $isLinkNode3(parent) || $isLinkNode3(node);
      updateToolbarState("isLink", isLink);
      const tableNode = $findMatchingParent4(node, $isTableNode);
      if ($isTableNode(tableNode)) {
        updateToolbarState("rootType", "table");
      } else {
        updateToolbarState("rootType", "root");
      }
      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getListType() : element.getListType();
          updateToolbarState("blockType", type);
        } else {
          $handleHeadingNode(element);
        }
      }
      updateToolbarState(
        "fontColor",
        $getSelectionStyleValueForProperty(selection, "color", "#000")
      );
      updateToolbarState(
        "bgColor",
        $getSelectionStyleValueForProperty(selection, "background-color", "#fff")
      );
      updateToolbarState(
        "fontFamily",
        $getSelectionStyleValueForProperty(selection, "font-family", "Arial")
      );
      let matchingParent;
      if ($isLinkNode3(parent)) {
        matchingParent = $findMatchingParent4(
          node,
          (parentNode) => $isElementNode2(parentNode) && !parentNode.isInline()
        );
      }
      updateToolbarState(
        "elementFormat",
        $isElementNode2(matchingParent) ? matchingParent.getFormatType() : $isElementNode2(node) ? node.getFormatType() : parent?.getFormatType() || "left"
      );
    }
    if ($isRangeSelection5(selection) || $isTableSelection3(selection)) {
      updateToolbarState("isBold", selection.hasFormat("bold"));
      updateToolbarState("isItalic", selection.hasFormat("italic"));
      updateToolbarState("isUnderline", selection.hasFormat("underline"));
      updateToolbarState("isStrikethrough", selection.hasFormat("strikethrough"));
      updateToolbarState("isSubscript", selection.hasFormat("subscript"));
      updateToolbarState("isSuperscript", selection.hasFormat("superscript"));
      updateToolbarState("isHighlight", selection.hasFormat("highlight"));
      updateToolbarState("isCode", selection.hasFormat("code"));
      updateToolbarState(
        "fontSize",
        $getSelectionStyleValueForProperty(selection, "font-size", "15px")
      );
      updateToolbarState("isLowercase", selection.hasFormat("lowercase"));
      updateToolbarState("isUppercase", selection.hasFormat("uppercase"));
      updateToolbarState("isCapitalize", selection.hasFormat("capitalize"));
    }
    if ($isNodeSelection3(selection)) {
      const nodes = selection.getNodes();
      for (const selectedNode of nodes) {
        const parentList = $getNearestNodeOfType(selectedNode, ListNode);
        if (parentList) {
          const type = parentList.getListType();
          updateToolbarState("blockType", type);
        } else {
          const selectedElement = $findTopLevelElement(selectedNode);
          $handleHeadingNode(selectedElement);
          if ($isElementNode2(selectedElement)) {
            updateToolbarState("elementFormat", selectedElement.getFormatType());
          }
        }
      }
    }
  }, [activeEditor, editor, updateToolbarState, $handleHeadingNode]);
  useEffect13(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND3,
      (_payload, newEditor) => {
        setActiveEditor(newEditor);
        $updateToolbar();
        return false;
      },
      COMMAND_PRIORITY_CRITICAL3
    );
  }, [editor, $updateToolbar, setActiveEditor]);
  useEffect13(() => {
    activeEditor.getEditorState().read(
      () => {
        $updateToolbar();
      },
      { editor: activeEditor }
    );
  }, [activeEditor, $updateToolbar]);
  useEffect13(() => {
    return mergeRegister6(
      editor.registerEditableListener((editable) => {
        setIsEditable(editable);
      }),
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(
          () => {
            $updateToolbar();
          },
          { editor: activeEditor }
        );
      }),
      activeEditor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          updateToolbarState("canUndo", payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL3
      ),
      activeEditor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          updateToolbarState("canRedo", payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL3
      )
    );
  }, [$updateToolbar, activeEditor, editor, updateToolbarState]);
  const applyStyleText = useCallback8(
    (styles, skipHistoryStack, skipRefocus = false) => {
      activeEditor.update(
        () => {
          if (skipRefocus) {
            $addUpdateTag2(SKIP_DOM_SELECTION_TAG2);
          }
          const selection = $getSelection6();
          if (selection !== null) {
            $patchStyleText2(selection, styles);
          }
        },
        skipHistoryStack ? { tag: HISTORIC_TAG } : {}
      );
    },
    [activeEditor]
  );
  const onFontColorSelect = useCallback8(
    (value, skipHistoryStack, skipRefocus) => {
      applyStyleText({ color: value }, skipHistoryStack, skipRefocus);
    },
    [applyStyleText]
  );
  const onBgColorSelect = useCallback8(
    (value, skipHistoryStack, skipRefocus) => {
      applyStyleText({ "background-color": value }, skipHistoryStack, skipRefocus);
    },
    [applyStyleText]
  );
  const insertLink = useCallback8(() => {
    if (!toolbarState.isLink) {
      setIsLinkEditMode(true);
      activeEditor.dispatchCommand(TOGGLE_LINK_COMMAND3, sanitizeUrl("https://"));
    } else {
      setIsLinkEditMode(false);
      activeEditor.dispatchCommand(TOGGLE_LINK_COMMAND3, null);
    }
  }, [activeEditor, setIsLinkEditMode, toolbarState.isLink]);
  const canViewerSeeInsertDropdown = !toolbarState.isImageCaption;
  const canViewerSeeInsertCodeButton = !toolbarState.isImageCaption;
  return /* @__PURE__ */ jsxs13("div", { className: "toolbar", children: [
    /* @__PURE__ */ jsx19(
      "button",
      {
        disabled: !toolbarState.canUndo || !isEditable,
        onClick: (e) => dispatchToolbarCommand(UNDO_COMMAND, void 0, isKeyboardInput(e)),
        title: IS_APPLE ? "Undo (\u2318Z)" : "Undo (Ctrl+Z)",
        type: "button",
        className: "toolbar-item spaced",
        "aria-label": "Undo",
        children: /* @__PURE__ */ jsx19("i", { className: "format undo" })
      }
    ),
    /* @__PURE__ */ jsx19(
      "button",
      {
        disabled: !toolbarState.canRedo || !isEditable,
        onClick: (e) => dispatchToolbarCommand(REDO_COMMAND, void 0, isKeyboardInput(e)),
        title: IS_APPLE ? "Redo (\u21E7\u2318Z)" : "Redo (Ctrl+Y)",
        type: "button",
        className: "toolbar-item",
        "aria-label": "Redo",
        children: /* @__PURE__ */ jsx19("i", { className: "format redo" })
      }
    ),
    /* @__PURE__ */ jsx19(Divider, {}),
    toolbarState.blockType in blockTypeToBlockName && activeEditor === editor && /* @__PURE__ */ jsxs13(Fragment9, { children: [
      /* @__PURE__ */ jsx19(
        BlockFormatDropDown,
        {
          disabled: !isEditable,
          blockType: toolbarState.blockType,
          rootType: toolbarState.rootType,
          editor: activeEditor
        }
      ),
      /* @__PURE__ */ jsx19(Divider, {})
    ] }),
    /* @__PURE__ */ jsxs13(Fragment9, { children: [
      /* @__PURE__ */ jsx19(
        FontDropDown,
        {
          disabled: !isEditable,
          style: "font-family",
          value: toolbarState.fontFamily,
          editor: activeEditor
        }
      ),
      /* @__PURE__ */ jsx19(Divider, {}),
      /* @__PURE__ */ jsx19(
        FontSize,
        {
          selectionFontSize: parseFontSizeForToolbar(toolbarState.fontSize).slice(0, -2),
          editor: activeEditor,
          disabled: !isEditable
        }
      ),
      /* @__PURE__ */ jsx19(Divider, {}),
      /* @__PURE__ */ jsx19(
        "button",
        {
          disabled: !isEditable,
          onClick: (e) => dispatchFormatTextCommand("bold", isKeyboardInput(e)),
          className: "toolbar-item spaced " + (toolbarState.isBold ? "active" : ""),
          type: "button",
          children: /* @__PURE__ */ jsx19("i", { className: "format bold" })
        }
      ),
      /* @__PURE__ */ jsx19(
        "button",
        {
          disabled: !isEditable,
          onClick: (e) => dispatchFormatTextCommand("italic", isKeyboardInput(e)),
          className: "toolbar-item spaced " + (toolbarState.isItalic ? "active" : ""),
          type: "button",
          children: /* @__PURE__ */ jsx19("i", { className: "format italic" })
        }
      ),
      /* @__PURE__ */ jsx19(
        "button",
        {
          disabled: !isEditable,
          onClick: (e) => dispatchFormatTextCommand("underline", isKeyboardInput(e)),
          className: "toolbar-item spaced " + (toolbarState.isUnderline ? "active" : ""),
          type: "button",
          children: /* @__PURE__ */ jsx19("i", { className: "format underline" })
        }
      ),
      canViewerSeeInsertCodeButton && /* @__PURE__ */ jsx19(
        "button",
        {
          disabled: !isEditable,
          onClick: (e) => dispatchFormatTextCommand("code", isKeyboardInput(e)),
          className: "toolbar-item spaced " + (toolbarState.isCode ? "active" : ""),
          type: "button",
          children: /* @__PURE__ */ jsx19("i", { className: "format code" })
        }
      ),
      /* @__PURE__ */ jsx19(
        "button",
        {
          disabled: !isEditable,
          onClick: insertLink,
          className: "toolbar-item spaced " + (toolbarState.isLink ? "active" : ""),
          "aria-label": "Insert link",
          type: "button",
          children: /* @__PURE__ */ jsx19("i", { className: "format link" })
        }
      ),
      /* @__PURE__ */ jsx19(
        DropdownColorPicker,
        {
          disabled: !isEditable,
          buttonClassName: "toolbar-item color-picker",
          buttonAriaLabel: "Formatting text color",
          buttonIconClassName: "icon font-color",
          color: toolbarState.fontColor,
          onChange: onFontColorSelect,
          title: "text color"
        }
      ),
      /* @__PURE__ */ jsx19(
        DropdownColorPicker,
        {
          disabled: !isEditable,
          buttonClassName: "toolbar-item color-picker",
          buttonAriaLabel: "Formatting background color",
          buttonIconClassName: "icon bg-color",
          color: toolbarState.bgColor,
          onChange: onBgColorSelect,
          title: "bg color"
        }
      ),
      /* @__PURE__ */ jsxs13(
        DropDown,
        {
          disabled: !isEditable,
          buttonClassName: "toolbar-item spaced",
          buttonLabel: "",
          buttonAriaLabel: "Formatting options for additional text styles",
          buttonIconClassName: "icon dropdown-more",
          children: [
            /* @__PURE__ */ jsx19(
              DropDownItem,
              {
                onClick: (e) => dispatchFormatTextCommand("lowercase", isKeyboardInput(e)),
                className: "item wide " + dropDownActiveClass(toolbarState.isLowercase),
                title: "Lowercase",
                "aria-label": "Format text to lowercase",
                children: /* @__PURE__ */ jsxs13("div", { className: "icon-text-container", children: [
                  /* @__PURE__ */ jsx19("i", { className: "icon lowercase" }),
                  /* @__PURE__ */ jsx19("span", { className: "text", children: "Lowercase" })
                ] })
              }
            ),
            /* @__PURE__ */ jsx19(
              DropDownItem,
              {
                onClick: (e) => dispatchFormatTextCommand("uppercase", isKeyboardInput(e)),
                className: "item wide " + dropDownActiveClass(toolbarState.isUppercase),
                children: /* @__PURE__ */ jsxs13("div", { className: "icon-text-container", children: [
                  /* @__PURE__ */ jsx19("i", { className: "icon uppercase" }),
                  /* @__PURE__ */ jsx19("span", { className: "text", children: "Uppercase" })
                ] })
              }
            ),
            /* @__PURE__ */ jsx19(
              DropDownItem,
              {
                onClick: (e) => dispatchFormatTextCommand("capitalize", isKeyboardInput(e)),
                className: "item wide " + dropDownActiveClass(toolbarState.isCapitalize),
                title: "Capitalize",
                "aria-label": "Format text to capitalize",
                children: /* @__PURE__ */ jsxs13("div", { className: "icon-text-container", children: [
                  /* @__PURE__ */ jsx19("i", { className: "icon capitalize" }),
                  /* @__PURE__ */ jsx19("span", { className: "text", children: "Capitalize" })
                ] })
              }
            ),
            /* @__PURE__ */ jsx19(
              DropDownItem,
              {
                onClick: (e) => dispatchFormatTextCommand("strikethrough", isKeyboardInput(e)),
                className: "item wide " + dropDownActiveClass(toolbarState.isStrikethrough),
                title: "Strikethrough",
                "aria-label": "Format text with a strikethrough",
                children: /* @__PURE__ */ jsxs13("div", { className: "icon-text-container", children: [
                  /* @__PURE__ */ jsx19("i", { className: "icon strikethrough" }),
                  /* @__PURE__ */ jsx19("span", { className: "text", children: "Strikethrough" })
                ] })
              }
            ),
            /* @__PURE__ */ jsx19(
              DropDownItem,
              {
                onClick: (e) => dispatchFormatTextCommand("subscript", isKeyboardInput(e)),
                className: "item wide " + dropDownActiveClass(toolbarState.isSubscript),
                title: "Subscript",
                "aria-label": "Format text with a subscript",
                children: /* @__PURE__ */ jsxs13("div", { className: "icon-text-container", children: [
                  /* @__PURE__ */ jsx19("i", { className: "icon subscript" }),
                  /* @__PURE__ */ jsx19("span", { className: "text", children: "Subscript" })
                ] })
              }
            ),
            /* @__PURE__ */ jsx19(
              DropDownItem,
              {
                onClick: (e) => dispatchFormatTextCommand("superscript", isKeyboardInput(e)),
                className: "item wide " + dropDownActiveClass(toolbarState.isSuperscript),
                title: "Superscript",
                "aria-label": "Format text with a superscript",
                children: /* @__PURE__ */ jsxs13("div", { className: "icon-text-container", children: [
                  /* @__PURE__ */ jsx19("i", { className: "icon superscript" }),
                  /* @__PURE__ */ jsx19("span", { className: "text", children: "Superscript" })
                ] })
              }
            ),
            /* @__PURE__ */ jsx19(
              DropDownItem,
              {
                onClick: (e) => dispatchFormatTextCommand("highlight", isKeyboardInput(e)),
                className: "item wide " + dropDownActiveClass(toolbarState.isHighlight),
                title: "Highlight",
                "aria-label": "Format text with a highlight",
                children: /* @__PURE__ */ jsxs13("div", { className: "icon-text-container", children: [
                  /* @__PURE__ */ jsx19("i", { className: "icon highlight" }),
                  /* @__PURE__ */ jsx19("span", { className: "text", children: "Highlight" })
                ] })
              }
            ),
            /* @__PURE__ */ jsx19(
              DropDownItem,
              {
                onClick: (e) => clearFormatting(activeEditor, isKeyboardInput(e)),
                className: "item wide",
                title: "Clear text formatting",
                "aria-label": "Clear all text formatting",
                children: /* @__PURE__ */ jsxs13("div", { className: "icon-text-container", children: [
                  /* @__PURE__ */ jsx19("i", { className: "icon clear" }),
                  /* @__PURE__ */ jsx19("span", { className: "text", children: "Clear Formatting" })
                ] })
              }
            )
          ]
        }
      ),
      canViewerSeeInsertDropdown && /* @__PURE__ */ jsxs13(Fragment9, { children: [
        /* @__PURE__ */ jsx19(Divider, {}),
        /* @__PURE__ */ jsxs13(
          DropDown,
          {
            disabled: !isEditable,
            buttonClassName: "toolbar-item spaced",
            buttonLabel: "Insert",
            buttonAriaLabel: "Insert specialized editor node",
            buttonIconClassName: "icon plus",
            children: [
              /* @__PURE__ */ jsxs13(
                DropDownItem,
                {
                  onClick: () => {
                    showModal("Insert Image", (onClose) => /* @__PURE__ */ jsx19(
                      InsertImageDialog,
                      {
                        activeEditor,
                        onClose,
                        onUpload
                      }
                    ));
                  },
                  className: "item",
                  children: [
                    /* @__PURE__ */ jsx19("i", { className: "icon image" }),
                    /* @__PURE__ */ jsx19("span", { className: "text", children: "Image" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs13(
                DropDownItem,
                {
                  onClick: () => {
                    showModal("Insert Table", (onClose) => /* @__PURE__ */ jsx19(InsertTableDialog, { activeEditor, onClose }));
                  },
                  className: "item",
                  children: [
                    /* @__PURE__ */ jsx19("i", { className: "icon table" }),
                    /* @__PURE__ */ jsx19("span", { className: "text", children: "Table" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs13(
                DropDownItem,
                {
                  onClick: () => {
                    showModal("Insert Columns Layout", (onClose) => /* @__PURE__ */ jsx19(InsertLayoutDialog, { activeEditor, onClose }));
                  },
                  className: "item",
                  children: [
                    /* @__PURE__ */ jsx19("i", { className: "icon columns" }),
                    /* @__PURE__ */ jsx19("span", { className: "text", children: "Columns Layout" })
                  ]
                }
              )
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx19(Divider, {}),
    /* @__PURE__ */ jsx19(
      ElementFormatDropdown,
      {
        disabled: !isEditable,
        value: toolbarState.elementFormat,
        editor: activeEditor,
        isRTL: toolbarState.isRTL
      }
    ),
    modal
  ] });
}

// src/ui/LoadingLayer.tsx
import { jsx as jsx20, jsxs as jsxs14 } from "react/jsx-runtime";
function LoadingLayer() {
  return /* @__PURE__ */ jsx20("div", { className: "loading-overlay", children: /* @__PURE__ */ jsxs14("div", { className: "loading-content", children: [
    /* @__PURE__ */ jsx20("div", { className: "spinner" }),
    /* @__PURE__ */ jsx20("p", { className: "loading-text", children: "Loading..." })
  ] }) });
}

// src/ReactLexicalEditor.tsx
import { Fragment as Fragment10, jsx as jsx21, jsxs as jsxs15 } from "react/jsx-runtime";
var Editor = ({
  value,
  onChange,
  onUpload,
  placeholder,
  className,
  loading,
  style
}) => {
  const {
    settings: { isRichText }
  } = useSettings();
  const { historyState } = useSharedHistoryContext();
  const [floatingAnchorElem, setFloatingAnchorElem] = useState15(null);
  const [isLinkEditMode, setIsLinkEditMode] = useState15(false);
  const onRef = (_floatingAnchorElem) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };
  return /* @__PURE__ */ jsxs15("div", { className: `editor-shell ${className}`, children: [
    loading && /* @__PURE__ */ jsx21(LoadingLayer, {}),
    isRichText && /* @__PURE__ */ jsx21(
      ToolbarPlugin,
      {
        setIsLinkEditMode,
        onUpload
      }
    ),
    /* @__PURE__ */ jsxs15("div", { className: "editor-container", children: [
      /* @__PURE__ */ jsx21(
        RichTextPlugin,
        {
          contentEditable: /* @__PURE__ */ jsx21("div", { className: "editor-scroller", children: /* @__PURE__ */ jsx21("div", { className: "editor", ref: onRef, children: /* @__PURE__ */ jsx21(
            LexicalContentEditable,
            {
              style,
              placeholder: placeholder || "Enter text..."
            }
          ) }) }),
          ErrorBoundary: LexicalErrorBoundary
        }
      ),
      /* @__PURE__ */ jsx21(HistoryPlugin, { externalHistoryState: historyState }),
      /* @__PURE__ */ jsx21(ListPlugin, {}),
      /* @__PURE__ */ jsx21(LinkPlugin, {}),
      /* @__PURE__ */ jsx21(TablePlugin, {}),
      /* @__PURE__ */ jsx21(TableCellResizerPlugin, {}),
      floatingAnchorElem && /* @__PURE__ */ jsxs15(Fragment10, { children: [
        /* @__PURE__ */ jsx21(
          FloatingLinkEditorPlugin,
          {
            anchorElem: floatingAnchorElem,
            isLinkEditMode,
            setIsLinkEditMode
          }
        ),
        /* @__PURE__ */ jsx21(
          TableActionMenuPlugin,
          {
            anchorElem: floatingAnchorElem,
            cellMerge: true
          }
        )
      ] }),
      /* @__PURE__ */ jsx21(ImagesPlugin, {}),
      /* @__PURE__ */ jsx21(DragDropPastePlugin, { onUpload }),
      /* @__PURE__ */ jsx21(InitialValuePlugin, { value }),
      /* @__PURE__ */ jsx21(
        OnChangePlugin,
        {
          onChange: (editorState, editor) => {
            const html = lexicalToHtml(editor, editorState);
            onChange?.(html);
          }
        }
      )
    ] })
  ] });
};
var ReactLexicalEditor_default = memo(Editor);

// src/nodes/PlaygroundNodes.ts
import { AutoLinkNode, LinkNode as LinkNode2 } from "@lexical/link";
import { ListItemNode, ListNode as ListNode2 } from "@lexical/list";

// node_modules/@lexical/mark/LexicalMark.node.mjs
var mod2 = await (process.env.NODE_ENV !== "production" ? import("./LexicalMark.dev-FBOMFOZB.js") : import("./LexicalMark.prod-3S45EM3S.js"));
var $createMarkNode = mod2.$createMarkNode;
var $getMarkIDs = mod2.$getMarkIDs;
var $isMarkNode = mod2.$isMarkNode;
var $unwrapMarkNode = mod2.$unwrapMarkNode;
var $wrapSelectionInMarkNode = mod2.$wrapSelectionInMarkNode;
var MarkExtension = mod2.MarkExtension;
var MarkNode = mod2.MarkNode;

// node_modules/@lexical/overflow/LexicalOverflow.node.mjs
var mod3 = await (process.env.NODE_ENV !== "production" ? import("./LexicalOverflow.dev-Z6QANS7X.js") : import("./LexicalOverflow.prod-OUA7NRJS.js"));
var $createOverflowNode = mod3.$createOverflowNode;
var $isOverflowNode = mod3.$isOverflowNode;
var OverflowExtension = mod3.OverflowExtension;
var OverflowNode = mod3.OverflowNode;

// src/nodes/PlaygroundNodes.ts
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode as TableCellNode3, TableNode as TableNode3, TableRowNode as TableRowNode2 } from "@lexical/table";
var PlaygroundNodes = [
  HeadingNode,
  ListNode2,
  ListItemNode,
  QuoteNode,
  TableNode3,
  TableCellNode3,
  TableRowNode2,
  AutoLinkNode,
  LinkNode2,
  OverflowNode,
  ImageNode,
  KeywordNode,
  MarkNode,
  LayoutContainerNode,
  LayoutItemNode
];
var PlaygroundNodes_default = PlaygroundNodes;

// src/themes/PlaygroundEditorTheme.ts
var theme = {
  autocomplete: "PlaygroundEditorTheme__autocomplete",
  blockCursor: "PlaygroundEditorTheme__blockCursor",
  characterLimit: "PlaygroundEditorTheme__characterLimit",
  code: "PlaygroundEditorTheme__code",
  codeHighlight: {
    atrule: "PlaygroundEditorTheme__tokenAttr",
    attr: "PlaygroundEditorTheme__tokenAttr",
    boolean: "PlaygroundEditorTheme__tokenProperty",
    builtin: "PlaygroundEditorTheme__tokenSelector",
    cdata: "PlaygroundEditorTheme__tokenComment",
    char: "PlaygroundEditorTheme__tokenSelector",
    class: "PlaygroundEditorTheme__tokenFunction",
    "class-name": "PlaygroundEditorTheme__tokenFunction",
    comment: "PlaygroundEditorTheme__tokenComment",
    constant: "PlaygroundEditorTheme__tokenProperty",
    deleted: "PlaygroundEditorTheme__tokenDeleted",
    doctype: "PlaygroundEditorTheme__tokenComment",
    entity: "PlaygroundEditorTheme__tokenOperator",
    function: "PlaygroundEditorTheme__tokenFunction",
    important: "PlaygroundEditorTheme__tokenVariable",
    inserted: "PlaygroundEditorTheme__tokenInserted",
    keyword: "PlaygroundEditorTheme__tokenAttr",
    namespace: "PlaygroundEditorTheme__tokenVariable",
    number: "PlaygroundEditorTheme__tokenProperty",
    operator: "PlaygroundEditorTheme__tokenOperator",
    prolog: "PlaygroundEditorTheme__tokenComment",
    property: "PlaygroundEditorTheme__tokenProperty",
    punctuation: "PlaygroundEditorTheme__tokenPunctuation",
    regex: "PlaygroundEditorTheme__tokenVariable",
    selector: "PlaygroundEditorTheme__tokenSelector",
    string: "PlaygroundEditorTheme__tokenSelector",
    symbol: "PlaygroundEditorTheme__tokenProperty",
    tag: "PlaygroundEditorTheme__tokenProperty",
    unchanged: "PlaygroundEditorTheme__tokenUnchanged",
    url: "PlaygroundEditorTheme__tokenOperator",
    variable: "PlaygroundEditorTheme__tokenVariable"
  },
  embedBlock: {
    base: "PlaygroundEditorTheme__embedBlock",
    focus: "PlaygroundEditorTheme__embedBlockFocus"
  },
  hashtag: "PlaygroundEditorTheme__hashtag",
  heading: {
    h1: "PlaygroundEditorTheme__h1",
    h2: "PlaygroundEditorTheme__h2",
    h3: "PlaygroundEditorTheme__h3",
    h4: "PlaygroundEditorTheme__h4",
    h5: "PlaygroundEditorTheme__h5",
    h6: "PlaygroundEditorTheme__h6"
  },
  hr: "PlaygroundEditorTheme__hr",
  hrSelected: "PlaygroundEditorTheme__hrSelected",
  image: "editor-image",
  indent: "PlaygroundEditorTheme__indent",
  layoutContainer: "PlaygroundEditorTheme__layoutContainer",
  layoutItem: "PlaygroundEditorTheme__layoutItem",
  link: "PlaygroundEditorTheme__link",
  list: {
    checklist: "PlaygroundEditorTheme__checklist",
    listitem: "PlaygroundEditorTheme__listItem",
    listitemChecked: "PlaygroundEditorTheme__listItemChecked",
    listitemUnchecked: "PlaygroundEditorTheme__listItemUnchecked",
    nested: {
      listitem: "PlaygroundEditorTheme__nestedListItem"
    },
    olDepth: [
      "PlaygroundEditorTheme__ol1",
      "PlaygroundEditorTheme__ol2",
      "PlaygroundEditorTheme__ol3",
      "PlaygroundEditorTheme__ol4",
      "PlaygroundEditorTheme__ol5"
    ],
    ul: "PlaygroundEditorTheme__ul"
  },
  mark: "PlaygroundEditorTheme__mark",
  markOverlap: "PlaygroundEditorTheme__markOverlap",
  paragraph: "PlaygroundEditorTheme__paragraph",
  quote: "PlaygroundEditorTheme__quote",
  specialText: "PlaygroundEditorTheme__specialText",
  tab: "PlaygroundEditorTheme__tabNode",
  table: "PlaygroundEditorTheme__table",
  tableAddColumns: "PlaygroundEditorTheme__tableAddColumns",
  tableAddRows: "PlaygroundEditorTheme__tableAddRows",
  tableAlignment: {
    center: "PlaygroundEditorTheme__tableAlignmentCenter",
    right: "PlaygroundEditorTheme__tableAlignmentRight"
  },
  tableCell: "PlaygroundEditorTheme__tableCell",
  tableCellActionButton: "PlaygroundEditorTheme__tableCellActionButton",
  tableCellActionButtonContainer: "PlaygroundEditorTheme__tableCellActionButtonContainer",
  tableCellHeader: "PlaygroundEditorTheme__tableCellHeader",
  tableCellResizer: "PlaygroundEditorTheme__tableCellResizer",
  tableCellSelected: "PlaygroundEditorTheme__tableCellSelected",
  tableFrozenColumn: "PlaygroundEditorTheme__tableFrozenColumn",
  tableFrozenRow: "PlaygroundEditorTheme__tableFrozenRow",
  tableRowStriping: "PlaygroundEditorTheme__tableRowStriping",
  tableScrollableWrapper: "PlaygroundEditorTheme__tableScrollableWrapper",
  tableSelected: "PlaygroundEditorTheme__tableSelected",
  tableSelection: "PlaygroundEditorTheme__tableSelection",
  text: {
    bold: "PlaygroundEditorTheme__textBold",
    capitalize: "PlaygroundEditorTheme__textCapitalize",
    code: "PlaygroundEditorTheme__textCode",
    highlight: "PlaygroundEditorTheme__textHighlight",
    italic: "PlaygroundEditorTheme__textItalic",
    lowercase: "PlaygroundEditorTheme__textLowercase",
    strikethrough: "PlaygroundEditorTheme__textStrikethrough",
    subscript: "PlaygroundEditorTheme__textSubscript",
    superscript: "PlaygroundEditorTheme__textSuperscript",
    underline: "PlaygroundEditorTheme__textUnderline",
    underlineStrikethrough: "PlaygroundEditorTheme__textUnderlineStrikethrough",
    uppercase: "PlaygroundEditorTheme__textUppercase"
  }
};
var PlaygroundEditorTheme_default = theme;

// src/App.tsx
import { jsx as jsx22 } from "react/jsx-runtime";
function App(props) {
  const { disabled = false, ...rest } = props;
  const initialConfig = {
    namespace: "ReactLexicalEditor",
    theme: PlaygroundEditorTheme_default,
    onError: (error) => {
      console.error(error);
    },
    nodes: PlaygroundNodes_default,
    editable: !disabled
  };
  return /* @__PURE__ */ jsx22(LexicalCollaboration, { children: /* @__PURE__ */ jsx22(SharedHistoryContext, { children: /* @__PURE__ */ jsx22(SettingsContext, { children: /* @__PURE__ */ jsx22(TableContext, { children: /* @__PURE__ */ jsx22(ToolbarContext, { children: /* @__PURE__ */ jsx22(LexicalComposer, { initialConfig, children: /* @__PURE__ */ jsx22(ReactLexicalEditor_default, { ...rest }) }) }) }) }) }) });
}
export {
  App as ReactLexicalEditor
};
//# sourceMappingURL=index.js.map