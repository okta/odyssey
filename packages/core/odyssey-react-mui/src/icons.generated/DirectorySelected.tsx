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

export type DirectorySelectedIconProps = SvgIconNoChildrenProps;

const DirectorySelectedIcon = forwardRef<
  SVGSVGElement,
  DirectorySelectedIconProps
>((props, ref) => {
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
          d="M3.333 1.333a2 2 0 0 0-2 2v9.334a2 2 0 0 0 2 2h9.334a2 2 0 0 0 2-2V3.333a2 2 0 0 0-2-2H3.333ZM4 2.667h-.667a.667.667 0 0 0-.666.666v9.334c0 .368.298.666.666.666H4V2.667Zm7.867 10.666-.141-.705a2.44 2.44 0 0 0-4.785 0l-.141.705h5.067Zm-.534-6.666a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedDirectorySelectedIcon = memo(DirectorySelectedIcon);
MemoizedDirectorySelectedIcon.displayName = "DirectorySelectedIcon";

export { MemoizedDirectorySelectedIcon as DirectorySelectedIcon };
