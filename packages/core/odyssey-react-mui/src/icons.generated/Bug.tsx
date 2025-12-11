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

export type BugIconProps = SvgIconNoChildrenProps;

const BugIcon = forwardRef<SVGSVGElement, BugIconProps>((props, ref) => {
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
          d="M11.333 10.667V5.333H8.667v8.6a3.334 3.334 0 0 0 2.666-3.266Zm-4-5.334H4.667v5.334a3.334 3.334 0 0 0 2.666 3.266v-8.6Zm-4 0v2.922L1.035 9.404l.596 1.192 1.702-.85v.92c0 .7.154 1.365.43 1.96l-1.568 1.57.943.942 1.373-1.373A4.655 4.655 0 0 0 8 15.333a4.655 4.655 0 0 0 3.49-1.568l1.372 1.373.943-.943-1.569-1.568a4.65 4.65 0 0 0 .43-1.96v-.922l1.702.851.597-1.192-2.298-1.15v-2.92h2.666V4h-4a3.333 3.333 0 1 0-6.666 0h-4v1.333h2.666Zm4-1.333H10a2 2 0 1 0-4 0h1.333Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedBugIcon = memo(BugIcon);
MemoizedBugIcon.displayName = "BugIcon";

export { MemoizedBugIcon as BugIcon };
