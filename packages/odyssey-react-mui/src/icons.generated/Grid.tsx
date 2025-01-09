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

export type GridIconProps = SvgIconNoChildrenProps;

const GridIcon = forwardRef<SVGSVGElement, GridIconProps>((props, ref) => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <>
        <circle cx={5} cy={5} r={2} fill="currentColor" />
        <circle cx={5} cy={12} r={2} fill="currentColor" />
        <circle cx={5} cy={19} r={2} fill="currentColor" />
        <circle cx={12} cy={5} r={2} fill="currentColor" />
        <circle cx={12} cy={12} r={2} fill="currentColor" />
        <circle cx={12} cy={19} r={2} fill="currentColor" />
        <circle cx={19} cy={5} r={2} fill="currentColor" />
        <circle cx={19} cy={12} r={2} fill="currentColor" />
        <circle cx={19} cy={19} r={2} fill="currentColor" />
      </>
    </SvgIcon>
  );
});

const MemoizedGridIcon = memo(GridIcon);
MemoizedGridIcon.displayName = "GridIcon";

export { MemoizedGridIcon as GridIcon };
