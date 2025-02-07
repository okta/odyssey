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

export type WarningFilledIconProps = SvgIconNoChildrenProps;

const WarningFilledIcon = forwardRef<SVGSVGElement, WarningFilledIconProps>(
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
            d="M9.342 2.918c1.123-2.144 4.192-2.144 5.315 0l7.695 14.69C23.398 19.605 21.95 22 19.695 22H4.305c-2.255 0-3.703-2.395-2.657-4.392l7.694-14.69ZM12 14a1 1 0 0 1-1-1V8h2v5a1 1 0 0 1-1 1Zm0 1.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z"
            fill="currentColor"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedWarningFilledIcon = memo(WarningFilledIcon);
MemoizedWarningFilledIcon.displayName = "WarningFilledIcon";

export { MemoizedWarningFilledIcon as WarningFilledIcon };
