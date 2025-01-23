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

import { createReactRootElements } from "./createReactRootElements.js";

describe("createReactRootElements", () => {
  test("returns two elements at attach to a Shadow DOM", () => {
    const { appRootElement, stylesRootElement } = createReactRootElements();

    expect(appRootElement).toBeInstanceOf(HTMLDivElement);
    expect(stylesRootElement).toBeInstanceOf(HTMLDivElement);
  });

  test("App root element has the correct attributes", () => {
    const { appRootElement } = createReactRootElements();

    expect(appRootElement).toHaveAttribute("id", "app-root");
    expect(appRootElement).toHaveAttribute("style", "height: inherit;");
  });

  test("Emotion root element has the correct attributes", () => {
    const nonce = "hello-world";

    window.cspNonce = nonce;

    const { stylesRootElement } = createReactRootElements();

    expect(stylesRootElement).toHaveAttribute("id", "style-root");
    expect(stylesRootElement).toHaveAttribute("nonce", nonce);
  });
});
