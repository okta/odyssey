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

export type DirectoryIconProps = SvgIconNoChildrenProps;

const DirectoryIcon = forwardRef<SVGSVGElement, DirectoryIconProps>(
  (props, ref) => {
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
            d="M5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H5ZM4 5a1 1 0 0 1 1-1h1v16H5a1 1 0 0 1-1-1V5Zm4 15h1.18l.251-1.254a4.66 4.66 0 0 1 9.138 0l.25 1.254H19a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H8v16Zm8.608-.862.172.862h-5.56l.172-.862a2.66 2.66 0 0 1 5.216 0ZM12 10a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
            fill="currentColor"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedDirectoryIcon = memo(DirectoryIcon);
MemoizedDirectoryIcon.displayName = "DirectoryIcon";

export { MemoizedDirectoryIcon as DirectoryIcon };
