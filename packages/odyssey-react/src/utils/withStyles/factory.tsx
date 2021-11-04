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
  __template: () => string;
}

export type Template = TranspiledStyles["__template"];
export type Styles = SourceStyles | TranspiledStyles;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Composable = ComponentType<any> | NamedExoticComponent<any>;

export function withStylesFactory<
  ComposedRef,
  ComposedProps,
  C extends Composable
>(
  styles: Styles,
  Composed: C
): ComponentClass<ComposedProps & { composedRef: ForwardedRef<ComposedRef> }> {
  type Props = ComposedProps & { composedRef: ForwardedRef<ComposedRef> };
  const { __digest: digest, __template: template } = styles;

  return class WithStyles extends Component<Props> {
    constructor(props: Props) {
      super(props);

      if (typeof template !== "function") return;
      if (cache.has(digest)) return;

      const sheet = new OStyleSheet({ digest, template }).inject();
      cache.set(digest, sheet);
    }

    override render() {
      const { composedRef: ref, ...rest } = this.props;
      const ComposedComponent: ComponentType = Composed;
      return <ComposedComponent ref={ref} {...rest} />;
    }
  };
}
