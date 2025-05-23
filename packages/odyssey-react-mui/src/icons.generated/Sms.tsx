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

export type SmsIconProps = SvgIconNoChildrenProps;

const SmsIcon = forwardRef<SVGSVGElement, SmsIconProps>((props, ref) => {
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
          d="M10.5 22V12a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2v17l-4.414-4.414A2 2 0 0 0 23.672 24H12.5a2 2 0 0 1-2-2Z"
          stroke="currentColor"
          strokeWidth={1.5}
        />
        <path
          d="M10.5 22V12a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2v17l-4.414-4.414A2 2 0 0 0 23.672 24H12.5a2 2 0 0 1-2-2Z"
          stroke="currentColor"
          strokeWidth={1.5}
        />
        <path d="M14 19h12m0-4H14" stroke="currentColor" strokeWidth={1.5} />
        <path d="M14 19h12m0-4H14" stroke="currentColor" strokeWidth={1.5} />
        <path
          d="M8.09 15H6.5l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v2.803"
          stroke="currentColor"
          strokeWidth={1.5}
        />
      </>
    </SvgIcon>
  );
});

const MemoizedSmsIcon = memo(SmsIcon);
MemoizedSmsIcon.displayName = "SmsIcon";

export { MemoizedSmsIcon as SmsIcon };
