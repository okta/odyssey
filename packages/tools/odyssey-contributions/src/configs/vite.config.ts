import type { UserConfig } from "vite";

import { muteWarningsPlugin } from "@okta/vite-plugin-mute-warnings";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

const warningsToIgnore = [
  ["SOURCEMAP_ERROR", "Can't resolve original location of error"],
  ["INVALID_ANNOTATION", "contains an annotation that Rollup cannot interpret"],
];

const viteConfig: UserConfig = {
  build: {
    sourcemap: true,
    rollupOptions: {
      external: ["react"],
    },
  },
  plugins: [react(), svgr(), muteWarningsPlugin(warningsToIgnore)],
};

export default viteConfig;
