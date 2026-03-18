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

export type SameIconProps = SvgIconNoChildrenProps;

const SameIcon = forwardRef<SVGSVGElement, SameIconProps>((props, ref) => {
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
          d="M8 1.997A6.004 6.004 0 1 0 14.004 8 6.003 6.003 0 0 0 8 1.997ZM.665 8A7.334 7.334 0 0 1 8 .666a7.334 7.334 0 1 1 0 14.668A7.334 7.334 0 0 1 .665 8Zm10.298-.719H5.037v-1.33h5.926v1.33ZM5.037 10.05h5.926V8.72H5.037v1.33Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedSameIcon = memo(SameIcon);
MemoizedSameIcon.displayName = "SameIcon";

export { MemoizedSameIcon as SameIcon };
