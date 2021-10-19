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

import type { ReactNode } from "react";

export interface SharedFieldTypes {
  /**
   * the form field label
   */
  label: string;

  /**
   * Text to display when the field is optional, i.e. required prop is false
   */
  optionalLabel?: string;

  /**
   * Visually hides the label. This can be used in scenarios where you want a label for assistive user agents, but not have it be visible.
   */
  labelHidden?: boolean;

  /**
   * the form field error
   */
  error?: ReactNode;

  /**
   * the form field hint
   */
  hint?: string;

  /**
   * The underlying input element required attribute
   * @default true
   */
  required?: boolean;
}
