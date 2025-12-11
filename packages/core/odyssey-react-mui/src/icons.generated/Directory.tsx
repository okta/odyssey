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

export type DirectoryIconProps = SvgIconNoChildrenProps;

const DirectoryIcon = forwardRef<SVGSVGElement, DirectoryIconProps>(
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
            d="M3.333 1.333a2 2 0 0 0-2 2v9.334a2 2 0 0 0 2 2h9.334a2 2 0 0 0 2-2V3.333a2 2 0 0 0-2-2H3.333Zm-.666 2c0-.368.298-.666.666-.666H4v10.666h-.667a.667.667 0 0 1-.666-.666V3.333Zm2.666 10h.787l.167-.836a3.106 3.106 0 0 1 6.092 0l.168.836h.12a.667.667 0 0 0 .666-.666V3.333a.667.667 0 0 0-.666-.666H5.333v10.666Zm5.739-.574.115.574H7.48l.115-.574a1.773 1.773 0 0 1 3.477 0ZM8 6.667a1.333 1.333 0 1 1 2.667 0 1.333 1.333 0 0 1-2.667 0ZM9.333 4a2.667 2.667 0 1 0 0 5.333 2.667 2.667 0 0 0 0-5.333Z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedDirectoryIcon = memo(DirectoryIcon);
MemoizedDirectoryIcon.displayName = "DirectoryIcon";

export { MemoizedDirectoryIcon as DirectoryIcon };
