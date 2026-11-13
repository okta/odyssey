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

import { appendToSandbox } from "../test-utils/appendToSandbox.js";
import { getBackgroundColorBehindElement } from "./getBackgroundColorBehindElement.js";

const createBox = ({
  backgroundColor,
  top,
}: {
  backgroundColor: string;
  top: string;
}) => {
  const box = document.createElement("div");
  box.style.setProperty("position", "fixed");
  box.style.setProperty("left", "0");
  box.style.setProperty("top", top);
  box.style.setProperty("width", "100px");
  box.style.setProperty("height", "100px");
  box.style.setProperty("background-color", backgroundColor);
  return appendToSandbox(box);
};

describe(getBackgroundColorBehindElement.name, () => {
  test("opaque element behind a transparent one", () => {
    createBox({ backgroundColor: "rgb(255, 0, 0)", top: "0" });
    const element = createBox({ backgroundColor: "transparent", top: "0" });

    expect(getBackgroundColorBehindElement({ element })).toBe("rgb(255, 0, 0)");
  });

  test("element scrolled out of view falls back to its own ancestors", () => {
    const parentElement = appendToSandbox(document.createElement("div"));
    parentElement.style.setProperty("background-color", "rgb(0, 0, 255)");
    const element = document.createElement("div");
    element.style.setProperty("position", "fixed");
    element.style.setProperty("top", "-500px");
    element.style.setProperty("width", "100px");
    element.style.setProperty("height", "100px");
    parentElement.append(element);

    expect(getBackgroundColorBehindElement({ element })).toBe("rgb(0, 0, 255)");
  });
});
