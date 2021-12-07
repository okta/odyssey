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

import type { Template, ThemeReducer } from "./factory";
import { ThemeShape } from "../../components/ThemeProvider/context";

interface Args {
  readonly digest: string;
  readonly template: Template;
  readonly theme: ThemeShape;
  readonly themeReducer: ThemeReducer;
}
type ComponentTheme = Record<string, [string | number, string]>;

export class OStyleSheet {
  private element!: HTMLStyleElement;
  private readonly digest: string;
  private readonly template: Template;
  private readonly componentTheme: ComponentTheme;

  constructor({ digest, template, theme, themeReducer }: Args) {
    this.digest = digest;
    this.template = template;
    this.componentTheme = this.extractComponentTheme(theme, themeReducer);

    this.append();
  }

  inject(): OStyleSheet {
    this.element.innerHTML = this.themedStyles;
    return this;
  }

  private append() {
    const sheet = document.createElement("style");
    sheet.setAttribute("data-ods", this.digest);
    this.element = document.head.appendChild(sheet);
  }

  private get themedStyles() {
    return this.template(this.templateTheme);
  }

  private extractComponentTheme(theme: ThemeShape, themeReducer: ThemeReducer) {
    const themeProxy = new Proxy(theme, {
      get(target, key) {
        return [target[key as keyof ThemeShape], key];
      },
    });
    return themeReducer(themeProxy) as ComponentTheme;
  }

  private get templateTheme() {
    return Object.fromEntries(
      Object.entries(this.componentTheme).map(
        ([componentToken, [value, globalToken]]) => [
          componentToken,
          `var(--${this.digest}-${componentToken}, var(--${globalToken}, ${value}))`,
        ]
      )
    );
  }
}
