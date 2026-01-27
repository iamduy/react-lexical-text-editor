// React and hooks
import { useEffect, useState } from "react";

// Lexical core plugins
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";

// Contexts
import { useSettings } from "./context/SettingsContext";
import { useSharedHistoryContext } from "./context/SharedHistoryContext";

// Custom plugins
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import DragDropPlugin from "./plugins/DragDropPlugin";
import FloatingLinkEditorPlugin from "./plugins/FloatingLinkEditorPlugin";
import FloatingTextFormatToolbarPlugin from "./plugins/FloatingTextFormatToolbarPlugin";
import HtmlOnChangePlugin from "./plugins/HtmlOnChangePlugin";
import ImagesPlugin from "./plugins/ImagesPlugin";
import InitializationPlugin from "./plugins/InitializationPlugin";
import LinkPlugin from "./plugins/LinkPlugin";
import ShortcutsPlugin from "./plugins/ShortcutsPlugin";
import TableActionMenuPlugin from "./plugins/TableActionMenuPlugin";
import TableCellResizer from "./plugins/TableCellResizer";
import ToolbarPlugin from "./plugins/ToolbarPlugin";

// UI components
import ContentEditable from "./ui/ContentEditable";
import LoadingLayer from "./ui/LoadingLayer";

// Types and utils
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { CAN_USE_DOM } from "@lexical/utils";
import { ImagePasteUploadPlugin } from "./plugins/ImagePasteUploadPlugin";
import { ReactLexicalTextEditorProps } from "./types";

const Editor = ({
  value,
  onChange,
  onUpload,
  placeholder,
  className,
  loading,
  style,
  toolbarConfig,
  name,
  ignoreSelectionChange,
  resize = false,
  rows,
  cols,
  autoResize = false,
}: ReactLexicalTextEditorProps) => {
  const {
    settings: { isRichText, hasLinkAttributes },
  } = useSettings();
  const { historyState } = useSharedHistoryContext();
  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);
  const [isSmallWidthViewport, setIsSmallWidthViewport] = useState<boolean>(false);
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);

  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);
  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  useEffect(() => {
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport =
        CAN_USE_DOM && window.matchMedia("(max-width: 1025px)").matches;

      if (isNextSmallWidthViewport !== isSmallWidthViewport) {
        setIsSmallWidthViewport(isNextSmallWidthViewport);
      }
    };
    updateViewPortWidth();
    window.addEventListener("resize", updateViewPortWidth);

    return () => {
      window.removeEventListener("resize", updateViewPortWidth);
    };
  }, [isSmallWidthViewport]);

  const scrollerClasses = [
    "editor-scroller",
    autoResize && "editor-scroller-auto-resize",
    resize && "editor-scroller-resizable",
  ]
    .filter(Boolean)
    .join(" ");

  const scrollerStyles = {
    "--editor-min-height": rows ? `${rows * 1.7}em` : undefined,
    "--editor-height": !autoResize && rows ? `${rows * 1.7}em` : undefined,
  } as React.CSSProperties;

  return (
    <div
      className={`editor-shell ${className}`}
      style={{
        ...(cols ? { width: `${cols}ch` } : {}),
      }}
    >
      {/* Loading overlay */}
      {loading && <LoadingLayer />}

      {isRichText && (
        <ToolbarPlugin
          editor={editor}
          activeEditor={activeEditor}
          setActiveEditor={setActiveEditor}
          setIsLinkEditMode={setIsLinkEditMode}
          onUpload={onUpload}
          toolbarConfig={toolbarConfig}
        />
      )}

      {isRichText && (
        <ShortcutsPlugin editor={activeEditor} setIsLinkEditMode={setIsLinkEditMode} />
      )}
      <div className={`editor-container ${resize ? "editor-resize" : ""}`}>
        <RichTextPlugin
          contentEditable={
            <div className={scrollerClasses} style={scrollerStyles}>
              <div className="editor" ref={onRef}>
                <ContentEditable
                  style={{
                    ...(autoResize && !resize ? { height: "auto", overflowY: "hidden" } : {}),
                    ...style,
                  }}
                  placeholder={placeholder || "Enter text..."}
                />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin externalHistoryState={historyState} />
        <ListPlugin />
        <LinkPlugin />
        <TablePlugin />
        <TableCellResizer />

        {floatingAnchorElem && (
          <>
            <FloatingLinkEditorPlugin
              anchorElem={floatingAnchorElem}
              isLinkEditMode={isLinkEditMode}
              setIsLinkEditMode={setIsLinkEditMode}
            />
            <TableActionMenuPlugin anchorElem={floatingAnchorElem} cellMerge={true} />
          </>
        )}
        {floatingAnchorElem && (
          <>
            <FloatingTextFormatToolbarPlugin
              anchorElem={floatingAnchorElem}
              setIsLinkEditMode={setIsLinkEditMode}
            />
          </>
        )}
        <ImagesPlugin />
        <DragDropPlugin onUpload={onUpload} />
        <LinkPlugin hasLinkAttributes={hasLinkAttributes} />
        <InitializationPlugin editor={editor} value={value} />
        <HtmlOnChangePlugin
          onChange={onChange}
          ignoreSelectionChange={ignoreSelectionChange}
          name={name}
        />
        <AutoLinkPlugin />
        <ImagePasteUploadPlugin onUpload={onUpload} />
      </div>
    </div>
  );
};

export default Editor;
