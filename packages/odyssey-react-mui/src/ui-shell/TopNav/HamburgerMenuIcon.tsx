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

const HamburgerMenu = forwardRef<SVGSVGElement, HamburgerMenuProps>(
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
            d="M23.3335 11.3333H9.3335V10H23.3335V11.3333ZM23.3335 16.6667H9.3335V15.3333H23.3335V16.6667ZM9.3335 22H23.3335V20.6667H9.3335V22Z"
            fill="currentColor"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedHamburgerMenu = memo(HamburgerMenu);
MemoizedHamburgerMenu.displayName = "HamburgerMenu";

export { MemoizedHamburgerMenu as HamburgerMenu };
