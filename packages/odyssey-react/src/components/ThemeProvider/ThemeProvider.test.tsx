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

import React from "react";
import * as DefaultTheme from "@okta/odyssey-design-tokens";
import { render } from "@testing-library/react";
import { ThemeProvider } from ".";
import { ThemeContext } from "./context";
import type { ThemeShape } from "./context";

describe("ThemeProvider", () => {
  let theme: ThemeShape = {};
  const capture = (context: ThemeShape) => {
    theme = context;
    return null;
  };

  afterEach(() => {
    theme = {};
  });

  it("provides default theme via context", () => {
    render(<ThemeContext.Consumer children={capture} />);

    expect(theme).toEqual(DefaultTheme);
  });

  it("provides theme merging via object API", () => {
    render(
      <ThemeProvider theme={{ ColorTextPrimary: "#000" }}>
        <ThemeContext.Consumer children={capture} />
      </ThemeProvider>
    );

    expect(theme.ColorTextPrimary).toBe("#000");
  });

  it("provides theme merging via component composition", () => {
    render(
      <ThemeProvider
        theme={{ ColorTextPrimary: "#fff", ColorTextBody: "#000" }}
      >
        <ThemeProvider theme={{ ColorTextPrimary: "#000" }}>
          <ThemeContext.Consumer children={capture} />
        </ThemeProvider>
      </ThemeProvider>
    );

    expect(theme.ColorTextPrimary).toBe("#000");
    expect(theme.ColorTextBody).toBe("#000");
  });

  it("provides a span default for the bounded polymorphic 'as' prop", () => {
    const {
      container: { firstChild: span },
    } = render(<ThemeProvider theme={{}} children={<div />} />);

    expect(span).toBeVisible();
    expect(span).toBeInstanceOf(HTMLSpanElement);
  });

  it("accepts a div for the bounded polymoprhic 'as' prop", () => {
    const {
      container: { firstChild: div },
    } = render(
      <ThemeProvider
        as="div"
        theme={{}}
        children={<div data-testid="span-child" />}
      />
    );

    expect(div).toBeVisible();
    expect(div).toBeInstanceOf(HTMLDivElement);
  });

  it("inserts themes as inline styles", () => {
    const { container } = render(
      <ThemeProvider
        theme={{ ColorTextPrimary: "#000" }}
        children={<div data-testid="child" />}
      />
    );

    expect(container.firstChild).toHaveAttribute(
      "style",
      "--ColorTextPrimary: #000;"
    );
  });

  it("inserts component level themes without merging into context", () => {
    const Component = () => <div />;
    Component.theme = "abc123";

    const { container } = render(
      <ThemeProvider theme={{ [Component.theme]: { color: "coral" } }}>
        <ThemeContext.Consumer children={capture} />
      </ThemeProvider>
    );

    expect(theme).toEqual(DefaultTheme);
    expect(container.firstChild).toHaveAttribute(
      "style",
      `--${Component.theme}-color: coral;`
    );
  });
});
