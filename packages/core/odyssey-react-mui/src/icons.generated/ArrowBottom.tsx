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

export type ArrowBottomIconProps = SvgIconNoChildrenProps;

const ArrowBottomIcon = forwardRef<SVGSVGElement, ArrowBottomIconProps>(
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
            d="M8.667 2.667v6.39l2.195-2.195.943.943-3.098 3.097a1 1 0 0 1-1.414 0L4.195 7.805l.943-.943 2.195 2.195v-6.39h1.334ZM4 13.333h8V12H4v1.333Z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedArrowBottomIcon = memo(ArrowBottomIcon);
MemoizedArrowBottomIcon.displayName = "ArrowBottomIcon";

export { MemoizedArrowBottomIcon as ArrowBottomIcon };
