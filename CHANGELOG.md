# Changelog

## [1.0.12] - 2026-01-27

### Added

- **Sizing Props**: Added `rows` and `cols` props to control editor dimensions.
  - `rows`: Sets height in text rows.
  - `cols`: Sets width in character units (`ch`).
- **Resizing Features**:
  - `autoResize`: Enables automatic growth based on content.
  - `resize`: Enables a manual vertical resize handle.
- **Improved Style Logic**: Refactored internal styling to use CSS variables and classes, ensuring better performance and clean overrides.

### Changed

- **Editor Scroller**: Optimized height and overflow handling to prevent unwanted layout shifts during content updates.

## [1.0.11] - 2026-01-22

### Added

- **DeepWiki Integration**: Added DeepWiki badge to README for AI-powered documentation assistance.
- **Homepage Field**: Added `homepage` field in package.json pointing to DeepWiki documentation page for better package discoverability.

### Changed

- **Documentation**: Enhanced README with DeepWiki badge linking to interactive AI documentation.

## [1.0.9] - 2026-01-19

### Added

- **Collaboration Support**: Added `@lexical/yjs` and `yjs` to dependencies to provide core support for real-time collaboration.
- **WebSocket Provider**: Added `y-websocket` dependency to enable multi-user editing over WebSocket connections.

### Fixed

- **Peer Dependencies**: Resolved a warning regarding unmet peer dependency `yjs@>=13.5.22` required by `@lexical/yjs`.
- **Package Metadata**: Fixed `repository.url` format in `package.json` to follow npm standards (`git+https://...`).

## [1.0.8] - 2026-01-07

### Added

- **Error Handling**: Added `onError` prop to `ReactLexicalTextEditorProps` to allow custom error handling. The callback receives both the error object and the editor instance, providing full context for error management.
- **HTML Configuration**: Introduced `buildHTMLConfig()` function to handle custom HTML import/export behavior, improving paste functionality and HTML serialization.
  - Custom DOM conversion for TextNode with support for font-size, background-color, and color styles
  - Enhanced ParagraphNode export to handle nested block elements
  - Proper handling of inline styles during paste operations

### Changed

- **Type Safety**: Improved TypeScript type definitions:
  - Added `Editor` interface extending `LexicalEditor` for better type safety
  - Updated `initialConfig` to use `InitialConfigType` for proper typing
  - Enhanced error callback signature to include editor instance
- **Package Metadata**: Added more specific keywords to package.json for better discoverability (text-editor, lexical-editor, lexical-react, react-lexical, lexical-text-editor)

## [1.0.7] - 2026-01-06

### Fixed

- **ImagePasteUploadPlugin**: Fixed an issue where pasting text into a bullet list caused the text to jump to a new line. The plugin now only intercepts paste events that contain images, allowing normal text pastes to be handled by Lexical's default handlers.
- **ImagePasteUploadPlugin**: Removed `$getRoot().select()` call that was incorrectly resetting the cursor position to the end of the document when pasting content with images.

### Changed

- **InitializationPlugin**: Renamed `InitialValuePlugin` to `InitializationPlugin` to better reflect its purpose of handling all editor initialization logic.
- **Code Quality**: Improved import organization and removed unused dependencies across multiple files.

## [1.0.6] - 2026-01-06

### Fixed

- **HtmlOnChangePlugin**: Fixed an issue where `onChange` was triggered during the initial rendering of the editor. Added logic to tag initialization updates and ignore them in `HtmlOnChangePlugin` using a new `TAGS` constant.

## [1.0.5] - 2026-01-05

### Added

- **Form Integration**: Added `name` and `id` props to support native HTML form integration. The editor now renders a hidden input that mirrors the content, allowing it to participate in standard form submissions and trigger `onChange` events on parent forms.
- **Performance**: Added `ignoreSelectionChange` prop to `OnChangePlugin` to prevent unnecessary re-renders and callbacks when only the selection changes (e.g. clicking/caret movement).

## [1.0.4] - 2026-01-01

### Added

- **ImagePasteUploadPlugin**: New plugin to intercept paste events and handle base64 images (e.g., from Google Docs, MS Word). It converts base64 images to Files and triggers the `onUpload` callback if provided.
