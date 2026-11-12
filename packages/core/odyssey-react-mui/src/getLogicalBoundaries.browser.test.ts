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

import { getLogicalBoundaries } from "./getLogicalBoundaries.js";
import { appendToSandbox } from "./test-utils/appendToSandbox.js";

const createPositionedElement = () => {
  const element = document.createElement("div");
  element.style.setProperty("position", "fixed");
  element.style.setProperty("top", "10px");
  element.style.setProperty("left", "20px");
  element.style.setProperty("width", "100px");
  element.style.setProperty("height", "50px");
  return appendToSandbox(element);
};

describe(getLogicalBoundaries.name, () => {
  afterEach(() => {
    document.documentElement.removeAttribute("dir");
  });

  test("left to right document", () => {
    const element = createPositionedElement();

    expect(getLogicalBoundaries(element)).toStrictEqual({
      top: 10,
      bottom: 60,
      left: 20,
      right: 120,
    });
  });

  test("right to left document swaps left and right", () => {
    document.documentElement.setAttribute("dir", "rtl");
    const element = createPositionedElement();

    expect(getLogicalBoundaries(element)).toStrictEqual({
      top: 10,
      bottom: 60,
      left: 120,
      right: 20,
    });
  });
});
