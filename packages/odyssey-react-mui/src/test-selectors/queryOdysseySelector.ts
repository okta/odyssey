/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { odysseyTestSelectors } from "./odysseyTestSelectors";
import { querySelector } from "./querySelector";

export const queryOdysseySelector = <
  ComponentName extends keyof typeof odysseyTestSelectors,
>({
  element,
  componentName,
  options,
}: {
  element: Parameters<
    typeof querySelector<(typeof odysseyTestSelectors)[ComponentName]>
  >[0]["element"];
  /**
   * Name of the component you want to select within.
   */
  componentName: ComponentName;
  /**
   * String or RegExp values required for this selector.
   */
  options?: Parameters<
    typeof querySelector<(typeof odysseyTestSelectors)[ComponentName]>
  >[0]["options"];
}) =>
  querySelector({
    element,
    options,
    testSelectors: odysseyTestSelectors[componentName],
  });
