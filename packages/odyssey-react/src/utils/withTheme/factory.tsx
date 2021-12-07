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

import React, { Component } from "react";
import type { ThemeShape } from "../../components/ThemeProvider/context";
import type {
  ForwardedRef,
  ComponentType,
  NamedExoticComponent,
  ComponentClass,
} from "react";
import { OStyleSheet } from "./stylesheet";

const cache = new Map<string, OStyleSheet>();

type SourceStyles = Record<string, string>;
interface TranspiledStyles {
  __digest: string;
  __template: (theme: ThemeShape) => string;
}

export type ThemeReducer = (theme: ThemeShape) => unknown;
export type Template = TranspiledStyles["__template"];
export type Styles = SourceStyles | TranspiledStyles;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Composable = ComponentType<any> | NamedExoticComponent<any>;
type WithThemeProps<P, R> = P & {
  theme: ThemeShape;
  composedRef: ForwardedRef<R>;
};

export function withThemeFactory<
  ComposedRef,
  ComposedProps,
  C extends Composable
>(
  themeReducer: ThemeReducer,
  styles: Styles,
  Composed: C
): ComponentClass<WithThemeProps<ComposedProps, ComposedRef>> {
  type Props = WithThemeProps<ComposedProps, ComposedRef>;
  const { __digest: digest, __template: template } = styles;

  return class WithTheme extends Component<Props> {
    constructor(props: Props) {
      super(props);

      if (typeof template !== "function") return;
      if (cache.has(digest)) return;

      const { theme } = props;
      const sheet = new OStyleSheet({
        theme,
        themeReducer,
        digest,
        template,
      }).inject();
      cache.set(digest, sheet);
    }

    override render() {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { composedRef: ref, theme, ...rest } = this.props;
      const ComposedComponent: ComponentType = Composed;
      return <ComposedComponent ref={ref} {...rest} />;
    }
  };
}
