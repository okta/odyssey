/*!
 * Copyright (c) 2025-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

/**
 * Adds CSS specificity to class selectors by prepending a specified number of ampersands.
 * This function helps override MUI component styles by increasing selector specificity.
 *
 * @param {number} specificity - Number of ampersands to prepend (e.g., 2 results in "&&")
 * @param {...string} selectors - One or more selector strings to add specificity to.
 *                               The selectors are joined together without separator.
 *                               Include spaces in the parameters if needed for descendant selectors.
 * @returns {string} The selector with added specificity
 *
 * @example
 * // Direct selector: "&&.MuiButton-root"
 * addSpecificity(2, ".MuiButton-root")
 *
 * // Descendant selector: "&& .MuiButton-root"
 * addSpecificity(2, " .MuiButton-root")
 *
 * // Direct selector with class reference: "&&.MuiButton-root"
 * addSpecificity(2, ".", buttonClasses.root)
 *
 * // Descendant selector with class reference: "&& .MuiButton-root"
 * addSpecificity(2, " .", buttonClasses.root)
 *
 * // Multiple selectors combined: "&&.MuiButton-root:hover"
 * addSpecificity(2, ".MuiButton-root", ":hover")
 */
export const addSpecificity = (
  specificity: number,
  ...selectors: string[]
): string => {
  const ampersands = "&".repeat(specificity);
  return `${ampersands}${selectors.join("")}`;
};
