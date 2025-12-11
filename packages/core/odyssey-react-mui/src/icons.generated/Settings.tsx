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

export type SettingsIconProps = SvgIconNoChildrenProps;

const SettingsIcon = forwardRef<SVGSVGElement, SettingsIconProps>(
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
            d="M3.17 8c0-.834-.308-1.578-.773-2.152.2-.521.472-1.008.803-1.449.766.132 1.61.028 2.369-.395a3.492 3.492 0 0 0 1.609-1.948 6.065 6.065 0 0 1 1.644 0c.26.779.805 1.5 1.61 1.948l.632-1.133-.633 1.133a3.607 3.607 0 0 0 2.37.395c.33.44.601.928.802 1.45A3.415 3.415 0 0 0 12.829 8c0 .834.31 1.578.774 2.152A5.985 5.985 0 0 1 12.8 11.6a3.607 3.607 0 0 0-2.369.395 3.492 3.492 0 0 0-1.609 1.948 6.065 6.065 0 0 1-1.644 0 3.49 3.49 0 0 0-1.61-1.948A3.607 3.607 0 0 0 3.2 11.6a5.986 5.986 0 0 1-.803-1.45A3.415 3.415 0 0 0 3.171 8ZM8 .667a7.34 7.34 0 0 0-1.982.27c.024.697-.357 1.489-1.1 1.903a2.308 2.308 0 0 1-2.153.025A7.322 7.322 0 0 0 .878 6.244c.543.363.96 1.014.96 1.756S1.42 9.393.877 9.756a7.322 7.322 0 0 0 1.887 3.38 2.308 2.308 0 0 1 2.154.024c.742.415 1.123 1.206 1.099 1.902A7.34 7.34 0 0 0 8 15.333a7.34 7.34 0 0 0 1.982-.27c-.024-.697.357-1.489 1.1-1.903a2.308 2.308 0 0 1 2.153-.025 7.321 7.321 0 0 0 1.887-3.379c-.543-.363-.96-1.014-.96-1.756s.416-1.393.96-1.756a7.321 7.321 0 0 0-1.887-3.38c-.606.32-1.45.368-2.154-.024-.742-.414-1.123-1.206-1.099-1.902A7.34 7.34 0 0 0 8 .667ZM6.667 8a1.333 1.333 0 1 1 2.666 0 1.333 1.333 0 0 1-2.666 0ZM8 5.333a2.667 2.667 0 1 0 0 5.334 2.667 2.667 0 0 0 0-5.334Z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedSettingsIcon = memo(SettingsIcon);
MemoizedSettingsIcon.displayName = "SettingsIcon";

export { MemoizedSettingsIcon as SettingsIcon };
