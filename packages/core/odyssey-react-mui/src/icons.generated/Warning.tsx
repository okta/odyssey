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

export type WarningIconProps = SvgIconNoChildrenProps;

const WarningIcon = forwardRef<SVGSVGElement, WarningIconProps>(
  (props, ref) => {
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
            d="M9.342 2.918c1.123-2.144 4.192-2.144 5.316 0l7.694 14.69C23.398 19.605 21.95 22 19.695 22H4.305c-2.255 0-3.703-2.395-2.657-4.392l7.694-14.69Zm3.544.928a1 1 0 0 0-1.772 0L3.42 18.536A1 1 0 0 0 4.305 20h15.39a1 1 0 0 0 .885-1.464l-7.694-14.69ZM12 15.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5ZM11 13a1 1 0 1 0 2 0V8h-2v5Z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedWarningIcon = memo(WarningIcon);
MemoizedWarningIcon.displayName = "WarningIcon";

export { MemoizedWarningIcon as WarningIcon };
