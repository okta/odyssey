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

export type GoogleAuthIconProps = SvgIconNoChildrenProps;

const GoogleAuthIcon = forwardRef<SVGSVGElement, GoogleAuthIconProps>(
  (props, ref) => {
    return (
      <SvgIcon
        fill="none"
        ref={ref}
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <>
          <path
            clipRule="evenodd"
            d="M29.474 18.526a2.526 2.526 0 0 0 0-5.052h-9.098l4.549-7.88a2.526 2.526 0 0 0-4.376-2.526l-8.925 15.458z"
            fill="#1A73E7"
            fillRule="evenodd"
          />
          <path
            clipRule="evenodd"
            d="M11.451 3.068a2.526 2.526 0 1 0-4.376 2.527l4.55 7.879h2.916L16 10.947z"
            fill="#FABB04"
            fillRule="evenodd"
          />
          <path
            clipRule="evenodd"
            d="M14.542 13.474H2.525a2.526 2.526 0 0 0 0 5.052h9.098z"
            fill="#34A753"
            fillRule="evenodd"
          />
          <path
            clipRule="evenodd"
            d="m11.624 18.526-4.549 7.88a2.526 2.526 0 1 0 4.376 2.526l4.55-7.88 4.548 7.88a2.526 2.526 0 0 0 4.376-2.527l-4.55-7.879z"
            fill="#E94335"
            fillRule="evenodd"
          />
          <path
            clipRule="evenodd"
            d="m16 10.947 4.376 7.58h-8.752z"
            fill="#174EA5"
            fillRule="evenodd"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedGoogleAuthIcon = memo(GoogleAuthIcon);
MemoizedGoogleAuthIcon.displayName = "GoogleAuthIcon";

export { MemoizedGoogleAuthIcon as GoogleAuthIcon };
