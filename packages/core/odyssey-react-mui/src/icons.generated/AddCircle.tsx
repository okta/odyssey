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

export type AddCircleIconProps = SvgIconNoChildrenProps;

const AddCircleIcon = forwardRef<SVGSVGElement, AddCircleIconProps>(
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
            d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2ZM.667 8a7.333 7.333 0 1 1 14.666 0A7.333 7.333 0 0 1 .667 8Zm6.666-.667v-2h1.334v2h2v1.334h-2v2H7.333v-2h-2V7.333h2Z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedAddCircleIcon = memo(AddCircleIcon);
MemoizedAddCircleIcon.displayName = "AddCircleIcon";

export { MemoizedAddCircleIcon as AddCircleIcon };
