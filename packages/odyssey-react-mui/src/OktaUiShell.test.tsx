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

import { render } from "@testing-library/react";

import { OktaUiShell } from "./OktaUiShell";

describe("OktaUiShell", () => {
  test("renders `OktaUiShell`", async () => {
    const rootElement = document.createElement("div");
    const navHeaderText = "Hello World!";

    // If this isn't appended to the DOM, the React app won't exist because of how Web Components run.
    document.body.append(rootElement);

    const { container } = render(
      <OktaUiShell
        appRootElement={document.createElement("div")}
        changeComponentProps={(setComponentProps) => {
          setComponentProps({
            sideNavProps: {
              navHeaderText,
              sideNavItems: [],
            },
            topNavProps: {
              topNavLinkItems: [],
            },
          });
        }}
        emotionRootElement={document.createElement("div")}
      />,
    );

    expect(container).toHaveTextContent(navHeaderText);
  });
});
