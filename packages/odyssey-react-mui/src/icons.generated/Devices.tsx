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

// Code automatically generated; DO NOT EDIT.

import { forwardRef, memo } from "react";
import { SvgIcon, type SvgIconNoChildrenProps } from "../SvgIcon.js";

export type DevicesIconProps = SvgIconNoChildrenProps;

const DevicesIcon = forwardRef<SVGSVGElement, DevicesIconProps>(
  (props, ref) => {
    return (
      <SvgIcon
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        {...props}
      >
        <>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5 2a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h4v2H6v2h7v1.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 20.5 9H18V5a3 3 0 0 0-3-3H5Zm11 7V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h8v-2.5A1.5 1.5 0 0 1 14.5 9H16Zm-3 6h-2v2h2v-2Zm2 5v-9h5v9h-5Z"
            fill="currentColor"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedDevicesIcon = memo(DevicesIcon);
MemoizedDevicesIcon.displayName = "DevicesIcon";

export { MemoizedDevicesIcon as DevicesIcon };
