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

import { forwardRef } from "react";
import type { ComponentPropsWithRef } from "react";
import Icon from "./Icon";
export type Props = {
  title?: string;
  titleId?: string;
  size?: string;
  color?: string;
} & ComponentPropsWithRef<"svg">;
const External = forwardRef<SVGSVGElement, Props>((props, ref) => (
  <Icon title="External" ref={ref} {...props}>
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.375 4.75C1.375 3.99 1.991 3.375 2.75 3.375H5C5.16576 3.375 5.32473 3.44085 5.44194 3.55806C5.55915 3.67527 5.625 3.83424 5.625 4C5.625 4.16576 5.55915 4.32473 5.44194 4.44194C5.32473 4.55915 5.16576 4.625 5 4.625H2.75C2.71685 4.625 2.68505 4.63817 2.66161 4.66161C2.63817 4.68505 2.625 4.71685 2.625 4.75V11.25C2.625 11.319 2.681 11.375 2.75 11.375H9.25C9.28315 11.375 9.31495 11.3618 9.33839 11.3384C9.36183 11.3149 9.375 11.2832 9.375 11.25V9C9.375 8.83424 9.44085 8.67527 9.55806 8.55806C9.67527 8.44085 9.83424 8.375 10 8.375C10.1658 8.375 10.3247 8.44085 10.4419 8.55806C10.5592 8.67527 10.625 8.83424 10.625 9V11.25C10.625 12.01 10.009 12.625 9.25 12.625H2.75C1.99 12.625 1.375 12.009 1.375 11.25V4.75Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.375 2C7.375 1.655 7.655 1.375 8 1.375H12C12.345 1.375 12.625 1.655 12.625 2V6C12.625 6.16576 12.5592 6.32473 12.4419 6.44194C12.3247 6.55915 12.1658 6.625 12 6.625C11.8342 6.625 11.6753 6.55915 11.5581 6.44194C11.4408 6.32473 11.375 6.16576 11.375 6V3.509L5.442 9.442C5.32477 9.55923 5.16578 9.62508 5 9.62508C4.83422 9.62508 4.67523 9.55923 4.558 9.442C4.44077 9.32477 4.37492 9.16578 4.37492 9C4.37492 8.91791 4.39109 8.83663 4.4225 8.76079C4.45391 8.68495 4.49996 8.61604 4.558 8.558L10.491 2.625H8C7.83424 2.625 7.67527 2.55915 7.55806 2.44194C7.44085 2.32473 7.375 2.16576 7.375 2Z"
        fill="currentColor"
      />
    </svg>
  </Icon>
));
export default External;
