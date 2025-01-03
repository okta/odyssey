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

export type UnlockIconProps = SvgIconNoChildrenProps;

const UnlockIcon = forwardRef<SVGSVGElement, UnlockIconProps>((props, ref) => {
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
          d="M9 6v3h12v9a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V9h4V6a5 5 0 0 1 10 0v.5h-2V6a3 3 0 1 0-6 0Zm-4 5v7a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-7H5Zm7 6.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
          fill="currentColor"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedUnlockIcon = memo(UnlockIcon);
MemoizedUnlockIcon.displayName = "UnlockIcon";

export { MemoizedUnlockIcon as UnlockIcon };
