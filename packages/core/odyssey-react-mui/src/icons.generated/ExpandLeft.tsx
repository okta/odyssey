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

export type ExpandLeftIconProps = SvgIconNoChildrenProps;

const ExpandLeftIcon = forwardRef<SVGSVGElement, ExpandLeftIconProps>(
  (props, ref) => {
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
            d="M1.333 14.667V1.333h1.334v13.334H1.333Zm11.724-6H4V7.333h9.057L9.53 3.805l.942-.943 4.29 4.29.01.01c.057.057.124.124.178.187a1 1 0 0 1 .197.342 1 1 0 0 1 0 .618 1 1 0 0 1-.197.342c-.054.063-.121.13-.177.187l-.011.01-4.29 4.29-.942-.943 3.528-3.528Z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedExpandLeftIcon = memo(ExpandLeftIcon);
MemoizedExpandLeftIcon.displayName = "ExpandLeftIcon";

export { MemoizedExpandLeftIcon as ExpandLeftIcon };
