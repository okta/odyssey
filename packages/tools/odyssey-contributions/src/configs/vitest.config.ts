import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        "**/@types/**",
        "**/icons.generated/**",
        "**/index.ts",
        "**/properties/**",
        "**/types.ts",
      ],
      include: ["src/**/*.{ts,tsx}"],
      thresholds: {
        branches: 78,
        functions: 56,
        lines: 57,
        statements: 57,
      },
    },
    projects: [
      {
        test: {
          environment: "node",
          globals: true,
          include: ["**/*.node.test.{ts,tsx}"],
          name: "unit",
          setupFiles: ["./vitest-node-setup.ts"],
        },
      },
      {
        test: {
          // TODO: revert these changes once MUI Upgrade is done, see OKTA-960544
          environment: "jsdom",
          globals: true,
          include: [
            "**/DatePicker.jsdom.test.tsx",
            "**/DateTimePicker.jsdom.test.tsx",
          ],
          name: "jsdom-hack",
          setupFiles: ["./vitest-jsdom-setup.ts"],
        },
      },
      {
        optimizeDeps: {
          include: ["@emotion/react/jsx-dev-runtime"],
        },
        test: {
          browser: {
            enabled: true,
            headless: true,
            instances: [
              {
                browser: "chromium",
                screenshotDirectory: "__vitest-screenshots",
                viewport: {
                  height: 768,
                  width: 1024,
                },
              },
            ],
            provider: "playwright",
          },
          globals: true,
          include: ["**/*.browser.test.{ts,tsx}"],
          name: "browser",
          setupFiles: ["./vitest-browser-setup.ts"],
        },
      },
    ],
  },
});
