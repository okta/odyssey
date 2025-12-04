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

export type GridIconProps = SvgIconNoChildrenProps;

const GridIcon = forwardRef<SVGSVGElement, GridIconProps>((props, ref) => {
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
          d="M4.667 3.333a1.333 1.333 0 1 1-2.667 0 1.333 1.333 0 0 1 2.667 0Zm0 4.667A1.333 1.333 0 1 1 2 8a1.333 1.333 0 0 1 2.667 0Zm-1.334 6a1.333 1.333 0 1 0 0-2.667 1.333 1.333 0 0 0 0 2.667Zm6-10.667a1.333 1.333 0 1 1-2.666 0 1.333 1.333 0 0 1 2.666 0ZM8 9.333a1.333 1.333 0 1 0 0-2.666 1.333 1.333 0 0 0 0 2.666Zm1.333 3.334a1.333 1.333 0 1 1-2.666 0 1.333 1.333 0 0 1 2.666 0Zm3.334-8a1.333 1.333 0 1 0 0-2.667 1.333 1.333 0 0 0 0 2.667ZM14 8a1.333 1.333 0 1 1-2.667 0A1.333 1.333 0 0 1 14 8Zm-1.333 6a1.333 1.333 0 1 0 0-2.667 1.333 1.333 0 0 0 0 2.667Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedGridIcon = memo(GridIcon);
MemoizedGridIcon.displayName = "GridIcon";

export { MemoizedGridIcon as GridIcon };
