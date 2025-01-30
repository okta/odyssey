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
            d="M2 22V2h2v20H2Zm17.586-9H6v-2h13.586l-5.293-5.293 1.414-1.414 6.434 6.434.017.017c.084.084.185.184.266.28.094.111.22.28.296.513a1.5 1.5 0 0 1 0 .926 1.506 1.506 0 0 1-.296.513 4.876 4.876 0 0 1-.266.28l-.017.017-6.434 6.434-1.414-1.414L19.586 13Z"
            fill="currentColor"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedExpandLeftIcon = memo(ExpandLeftIcon);
MemoizedExpandLeftIcon.displayName = "ExpandLeftIcon";

export { MemoizedExpandLeftIcon as ExpandLeftIcon };
