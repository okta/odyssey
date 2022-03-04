/*!
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

// Code automatically generated by svgr; DO NOT EDIT.

import React, { forwardRef } from "react";
import { useOmit } from "../../utils";
import { SvgIcon } from "./SvgIcon";
import type { SvgIconNoChildrenProps } from "./types";

export type UserIconProps = SvgIconNoChildrenProps;

export const UserIcon = forwardRef<SVGSVGElement, UserIconProps>(
  (props, ref) => {
    const omitProps = useOmit(props);
    return (
      <SvgIcon ref={ref} {...omitProps}>
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 3V5C10 6.10457 9.10457 7 8 7C6.89543 7 6 6.10457 6 5V3C6 1.89543 6.89543 1 8 1C9.10457 1 10 1.89543 10 3ZM5 3C5 1.34315 6.34315 0 8 0C9.65685 0 11 1.34315 11 3V5C11 6.65685 9.65685 8 8 8C6.34315 8 5 6.65685 5 5V3ZM4.1305 10.0742C4.26803 10.0181 4.459 10 5.41376 10H10.5862C11.541 10 11.732 10.0181 11.8695 10.0742C12.0299 10.1398 12.1706 10.2459 12.2777 10.3821C12.3695 10.4989 12.4393 10.6776 12.7016 11.5956L13.6743 15H2.32573L3.29841 11.5956C3.5607 10.6776 3.63054 10.4989 3.72233 10.3821C3.82941 10.2459 3.97006 10.1398 4.1305 10.0742ZM13.6631 11.3209L14.7143 15L15 16H13.96H2.04002H1L1.28571 15L2.33689 11.3209C2.57458 10.489 2.69343 10.073 2.93606 9.76423C3.15022 9.49171 3.43152 9.27953 3.75239 9.14848C4.11592 9 4.54854 9 5.41376 9H10.5862C11.4515 9 11.8841 9 12.2476 9.14848C12.5685 9.27953 12.8498 9.49171 13.0639 9.76423C13.3066 10.073 13.4254 10.489 13.6631 11.3209Z"
            fill="currentColor"
          />
        </svg>
      </SvgIcon>
    );
  }
);

UserIcon.displayName = "UserIcon";
