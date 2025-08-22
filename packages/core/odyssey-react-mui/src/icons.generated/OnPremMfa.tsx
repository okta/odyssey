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
import { SvgIcon, type SvgIconNoChildrenProps } from "../SvgIcon.js";

export type OnPremMfaIconProps = SvgIconNoChildrenProps;

const OnPremMfaIcon = forwardRef<SVGSVGElement, OnPremMfaIconProps>(
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
            d="M22.5 12h8v8h-8m0-8v8m0-8V9h-14c-2 0-7 1.5-7 7s5 7 7 7h14v-3"
            stroke="currentColor"
            strokeWidth={1.5}
          />
          <circle
            cx={7.55066}
            cy={15.9698}
            r={2.80579}
            stroke="currentColor"
            strokeWidth={1.5}
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedOnPremMfaIcon = memo(OnPremMfaIcon);
MemoizedOnPremMfaIcon.displayName = "OnPremMfaIcon";

export { MemoizedOnPremMfaIcon as OnPremMfaIcon };
