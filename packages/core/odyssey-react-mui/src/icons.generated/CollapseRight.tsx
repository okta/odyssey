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

export type CollapseRightIconProps = SvgIconNoChildrenProps;

const CollapseRightIcon = forwardRef<SVGSVGElement, CollapseRightIconProps>(
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
            d="M14.667 14.667h-1.334V1.333h1.334v13.334Zm-4.943-6H.667V7.333h9.057L6.195 3.805l.943-.943 4.29 4.29.01.01c.057.057.124.124.178.187a1 1 0 0 1 .197.342 1 1 0 0 1 0 .618 1 1 0 0 1-.197.342 3.26 3.26 0 0 1-.178.187l-.01.01-4.29 4.29-.943-.943 3.529-3.528Z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedCollapseRightIcon = memo(CollapseRightIcon);
MemoizedCollapseRightIcon.displayName = "CollapseRightIcon";

export { MemoizedCollapseRightIcon as CollapseRightIcon };
