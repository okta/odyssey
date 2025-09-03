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

export type DragIndicatorIconProps = SvgIconNoChildrenProps;

const DragIndicatorIcon = forwardRef<SVGSVGElement, DragIndicatorIconProps>(
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
            d="M9 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM16.5 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm0 5.667a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm1.5 4.166a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM16.5 22a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm-9-11.333a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM9 14.833a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM7.5 22a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
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
