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
import { SvgIcon, type SvgIconNoChildrenProps } from "../SvgIcon";

export type NotificationIconProps = SvgIconNoChildrenProps;

const NotificationIcon = forwardRef<SVGSVGElement, NotificationIconProps>(
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
            d="M12 1C7.544 1 4.03 4.556 3.637 8.899c-.298 3.284-.794 6.258-1.591 8.802L1.639 19h5.458c.454 2.302 2.454 4 4.903 4 2.45 0 4.448-1.698 4.903-4h5.458l-.407-1.3c-.797-2.543-1.293-5.517-1.59-8.801C19.968 4.556 16.455 1 12 1Zm2.837 18H9.163c.402 1.179 1.502 2 2.837 2 1.335 0 2.435-.821 2.837-2ZM5.628 9.08C5.938 5.67 8.673 3 12 3s6.062 2.671 6.372 6.08c.257 2.84.664 5.513 1.3 7.92H4.328c.636-2.407 1.043-5.08 1.3-7.92Z"
            fill="currentColor"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedNotificationIcon = memo(NotificationIcon);
MemoizedNotificationIcon.displayName = "NotificationIcon";

export { MemoizedNotificationIcon as NotificationIcon };
