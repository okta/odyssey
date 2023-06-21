/*!
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { Chip } from "./";

export type StatusProps = {
  /**
   * Determine the color and icon of the alert
   */
  severity: "default" | "error" | "success" | "warning";

  /**
   * The text content of the status
   */
  label: string;

  /**
   * The style of indicator
   */
  variant?: "lamp" | "pill";
};

export const Status = ({ severity, label, variant = "lamp" }: StatusProps) => (
  <Chip label={label} color={severity} variant={variant} />
);
