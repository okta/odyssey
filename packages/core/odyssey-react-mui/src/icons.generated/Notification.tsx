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

export type NotificationIconProps = SvgIconNoChildrenProps;

const NotificationIcon = forwardRef<SVGSVGElement, NotificationIconProps>(
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
            d="M8 .667c-2.97 0-5.313 2.37-5.576 5.266-.198 2.19-.529 4.171-1.06 5.868l-.272.866h3.639A3.303 3.303 0 0 0 8 15.333a3.303 3.303 0 0 0 3.269-2.666h3.639l-.272-.866c-.531-1.697-.862-3.679-1.06-5.868C13.313 3.038 10.97.667 8 .667Zm1.891 12H6.11A1.97 1.97 0 0 0 8 14a1.97 1.97 0 0 0 1.891-1.333ZM3.752 6.053C3.958 3.781 5.782 2 8 2c2.218 0 4.042 1.78 4.248 4.053.171 1.894.443 3.676.866 5.28H2.886c.423-1.604.695-3.386.866-5.28Z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedNotificationIcon = memo(NotificationIcon);
MemoizedNotificationIcon.displayName = "NotificationIcon";

export { MemoizedNotificationIcon as NotificationIcon };
