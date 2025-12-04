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

export type AppsIconProps = SvgIconNoChildrenProps;

const AppsIcon = forwardRef<SVGSVGElement, AppsIconProps>((props, ref) => {
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
          d="M4.333 1.333a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-1.666 3a1.667 1.667 0 1 1 3.333 0 1.667 1.667 0 0 1-3.333 0Zm1.666 4.334a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-1.666 3a1.667 1.667 0 1 1 3.333 0 1.667 1.667 0 0 1-3.333 0Zm6-7.334a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-1.666a1.667 1.667 0 1 0 0 3.333 1.667 1.667 0 0 0 0-3.333Zm0 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-1.667 3a1.667 1.667 0 1 1 3.333 0 1.667 1.667 0 0 1-3.333 0Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedAppsIcon = memo(AppsIcon);
MemoizedAppsIcon.displayName = "AppsIcon";

export { MemoizedAppsIcon as AppsIcon };
