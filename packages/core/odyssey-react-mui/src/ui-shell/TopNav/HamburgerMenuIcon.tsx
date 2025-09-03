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

import { SvgIcon, type SvgIconNoChildrenProps } from "../../SvgIcon.js";

export type HamburgerMenuProps = SvgIconNoChildrenProps;

const HamburgerMenuIcon = forwardRef<SVGSVGElement, HamburgerMenuProps>(
  (props, ref) => {
    return (
      <SvgIcon
        fill="none"
        ref={ref}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          clipRule="evenodd"
          d="M21.333 5.778H2.667V4H21.333V5.778ZM21.333 12.885H2.667V11.111H21.333V12.885ZM2.667 20H21.333V18.221H2.667V20Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </SvgIcon>
    );
  },
);

const MemoizedHamburgerMenuIcon = memo(HamburgerMenuIcon);
MemoizedHamburgerMenuIcon.displayName = "HamburgerMenuIcon";

export { MemoizedHamburgerMenuIcon as HamburgerMenuIcon };
