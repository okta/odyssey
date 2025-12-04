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

export type ChevronDownIconProps = SvgIconNoChildrenProps;

const ChevronDownIcon = forwardRef<SVGSVGElement, ChevronDownIconProps>(
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
            d="m8.754 10.522 4.05-4.05-.942-.943L8 9.39 4.138 5.529l-.943.942 4.05 4.05a1.067 1.067 0 0 0 1.51 0Z"
            fill="currentColor"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedChevronDownIcon = memo(ChevronDownIcon);
MemoizedChevronDownIcon.displayName = "ChevronDownIcon";

export { MemoizedChevronDownIcon as ChevronDownIcon };
