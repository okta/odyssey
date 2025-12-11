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

export type PasswordIconProps = SvgIconNoChildrenProps;

const PasswordIcon = forwardRef<SVGSVGElement, PasswordIconProps>(
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
            d="M9.724 2H2.483v7.233"
            stroke="currentColor"
            strokeWidth={1.5}
          />
          <path
            d="M9.724 30H2.483v-7.233"
            stroke="currentColor"
            strokeWidth={1.5}
          />
          <path
            d="M22.297 2h7.241v7.233"
            stroke="currentColor"
            strokeWidth={1.5}
          />
          <path
            d="M22.297 30h7.241v-7.233"
            stroke="currentColor"
            strokeWidth={1.5}
          />
          <path
            d="M4.414 13.116v2.893m0 2.893v-2.893m0 0 2.414-1.447M4.414 16.01l2.414 1.446M4.414 16.01 2 17.455m2.414-1.446L2 14.562"
            stroke="currentColor"
            strokeWidth={1.5}
          />
          <path
            d="M12.138 13.116v2.893m0 2.893v-2.893m0 0 2.414-1.447m-2.414 1.447 2.414 1.446m-2.414-1.446-2.414 1.446m2.414-1.446-2.414-1.447"
            stroke="currentColor"
            strokeWidth={1.5}
          />
          <path
            d="M19.862 13.116v2.893m0 2.893v-2.893m0 0 2.414-1.447m-2.414 1.447 2.414 1.446m-2.414-1.446-2.414 1.446m2.414-1.446-2.414-1.447"
            stroke="currentColor"
            strokeWidth={1.5}
          />
          <path
            d="M27.586 13.116v2.893m0 2.893v-2.893m0 0L30 14.562m-2.414 1.447L30 17.455m-2.414-1.446-2.414 1.446m2.414-1.446-2.414-1.447"
            stroke="currentColor"
            strokeWidth={1.5}
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedPasswordIcon = memo(PasswordIcon);
MemoizedPasswordIcon.displayName = "PasswordIcon";

export { MemoizedPasswordIcon as PasswordIcon };
