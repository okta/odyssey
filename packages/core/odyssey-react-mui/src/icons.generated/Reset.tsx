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

import { SvgIcon, type SvgIconNoChildrenProps } from "../SvgIcon.js";

export type ResetIconProps = SvgIconNoChildrenProps;

const ResetIcon = forwardRef<SVGSVGElement, ResetIconProps>((props, ref) => {
  return (
    <SvgIcon
      fill="none"
      ref={ref}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <>
        <path
          clipRule="evenodd"
          d="M3 12a9 9 0 0 1 16.485-5H16v2h5.223c.12 0 .262 0 .387-.01a1.51 1.51 0 0 0 .571-.153 1.5 1.5 0 0 0 .655-.656c.112-.218.142-.426.154-.571.01-.125.01-.268.01-.387V2h-2v3.674A10.987 10.987 0 0 0 12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11h-2a9 9 0 1 1-18 0Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedResetIcon = memo(ResetIcon);
MemoizedResetIcon.displayName = "ResetIcon";

export { MemoizedResetIcon as ResetIcon };
