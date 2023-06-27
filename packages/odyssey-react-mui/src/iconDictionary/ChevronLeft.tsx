/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
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

import { forwardRef } from "react";
import { SvgIcon } from "./SvgIcon";
import type { SvgIconNoChildrenProps } from "./types";

export type ChevronLeftIconProps = SvgIconNoChildrenProps;

export const ChevronLeftIcon = forwardRef<SVGSVGElement, ChevronLeftIconProps>(
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
            fill="currentColor"
            fillRule="evenodd"
            d="m7.646 10.94 5.647-5.647 1.414 1.414L9.414 12l5.293 5.293-1.414 1.414-5.647-5.646a1.5 1.5 0 0 1 0-2.122Z"
            clipRule="evenodd"
          />
        </>
      </SvgIcon>
    );
  }
);

ChevronLeftIcon.displayName = "ChevronLeftIcon";
