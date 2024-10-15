/*!
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { getBackgroundColor } from "../ContrastModeProvider";
import * as Tokens from "@okta/odyssey-design-tokens";

describe("getBackgroundColor", () => {
  const originalGetComputedStyle = window.getComputedStyle;

  beforeEach(() => {
    window.getComputedStyle = jest
      .fn()
      .mockImplementation((element: HTMLElement) => ({
        backgroundColor: element.style.backgroundColor || "rgba(0, 0, 0, 0)",
      }));
  });

  afterEach(() => {
    window.getComputedStyle = originalGetComputedStyle;
  });

  it("returns the background color of the element if it is not transparent", () => {
    const element = document.createElement("div");
    element.style.backgroundColor = "rgb(255, 0, 0)";
    expect(getBackgroundColor(element)).toBe("rgb(255, 0, 0)");
  });

  it("returns the background color of the parent if the element is transparent", () => {
    const parent = document.createElement("div");
    const child = document.createElement("div");
    parent.appendChild(child);
    parent.style.backgroundColor = "rgb(0, 255, 0)";
    expect(getBackgroundColor(child)).toBe("rgb(0, 255, 0)");
  });

  it('returns "#ffffff" if no non-transparent background is found', () => {
    const element = document.createElement("div");
    expect(getBackgroundColor(element)).toBe("#ffffff");
  });

  it("keeps rgba as is (does not normalize to rgb)", () => {
    const element = document.createElement("div");
    element.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
    expect(getBackgroundColor(element)).toBe("rgba(255, 0, 0, 0.5)");
  });

  it("returns HueNeutral50 token for its RGB equivalent", () => {
    const element = document.createElement("div");
    element.style.backgroundColor = Tokens.HueNeutral50;
    expect(getBackgroundColor(element)).toBe(Tokens.HueNeutral50);
  });

  it("handles nested transparent elements correctly", () => {
    const grandparent = document.createElement("div");
    const parent = document.createElement("div");
    const child = document.createElement("div");
    grandparent.appendChild(parent);
    parent.appendChild(child);
    grandparent.style.backgroundColor = "rgb(0, 0, 255)";
    expect(getBackgroundColor(child)).toBe("rgb(0, 0, 255)");
  });
});
