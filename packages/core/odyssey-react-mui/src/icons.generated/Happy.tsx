/*!
 * Copyright (c) 2026-present, Okta, Inc. and/or its affiliates. All rights reserved.
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

export type HappyIconProps = SvgIconNoChildrenProps;

const HappyIcon = forwardRef<SVGSVGElement, HappyIconProps>((props, ref) => {
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
          d="M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0m1.333 0A7.333 7.333 0 1 1 .667 8a7.333 7.333 0 0 1 14.666 0M6 6.667a.667.667 0 1 0 0-1.334.667.667 0 0 0 0 1.334M10.667 6a.667.667 0 1 1-1.334 0 .667.667 0 0 1 1.334 0M4.766 8.376a.667.667 0 0 1 .857.386l.002.006.018.042q.027.061.09.176c.086.152.22.356.41.558.372.397.956.79 1.857.79s1.485-.393 1.857-.79a3 3 0 0 0 .5-.734l.018-.042.002-.006a.667.667 0 0 1 1.247.472L11 9l.624.235v.002l-.002.003-.004.01-.01.027-.038.085q-.047.107-.141.277c-.126.223-.32.52-.599.817A3.78 3.78 0 0 1 8 11.666a3.78 3.78 0 0 1-2.83-1.21 4.3 4.3 0 0 1-.74-1.094l-.037-.085-.011-.027-.004-.01-.001-.003v-.002h-.001L5 9l-.624.234a.667.667 0 0 1 .39-.858"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedHappyIcon = memo(HappyIcon);
MemoizedHappyIcon.displayName = "HappyIcon";

export { MemoizedHappyIcon as HappyIcon };
