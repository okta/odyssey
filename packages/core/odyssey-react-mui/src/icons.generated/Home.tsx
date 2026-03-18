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

export type HomeIconProps = SvgIconNoChildrenProps;

const HomeIcon = forwardRef<SVGSVGElement, HomeIconProps>((props, ref) => {
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
          d="m8 .436.446.402 6.667 6 .22.198v6.297a2 2 0 0 1-2 2H10v-4.666a2 2 0 1 0-4 0v4.666H2.667a2 2 0 0 1-2-2V7.036l.22-.198 6.667-6L8 .436ZM2 7.63v5.703c0 .368.298.667.667.667h2v-3.333a3.333 3.333 0 1 1 6.666 0V14h2a.667.667 0 0 0 .667-.667V7.63l-6-5.4-6 5.4Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedHomeIcon = memo(HomeIcon);
MemoizedHomeIcon.displayName = "HomeIcon";

export { MemoizedHomeIcon as HomeIcon };
