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
            d="M5 20v-4H3v4a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-4h-2v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1ZM18.293 9.5 13 14.793V1.207h-2v13.586L5.707 9.5l-1.414 1.414 6.434 6.435.017.016c.084.084.184.185.28.266.111.095.28.22.513.296a1.5 1.5 0 0 0 .927 0c.232-.076.401-.201.512-.296.096-.081.196-.182.28-.266l.017-.016 6.434-6.435L18.293 9.5Z"
            fill="currentColor"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedDownloadIcon = memo(DownloadIcon);
MemoizedDownloadIcon.displayName = "DownloadIcon";

export { MemoizedDownloadIcon as DownloadIcon };
