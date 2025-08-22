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

export type CheckCircleFilledIconProps = SvgIconNoChildrenProps;

const CheckCircleFilledIcon = forwardRef<
  SVGSVGElement,
  CheckCircleFilledIconProps
>((props, ref) => {
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
          d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11Zm-15.078-.793 2.828 2.829 5.657-5.657 1.414 1.414-6.01 6.01a1.5 1.5 0 0 1-2.122 0l-3.182-3.182 1.415-1.414Z"
          fill="currentColor"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedCheckCircleFilledIcon = memo(CheckCircleFilledIcon);
MemoizedCheckCircleFilledIcon.displayName = "CheckCircleFilledIcon";

export { MemoizedCheckCircleFilledIcon as CheckCircleFilledIcon };
