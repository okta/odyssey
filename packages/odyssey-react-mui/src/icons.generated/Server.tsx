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

export type ServerIconProps = SvgIconNoChildrenProps;

const ServerIcon = forwardRef<SVGSVGElement, ServerIconProps>((props, ref) => {
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
          d="M6 1a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3H6ZM5 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3.667H5V4Zm0 5.667h14v4.666H5V9.667Zm0 6.666V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.667H5Zm3-10a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM8 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm1 5.667a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
          fill="currentColor"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedServerIcon = memo(ServerIcon);
MemoizedServerIcon.displayName = "ServerIcon";

export { MemoizedServerIcon as ServerIcon };
