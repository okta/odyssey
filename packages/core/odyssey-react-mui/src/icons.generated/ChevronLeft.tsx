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

export type ChevronLeftIconProps = SvgIconNoChildrenProps;

const ChevronLeftIcon = forwardRef<SVGSVGElement, ChevronLeftIconProps>(
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
            d="m6.276 8 3.862-3.862-.943-.943L4.862 7.53a.667.667 0 0 0 0 .942l4.333 4.334.943-.943L6.276 8Z"
            fill="currentColor"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedChevronLeftIcon = memo(ChevronLeftIcon);
MemoizedChevronLeftIcon.displayName = "ChevronLeftIcon";

export { MemoizedChevronLeftIcon as ChevronLeftIcon };
