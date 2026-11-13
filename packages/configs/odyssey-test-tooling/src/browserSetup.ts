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

import axe from "axe-core";
import { afterEach, beforeEach, expect } from "vitest";
import { commands, page, server } from "vitest/browser";

// Playwright's pointer stays where the last test left it, across tests and
// across files on the same page. A test that renders an element under it gets
// a real mouseenter, so a tooltip opens that the test never hovered. Parking
// before each test, not after, also covers the first test of a file.
beforeEach(async () => {
  await commands.parkPointer();
});

// Clear session storage so values written by one test cannot leak into another.
afterEach(() => {
  window.sessionStorage.clear();
});

afterEach(async () => {
  await page.viewport(
    server.config.browser.viewport.width,
    server.config.browser.viewport.height,
  );
});

type BuildAxeViolationSummaryArgs = {
  disabledRules?: string[];
  element: Element;
};

const buildAxeViolationSummary = async ({
  disabledRules = [],
  element,
}: BuildAxeViolationSummaryArgs): Promise<string> => {
  const results = await axe.run(element, {
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
    // Disabled rules are turned off inside axe, not filtered from its results afterwards, so a rule that throws or runs slowly on a given tree cannot affect the test.
    rules: disabledRules.reduce<Record<string, { enabled: false }>>(
      (disabledRulesById, ruleId) => ({
        ...disabledRulesById,
        [ruleId]: { enabled: false },
      }),
      {},
    ),
  });

  // axe returns "incomplete" when it can't definitively determine the outcome (e.g. color-contrast when background traversal is ambiguous). Log these
  // as warnings so they surface for manual review without failing the test.
  if (results.incomplete.length > 0) {
    console.warn(
      `[a11y incomplete, manual review needed] ${results.incomplete.map((result) => result.id).join(", ")}`,
    );
  }

  return results.violations
    .map((violation) => {
      const nodeDetails = violation.nodes
        .map(
          (node, index) =>
            `  (${index + 1}/${violation.nodes.length}) ${node.html}\n    ${node.failureSummary?.split("\n").join("\n    ")}`,
        )
        .join("\n");
      return `[a11y - ${violation.id}] ${violation.description}\n${nodeDetails}`;
    })
    .join("\n\n");
};

/**
 * Asserts that a DOM element passes axe-core accessibility checks.
 * Rules listed in `disabledRules` are skipped (logged as warnings) rather than causing the test to fail.
 *
 * Usage: `await expect(element).toBeAccessible()`
 *        `await expect.element(getByRole("button")).toBeAccessible({ disabledRules: ["button-name"] })`
 */
expect.extend({
  async toBeAccessible(
    element: Element,
    options: { disabledRules?: string[] } = {},
  ) {
    const { disabledRules = [] } = options;
    if (disabledRules.length > 0) {
      console.warn(`[a11y] skipped rules: ${disabledRules.join(", ")}`);
    }

    const violationSummary = await buildAxeViolationSummary({
      disabledRules,
      element,
    });

    return violationSummary === ""
      ? { pass: true, message: () => "" }
      : {
          pass: false,
          message: () =>
            `expected element to pass accessibility checks\n\n${violationSummary}`,
        };
  },
});

declare module "vitest" {
  interface Assertion {
    toBeAccessible(options?: { disabledRules?: string[] }): Promise<void>;
  }
  interface AsymmetricMatchersContaining {
    toBeAccessible(options?: { disabledRules?: string[] }): unknown;
  }
}

// Declared here, not beside the command, because this file calls the command
// and consumers list its entry, `/browser`, in `compilerOptions.types`.
declare module "vitest/browser" {
  interface BrowserCommands {
    parkPointer: () => Promise<void>;
  }
}
