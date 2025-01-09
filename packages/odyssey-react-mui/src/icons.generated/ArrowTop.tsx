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
import { SvgIcon, type SvgIconNoChildrenProps } from "../SvgIcon";

export type ArrowTopIconProps = SvgIconNoChildrenProps;

const ArrowTopIcon = forwardRef<SVGSVGElement, ArrowTopIconProps>(
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
            d="M4 2.667h8V1.334H4v1.333Zm.195 4.196 3.098-3.098a1 1 0 0 1 1.414 0l3.098 3.098-.943.942L8.667 5.61v7.057H7.333V5.61L5.138 7.805l-.943-.942Z"
            fill="currentColor"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedArrowTopIcon = memo(ArrowTopIcon);
MemoizedArrowTopIcon.displayName = "ArrowTopIcon";

export { MemoizedArrowTopIcon as ArrowTopIcon };
