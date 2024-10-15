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

import { waitFor } from "@testing-library/dom";
import {
  reactElementName,
  renderReactInWebComponent,
} from "./renderReactInWebComponent";

describe("renderReactInWebComponent", () => {
  afterEach(() => {
    // Remove any appended elements
    document.body.innerHTML = "";
  });

  test("renders a React app into a web component", async () => {
    const rootElement = document.createElement("div");
    const testElementText = "I'm a test component!";

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    document.body.append(rootElement);

    renderReactInWebComponent({
      getReactComponent: () => <div>{testElementText}</div>,
      rootElement,
    });

    await waitFor(() => {
      expect(
        rootElement.querySelector(reactElementName)!.shadowRoot,
      ).toHaveTextContent(testElementText);
    });
  });

  // TODO: Test with custom contentElementId
  // TODO: Test with returning the `reactAppRootElement` component to ensure apps can portal into it easier. Although, `rootElement`
});
