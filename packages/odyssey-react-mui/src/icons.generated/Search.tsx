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

export type SearchIconProps = SvgIconNoChildrenProps;

const SearchIcon = forwardRef<SVGSVGElement, SearchIconProps>((props, ref) => {
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
          d="M16 10a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm-1.13 6.348a8 8 0 1 1 1.422-1.406l5.415 5.415-1.414 1.414-5.423-5.423Z"
          fill="currentColor"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedSearchIcon = memo(SearchIcon);
MemoizedSearchIcon.displayName = "SearchIcon";

export { MemoizedSearchIcon as SearchIcon };
