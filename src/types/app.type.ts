import { LexicalEditor } from "lexical";
import { ToolbarConfig } from "./toolbar-config.type";

export interface Editor extends LexicalEditor {}

export interface ReactLexicalTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  onUpload?: (file: File) => Promise<string | undefined>;
  onError?: (error: Error, editor: Editor) => void;
  placeholder?: string;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  toolbarConfig?: ToolbarConfig;
  name?: string;
  ignoreSelectionChange?: boolean;
  resize?: boolean;
  rows?: number;
  cols?: number;
  autoResize?: boolean;
}
