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

export type CustomizationsIconProps = SvgIconNoChildrenProps;

const CustomizationsIcon = forwardRef<SVGSVGElement, CustomizationsIconProps>(
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
            d="M10.667 3.333a1 1 0 1 1 2 0 1 1 0 0 1-2 0ZM9.43 4H2V2.667h7.43A2.334 2.334 0 1 1 9.43 4Zm-2.86 9.333a2.334 2.334 0 1 1 0-1.333H14v1.333H6.57ZM4 8.667H2V7.333h3.763a2.334 2.334 0 0 1 4.474 0H14v1.334h-3.763a2.334 2.334 0 0 1-4.474 0H4ZM8 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-4.667 5.667a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedCustomizationsIcon = memo(CustomizationsIcon);
MemoizedCustomizationsIcon.displayName = "CustomizationsIcon";

export { MemoizedCustomizationsIcon as CustomizationsIcon };
