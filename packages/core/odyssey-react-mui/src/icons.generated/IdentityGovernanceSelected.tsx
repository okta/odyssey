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

export type IdentityGovernanceSelectedIconProps = SvgIconNoChildrenProps;

const IdentityGovernanceSelectedIcon = forwardRef<
  SVGSVGElement,
  IdentityGovernanceSelectedIconProps
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
          d="m12.943 3.333 1.528 1.529.472.471-.472.472-2.333 2.333-.471.472-.472-.472L9.667 6.61l-1.74 1.739a4 4 0 1 1-.943-.943l1.74-1.74.471-.47 2.334-2.334.471-.471.862-.862.943.942-.862.862Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedIdentityGovernanceSelectedIcon = memo(
  IdentityGovernanceSelectedIcon,
);
MemoizedIdentityGovernanceSelectedIcon.displayName =
  "IdentityGovernanceSelectedIcon";

export { MemoizedIdentityGovernanceSelectedIcon as IdentityGovernanceSelectedIcon };
