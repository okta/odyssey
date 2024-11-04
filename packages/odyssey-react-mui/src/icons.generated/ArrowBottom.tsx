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

export type ArrowBottomIconProps = SvgIconNoChildrenProps;

const ArrowBottomIcon = forwardRef<SVGSVGElement, ArrowBottomIconProps>(
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
            d="M12 13.334H4v1.334h8v-1.334Zm-.195-4.195-3.098 3.098a1 1 0 0 1-1.414 0L4.195 9.139l.943-.943 2.195 2.195V3.334h1.334v7.057l2.195-2.195.943.943Z"
            fill="currentColor"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedArrowBottomIcon = memo(ArrowBottomIcon);
MemoizedArrowBottomIcon.displayName = "ArrowBottomIcon";

export { MemoizedArrowBottomIcon as ArrowBottomIcon };
