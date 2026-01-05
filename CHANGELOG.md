# Changelog

## [1.0.5] - 2026-01-05

### Added

- **Form Integration**: Added `name` and `id` props to support native HTML form integration. The editor now renders a hidden input that mirrors the content, allowing it to participate in standard form submissions and trigger `onChange` events on parent forms.
- **Performance**: Added `ignoreSelectionChange` prop to `OnChangePlugin` to prevent unnecessary re-renders and callbacks when only the selection changes.

## [1.0.4] - 2026-01-01

### Added

- **ImagePasteUploadPlugin**: New plugin to intercept paste events and handle base64 images (e.g., from Google Docs, MS Word). It converts base64 images to Files and triggers the `onUpload` callback if provided.
