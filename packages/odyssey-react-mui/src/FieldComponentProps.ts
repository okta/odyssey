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

import { ReactElement } from "react";

import { HintLink } from "./HintLink.js";

export type FieldComponentProps = {
  /**
   * If `error` is not undefined, the `input` will indicate an error.
   */
  errorMessage?: string;
  /**
   * If `error` is not undefined, the `input` will indicate multiple errors.
   */
  errorMessageList?: string[];
  /**
   * The helper text content.
   */
  hint?: string;
  /**
   * A `Link` component to provide greater context that is rendered at the end of the `hint` text
   */
  HintLinkComponent?: ReactElement<typeof HintLink>;
  /**
   * The id of the `input` element.
   */
  id?: string;
  /**
   * If `true`, the component is disabled.
   */
  isDisabled?: boolean;
  /**
   * If `true`, the component can stretch to fill the width of the container.
   */
  isFullWidth?: boolean;
  /**
   * If `true`, the `input` element is not required.
   */
  isOptional?: boolean;
  /**
   * It prevents the user from changing the value of the field
   */
  isReadOnly?: boolean;
  /**
   * The name of the `input` element. Defaults to the `id` if not set.
   */
  name?: string;
};

export type FieldComponentRenderProps = {
  ariaDescribedBy: string;
  dataSe: string;
  errorMessageElementId: string;
  id: string;
  labelElementId: string;
};
