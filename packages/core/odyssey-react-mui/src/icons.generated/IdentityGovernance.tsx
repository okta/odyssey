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

export type IdentityGovernanceIconProps = SvgIconNoChildrenProps;

const IdentityGovernanceIcon = forwardRef<
  SVGSVGElement,
  IdentityGovernanceIconProps
>((props, ref) => {
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
          d="m9.667 6.61-1.74 1.739a4 4 0 1 1-.943-.943l1.74-1.74.471-.47 2.334-2.334L12 2.39l.862-.862.943.942-.862.862 1.528 1.529.472.471-.472.472-2.333 2.333-.471.471-.472-.47-1.528-1.53Zm.943-.943 1.057 1.057 1.39-1.39L12 4.275l-1.39 1.39Zm-5.943 7.666a2.667 2.667 0 1 0 0-5.333 2.667 2.667 0 0 0 0 5.333Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedIdentityGovernanceIcon = memo(IdentityGovernanceIcon);
MemoizedIdentityGovernanceIcon.displayName = "IdentityGovernanceIcon";

export { MemoizedIdentityGovernanceIcon as IdentityGovernanceIcon };
