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

export type ArrowLowerRightIconProps = SvgIconNoChildrenProps;

const ArrowLowerRightIcon = forwardRef<SVGSVGElement, ArrowLowerRightIconProps>(
  (props, ref) => {
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
            d="M16.071 14.657 7.707 6.293 6.293 7.707 14.586 16H10v2h6.571a1.5 1.5 0 0 0 1.5-1.5V9.929h-2v4.728Z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedArrowLowerRightIcon = memo(ArrowLowerRightIcon);
MemoizedArrowLowerRightIcon.displayName = "ArrowLowerRightIcon";

export { MemoizedArrowLowerRightIcon as ArrowLowerRightIcon };
