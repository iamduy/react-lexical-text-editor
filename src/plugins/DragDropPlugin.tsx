import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { COMMAND_PRIORITY_LOW, DRAGOVER_COMMAND, DROP_COMMAND } from "lexical";
import { JSX, useEffect } from "react";
import { INSERT_IMAGE_COMMAND } from "./ImagesPlugin";

export default function DragDropPastePlugin({
  onUpload,
}: {
  onUpload?: (file: File) => Promise<string | undefined>;
}): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      DRAGOVER_COMMAND,
      (event) => {
        event.preventDefault();
        return true;
      },
      COMMAND_PRIORITY_LOW
    );
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      DROP_COMMAND,
      (event) => {
        event.preventDefault();
        const files = event.dataTransfer?.files;
        if (files && files.length > 0) {
          const file = files[0];
          if (file.type.startsWith("image/")) {
            onUpload?.(file).then((url) => {
              if (url) {
                editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                  altText: file.name,
                  src: url,
                });
              }
            });
          }
        }
        return true;
      },
      COMMAND_PRIORITY_LOW
    );
  }, [editor, onUpload]);

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            const file = items[i].getAsFile();
            if (file) {
              onUpload?.(file).then((url) => {
                if (url) {
                  editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                    altText: file.name,
                    src: url,
                  });
                }
              });
            }
          }
        }
      }
    };

    return editor.registerRootListener((rootElement, prevRootElement) => {
      if (prevRootElement) {
        prevRootElement.removeEventListener("paste", handlePaste);
      }
      if (rootElement) {
        rootElement.addEventListener("paste", handlePaste);
      }
    });
  }, [editor, onUpload]);

  return null;
}
