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

export type WarningFilledIconProps = SvgIconNoChildrenProps;

const WarningFilledIcon = forwardRef<SVGSVGElement, WarningFilledIconProps>(
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
            d="M6.228 1.946c.749-1.43 2.795-1.43 3.544 0l5.13 9.793c.697 1.331-.269 2.928-1.772 2.928H2.87c-1.503 0-2.469-1.597-1.771-2.928l5.13-9.793ZM8 9.333a.667.667 0 0 1-.667-.666V5.333h1.334v3.334A.667.667 0 0 1 8 9.333ZM8 10.5a.833.833 0 1 0 0 1.667.833.833 0 0 0 0-1.667Z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedWarningFilledIcon = memo(WarningFilledIcon);
MemoizedWarningFilledIcon.displayName = "WarningFilledIcon";

export { MemoizedWarningFilledIcon as WarningFilledIcon };
