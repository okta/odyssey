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
 * Retrieves the logical boundaries (top, bottom, left, right) of a given HTML element.
 *
 * The function considers the document's text direction (`dir` attribute) to determine
 * whether the left and right boundaries should be swapped.
 */
export const getLogicalBoundaries = (element: HTMLElement) => {
  const isRTL = document.documentElement.getAttribute("dir") === "rtl";

  const { top, bottom, left, right } = element.getBoundingClientRect();

  return {
    top,
    bottom,
    // left and right are swapped for RTL
    left: isRTL ? right : left,
    right: isRTL ? left : right,
  };
};
