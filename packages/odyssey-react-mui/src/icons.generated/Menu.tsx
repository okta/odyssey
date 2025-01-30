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

export type MenuIconProps = SvgIconNoChildrenProps;

const MenuIcon = forwardRef<SVGSVGElement, MenuIconProps>((props, ref) => {
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
          d="M23 5H2V3h21v2Zm0 8H2v-2h21v2ZM2 21h21v-2H2v2Z"
          fill="currentColor"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedMenuIcon = memo(MenuIcon);
MemoizedMenuIcon.displayName = "MenuIcon";

export { MemoizedMenuIcon as MenuIcon };
