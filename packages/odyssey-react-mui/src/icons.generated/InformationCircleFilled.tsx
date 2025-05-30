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

export type InformationCircleFilledIconProps = SvgIconNoChildrenProps;

const InformationCircleFilledIcon = forwardRef<
  SVGSVGElement,
  InformationCircleFilledIconProps
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
          d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11ZM12 8.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Zm0 1.75a1 1 0 0 1 1 1v6h-2v-6a1 1 0 0 1 1-1Z"
          fill="currentColor"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedInformationCircleFilledIcon = memo(InformationCircleFilledIcon);
MemoizedInformationCircleFilledIcon.displayName = "InformationCircleFilledIcon";

export { MemoizedInformationCircleFilledIcon as InformationCircleFilledIcon };
