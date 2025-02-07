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

export type OneTimePasswordIconProps = SvgIconNoChildrenProps;

const OneTimePasswordIcon = forwardRef<SVGSVGElement, OneTimePasswordIconProps>(
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
            d="M6.453 23.465A11 11 0 0 1 8.12 6.54m0 0a11 11 0 0 1 6.111-1.854M8.121 6.54 6.265 4.686m7.965 0a11 11 0 0 1 6.112 1.854M14.23 4.686v-3h-2.5 5m3.612 4.854a11 11 0 0 1 1.666 16.925M20.343 6.54l1.853-1.854"
            stroke="currentColor"
            strokeWidth={1.5}
          />
          <path
            d="M14.231 9.186v5.5h5.5"
            stroke="currentColor"
            strokeWidth={1.5}
          />
          <path
            d="M10.231 24.678v3m0 3v-3m0 0 2.5-1.5m-2.5 1.5-2.5 1.5m2.5-1.5-2.5-1.5m2.5 1.5 2.5 1.5"
            stroke="currentColor"
            strokeWidth={1.5}
          />
          <path
            d="M26.269 24.678v3m0 3v-3m0 0 2.5-1.5m-2.5 1.5-2.5 1.5m2.5-1.5-2.5-1.5m2.5 1.5 2.5 1.5"
            stroke="currentColor"
            strokeWidth={1.5}
          />
          <path
            d="M18.25 24.678v3m0 3v-3m0 0 2.5-1.5m-2.5 1.5-2.5 1.5m2.5-1.5-2.5-1.5m2.5 1.5 2.5 1.5"
            stroke="currentColor"
            strokeWidth={1.5}
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedOneTimePasswordIcon = memo(OneTimePasswordIcon);
MemoizedOneTimePasswordIcon.displayName = "OneTimePasswordIcon";

export { MemoizedOneTimePasswordIcon as OneTimePasswordIcon };
