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

export type FilterIconProps = SvgIconNoChildrenProps;

const FilterIcon = forwardRef<SVGSVGElement, FilterIconProps>((props, ref) => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1 4h22V2H1v2Zm3 6h16V8H4v2Zm13 6H7v-2h10v2Zm-7 6h4v-2h-4v2Z"
          fill="currentColor"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedFilterIcon = memo(FilterIcon);
MemoizedFilterIcon.displayName = "FilterIcon";

export { MemoizedFilterIcon as FilterIcon };
