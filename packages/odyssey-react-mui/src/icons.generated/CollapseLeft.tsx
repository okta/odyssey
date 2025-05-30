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

export type CollapseLeftIconProps = SvgIconNoChildrenProps;

const CollapseLeftIcon = forwardRef<SVGSVGElement, CollapseLeftIconProps>(
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
            d="M2 22V2h2v20H2Zm7.414-9H23v-2H9.414l5.293-5.293-1.414-1.414-6.434 6.434-.017.017c-.084.084-.185.184-.266.28-.094.111-.22.28-.295.513a1.5 1.5 0 0 0 0 .926c.075.233.2.402.295.513.081.096.182.196.266.28l.017.017 6.434 6.434 1.414-1.414L9.414 13Z"
            fill="currentColor"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedCollapseLeftIcon = memo(CollapseLeftIcon);
MemoizedCollapseLeftIcon.displayName = "CollapseLeftIcon";

export { MemoizedCollapseLeftIcon as CollapseLeftIcon };
