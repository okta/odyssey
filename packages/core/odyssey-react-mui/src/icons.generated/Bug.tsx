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

export type BugIconProps = SvgIconNoChildrenProps;

const BugIcon = forwardRef<SVGSVGElement, BugIconProps>((props, ref) => {
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
          d="M17 16V8h-4v12.9a5.002 5.002 0 0 0 4-4.9Zm-6-8H7v8a5.002 5.002 0 0 0 4 4.9V8ZM5 8v4.382l-3.447 1.724.894 1.788L5 14.618V16c0 1.05.231 2.046.646 2.94l-2.353 2.353 1.414 1.414 2.059-2.059A6.983 6.983 0 0 0 12 23a6.983 6.983 0 0 0 5.234-2.352l2.059 2.06 1.414-1.415-2.353-2.353c.415-.894.646-1.89.646-2.94v-1.382l2.553 1.276.894-1.788L19 12.382V8h4V6h-6A5 5 0 0 0 7 6H1v2h4Zm4-2h6a3 3 0 1 0-6 0Z"
          fill="currentColor"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedBugIcon = memo(BugIcon);
MemoizedBugIcon.displayName = "BugIcon";

export { MemoizedBugIcon as BugIcon };
