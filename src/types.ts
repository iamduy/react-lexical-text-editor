export interface ReactLexicalEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  onUpload?: (file: File) => Promise<string | undefined>;
  placeholder?: string;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
}
