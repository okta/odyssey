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
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <>
        <path
          d="M20.309 2.62a1.01 1.01 0 0 1 1.123 1.317l-5.805 17.365c-.293.876-1.511.932-1.883.086l-3.388-7.727-7.772-3.45c-.846-.376-.783-1.598.098-1.884l17.48-5.67.147-.037Zm-7.984 10.552 2.22 5.06 3.668-10.978-5.888 5.918Zm-6.569-3.74 5.18 2.3 5.85-5.879-11.03 3.579Z"
          fill="currentColor"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedSendIcon = memo(SendIcon);
MemoizedSendIcon.displayName = "SendIcon";

export { MemoizedSendIcon as SendIcon };
