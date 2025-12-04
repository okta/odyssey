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

export type DownloadIconProps = SvgIconNoChildrenProps;

const DownloadIcon = forwardRef<SVGSVGElement, DownloadIconProps>(
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
            d="M3.333 13.333v-2.666H2v2.666a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2.666h-1.333v2.666A.667.667 0 0 1 12 14H4a.667.667 0 0 1-.667-.667Zm8.862-7L8.667 9.862V.805H7.334v9.057l-3.53-3.529-.942.943 4.29 4.29.01.01c.057.057.124.124.188.178a.994.994 0 0 0 .341.197 1 1 0 0 0 .618 0 1 1 0 0 0 .342-.197 3.26 3.26 0 0 0 .187-.177l.01-.011 4.29-4.29-.943-.943Z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedDownloadIcon = memo(DownloadIcon);
MemoizedDownloadIcon.displayName = "DownloadIcon";

export { MemoizedDownloadIcon as DownloadIcon };
