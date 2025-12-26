import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { useState } from 'react';

import { useSettings } from './context/SettingsContext';
import { useSharedHistoryContext } from './context/SharedHistoryContext';
import DragDropPlugin from './plugins/DragDropPlugin';
import FloatingLinkEditorPlugin from './plugins/FloatingLinkEditorPlugin';
import ImagesPlugin from './plugins/ImagesPlugin';
import InitialValuePlugin from './plugins/InitialValuePlugin';
import TableActionMenuPlugin from './plugins/TableActionMenuPlugin';
import TableCellResizer from './plugins/TableCellResizer';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import { ReactLexicalTextEditorProps } from './types';
import ContentEditable from './ui/ContentEditable';
import LoadingLayer from './ui/LoadingLayer';
import { lexicalToHtml } from './utils/htmlSerializer';

const Editor = ({
  value,
  onChange,
  onUpload,
  placeholder,
  className,
  loading,
  style,
}: ReactLexicalTextEditorProps) => {
  const {
    settings: { isRichText },
  } = useSettings();
  const { historyState } = useSharedHistoryContext();
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);
  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <div className={`editor-shell ${className}`}>
      {/* Loading overlay */}
      {loading && <LoadingLayer />}

      {isRichText && (
        <ToolbarPlugin
          setIsLinkEditMode={setIsLinkEditMode}
          onUpload={onUpload}
        />
      )}
      <div className='editor-container'>
        <RichTextPlugin
          contentEditable={
            <div className='editor-scroller'>
              <div className='editor' ref={onRef}>
                <ContentEditable
                  style={style}
                  placeholder={placeholder || 'Enter text...'}
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
            <TableActionMenuPlugin
              anchorElem={floatingAnchorElem}
              cellMerge={true}
            />
          </>
        )}
        <ImagesPlugin />
        <DragDropPlugin onUpload={onUpload} />
        <InitialValuePlugin value={value} />
        <OnChangePlugin
          onChange={(editorState, editor) => {
            const html = lexicalToHtml(editor, editorState);
            onChange?.(html);
          }}
        />
      </div>
    </div>
  );
};

export default Editor;
