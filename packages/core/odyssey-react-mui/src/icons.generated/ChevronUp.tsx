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

export type ChevronUpIconProps = SvgIconNoChildrenProps;

const ChevronUpIcon = forwardRef<SVGSVGElement, ChevronUpIconProps>(
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
            d="m13.131 8.717 5.576 5.576-1.414 1.414L12 10.414l-5.293 5.293-1.414-1.414 5.576-5.576a1.6 1.6 0 0 1 2.262 0Z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedChevronUpIcon = memo(ChevronUpIcon);
MemoizedChevronUpIcon.displayName = "ChevronUpIcon";

export { MemoizedChevronUpIcon as ChevronUpIcon };
