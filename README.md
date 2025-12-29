# react-lexical-text-editor

A powerful, feature-rich WYSIWYG editor built with [Lexical](https://lexical.dev/) for React applications. Provides an intuitive editing experience with support for images, tables, links, and extensive text formatting.

## ✨ Features

- 📝 **Rich Text Editing** - Full text formatting (bold, italic, underline, strikethrough, etc.)
- 🎨 **Text Styling** - Font size, color, background color, and text alignment
- 🖼️ **Image Support** - Upload, drag & drop, resize, and caption images
- 📊 **Tables** - Create and edit tables with resizable cells
- 🔗 **Links** - Easy link insertion and editing with floating toolbar
- 📋 **Lists** - Bullet lists, numbered lists, and checklists
- 💬 **Quotes & Code Blocks** - Format content as blockquotes or code
- ↩️ **Undo/Redo** - Full history support
- 📱 **Responsive** - Works on desktop and mobile devices
- ♿ **Accessible** - Keyboard navigation and screen reader support
- 🎯 **TypeScript** - Full TypeScript support with type definitions

## 🎮 Live Demo

Experience the full capabilities of the editor in our live demo environment:
[**Live Demo Website**](https://demo-react-lexical-text-editor.vercel.app/)

Try out features like:

- Rich text formatting
- Image upload and management
- Tables and lists
- Responsive design

## 📦 Installation

```bash
# With npm
npm install react-lexical-text-editor

# With yarn
yarn add react-lexical-text-editor

# With pnpm
pnpm add react-lexical-text-editor
```

## 🔧 Compatibility

### Package Managers

- ✅ npm (v8+)
- ✅ yarn (v1.x, v2+, v3+)
- ✅ pnpm (v7+)

### React Versions

- ✅ React 18.x
- ✅ React 19.x

### TypeScript

- ✅ TypeScript 5.x
- ✅ Full type definitions included

### Browser Support

- ✅ Chrome (last 2 versions)
- ✅ Firefox (last 2 versions)
- ✅ Safari (last 2 versions)
- ✅ Edge (last 2 versions)

## 🚀 Quick Start

### Basic Usage

```tsx
import { ReactLexicalTextEditor } from 'react-lexical-text-editor';
import 'react-lexical-text-editor/dist/index.css'; // Import styles

function App() {
  const [content, setContent] = useState<string>('');

  return (
    <ReactLexicalTextEditor
      value={content}
      onChange={(html) => setContent(html)}
      placeholder='Start typing...'
    />
  );
}
```

### With Initial Content

```tsx
import { ReactLexicalTextEditor } from 'react-lexical-text-editor';
import 'react-lexical-text-editor/dist/index.css';

function App() {
  const initialContent = `
    <h1>Welcome to the Editor</h1>
    <p>This is some <strong>bold</strong> and <em>italic</em> text.</p>
  `;

  return (
    <ReactLexicalTextEditor
      value={initialContent}
      onChange={(html) => console.log('Content changed:', html)}
    />
  );
}
```

### With Image Upload

```tsx
import { ReactLexicalTextEditor } from 'react-lexical-text-editor';
import 'react-lexical-text-editor/dist/index.css';

function App() {
  const handleImageUpload = async (file: File): Promise<string | undefined> => {
    try {
      // Upload to your server/CDN
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      return data.url; // Return the uploaded image URL
    } catch (error) {
      console.error('Upload failed:', error);
      return undefined;
    }
  };

  return (
    <ReactLexicalTextEditor
      onUpload={handleImageUpload}
      onChange={(html) => console.log(html)}
    />
  );
}
```

### With Custom Styling

```tsx
import { ReactLexicalTextEditor } from 'react-lexical-text-editor';
import 'react-lexical-text-editor/dist/index.css';

function App() {
  return (
    <ReactLexicalTextEditor
      className='my-custom-editor'
      style={{
        minHeight: '300px',
        maxHeight: '600px',
      }}
      placeholder='Write something amazing...'
      onChange={(html) => console.log(html)}
    />
  );
}
```

### With Loading State

```tsx
import { ReactLexicalTextEditor } from 'react-lexical-text-editor';
import 'react-lexical-text-editor/dist/index.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('');

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await fetch('/api/save', {
        method: 'POST',
        body: JSON.stringify({ content }),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <ReactLexicalTextEditor
        value={content}
        onChange={setContent}
        loading={isLoading}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
```

## 📖 API Reference

### Props

#### `ReactLexicalEditorProps`

| Prop          | Type                                           | Default           | Description                                                                        |
| ------------- | ---------------------------------------------- | ----------------- | ---------------------------------------------------------------------------------- |
| `value`       | `string`                                       | `undefined`       | HTML content to initialize or control the editor. Can be used for controlled mode. |
| `onChange`    | `(html: string) => void`                       | `undefined`       | Callback fired when editor content changes. Receives HTML string.                  |
| `onUpload`    | `(file: File) => Promise<string \| undefined>` | `undefined`       | Async function to handle image uploads. Must return the uploaded image URL.        |
| `placeholder` | `string`                                       | `"Enter text..."` | Placeholder text shown when editor is empty.                                       |
| `className`   | `string`                                       | `undefined`       | Additional CSS class name for the editor container.                                |
| `style`       | `React.CSSProperties`                          | `undefined`       | Inline styles for the editor content area.                                         |
| `loading`     | `boolean`                                      | `false`           | Shows loading overlay when true. Useful during save operations.                    |
| `disabled`    | `boolean`                                      | `false`           | Disables editing when true (read-only mode).                                       |

### Types

```typescript
import type { ReactLexicalEditorProps } from 'react-lexical-text-editor';

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
```

## 🎨 Styling

### Default Styles

Import the default stylesheet in your app:

```tsx
import 'react-lexical-text-editor/dist/index.css';
```

### Custom Styling

Override default styles using CSS:

```css
/* Container styling */
.editor-shell {
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: white;
}

/* Toolbar styling */
.toolbar {
  background: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
  padding: 8px;
}

/* Content area styling */
.editor {
  min-height: 200px;
  padding: 16px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.6;
}

/* Placeholder styling */
.ContentEditable__placeholder {
  color: #999;
  font-style: italic;
}

/* Custom class example */
.my-custom-editor {
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

### Dark Mode

```css
.dark-mode .editor-shell {
  background: #1e1e1e;
  border-color: #333;
  color: #e0e0e0;
}

.dark-mode .toolbar {
  background: #252525;
  border-color: #333;
}

.dark-mode .ContentEditable__placeholder {
  color: #666;
}
```

## 🔌 Advanced Integration

### Form Integration (React Hook Form)

```tsx
import { ReactLexicalTextEditor } from 'react-lexical-text-editor';
import { useForm, Controller } from 'react-hook-form';
import 'react-lexical-text-editor/dist/index.css';

interface FormData {
  title: string;
  content: string;
}

function MyForm() {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Form data:', data);
    // Send to API
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name='title' placeholder='Title' />

      <Controller
        name='content'
        control={control}
        defaultValue=''
        render={({ field }) => (
          <ReactLexicalTextEditor
            value={field.value}
            onChange={field.onChange}
            placeholder='Write your content...'
          />
        )}
      />

      <button type='submit'>Submit</button>
    </form>
  );
}
```

### With State Management (Zustand)

```tsx
import { create } from 'zustand';
import { ReactLexicalTextEditor } from 'react-lexical-text-editor';
import 'react-lexical-text-editor/dist/index.css';

interface EditorStore {
  content: string;
  setContent: (content: string) => void;
}

const useEditorStore = create<EditorStore>((set) => ({
  content: '',
  setContent: (content) => set({ content }),
}));

function Editor() {
  const { content, setContent } = useEditorStore();

  return <ReactLexicalTextEditor value={content} onChange={setContent} />;
}
```

### Server-Side Rendering (Next.js)

```tsx
'use client'; // Mark as client component in Next.js 13+

import dynamic from 'next/dynamic';
import 'react-lexical-text-editor/dist/index.css';

// Dynamically import to avoid SSR issues
const ReactLexicalTextEditor = dynamic(
  () =>
    import('react-lexical-text-editor').then(
      (mod) => mod.ReactLexicalTextEditor
    ),
  {
    ssr: false,
    loading: () => <div>Loading editor...</div>,
  }
);

export default function Page() {
  return <ReactLexicalTextEditor onChange={(html) => console.log(html)} />;
}
```

### Auto-Save Implementation

```tsx
import { useState, useEffect } from 'react';
import { ReactLexicalTextEditor } from 'react-lexical-text-editor';
import { useDebouncedCallback } from 'use-debounce';
import 'react-lexical-text-editor/dist/index.css';

function AutoSaveEditor() {
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const saveToServer = async (html: string) => {
    setIsSaving(true);
    try {
      await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: html }),
      });
      setLastSaved(new Date());
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const debouncedSave = useDebouncedCallback(saveToServer, 2000);

  const handleChange = (html: string) => {
    setContent(html);
    debouncedSave(html);
  };

  return (
    <div>
      <div style={{ marginBottom: '8px', color: '#666' }}>
        {isSaving && 'Saving...'}
        {lastSaved &&
          !isSaving &&
          `Last saved: ${lastSaved.toLocaleTimeString()}`}
      </div>
      <ReactLexicalTextEditor
        value={content}
        onChange={handleChange}
        loading={isSaving}
      />
    </div>
  );
}
```

## 📝 Content Format

### Input/Output Format

The editor uses **HTML** as its content format:

**Input (value prop):**

```html
<h1>Hello World</h1>
<p>This is a <strong>bold</strong> text.</p>
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

