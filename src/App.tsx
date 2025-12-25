import './App.css';

import { LexicalCollaboration } from '@lexical/react/LexicalCollaborationContext';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { SettingsContext } from './context/SettingsContext';
import { SharedHistoryContext } from './context/SharedHistoryContext';
import { ToolbarContext } from './context/ToolbarContext';
import Editor from './ReactLexicalEditor';
import PlaygroundNodes from './nodes/PlaygroundNodes';
import { TableContext } from './plugins/TablePlugin';
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';
import { ReactLexicalEditorProps } from './types';

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
