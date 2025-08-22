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

export type YubikeyIconProps = SvgIconNoChildrenProps;

const YubikeyIcon = forwardRef<SVGSVGElement, YubikeyIconProps>(
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
            d="M32 21.672h-2.11l-3.828-8.924-3.67 8.936h-2.121l4.815-11.397h1.987L32 21.672ZM8.52 13.608c-.035-2.007-1.583-3.405-3.772-3.405H0V21.66h1.729v-9.784h2.918c.976 0 2.031.513 2.043 1.744.01 1.099-.797 1.78-2.167 1.84h-.022l-1.044.012 3.48 6.2h2.042s-1.672-2.999-2.727-4.874c1.538-.586 2.278-1.876 2.267-3.19Zm6.823 1.302c-1.818-.514-2.525-.956-2.525-1.84 0-1.338 1.627-1.47 2.2-1.47.92 0 2.076.312 2.761.67l.74-1.458c-.93-.49-2.356-.812-3.546-.812-2.537 0-4.12 1.17-4.12 3.166 0 2.282 2.234 2.927 3.974 3.417 1.807.513 2.447 1.099 2.447 1.995 0 1.481-1.482 1.708-2.402 1.708-1.257 0-2.301-.358-3.311-.992l-.864 1.482c1.28.8 2.604 1.17 4.175 1.17 2.615 0 4.355-1.373 4.355-3.5.011-2.377-2.11-3.034-3.884-3.536Z"
            fill="currentColor"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedYubikeyIcon = memo(YubikeyIcon);
MemoizedYubikeyIcon.displayName = "YubikeyIcon";

export { MemoizedYubikeyIcon as YubikeyIcon };
