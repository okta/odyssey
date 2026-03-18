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

export type CustomizationsSelectedIconProps = SvgIconNoChildrenProps;

const CustomizationsSelectedIcon = forwardRef<
  SVGSVGElement,
  CustomizationsSelectedIconProps
>((props, ref) => {
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
          d="M2 4h7.43a2.334 2.334 0 1 0 0-1.333H2V4Zm2.333 11c1.057 0 1.95-.703 2.237-1.667H14V12H6.57a2.334 2.334 0 1 0-2.237 3ZM2 8.667h3.763a2.334 2.334 0 0 0 4.474 0H14V7.333h-3.763a2.334 2.334 0 0 0-4.474 0H2v1.334Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedCustomizationsSelectedIcon = memo(CustomizationsSelectedIcon);
MemoizedCustomizationsSelectedIcon.displayName = "CustomizationsSelectedIcon";

export { MemoizedCustomizationsSelectedIcon as CustomizationsSelectedIcon };
