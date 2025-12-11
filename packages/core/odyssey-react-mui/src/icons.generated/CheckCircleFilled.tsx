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

export type CheckCircleFilledIconProps = SvgIconNoChildrenProps;

const CheckCircleFilledIcon = forwardRef<
  SVGSVGElement,
  CheckCircleFilledIconProps
>((props, ref) => {
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
          d="M15.333 8A7.333 7.333 0 1 1 .667 8a7.333 7.333 0 0 1 14.666 0ZM5.281 7.471l1.886 1.886 3.77-3.771.944.943-4.007 4.007a1 1 0 0 1-1.414 0L4.338 8.414l.943-.943Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedCheckCircleFilledIcon = memo(CheckCircleFilledIcon);
MemoizedCheckCircleFilledIcon.displayName = "CheckCircleFilledIcon";

export { MemoizedCheckCircleFilledIcon as CheckCircleFilledIcon };
