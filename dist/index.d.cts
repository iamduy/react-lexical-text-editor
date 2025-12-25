import * as react_jsx_runtime from 'react/jsx-runtime';

interface ReactLexicalEditorProps {
    value?: string;
    onChange?: (value: string) => void;
    onUpload?: (file: File) => Promise<string | undefined>;
    placeholder?: string;
    className?: string;
    loading?: boolean;
    disabled?: boolean;
    style?: React.CSSProperties;
}

declare function App(props: ReactLexicalEditorProps): react_jsx_runtime.JSX.Element;

export { App as ReactLexicalEditor, type ReactLexicalEditorProps };
