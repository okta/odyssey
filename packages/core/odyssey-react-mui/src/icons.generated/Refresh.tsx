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

export type RefreshIconProps = SvgIconNoChildrenProps;

const RefreshIcon = forwardRef<SVGSVGElement, RefreshIconProps>(
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
            clipRule="evenodd"
            d="M8 2a6 6 0 0 0-6 6H.667A7.333 7.333 0 0 1 14 3.783v-2.45h1.333v3.482c0 .08 0 .175-.006.258a1.004 1.004 0 0 1-.103.381 1 1 0 0 1-.437.437 1.005 1.005 0 0 1-.38.102C14.323 6 14.228 6 14.149 6h-3.482V4.667h2.323A5.994 5.994 0 0 0 8 2Zm0 12a6 6 0 0 0 6-6h1.333A7.333 7.333 0 0 1 2 12.217v2.45H.667v-3.482c0-.08 0-.175.006-.258a1.01 1.01 0 0 1 .103-.381 1 1 0 0 1 .437-.437c.145-.074.284-.094.38-.102.084-.007.179-.007.258-.007h3.482v1.333H3.01A5.994 5.994 0 0 0 8 14Z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedRefreshIcon = memo(RefreshIcon);
MemoizedRefreshIcon.displayName = "RefreshIcon";

export { MemoizedRefreshIcon as RefreshIcon };
