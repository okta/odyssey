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

export type AppsIconProps = SvgIconNoChildrenProps;

const AppsIcon = forwardRef<SVGSVGElement, AppsIconProps>((props, ref) => {
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
          d="M6.5 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9ZM4 6.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0ZM6.5 13a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9ZM4 17.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Zm9-11a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM17.5 4a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm0 9a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9ZM15 17.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Z"
          fill="currentColor"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedAppsIcon = memo(AppsIcon);
MemoizedAppsIcon.displayName = "AppsIcon";

export { MemoizedAppsIcon as AppsIcon };
