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

export type LockIconProps = SvgIconNoChildrenProps;

const LockIcon = forwardRef<SVGSVGElement, LockIconProps>((props, ref) => {
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
          d="M5 11h14v7a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-7Zm2-5v3H3v9a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5V9h-4V6A5 5 0 0 0 7 6Zm8 3V6a3 3 0 1 0-6 0v3h6Zm-3 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
          fill="currentColor"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedLockIcon = memo(LockIcon);
MemoizedLockIcon.displayName = "LockIcon";

export { MemoizedLockIcon as LockIcon };
