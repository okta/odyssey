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
import { SvgIcon, type SvgIconNoChildrenProps } from "../SvgIcon";

export type EmailIconProps = SvgIconNoChildrenProps;

const EmailIcon = forwardRef<SVGSVGElement, EmailIconProps>((props, ref) => {
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.371 23.325v.785a2.75 2.75 0 0 0 2.75 2.75h17.051a2.75 2.75 0 0 0 2.75-2.75V9.278h-6.551v1.5h3.99l-3.99 3.992v2.12l5.051-5.051V24.11c0 .69-.56 1.25-1.25 1.25h-17.05a1.25 1.25 0 0 1-1.25-1.25v-.785h-1.5Zm14.5-6.843v-.212l-.107.106.107.106Z"
          fill="currentColor"
        />
        <path
          d="M1.078 5.14h21.04m-21.04 0v13.933a2 2 0 0 0 2 2h17.04a2 2 0 0 0 2-2V5.14m-21.04 0 11.014 9.798L22.117 5.14"
          stroke="currentColor"
          strokeWidth={1.5}
        />
      </>
    </SvgIcon>
  );
});

const MemoizedEmailIcon = memo(EmailIcon);
MemoizedEmailIcon.displayName = "EmailIcon";

export { MemoizedEmailIcon as EmailIcon };
