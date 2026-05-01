import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    restoreMocks: true,
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
