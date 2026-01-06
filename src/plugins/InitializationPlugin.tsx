import { LexicalEditor } from "lexical";
import { useEffect, useState } from "react";
import { TAGS } from "../constants/tag";
import { htmlToLexical } from "../utils";

type Props = {
  editor: LexicalEditor;
  value?: string;
};

export default function InitializationPlugin({ editor, value }: Props) {
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender && value) {
      htmlToLexical(editor, value, { tag: TAGS.INITIALIZATION });
      setIsFirstRender(false);
    }
  }, [editor, value, isFirstRender]);

  return null;
}
