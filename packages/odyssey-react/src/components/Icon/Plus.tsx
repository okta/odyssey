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
const Plus = forwardRef<SVGSVGElement, Props>((props, ref) => (
  <Icon title="Plus" ref={ref} {...props}>
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 12C6 12.5523 6.44772 13 7 13C7.55228 13 8 12.5523 8 12V8L12 8C12.5523 8 13 7.55228 13 7C13 6.44772 12.5523 6 12 6L8 6V2C8 1.44772 7.55228 1 7 1C6.44772 1 6 1.44772 6 2V6L2 6C1.44772 6 1 6.44771 1 7C1 7.55228 1.44772 8 2 8L6 8V12Z"
        fill="currentColor"
      />
    </svg>
  </Icon>
));
export default Plus;
