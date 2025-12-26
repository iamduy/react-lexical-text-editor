import './App.css';

import { LexicalCollaboration } from '@lexical/react/LexicalCollaborationContext';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { SettingsContext } from './context/SettingsContext';
import { SharedHistoryContext } from './context/SharedHistoryContext';
import { ToolbarContext } from './context/ToolbarContext';
import Editor from './Editor';
import PlaygroundNodes from './nodes/PlaygroundNodes';
import { TableContext } from './plugins/TablePlugin';
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';
import { ReactLexicalTextEditorProps } from './types';

export default function App(props: ReactLexicalTextEditorProps) {
  const { disabled = false, ...rest } = props;

  const initialConfig = {
    namespace: 'ReactLexicalTextEditor',
    theme: PlaygroundEditorTheme,
    onError: (error: Error) => {
      console.error(error);
    },
    nodes: PlaygroundNodes,
    editable: !disabled,
  };
  return (
    <LexicalCollaboration>
      <SharedHistoryContext>
        <SettingsContext>
          <TableContext>
            <ToolbarContext>
              <LexicalComposer initialConfig={initialConfig}>
                <Editor {...rest} />
              </LexicalComposer>
            </ToolbarContext>
          </TableContext>
        </SettingsContext>
      </SharedHistoryContext>
    </LexicalCollaboration>
  );
}
