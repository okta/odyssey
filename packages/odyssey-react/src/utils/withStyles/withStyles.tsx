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

import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import hoistNonReactStatics from "hoist-non-react-statics";
import { withStylesFactory } from "./factory";
import type { Composable, Styles } from "./factory";

/** A HOC to apply styles to a component */
export function withStyles(styles: Styles) {
  return <C extends Composable>(Composed: C): C => {
    type Ref = ElementRef<C>;
    type Props = ComponentPropsWithoutRef<C>;

    const WithStyles = withStylesFactory<Ref, Props, typeof Composed>(
      styles,
      Composed
    );

    return hoistNonReactStatics(
      Object.assign(
        forwardRef<Ref, Props>((props, ref) => {
          return <WithStyles composedRef={ref} {...props} />;
        }),
        {
          displayName: `WithStyles(${
            Composed.displayName || Composed.name || "Component"
          })`,
        }
      ),
      Composed
    ) as C;
  };
}
