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

export type ListIconProps = SvgIconNoChildrenProps;

export const ListIcon = forwardRef<SVGSVGElement, ListIconProps>(
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
            d="M5 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-2 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm5-7h15v-2H8v2Zm15-6H8V5h15v2ZM8 19h15v-2H8v2Z"
            clipRule="evenodd"
          />
        </>
      </SvgIcon>
    );
  }
);

ListIcon.displayName = "ListIcon";
