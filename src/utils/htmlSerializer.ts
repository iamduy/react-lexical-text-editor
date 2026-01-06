import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { $getRoot, type EditorState, type LexicalEditor } from "lexical";

/**
 * Chuyển đổi Lexical Editor State sang HTML string
 */
export const lexicalToHtml = (editor: LexicalEditor, editorState: EditorState): string => {
  let html = "";
  editorState.read(() => {
    html = $generateHtmlFromNodes(editor, null);
  });

  // Xử lý trường hợp empty content để đồng nhất với Quill (<p><br></p>)
  if (
    html === '<p class="PlaygroundEditorTheme__paragraph"><br></p>' ||
    html === '<p class="PlaygroundEditorTheme__paragraph"></p>'
  ) {
    return "";
  }

  return html;
};

/**
 * Chuyển đổi HTML string sang Lexical nodes và chèn vào editor
 */
export const htmlToLexical = (editor: LexicalEditor, html: string, options?: { tag?: string }) => {
  editor.update(() => {
    const parser = new DOMParser();
    const dom = parser.parseFromString(html || "", "text/html");
    const nodes = $generateNodesFromDOM(editor, dom);

    const root = $getRoot();
    root.clear();
    root.append(...nodes);
  }, options);
};
