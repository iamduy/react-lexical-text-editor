import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useRef } from "react";
import { lexicalToHtml } from "../utils";

interface Props {
  name?: string;
  onChange?: (html: string) => void;
  ignoreSelectionChange?: boolean;
}

export default function HtmlOnChangePlugin({ onChange, ignoreSelectionChange, name }: Props) {
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <OnChangePlugin
        ignoreSelectionChange={ignoreSelectionChange}
        onChange={(editorState, editor) => {
          const html = lexicalToHtml(editor, editorState);

          if (hiddenInputRef.current) {
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
              window.HTMLInputElement.prototype,
              "value"
            )?.set;
            nativeInputValueSetter?.call(hiddenInputRef.current, html);
            const event = new Event("input", { bubbles: true });
            hiddenInputRef.current.dispatchEvent(event);
          }

          onChange?.(html);
        }}
      />
      {name && <input style={{ display: "none" }} ref={hiddenInputRef} name={name} id={name} />}
    </>
  );
}
