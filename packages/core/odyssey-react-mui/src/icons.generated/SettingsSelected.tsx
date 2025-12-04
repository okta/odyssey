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

export type SettingsSelectedIconProps = SvgIconNoChildrenProps;

const SettingsSelectedIcon = forwardRef<
  SVGSVGElement,
  SettingsSelectedIconProps
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
          d="M.878 6.244a7.322 7.322 0 0 1 1.887-3.379c.606.32 1.45.367 2.154-.025.742-.414 1.123-1.206 1.099-1.902A7.34 7.34 0 0 1 8 .667a7.34 7.34 0 0 1 1.982.27c-.024.697.357 1.489 1.1 1.903a2.308 2.308 0 0 0 2.153.025 7.321 7.321 0 0 1 1.887 3.379c-.543.363-.96 1.014-.96 1.756s.416 1.393.96 1.756a7.321 7.321 0 0 1-1.887 3.38 2.308 2.308 0 0 0-2.154.024c-.742.415-1.123 1.206-1.099 1.902A7.34 7.34 0 0 1 8 15.333a7.34 7.34 0 0 1-1.982-.27c.024-.697-.357-1.489-1.1-1.903a2.308 2.308 0 0 0-2.153-.025A7.322 7.322 0 0 1 .878 9.756c.543-.363.96-1.014.96-1.756S1.42 6.607.877 6.244ZM8 10.667a2.667 2.667 0 1 0 0-5.334 2.667 2.667 0 0 0 0 5.334Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedSettingsSelectedIcon = memo(SettingsSelectedIcon);
MemoizedSettingsSelectedIcon.displayName = "SettingsSelectedIcon";

export { MemoizedSettingsSelectedIcon as SettingsSelectedIcon };
