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

import { CircularProgress as MuiCircularProgress } from "@mui/material";

import type { SeleniumProps } from "./SeleniumProps";

export type CircularProgressProps = {
  /**
   * The ARIA label for the progress spinner
   */
  ariaLabel?: string;
  /**
   * The percentage filled the spinner should be, as an integer.
   * If undefined, the spinner will spin perpetually.
   */
  value?: number;
} & SeleniumProps;

export const CircularProgress = ({
  ariaLabel,
  testId,
  value,
}: CircularProgressProps) => (
  <MuiCircularProgress
    data-se={testId}
    value={value}
    variant={value ? "determinate" : "indeterminate"}
    aria-label={ariaLabel}
  />
);
