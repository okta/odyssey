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

export type OktaVerifyIconProps = SvgIconNoChildrenProps;

const OktaVerifyIcon = forwardRef<SVGSVGElement, OktaVerifyIconProps>(
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
            d="M23.886 14.98a7.953 7.953 0 1 1-2.033-4.364L16 16.443l-2.849-2.836a1.165 1.165 0 0 0-1.604 0 1.12 1.12 0 0 0-.332.799c0 .301.118.585.332.798l3.65 3.634c.215.214.5.331.803.331.298 0 .59-.12.802-.33L29.009 6.684a16.093 16.093 0 0 0-1.451-1.749A15.953 15.953 0 0 0 16 0C7.164 0 0 7.163 0 16s7.164 16 16 16c8.837 0 16-7.163 16-16 0-2.642-.642-5.133-1.776-7.33l-6.338 6.31Z"
            fill="currentColor"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedOktaVerifyIcon = memo(OktaVerifyIcon);
MemoizedOktaVerifyIcon.displayName = "OktaVerifyIcon";

export { MemoizedOktaVerifyIcon as OktaVerifyIcon };
