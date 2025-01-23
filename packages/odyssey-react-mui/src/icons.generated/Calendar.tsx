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

export type CalendarIconProps = SvgIconNoChildrenProps;

const CalendarIcon = forwardRef<SVGSVGElement, CalendarIconProps>(
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
            d="M9 1v3h6V1h2v3h5v15a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V4h5V1h2Zm6 5v2h2V6h3v3H4V6h3v2h2V6h6ZM4 11v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8H4Z"
            fill="currentColor"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedCalendarIcon = memo(CalendarIcon);
MemoizedCalendarIcon.displayName = "CalendarIcon";

export { MemoizedCalendarIcon as CalendarIcon };
