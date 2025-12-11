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

export type CalendarIconProps = SvgIconNoChildrenProps;

const CalendarIcon = forwardRef<SVGSVGElement, CalendarIconProps>(
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
            d="M6 .667v2h4v-2h1.333v2h3.334v10a2 2 0 0 1-2 2H3.333a2 2 0 0 1-2-2v-10h3.334v-2H6ZM10 4v1.333h1.333V4h2v2H2.667V4h2v1.333H6V4h4ZM2.667 7.333v5.334c0 .368.298.666.666.666h9.334a.667.667 0 0 0 .666-.666V7.333H2.667Z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedCalendarIcon = memo(CalendarIcon);
MemoizedCalendarIcon.displayName = "CalendarIcon";

export { MemoizedCalendarIcon as CalendarIcon };
