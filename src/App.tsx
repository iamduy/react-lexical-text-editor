import './App.css';

import { LexicalCollaboration } from '@lexical/react/LexicalCollaborationContext';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { SettingsContext } from './context/SettingsContext.js';
import { SharedHistoryContext } from './context/SharedHistoryContext.js';
import { ToolbarContext } from './context/ToolbarContext.js';
import Editor from './ReactLexicalEditor.js';
import PlaygroundNodes from './nodes/PlaygroundNodes.js';
import { TableContext } from './plugins/TablePlugin.js';
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme.js';
import { ReactLexicalEditorProps } from './types.js';

export default function App(props: ReactLexicalEditorProps) {
  const { disabled = false, ...rest } = props;

  const initialConfig = {
    namespace: 'ReactLexicalEditor',
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
