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

export type SendIconProps = SvgIconNoChildrenProps;

const SendIcon = forwardRef<SVGSVGElement, SendIconProps>((props, ref) => {
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
          d="M11.19 3.903 3.839 6.288 7.29 7.82l3.899-3.918ZM8.217 8.781l1.48 3.374 2.446-7.32-3.926 3.946Zm6.07-6.156a.673.673 0 0 0-.846-.854L1.788 5.55a.673.673 0 0 0-.065 1.256l5.182 2.301 2.258 5.15a.673.673 0 0 0 1.255-.057l3.87-11.576Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedSendIcon = memo(SendIcon);
MemoizedSendIcon.displayName = "SendIcon";

export { MemoizedSendIcon as SendIcon };