**Output (onChange callback):**

```html
<h1>Hello World</h1>
<p>This is a <strong>bold</strong> text.</p>
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

### Supported HTML Elements

- **Headings:** `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`
- **Paragraphs:** `<p>`
- **Text formatting:** `<strong>`, `<em>`, `<u>`, `<s>`, `<sub>`, `<sup>`, `<code>`
- **Lists:** `<ul>`, `<ol>`, `<li>`
- **Links:** `<a href="...">`
- **Images:** `<img src="..." alt="...">`
- **Tables:** `<table>`, `<tr>`, `<td>`, `<th>`
- **Quotes:** `<blockquote>`
- **Code blocks:** `<pre><code>`

## 🎯 Common Use Cases

### Blog Editor

```tsx
function BlogEditor() {
  const [post, setPost] = useState({
    title: '',
    content: '',
  });

  return (
    <div>
      <input
        type='text'
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        placeholder='Post title'
      />
      <ReactLexicalTextEditor
        value={post.content}
        onChange={(html) => setPost({ ...post, content: html })}
        onUpload={uploadToCloudinary}
        placeholder='Write your blog post...'
      />
    </div>
  );
}
```

### Comment System

```tsx
function CommentEditor({ onSubmit }: { onSubmit: (html: string) => void }) {
  const [comment, setComment] = useState('');

  return (
    <div>
      <ReactLexicalTextEditor
        value={comment}
        onChange={setComment}
        placeholder='Write a comment...'
        style={{ minHeight: '100px' }}
      />
      <button onClick={() => onSubmit(comment)}>Post Comment</button>
    </div>
  );
}
```

### Email Template Editor

```tsx
function EmailTemplateEditor() {
  const [template, setTemplate] = useState('');

  const handleSave = async () => {
    await fetch('/api/email-templates', {
      method: 'POST',
      body: JSON.stringify({ html: template }),
    });
  };

  return (
    <div>
      <h2>Email Template Editor</h2>
      <ReactLexicalTextEditor
        value={template}
        onChange={setTemplate}
        placeholder='Design your email template...'
      />
      <button onClick={handleSave}>Save Template</button>
    </div>
  );
}
```

## 🛠️ Development

### Building the Package

```bash
# Install dependencies
npm install

