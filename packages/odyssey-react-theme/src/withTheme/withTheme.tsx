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

import React, { forwardRef, useCallback } from "react";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import hoistNonReactStatics from "hoist-non-react-statics";
import { withThemeFactory } from "./factory";
import type { Composable, Styles, ThemeReducer } from "./factory";
import { ThemeContext } from "../ThemeProvider/context";

type WithTheme<C> = C & { theme: string };

/**
 * A higher order component to apply themed styles
 * @param theme - a theme reducer function which maps global values to component values
 * @param styles - a CSS module object transpiled by theme build tooling
 */
export function withTheme(themeReducer: ThemeReducer, styles: Styles) {
  return <C extends Composable>(Composed: C): WithTheme<C> => {
    type Ref = ElementRef<C>;
    type Props = ComponentPropsWithoutRef<C>;

    const WithTheme = withThemeFactory<Ref, Props, typeof Composed>(
      themeReducer,
      styles,
      Composed
    );

    return hoistNonReactStatics(
      Object.assign(
        forwardRef<Ref, Props>((props, ref) => {
          const themeConsumer = useCallback(
            (theme) => <WithTheme {...props} theme={theme} composedRef={ref} />,
            [props, ref]
          );

          return <ThemeContext.Consumer children={themeConsumer} />;
        }),
        {
          theme: styles.__digest,
        }
      ),
      Composed
    ) as unknown as WithTheme<C>;
  };
}
