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

import { useFocusManager } from "./use-focus-manager";

export interface FocusManagerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  autofocus?: boolean;
  returnFocus?: boolean;
  trapped?: boolean;
}

export const FocusManager = React.forwardRef<HTMLDivElement, FocusManagerProps>(
  ({ autofocus = true, returnFocus = true, trapped = true, ...rest }, _ref) => {
    const ref = React.useRef<HTMLDivElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    React.useImperativeHandle(_ref, () => ref.current as HTMLDivElement);

    useFocusManager(ref, {
      autofocus: autofocus,
      returnFocus: returnFocus,
      trapped: trapped,
    });

    return <div ref={ref} {...rest} />;
  }
);
