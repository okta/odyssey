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

export type GroupIconProps = SvgIconNoChildrenProps;

const GroupIcon = forwardRef<SVGSVGElement, GroupIconProps>((props, ref) => {
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
          d="M12.667 4.333a1.667 1.667 0 1 1-3.334 0 1.667 1.667 0 0 1 3.334 0Zm1.333 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.667 7.667a1.667 1.667 0 1 1-3.334 0 1.667 1.667 0 0 1 3.334 0Zm1.333 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-3 5c-1.205 0-2.32 1.163-2.333 2.673l-1.334-.013c.02-2.08 1.579-3.994 3.667-3.994 2.09 0 3.654 1.907 3.667 3.996l-1.334.008c-.008-1.511-1.122-2.67-2.333-2.67Zm3.722-1.206c.245-1.25 1.225-2.128 2.278-2.128 1.207 0 2.325 1.16 2.333 2.67l1.334-.007C14.655 9.906 13.086 8 11 8c-1.823 0-3.247 1.47-3.586 3.205-.05.256-.078.52-.08.789l1.333.012c.001-.186.02-.368.055-.545Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedGroupIcon = memo(GroupIcon);
MemoizedGroupIcon.displayName = "GroupIcon";

export { MemoizedGroupIcon as GroupIcon };
