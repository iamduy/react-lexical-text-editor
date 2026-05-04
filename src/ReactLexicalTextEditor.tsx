import "./App.css";

import { LexicalCollaboration } from "@lexical/react/LexicalCollaborationContext";
import { InitialConfigType, LexicalComposer } from "@lexical/react/LexicalComposer";
import { SettingsContext } from "./context/SettingsContext";
import { SharedHistoryContext } from "./context/SharedHistoryContext";
import { ToolbarContext } from "./context/ToolbarContext";
import Editor from "./Editor";
import PlaygroundNodes from "./nodes/PlaygroundNodes";
import { TableContext } from "./plugins/TablePlugin";
import PlaygroundEditorTheme from "./themes/PlaygroundEditorTheme";
import { ReactLexicalTextEditorProps } from "./types";
import { buildHTMLConfig } from "./buildHTMLConfig";

export default function App(props: ReactLexicalTextEditorProps) {
  const { disabled = false, onError, ...rest } = props;

  const initialConfig: InitialConfigType = {
    namespace: "ReactLexicalTextEditor",
    theme: PlaygroundEditorTheme,
    onError(error, editor) {
      onError?.(error, editor);
    },
    nodes: PlaygroundNodes,
    editable: !disabled,
    html: buildHTMLConfig(),
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
