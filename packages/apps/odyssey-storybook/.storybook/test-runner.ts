/*!
 * Copyright (c) 2026-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import {
  getStoryContext,
  type TestRunnerConfig,
  waitForPageReady,
} from "@storybook/test-runner";
import { checkA11y, injectAxe } from "axe-playwright";

import { type A11yParameters } from "./a11yTypes.js";

const testRunnerConfig: TestRunnerConfig = {
  setup() {},

  /* Hook to execute before a story is rendered.
   * The page argument is the Playwright's page object for the story.
   * The context argument is a Storybook object containing the story's id, title, and name.
   */
  async preVisit(page) {
    return await injectAxe(page);
  },

  /* Hook to execute after a story is rendered.
   * The page argument is the Playwright's page object for the story
   * The context argument is a Storybook object containing the story's id, title, and name.
   */
  async postVisit(page, context) {
    const storyContext = await getStoryContext(page, context);

    const parameters: { a11y?: A11yParameters } = storyContext.parameters;
    if (parameters?.a11y?.disable) {
      // Skip axe for this story
      return;
    } else {
      await waitForPageReady(page);

      await new Promise((resolve) => setTimeout(resolve, 500));

      // Get story-level a11y config for rule overrides
      const storyA11yConfig = parameters?.a11y?.config;
      const disabledRules =
        storyA11yConfig?.rules
          ?.filter((rule) => !rule.enabled)
          ?.map((rule) => rule.id) ?? [];

      // https://github.com/abhinaba-ghosh/axe-playwright#parameters-on-checka11y-axerun
      return await checkA11y(
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
            // Disable specific rules from story parameters
            ...(disabledRules.length > 0 && {
              rules: Object.fromEntries(
                disabledRules.map((id: string) => [id, { enabled: false }]),
              ),
            }),
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
    }
  },
};

export default testRunnerConfig;
