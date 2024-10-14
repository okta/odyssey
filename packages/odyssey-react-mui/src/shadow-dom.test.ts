/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
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
  createUnattachedShadowDomElements,
  createShadowDomElements,
} from "./shadow-dom";

describe("createUnattachedShadowDomElements", () => {
  test("returns two elements at attach to a Shadow DOM", () => {
    const { appRootElement, emotionRootElement } =
      createUnattachedShadowDomElements();

    expect(appRootElement).toBeInstanceOf(HTMLDivElement);
    expect(emotionRootElement).toBeInstanceOf(HTMLDivElement);
  });

  test("App root element has the correct attributes", () => {
    const { appRootElement } = createUnattachedShadowDomElements();

    window.cspNonce = "hello-world";

    expect(appRootElement).toHaveAttribute("id", "app-root");
    expect(appRootElement).toHaveStyle({
      height: "inherit",
    });
  });

  test("Emotion root element has the correct attributes", () => {
    const { emotionRootElement } = createUnattachedShadowDomElements();

    window.cspNonce = "hello-world";

    expect(emotionRootElement).toHaveAttribute("id", "style-root");
    expect(emotionRootElement).toHaveAttribute("nonce", "hello-world");
  });
});

describe("createShadowDomElements", () => {
  test("returns two elements attached to a Shadow DOM", () => {
    const { emotionRootElement, shadowRootElement } = createShadowDomElements(
      document.createElement("div"),
    );

    expect(emotionRootElement.parentNode).toBeInstanceOf(ShadowRoot);
    expect(shadowRootElement.parentNode).toBeInstanceOf(ShadowRoot);
  });
});
