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

export type UserIconProps = SvgIconNoChildrenProps;

const UserIcon = forwardRef<SVGSVGElement, UserIconProps>((props, ref) => {
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
          d="M15.5 6.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm2 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0ZM5 23c0-2.357.694-4.363 1.886-5.762C8.064 15.856 9.782 15 12 15c2.215 0 3.934.862 5.113 2.25C18.307 18.652 19 20.66 19 23h2c0-2.722-.807-5.216-2.363-7.046C17.067 14.107 14.785 13 12 13c-2.782 0-5.064 1.097-6.636 2.941C3.806 17.77 3 20.263 3 23h2Z"
          fill="currentColor"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedUserIcon = memo(UserIcon);
MemoizedUserIcon.displayName = "UserIcon";

export { MemoizedUserIcon as UserIcon };
