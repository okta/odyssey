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

export type AddCircleIconProps = SvgIconNoChildrenProps;

const AddCircleIcon = forwardRef<SVGSVGElement, AddCircleIconProps>(
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
            d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12Zm10-1V8h2v3h3v2h-3v3h-2v-3H8v-2h3Z"
            fill="currentColor"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedAddCircleIcon = memo(AddCircleIcon);
MemoizedAddCircleIcon.displayName = "AddCircleIcon";

export { MemoizedAddCircleIcon as AddCircleIcon };
