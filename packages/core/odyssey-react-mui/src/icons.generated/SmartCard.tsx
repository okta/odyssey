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

export type SmartCardIconProps = SvgIconNoChildrenProps;

const SmartCardIcon = forwardRef<SVGSVGElement, SmartCardIconProps>(
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
            d="M22 3H10a3 3 0 0 0-3 3v20a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3Z"
            stroke="currentColor"
            strokeWidth={1.5}
          />
          <path
            d="M22 3H10a3 3 0 0 0-3 3v20a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3Z"
            stroke="currentColor"
            strokeWidth={1.5}
          />
          <path
            d="M15 7h4m-4 2.5h6M15 12h6"
            stroke="currentColor"
            strokeWidth={1.5}
          />
          <path
            d="M15 7h4m-4 2.5h6M15 12h6"
            stroke="currentColor"
            strokeWidth={1.5}
          />
          <path
            d="M16 21.5v-3a.5.5 0 0 0-.5-.5h-2m2.5 3.5h-2.5m2.5 0v3a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-3m0 0v-3a.5.5 0 0 1 .5-.5h2M11 21.5h2.5m0 0V18"
            stroke="currentColor"
            strokeWidth={1.5}
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedSmartCardIcon = memo(SmartCardIcon);
MemoizedSmartCardIcon.displayName = "SmartCardIcon";

export { MemoizedSmartCardIcon as SmartCardIcon };
