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
  createShadowDomElements,
  createShadowRootElement,
} from "./createShadowDomElements.js";

describe(createShadowDomElements.name, () => {
  test("returns two elements attached to a Shadow DOM", () => {
    const { emotionRootElement, shadowRootElement } = createShadowDomElements(
      document.createElement("div"),
    );

    expect(emotionRootElement.parentNode).toBeInstanceOf(ShadowRoot);
    expect(shadowRootElement.parentNode).toBeInstanceOf(ShadowRoot);
  });
});

describe(createShadowRootElement.name, () => {
  test("returns the style and app elements attached to a Shadow DOM", () => {
    const previousNonce = window.cspNonce;
    window.cspNonce = "test-nonce";
    onTestFinished(() => {
      window.cspNonce = previousNonce;
    });
    const containerElement = document.createElement("div");

    const [emotionRootElement, shadowRootElement] =
      createShadowRootElement(containerElement);

    expect(emotionRootElement.getAttribute("id")).toBe("style-root");
    expect(emotionRootElement.getAttribute("nonce")).toBe("test-nonce");
    expect(shadowRootElement.getAttribute("id")).toBe("shadow-root");
    expect(emotionRootElement.parentNode).toBe(containerElement.shadowRoot);
    expect(shadowRootElement.parentNode).toBe(containerElement.shadowRoot);
  });
});
