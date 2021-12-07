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
import { ThemeContext } from "../../components/ThemeProvider/context";

type WithTheme<C> = C & { theme: string };

/** A HOC to apply themed styles to a component */
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
          displayName: `WithStyles(${
            Composed.displayName || Composed.name || "Component"
          })`,
        }
      ),
      Composed
    ) as unknown as WithTheme<C>;
  };
}
