import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          clearMocks: true,
          environment: "node",
          globals: true,
          include: ["**/*.node.test.{ts,tsx}"],
          name: "unit",
          restoreMocks: true,
        },
      },
    ],
  },
});
