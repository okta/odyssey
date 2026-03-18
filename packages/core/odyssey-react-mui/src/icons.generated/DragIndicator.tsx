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

export type DragIndicatorIconProps = SvgIconNoChildrenProps;

const DragIndicatorIcon = forwardRef<SVGSVGElement, DragIndicatorIconProps>(
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
            d="M6 2.333a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm0 3.778a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm1 2.778a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-1 4.778a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM5 7.11a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm1 2.78a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-1 4.778a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedDragIndicatorIcon = memo(DragIndicatorIcon);
MemoizedDragIndicatorIcon.displayName = "DragIndicatorIcon";

export { MemoizedDragIndicatorIcon as DragIndicatorIcon };
