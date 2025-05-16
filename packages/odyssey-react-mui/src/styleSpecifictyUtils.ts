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
 * Adds CSS specificity to class selectors by prepending a specified number of ampersands,
 * with an option to add a space after the ampersands for descendant selectors.
 *
 * @param {number} specificity - The number of ampersands to add for specificity
 * @param {string} selector - The selector to add specificity to
 * @param {boolean} [direct=true] - If true, creates a direct selector (&&.class), if false, creates a descendant selector (&& .class)
 * @returns {string} - The selector string with added specificity
 */
export const addSpecificity = (
  specificity: number,
  selector: string,
  direct: boolean = true,
): string => {
  const ampersands = "&".repeat(specificity);

  // Handle class name with or without dot
  let processedSelector = selector;
  if (!selector.startsWith(".")) {
    processedSelector = `.${selector}`;
  }

  // Add space after ampersands if direct is false (for descendant selectors)
  return direct
    ? `${ampersands}${processedSelector}`
    : `${ampersands} ${processedSelector}`;
};
