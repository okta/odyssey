/*!
 * Copyright (c) 2025-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

// Code automatically generated; DO NOT EDIT.

import { forwardRef, memo } from "react";

import { SvgIcon, type SvgIconNoChildrenProps } from "../SvgIcon.js";

export type DevicesIconProps = SvgIconNoChildrenProps;

const DevicesIcon = forwardRef<SVGSVGElement, DevicesIconProps>(
  (props, ref) => {
    return (
      <SvgIcon
        fill="none"
        ref={ref}
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <>
          <path
            clipRule="evenodd"
            d="M3.333 1.333a2 2 0 0 0-2 2V8a2 2 0 0 0 2 2H6v1.333H4v1.334h4.667v1a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H12V3.333a2 2 0 0 0-2-2H3.333ZM10.667 6V3.333A.667.667 0 0 0 10 2.667H3.333a.667.667 0 0 0-.666.666V8c0 .368.298.667.666.667h5.334V7a1 1 0 0 1 1-1h1Zm-2 4H7.333v1.333h1.334V10ZM10 13.333v-6h3.333v6H10Z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedDevicesIcon = memo(DevicesIcon);
MemoizedDevicesIcon.displayName = "DevicesIcon";

export { MemoizedDevicesIcon as DevicesIcon };
