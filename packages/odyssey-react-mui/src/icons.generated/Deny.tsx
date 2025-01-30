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

export type DenyIconProps = SvgIconNoChildrenProps;

const DenyIcon = forwardRef<SVGSVGElement, DenyIconProps>((props, ref) => {
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
          d="M3 12a9 9 0 0 1 14.618-7.032l-12.65 12.65A8.962 8.962 0 0 1 3 12Zm3.382 7.032a9 9 0 0 0 12.65-12.65l-12.65 12.65ZM12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1Z"
          fill="currentColor"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedDenyIcon = memo(DenyIcon);
MemoizedDenyIcon.displayName = "DenyIcon";

export { MemoizedDenyIcon as DenyIcon };
