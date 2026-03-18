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

export type CopyIconProps = SvgIconNoChildrenProps;

const CopyIcon = forwardRef<SVGSVGElement, CopyIconProps>((props, ref) => {
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
          d="M2.042 1.417h-.667V10a2 2 0 0 0 2 2H12V3.417a2 2 0 0 0-2-2H2.042ZM2.708 10V2.75H10c.368 0 .667.298.667.667v7.25H3.375A.667.667 0 0 1 2.708 10Zm10.625-5.333v8a.667.667 0 0 1-.666.666H4v1.334h8.667a2 2 0 0 0 2-2v-8h-1.334Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedCopyIcon = memo(CopyIcon);
MemoizedCopyIcon.displayName = "CopyIcon";

export { MemoizedCopyIcon as CopyIcon };
