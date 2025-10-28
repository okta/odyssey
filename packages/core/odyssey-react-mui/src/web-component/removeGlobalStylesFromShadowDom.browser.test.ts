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

import {
  removeGlobalStylesFromShadowDom,
  shadowDomHostStyles,
} from "./removeGlobalStylesFromShadowDom.js";

describe(removeGlobalStylesFromShadowDom.name, () => {
  test("adds styles to DOM element", () => {
    const stylesRootElement = document.createElement("div");

    removeGlobalStylesFromShadowDom({
      nonce: "",
      stylesRootElement,
    });

    expect(stylesRootElement).toHaveTextContent(
      shadowDomHostStyles
        .split("\n")
        .map((stylesLine) => stylesLine.trim())
        .join(" ")
        .trim(),
    );
  });

  test("adds nonce to DOM element", () => {
    const stylesRootElement = document.createElement("div");
    const nonce = "abf52f";

    removeGlobalStylesFromShadowDom({
      nonce,
      stylesRootElement,
    });

    expect(stylesRootElement.innerHTML).toBe(
      `<style nonce="${nonce}">${shadowDomHostStyles}</style>`,
    );
  });
});
