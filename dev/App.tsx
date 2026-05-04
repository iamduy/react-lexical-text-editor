import { useState } from "react";
import { ReactLexicalTextEditor } from "../src";

export default function App() {
  const [editorContent, setEditorContent] = useState("");

  return (
    <div className="playground-shell">
      <main className="playground-main">
        <section className="playground-panel">
          <header className="playground-header">
            <div>
              <h1>React Lexical Text Editor</h1>
              <p>Local playground with HMR for editor development.</p>
            </div>
          </header>

          <ReactLexicalTextEditor onChange={setEditorContent} />
        </section>

        <section className="playground-panel">
          <header className="playground-header">
            <div>
              <h2>HTML Preview</h2>
              <p>Rendered output from the current editor state.</p>
            </div>
          </header>

          <div className="playground-preview" dangerouslySetInnerHTML={{ __html: editorContent }} />
        </section>
      </main>
    </div>
  );
}
