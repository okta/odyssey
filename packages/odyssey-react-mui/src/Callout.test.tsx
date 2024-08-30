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

import { render, screen } from "@testing-library/react";

import { Callout } from "./Callout";

describe("Callout", () => {
  test("renders without crashing the app", () => {
    expect(() =>
      render(
        <Callout
          role="alert"
          severity="error"
          title="Safety checks failed"
          linkText="Visit fueling console"
          linkUrl="#"
          text=""
        />,
      ),
    ).not.toThrow();
  });

  test("themes a Button", () => {
    render(
      <Callout
        role="alert"
        severity="error"
        title="Safety checks failed"
        linkText="Visit fueling console"
        linkUrl="#"
      />,
    );

    expect(screen.queryByRole("button")).toHaveTextContent("text");
  });
});
