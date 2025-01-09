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

export type SettingsIconProps = SvgIconNoChildrenProps;

const SettingsIcon = forwardRef<SVGSVGElement, SettingsIconProps>(
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
            d="M4.756 12a5.13 5.13 0 0 0-1.16-3.228A8.98 8.98 0 0 1 4.8 6.6a5.411 5.411 0 0 0 3.553-.593 5.238 5.238 0 0 0 2.414-2.922 9.098 9.098 0 0 1 2.466 0 5.238 5.238 0 0 0 2.414 2.922A5.411 5.411 0 0 0 19.2 6.6c.497.66.904 1.391 1.204 2.173A5.123 5.123 0 0 0 19.244 12a5.13 5.13 0 0 0 1.16 3.228A8.978 8.978 0 0 1 19.2 17.4a5.41 5.41 0 0 0-3.553.593l.84 1.505-.84-1.505a5.238 5.238 0 0 0-2.414 2.922 9.088 9.088 0 0 1-2.466 0 5.238 5.238 0 0 0-2.414-2.922A5.41 5.41 0 0 0 4.8 17.4a8.979 8.979 0 0 1-1.204-2.173A5.123 5.123 0 0 0 4.756 12ZM1.317 9.366a10.983 10.983 0 0 1 2.83-5.069c.91.48 2.176.552 3.231-.037 1.114-.622 1.685-1.81 1.648-2.853A11.009 11.009 0 0 1 12 1a11 11 0 0 1 2.973.407c-.036 1.044.535 2.231 1.649 2.853 1.055.589 2.32.516 3.231.037a10.983 10.983 0 0 1 2.83 5.069c-.815.545-1.44 1.52-1.44 2.634 0 1.113.625 2.089 1.44 2.634a10.983 10.983 0 0 1-2.83 5.069c-.91-.48-2.176-.552-3.231.037-1.114.622-1.685 1.81-1.649 2.853A11.01 11.01 0 0 1 12 23c-1.03 0-2.028-.142-2.974-.407.037-1.044-.534-2.231-1.648-2.853-1.055-.589-2.32-.516-3.231-.037a10.983 10.983 0 0 1-2.83-5.07c.815-.544 1.439-1.52 1.439-2.633s-.624-2.089-1.439-2.634ZM10 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
            fill="currentColor"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedSettingsIcon = memo(SettingsIcon);
MemoizedSettingsIcon.displayName = "SettingsIcon";

export { MemoizedSettingsIcon as SettingsIcon };
