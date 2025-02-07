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

export type ArrowLowerLeftIconProps = SvgIconNoChildrenProps;

const ArrowLowerLeftIcon = forwardRef<SVGSVGElement, ArrowLowerLeftIconProps>(
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
            d="m8 14.586 8.293-8.293 1.414 1.414L9.414 16H14v2H7.5A1.5 1.5 0 0 1 6 16.5V10h2v4.586Z"
            fill="currentColor"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedArrowLowerLeftIcon = memo(ArrowLowerLeftIcon);
MemoizedArrowLowerLeftIcon.displayName = "ArrowLowerLeftIcon";

export { MemoizedArrowLowerLeftIcon as ArrowLowerLeftIcon };
