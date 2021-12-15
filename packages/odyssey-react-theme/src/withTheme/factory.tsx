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
import type { Theme, ThemeKey, ThemeValue } from "../ThemeProvider/context";
import { isThemeValue } from "../ThemeProvider/utils";
import type {
  ForwardedRef,
  ComponentType,
  NamedExoticComponent,
  ComponentClass,
} from "react";
import { OStyleSheet } from "./stylesheet";

const sheet = new OStyleSheet();

type SourceStyles = Record<string, string>;
type TemplateTheme = Record<string, string>;
interface TranspiledStyles {
  __digest: string;
  __template: (theme: TemplateTheme) => string;
}

export type ComponentTheme = Record<
  string,
  ThemeValue | [ThemeKey, ThemeValue]
>;
type VirtualComponentTheme = Record<string, ThemeValue>;
export type ThemeReducer = (theme: Theme) => VirtualComponentTheme;

export type Template = TranspiledStyles["__template"];
export type Styles = SourceStyles | TranspiledStyles;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Composable = ComponentType<any> | NamedExoticComponent<any>;
type WithThemeProps<P, R> = P & {
  theme: Theme;
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
      if (sheet.has(digest)) return;

      sheet.inject(digest, this.themedStyles);
    }

    private get themedStyles(): string {
      return (template as Template)(this.templateTheme);
    }

    private get templateTheme() {
      return Object.fromEntries(
        Object.entries(this.componentTheme).map(
          ([componentToken, candidate]) => {
            const value = isThemeValue(candidate)
              ? candidate
              : `var(--${candidate[0]}, ${candidate[1]})`;

            return [
              componentToken,
              `var(--${digest}-${componentToken}, ${value})`,
            ];
          }
        )
      );
    }

    private get componentTheme() {
      // NOTE: https://github.com/Microsoft/TypeScript/issues/20846
      // Our reducer *should not* present the proxy behavior via types so assert result
      return themeReducer(this.reducerTheme) as unknown as ComponentTheme;
    }

    private get reducerTheme() {
      return new Proxy(this.props.theme, {
        get(target, key) {
          if (key in target) return [key, target[key as keyof Theme]];
          throw new TypeError(`Missing property '${String(key)}' within theme`);
        },
      });
    }

    override render() {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { composedRef: ref, theme, ...rest } = this.props;
      const ComposedComponent: ComponentType = Composed;
      return <ComposedComponent ref={ref} {...rest} />;
    }
  };
}
