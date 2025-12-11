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

export type UnlockIconProps = SvgIconNoChildrenProps;

const UnlockIcon = forwardRef<SVGSVGElement, UnlockIconProps>((props, ref) => {
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
          d="M6 4v2h8v6a3.333 3.333 0 0 1-3.333 3.333H5.333A3.333 3.333 0 0 1 2 12V6h2.667V4a3.333 3.333 0 1 1 6.666 0v.333H10V4a2 2 0 1 0-4 0ZM3.333 7.333V12a2 2 0 0 0 2 2h5.334a2 2 0 0 0 2-2V7.333H3.333ZM8 11.667a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedUnlockIcon = memo(UnlockIcon);
MemoizedUnlockIcon.displayName = "UnlockIcon";

export { MemoizedUnlockIcon as UnlockIcon };
