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

export type HomeIconProps = SvgIconNoChildrenProps;

const HomeIcon = forwardRef<SVGSVGElement, HomeIconProps>((props, ref) => {
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
          d="m12 .655.669.602 10 9 .331.298V20a3 3 0 0 1-3 3h-5v-7a3 3 0 1 0-6 0v7H4a3 3 0 0 1-3-3v-9.445l.331-.298 10-9L12 .655Zm-9 10.79V20a1 1 0 0 0 1 1h3v-5a5 5 0 0 1 10 0v5h3a1 1 0 0 0 1-1v-8.555l-9-8.1-9 8.1Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedHomeIcon = memo(HomeIcon);
MemoizedHomeIcon.displayName = "HomeIcon";

export { MemoizedHomeIcon as HomeIcon };
