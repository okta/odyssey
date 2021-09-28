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

import { forwardRef, useLayoutEffect } from "react";
import hoistNonReactStatics from "hoist-non-react-statics";
import OStyleSheet from "./stylesheet";
import type { ComponentType, ElementRef } from "react";

export type Template = () => string;
type SourceStyles = Record<string, string>;
interface TranspiledStyles {
  __digest: string;
  __template: Template;
}
type Styles = SourceStyles | TranspiledStyles;

const cache = new Map<string, OStyleSheet>();

const useStyles = (styles: Styles) => {
  const { __digest: digest, __template: template } = styles;

  useLayoutEffect(() => {
    if (cache.has(digest)) {
      return;
    }
    if (typeof template !== "function") {
      return;
    }

    const sheet = new OStyleSheet({ digest, template }).inject();
    cache.set(digest, sheet);
  }, [digest, template]);
};

function withStyles(styles: Styles) {
  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/explicit-module-boundary-types
  return <Props extends object>(Composed: ComponentType<Props>) => {
    return hoistNonReactStatics(
      Object.assign(
        forwardRef<ElementRef<ComponentType<Props>>, Props>((props, ref) => {
          useStyles(styles);
          return <Composed ref={ref} {...props} />;
        }),
        {
          displayName: `withStyle(${
            Composed.displayName || Composed.name || "Component"
          })`,
        }
      ),
      Composed
    );
  };
}

export { withStyles };
