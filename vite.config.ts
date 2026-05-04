import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  root: path.resolve(rootDir, "dev"),
  plugins: [react()],
  resolve: {
    alias: {
      "react-lexical-text-editor": path.resolve(rootDir, "src/index.ts"),
    },
  },
  server: {
    host: "127.0.0.1",
    port: 4173,
  },
  preview: {
    host: "127.0.0.1",
    port: 4173,
  },
  build: {
    outDir: path.resolve(rootDir, "dev-dist"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) {
            return "react-vendor";
          }

          if (id.includes("node_modules/@lexical/") || id.includes("/node_modules/lexical/")) {
            return "lexical-vendor";
          }
        },
      },
    },
  },
});
