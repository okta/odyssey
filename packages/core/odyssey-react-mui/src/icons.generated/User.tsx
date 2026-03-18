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

export type UserIconProps = SvgIconNoChildrenProps;

const UserIcon = forwardRef<SVGSVGElement, UserIconProps>((props, ref) => {
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
          d="M10.333 4.333a2.333 2.333 0 1 1-4.666 0 2.333 2.333 0 0 1 4.666 0Zm1.334 0a3.667 3.667 0 1 1-7.334 0 3.667 3.667 0 0 1 7.334 0Zm-8.334 11c0-1.571.463-2.908 1.258-3.84C5.376 10.57 6.52 10 8 10c1.477 0 2.622.575 3.409 1.5.795.935 1.258 2.273 1.258 3.833H14c0-1.814-.538-3.477-1.575-4.697C11.378 9.404 9.857 8.666 8 8.666c-1.855 0-3.376.732-4.424 1.961C2.537 11.846 2 13.51 2 15.334h1.333Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedUserIcon = memo(UserIcon);
MemoizedUserIcon.displayName = "UserIcon";

export { MemoizedUserIcon as UserIcon };
