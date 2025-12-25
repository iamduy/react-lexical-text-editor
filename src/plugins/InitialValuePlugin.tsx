import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState } from "react";
import { htmlToLexical } from "../utils";

// Plugin để đồng bộ value từ ngoài vào editor (Initial load)
export default function InitialValuePlugin({ value }: { value?: string }) {
  const [editor] = useLexicalComposerContext();
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender && value) {
      htmlToLexical(editor, value);
      setIsFirstRender(false);
    }
  }, [editor, value, isFirstRender]);

  return null;
}
