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

import React, { useCallback } from "react";
import { ThemeContext } from "./context";
import { asCustomProps, buildTheme } from "./utils";
import type { ThemeShape } from "./context";
import type { ReactElement } from "react";

interface ThemeProviderProps {
  as?: "span" | "div";
  children: ReactElement;
  theme: ThemeShape;
}

/**
 * A provider component for changing themes.
 */
const ThemeProvider = (props: ThemeProviderProps): ReactElement => {
  const { as: Tag = "span", theme, children } = props;

  const themeConsumer = useCallback(
    (prevTheme: ThemeShape) => (
      <Tag style={asCustomProps(theme)}>
        <ThemeContext.Provider
          value={buildTheme(prevTheme, theme)}
          children={children}
        />
      </Tag>
    ),
    [children, Tag, theme]
  );

  return <ThemeContext.Consumer children={themeConsumer} />;
};

export { ThemeProvider };
