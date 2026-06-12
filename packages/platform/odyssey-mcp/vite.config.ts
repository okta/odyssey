import { builtinModules } from "node:module";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "node20",
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      // Don't bundle Node.js built-ins (fs, path, etc.)
      // builtinModules covers bare names (fs), /^node:/ covers node:fs
      external: [/^node:/, ...builtinModules, /^@okta\/odyssey-cli/],
      output: {
        // Prepend shebang so the file is directly executable
        banner: "#!/usr/bin/env node",
      },
    },
  },
});
