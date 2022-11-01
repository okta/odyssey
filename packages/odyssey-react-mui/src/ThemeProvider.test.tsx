/*!
 * Copyright (c) 2021-present, Okta, Inc. and/or its affiliates. All rights reserved.
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
import { Button } from "./";
import { ThemeProvider } from "./ThemeProvider";

describe("ThemeProvider", () => {
  it("renders without crashing the app", () => {
    expect(() =>
      render(
        <ThemeProvider>
          <div />
        </ThemeProvider>
      )
    ).not.toThrow();
  });

  it("themes a Button", () => {
    render(
      <ThemeProvider>
        <Button>text</Button>
      </ThemeProvider>
    );

    expect(screen.queryByRole("button")).toHaveTextContent("text");
  });
});
