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

export type ReportsIconProps = SvgIconNoChildrenProps;

const ReportsIcon = forwardRef<SVGSVGElement, ReportsIconProps>(
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
            d="M10.25 1.333h-.667v3.334H5.125V8H.667v3.094c0 .49 0 .898.027 1.231.028.347.09.67.245.977a2.5 2.5 0 0 0 1.093 1.092c.305.156.63.217.976.245.333.028.741.028 1.231.028h7.521c.49 0 .899 0 1.232-.027.347-.029.67-.09.976-.246a2.5 2.5 0 0 0 1.093-1.092c.156-.306.217-.63.245-.977.027-.333.027-.74.027-1.231V1.333H10.25Zm.667 12V2.667H14v8.4c0 .524 0 .877-.023 1.15-.021.264-.06.393-.104.48-.112.219-.29.397-.51.51-.086.043-.215.082-.48.104-.272.022-.625.022-1.15.022h-.816ZM6.458 6v7.333h3.084V6H6.458ZM2 9.333v1.734c0 .524 0 .877.023 1.15.021.264.06.393.104.48.112.219.29.397.51.51.086.043.215.082.48.104.272.022.625.022 1.15.022h.816v-4H2Z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedReportsIcon = memo(ReportsIcon);
MemoizedReportsIcon.displayName = "ReportsIcon";

export { MemoizedReportsIcon as ReportsIcon };
