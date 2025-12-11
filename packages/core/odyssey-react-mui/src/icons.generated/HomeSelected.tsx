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

export type HomeSelectedIconProps = SvgIconNoChildrenProps;

const HomeSelectedIcon = forwardRef<SVGSVGElement, HomeSelectedIconProps>(
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
            d="M14.667 13.333v-6L8 1.333l-6.667 6v6c0 .737.597 1.334 1.334 1.334h2.666v-4a2.667 2.667 0 0 1 5.334 0v4h2.666c.737 0 1.334-.597 1.334-1.334Z"
            fill="currentColor"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedHomeSelectedIcon = memo(HomeSelectedIcon);
MemoizedHomeSelectedIcon.displayName = "HomeSelectedIcon";

export { MemoizedHomeSelectedIcon as HomeSelectedIcon };
