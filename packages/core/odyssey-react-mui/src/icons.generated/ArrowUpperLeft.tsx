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

export type ArrowUpperLeftIconProps = SvgIconNoChildrenProps;

const ArrowUpperLeftIcon = forwardRef<SVGSVGElement, ArrowUpperLeftIconProps>(
  (props, ref) => {
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
            d="M4 5v4.333h1.333V6.276l5.529 5.529.943-.943-5.529-5.529h3.057V4H5a1 1 0 0 0-1 1Z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedArrowUpperLeftIcon = memo(ArrowUpperLeftIcon);
MemoizedArrowUpperLeftIcon.displayName = "ArrowUpperLeftIcon";

export { MemoizedArrowUpperLeftIcon as ArrowUpperLeftIcon };
