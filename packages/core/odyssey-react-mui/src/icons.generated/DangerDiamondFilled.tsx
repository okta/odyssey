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

export type DangerDiamondFilledIconProps = SvgIconNoChildrenProps;

const DangerDiamondFilledIcon = forwardRef<
  SVGSVGElement,
  DangerDiamondFilledIconProps
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
          d="M6.586 1.138a2 2 0 0 1 2.828 0l5.448 5.448a2 2 0 0 1 0 2.828l-5.448 5.448a2 2 0 0 1-2.828 0L1.138 9.414a2 2 0 0 1 0-2.828l5.448-5.448ZM8 8.667A.667.667 0 0 1 7.333 8V4.667h1.334V8A.667.667 0 0 1 8 8.667Zm0 1.166A.833.833 0 1 0 8 11.5a.833.833 0 0 0 0-1.667Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedDangerDiamondFilledIcon = memo(DangerDiamondFilledIcon);
MemoizedDangerDiamondFilledIcon.displayName = "DangerDiamondFilledIcon";

export { MemoizedDangerDiamondFilledIcon as DangerDiamondFilledIcon };
