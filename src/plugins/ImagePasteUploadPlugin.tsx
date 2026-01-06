import { $generateNodesFromDOM } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $insertNodes, COMMAND_PRIORITY_HIGH, PASTE_COMMAND } from "lexical";
import { useEffect } from "react";
import { base64ToFile, getImageUrlOrBase64 } from "../utils/imageUpload";
import { INSERT_IMAGE_COMMAND } from "./ImagesPlugin";

type Props = {
  onUpload?: (file: File) => Promise<string | undefined>;
};

export function ImagePasteUploadPlugin({ onUpload }: Props) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const handlePaste = async (html: string) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const images = Array.from(doc.querySelectorAll("img"));

      await Promise.all(
        images.map(async (img, index) => {
          const src = img.getAttribute("src");
          if (!src?.startsWith("data:image")) return;

          const file = base64ToFile(src, `paste-${index}.png`);
          const finalSrc = await getImageUrlOrBase64(file, onUpload);

          img.setAttribute("src", finalSrc);
        })
      );

      editor.update(() => {
        const nodes = $generateNodesFromDOM(editor, doc);
        $insertNodes(nodes);
      });
    };

    return editor.registerCommand(
      PASTE_COMMAND,
      (event: ClipboardEvent) => {
        if (!event.clipboardData) return false;

        const html = event.clipboardData.getData("text/html");
        if (!html) return false;

        // Parse HTML to check for images
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const images = doc.querySelectorAll("img");

        // If no images, let other plugins handle the paste
        if (images.length === 0) {
          return false;
        }

        event.preventDefault();
        void handlePaste(html);
        return true;
      },
      COMMAND_PRIORITY_HIGH
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
              getImageUrlOrBase64(file, onUpload).then((src) => {
                if (src) {
                  editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                    altText: file.name,
                    src,
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
