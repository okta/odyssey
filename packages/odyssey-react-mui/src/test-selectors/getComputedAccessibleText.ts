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

import {
  computeAccessibleName,
  computeAccessibleDescription,
} from "dom-accessibility-api";

import { type AccessibleTextSelectorValue } from "./testSelector.js";
import { getComputedAccessibleErrorMessageText } from "./getComputedAccessibleErrorMessageText.js";

export const accessibleTextSelector = {
  description: computeAccessibleDescription,
  errorMessage: getComputedAccessibleErrorMessageText,
  label: computeAccessibleName,
} as const satisfies Record<
  AccessibleTextSelectorValue,
  (element: HTMLElement) => string
>;

export const getComputedAccessibleText = ({
  element,
  type,
}: {
  element: HTMLElement;
  type: AccessibleTextSelectorValue;
}) => accessibleTextSelector[type](element);
