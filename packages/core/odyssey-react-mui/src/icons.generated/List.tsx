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

export type ListIconProps = SvgIconNoChildrenProps;

const ListIcon = forwardRef<SVGSVGElement, ListIconProps>((props, ref) => {
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
          d="M3.333 4A1.333 1.333 0 1 1 .667 4a1.333 1.333 0 0 1 2.666 0ZM2 9.333a1.333 1.333 0 1 0 0-2.666 1.333 1.333 0 0 0 0 2.666Zm0 4a1.333 1.333 0 1 0 0-2.666 1.333 1.333 0 0 0 0 2.666Zm3.333-4.666h10V7.333h-10v1.334Zm10-4h-10V3.333h10v1.334Zm-10 8h10v-1.334h-10v1.334Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedListIcon = memo(ListIcon);
MemoizedListIcon.displayName = "ListIcon";

export { MemoizedListIcon as ListIcon };
