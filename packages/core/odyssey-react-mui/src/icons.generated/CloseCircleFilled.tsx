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

export type CloseCircleFilledIconProps = SvgIconNoChildrenProps;

const CloseCircleFilledIcon = forwardRef<
  SVGSVGElement,
  CloseCircleFilledIconProps
>((props, ref) => {
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
          d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11ZM7.05 15.536 10.586 12 7.05 8.464 8.464 7.05 12 10.586l3.536-3.536 1.414 1.414L13.414 12l3.536 3.536-1.414 1.414L12 13.414 8.464 16.95 7.05 15.536Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedCloseCircleFilledIcon = memo(CloseCircleFilledIcon);
MemoizedCloseCircleFilledIcon.displayName = "CloseCircleFilledIcon";

export { MemoizedCloseCircleFilledIcon as CloseCircleFilledIcon };
