import { defineConfig } from "vite";

import packageJson from "./package.json" with { type: "json" };

const umdName = packageJson.name
  .replace(/^(@(.+)\/)?(.+)$/, "$2-$3")
  .split("-")
  .map((namePart) =>
    namePart.slice(0, 1).toUpperCase().concat(namePart.slice(1)),
  )
  .join("");

// Vite customizations can go in this file. These will override those provided by the stack.
export default defineConfig(({ command }) => ({
  define:
    command === "build"
      ? {
          "process.env.NODE_ENV": '"production"',
        }
      : {},

  build: {
    emptyOutDir: false,
    lib: {
      entry: `${__dirname}/src/index.ts`,
      fileName: (format) =>
        `index.${format}.${format === "umd" ? "cjs" : "js"}`,
      formats: ["es", "iife", "umd"],
      name: umdName,
    },
    sourcemap: true,
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
}));
