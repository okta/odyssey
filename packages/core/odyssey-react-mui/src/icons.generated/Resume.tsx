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

export type ResumeIconProps = SvgIconNoChildrenProps;

const ResumeIcon = forwardRef<SVGSVGElement, ResumeIconProps>((props, ref) => {
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
          d="M2 8a6 6 0 1 1 12 0A6 6 0 0 1 2 8ZM8 .667a7.333 7.333 0 1 0 0 14.666A7.333 7.333 0 0 0 8 .667ZM6.78 11.022l4.255-2.128a1 1 0 0 0 0-1.788L6.781 4.978a1 1 0 0 0-1.448.895v4.254a1 1 0 0 0 1.448.895Zm-.113-4.61L9.843 8 6.667 9.588V6.412Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedResumeIcon = memo(ResumeIcon);
MemoizedResumeIcon.displayName = "ResumeIcon";

export { MemoizedResumeIcon as ResumeIcon };
