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

export type SecuritySelectedIconProps = SvgIconNoChildrenProps;

const SecuritySelectedIcon = forwardRef<
  SVGSVGElement,
  SecuritySelectedIconProps
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
          d="M8.162.687a.667.667 0 0 0-.324 0L2.505 2.02A.667.667 0 0 0 2 2.667V8c0 2.298 1.521 4.134 2.894 5.335a15.135 15.135 0 0 0 2.736 1.891l.05.026.015.008.004.002h.002L8 14.668l-.298.596a.667.667 0 0 0 .596 0L8 14.667l.299.596.002-.001.004-.002.014-.008.05-.026.183-.098a15.136 15.136 0 0 0 2.554-1.792C12.479 12.133 14 10.297 14 8V2.667a.667.667 0 0 0-.505-.647L8.162.687Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedSecuritySelectedIcon = memo(SecuritySelectedIcon);
MemoizedSecuritySelectedIcon.displayName = "SecuritySelectedIcon";

export { MemoizedSecuritySelectedIcon as SecuritySelectedIcon };
