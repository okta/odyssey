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

import React, { forwardRef } from "react";
import { render, screen } from "@testing-library/react";
import { withThemeFactory } from "./factory";
import { tokens } from "../ThemeProvider/context";

describe("withThemeFactory", () => {
  const theme = () => ({});
  const styles = {};
  const Composed = forwardRef<HTMLDivElement>((props, ref) => (
    <div ref={ref} {...props} />
  ));
  const props = {
    theme: tokens,
    children: "hello world",
    composedRef: null,
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("returns a HOC", () => {
    const WithTheme = withThemeFactory(theme, styles, Composed);
    expect(WithTheme).toBeInstanceOf(Function);
    expect(React.isValidElement(<WithTheme {...props} />)).toBe(true);
  });

  it("forwards props as expected", () => {
    const WithTheme = withThemeFactory(theme, styles, Composed);
    render(<WithTheme {...props} />);
    expect(screen.getByText("hello world")).toBeVisible();
  });

  it("forwards the ref as expected", () => {
    const ref = jest.fn();
    const WithTheme = withThemeFactory(theme, styles, Composed);
    render(<WithTheme {...props} composedRef={ref} />);
    expect(ref).toHaveBeenCalledTimes(1);
    expect(ref).toHaveBeenLastCalledWith(screen.getByText("hello world"));
  });
});
