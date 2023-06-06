const { injectAxe, checkA11y } = require("axe-playwright");

/** @type import('@storybook/test-runner').TestRunnerConfig */
module.exports = {
  /**
   * Hook that is executed before the test runner starts running tests
   */
  setup() {
    // Add your configuration here.
  },

  /* Hook to execute before a story is rendered.
   * The page argument is the Playwright's page object for the story.
   * The context argument is a Storybook object containing the story's id, title, and name.
   */
  async preRender(page, context) {
    await injectAxe(page);
  },

  /* Hook to execute after a story is rendered.
   * The page argument is the Playwright's page object for the story
   * The context argument is a Storybook object containing the story's id, title, and name.
   */
  async postRender(page, context) {
    // https://github.com/abhinaba-ghosh/axe-playwright#parameters-on-checka11y-axerun
    await checkA11y(
      // the page instance of playwright
      page,

      // context
      "#storybook-root",

      // axeOptions, see https://www.deque.com/axe/core-documentation/api-documentation/#parameters-axerun
      {
        verbose: false,
        detailedReport: true,
        detailedReportOptions: {
          // whether or not to include the full html for the offending nodes
          html: false,
        },
      },

      // skipFailures
      // FIXME set to false once a11y issues (in stories) have been resolved
      true,

      // reporter "default" is terminal reporter, "html" writes results to file
      "default",

      // axeHtmlReporterOptions
      // NOTE: set reporter param (above) to "html" to activate these options
      {
        outputDir: "reports/a11y",
        reportFileName: `${context.id}.html`,
      }
    );
  },
};
