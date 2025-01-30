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
            d="M12 3a9 9 0 0 0-9 9H1C1 5.925 5.925 1 12 1c3.722 0 7.01 1.848 9 4.674V2h2v5.223c0 .12 0 .262-.01.387a1.508 1.508 0 0 1-.153.571 1.5 1.5 0 0 1-.656.656 1.507 1.507 0 0 1-.571.153c-.125.01-.268.01-.387.01H16V7h3.485A8.991 8.991 0 0 0 12 3Zm0 18a9 9 0 0 0 9-9h2c0 6.075-4.925 11-11 11-3.722 0-7.01-1.848-9-4.674V22H1v-5.223c0-.12 0-.262.01-.387a1.51 1.51 0 0 1 .153-.571 1.5 1.5 0 0 1 .656-.655c.218-.112.426-.142.571-.154.125-.01.268-.01.387-.01H8v2H4.515A8.991 8.991 0 0 0 12 21Z"
            fill="currentColor"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedRefreshIcon = memo(RefreshIcon);
MemoizedRefreshIcon.displayName = "RefreshIcon";

export { MemoizedRefreshIcon as RefreshIcon };
