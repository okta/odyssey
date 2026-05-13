/*!
 * Copyright (c) 2026-present, Okta, Inc. and/or its affiliates. All rights reserved.
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

export type SecurityIconProps = SvgIconNoChildrenProps;

const SecurityIcon = forwardRef<SVGSVGElement, SecurityIconProps>(
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
            d="M7.838.687a.7.7 0 0 1 .324 0l5.333 1.333c.297.074.505.34.505.647V8c0 2.298-1.521 4.134-2.894 5.335a15 15 0 0 1-2.787 1.917l-.014.008-.004.002h-.002L8 14.668l-.299.596-.002-.001-.004-.002-.014-.008a8 8 0 0 1-.233-.125 15 15 0 0 1-2.554-1.792C3.521 12.133 2 10.298 2 8V2.667c0-.306.208-.573.505-.647zM8 14.667l-.298.596a.67.67 0 0 0 .596 0zm0-.758a14 14 0 0 0 2.228-1.577C11.52 11.2 12.667 9.702 12.667 8V3.187L8 2.021 3.333 3.187V8c0 1.702 1.146 3.2 2.44 4.332A14 14 0 0 0 8 13.908"
            fill="currentColor"
            fillRule="evenodd"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedSecurityIcon = memo(SecurityIcon);
MemoizedSecurityIcon.displayName = "SecurityIcon";

export { MemoizedSecurityIcon as SecurityIcon };
