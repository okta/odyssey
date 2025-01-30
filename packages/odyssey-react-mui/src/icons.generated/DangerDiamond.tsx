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

export type DangerDiamondIconProps = SvgIconNoChildrenProps;

const DangerDiamondIcon = forwardRef<SVGSVGElement, DangerDiamondIconProps>(
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
            d="M14.121 1.707a3 3 0 0 0-4.242 0L1.707 9.88a3 3 0 0 0 0 4.242l8.172 8.172a3 3 0 0 0 4.242 0l8.172-8.172a3 3 0 0 0 0-4.242L14.12 1.707Zm-2.828 1.414a1 1 0 0 1 1.414 0l8.172 8.172a1 1 0 0 1 0 1.414l-8.172 8.172a1 1 0 0 1-1.414 0L3.12 12.707a1 1 0 0 1 0-1.414l8.172-8.172ZM12 13a1 1 0 0 1-1-1V7h2v5a1 1 0 0 1-1 1Zm0 1.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z"
            fill="currentColor"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedDangerDiamondIcon = memo(DangerDiamondIcon);
MemoizedDangerDiamondIcon.displayName = "DangerDiamondIcon";

export { MemoizedDangerDiamondIcon as DangerDiamondIcon };