# Build the package
npm run build

# The output will be in the dist/ folder
```

### Testing Locally

#### Method 1: Using npm pack

```bash
# In the package directory
npm pack

# This creates react-lexical-text-editor-1.0.0.tgz
# In your test project
npm install /path/to/react-lexical-text-editor-1.0.0.tgz
```

#### Method 2: Using npm link

```bash
# In the package directory
npm link

# In your test project
npm link react-lexical-text-editor
```

#### Method 3: Using yarn

```bash
# In the package directory
npm pack

# In your test project
yarn add file:/path/to/react-lexical-text-editor-1.0.0.tgz
```

## 🐛 Troubleshooting

### Styles not loading

Make sure you import the CSS file:

```tsx
import 'react-lexical-text-editor/dist/index.css';
```

### SSR/Next.js issues

Use dynamic import with `ssr: false`:

```tsx
const Editor = dynamic(
  () =>
    import('react-lexical-text-editor').then((m) => m.ReactLexicalTextEditor),
  { ssr: false }
);
```

### TypeScript errors

Ensure you have the latest types:

```bash
npm install --save-dev @types/react @types/react-dom
```

### Images not uploading

The `onUpload` callback must return the image URL:

```tsx
const handleUpload = async (file: File) => {
  const url = await uploadImageToServer(file);
  return url; // Must return string or undefined
};
```

## 📄 License

MIT © SanMario

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

- 📧 Email: duongkhanhduy.dev@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/iamduy/react-lexical-text-editor/issues)
- 📖 Documentation: [Full Documentation](https://github.com/iamduy/react-lexical-text-editor)
