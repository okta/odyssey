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
import { userEvent } from "vitest/browser";

import { sandboxAttribute } from "./src/test-utils/appendToSandbox.js";

// Park Playwright's cursor outside any rendered content before each test.
// Playwright's cursor persists across tests within a file.
// Unhovering document.body moves the cursor outside the
// viewport, eliminating that interference for every test.
beforeEach(async () => {
  await userEvent.unhover(document.body);
});

// Cleanup between tests:
//
// 1. Remove sandbox-tagged nodes. Tests that build DOM imperatively (outside
//    React) append via `appendToSandbox(element)`, which marks the element
//    with `[data-sandbox-root]`. We remove only those nodes — NOT
//    `document.body.innerHTML = ""` — because MUI portals (Dialog, Select,
//    Tooltip, DatePicker, Autocomplete, etc.) mount into body and must be
//    cleaned up by React's own unmount path; wiping body races that unmount
//    and throws `NotFoundError: Failed to execute 'removeChild'`.
//
// 2. Clear session storage so values written by one test (e.g. the
//    `useSessionStorageState` hook) cannot leak into another.
afterEach(() => {
  document
    .querySelectorAll(`[${sandboxAttribute}]`)
    .forEach((sandboxElement) => sandboxElement.remove());
  window.sessionStorage.clear();
});

const buildAxeViolationSummary = async (
  element: Element,
  disabledRules: string[] = [],
): Promise<string> => {
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
    // Actually disable rules in axe so they are not computed at all.
    rules: disabledRules.reduce<Record<string, { enabled: false }>>(
      (accumulator, ruleId) => {
        accumulator[ruleId] = { enabled: false };
        return accumulator;
      },
      {},
    ),
  });

  // axe returns "incomplete" when it can't definitively determine the outcome
  // (e.g. color-contrast when background traversal is ambiguous). Log these
  // as warnings so they surface for manual review without failing the test.
  if (results.incomplete.length > 0) {
    console.warn(
      `[a11y incomplete — manual review needed] ${results.incomplete.map((result) => result.id).join(", ")}`,
    );
  }

  return results.violations
    .map((violation) => {
      const nodeDetails = violation.nodes
        .map(
          (node, index) =>
            `  (${index + 1}/${violation.nodes.length}) ${node.html}\n    ${node.failureSummary?.replace(/\n/g, "\n    ")}`,
        )
        .join("\n");
      return `[a11y - ${violation.id}] ${violation.description}\n${nodeDetails}`;
    })
    .join("\n\n");
};

/**
 * Asserts that a DOM element passes axe-core accessibility checks.
 * Rules listed in `disabledRules` are skipped (logged as warnings) rather
 * than causing the test to fail.
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

    const violationSummary = await buildAxeViolationSummary(
      element,
      disabledRules,
    );

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
