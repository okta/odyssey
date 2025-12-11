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

export type ReportsSelectedIconProps = SvgIconNoChildrenProps;

const ReportsSelectedIcon = forwardRef<SVGSVGElement, ReportsSelectedIconProps>(
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
            d="M12 1.333h-.667v13.334h.687c.371 0 .68 0 .933-.016a2.57 2.57 0 0 0 .754-.142 2.5 2.5 0 0 0 1.469-1.469c.09-.242.125-.49.142-.754.015-.253.015-.562.015-.932V1.333H12Zm-6 4v9.334h4v-10H6v.666ZM4.667 14V8h-4v3.353c0 .371 0 .68.015.933.017.264.052.512.142.754a2.5 2.5 0 0 0 1.469 1.469c.242.09.49.126.754.142.253.016.562.016.932.016h.689V14Z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedReportsSelectedIcon = memo(ReportsSelectedIcon);
MemoizedReportsSelectedIcon.displayName = "ReportsSelectedIcon";

export { MemoizedReportsSelectedIcon as ReportsSelectedIcon };
