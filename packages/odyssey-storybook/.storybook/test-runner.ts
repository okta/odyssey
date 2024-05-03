import {
  waitForPageReady,
  type TestRunnerConfig,
} from "@storybook/test-runner";
import { injectAxe, checkA11y } from "axe-playwright";

const testRunnerConfig: TestRunnerConfig = {
  setup() {},

  /* Hook to execute before a story is rendered.
   * The page argument is the Playwright's page object for the story.
   * The context argument is a Storybook object containing the story's id, title, and name.
   */
  async preVisit(page, context) {
    await injectAxe(page);
  },

  /* Hook to execute after a story is rendered.
   * The page argument is the Playwright's page object for the story
   * The context argument is a Storybook object containing the story's id, title, and name.
   */
  async postVisit(page, context) {
    await waitForPageReady(page);

    // https://github.com/abhinaba-ghosh/axe-playwright#parameters-on-checka11y-axerun
    await checkA11y(
      // Playwright page instance.
      page,

      // context
      "#storybook-root",

      // axeOptions, see https://www.deque.com/axe/core-documentation/api-documentation/#parameters-axerun
      {
        axeOptions: {
          runOnly: {
            type: "tag",
            values: [
              "section508",
              "wcag2a",
              "wcag2aa",
              "wcag21a",
              "wcag21aa",
              "wcag22aa",
            ],
          },
        },
        detailedReport: true,
        detailedReportOptions: {
          // Includes the full html for invalid nodes
          html: true,
        },
        verbose: false,
      },

      // skipFailures
      false,

      // reporter "default" is terminal reporter, "html" writes results to file
      "default",

      // axeHtmlReporterOptions
      // NOTE: set reporter param (above) to "html" to activate these options
      {
        outputDir: "reports/a11y",
        reportFileName: `${context.id}.html`,
      },
    );
  },
};

export default testRunnerConfig;
