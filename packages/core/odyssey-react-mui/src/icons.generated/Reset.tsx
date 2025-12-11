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

export type ResetIconProps = SvgIconNoChildrenProps;

const ResetIcon = forwardRef<SVGSVGElement, ResetIconProps>((props, ref) => {
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
          d="M2 8a6 6 0 0 1 10.99-3.333h-2.323V6h3.482c.08 0 .174 0 .258-.007.096-.008.235-.028.38-.102a1 1 0 0 0 .437-.437 1.01 1.01 0 0 0 .103-.38c.006-.084.006-.18.006-.259V1.333H14v2.45A7.333 7.333 0 1 0 15.333 8H14A6 6 0 0 1 2 8Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedResetIcon = memo(ResetIcon);
MemoizedResetIcon.displayName = "ResetIcon";

export { MemoizedResetIcon as ResetIcon };
