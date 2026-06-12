import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Generate scripts (generateTokens, generatePictograms) write to *.generated.ts
    // as a top-level side effect when imported. Running files in parallel creates a
    // race between that write and the integration test loading the same modules.
    fileParallelism: false,
    projects: [
      {
        test: {
          environment: "node",
          globals: true,
          include: ["**/*.node.test.{ts,tsx}"],
          name: "unit",
        },
      },
    ],
  },
});
