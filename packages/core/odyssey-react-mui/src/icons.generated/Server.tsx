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

export type ServerIconProps = SvgIconNoChildrenProps;

const ServerIcon = forwardRef<SVGSVGElement, ServerIconProps>((props, ref) => {
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
          d="M4 .667a2 2 0 0 0-2 2v10.666a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.667a2 2 0 0 0-2-2H4Zm-.667 2C3.333 2.298 3.632 2 4 2h8c.368 0 .667.298.667.667V5.11H3.333V2.667Zm0 3.777h9.334v3.112H3.333V6.444Zm0 4.445v2.444c0 .368.299.667.667.667h8a.667.667 0 0 0 .667-.667V10.89H3.333Zm2-6.667a.667.667 0 1 0 0-1.333.667.667 0 0 0 0 1.333Zm0 4.445a.667.667 0 1 0 0-1.334.667.667 0 0 0 0 1.334ZM6 12.444a.667.667 0 1 1-1.333 0 .667.667 0 0 1 1.333 0Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedServerIcon = memo(ServerIcon);
MemoizedServerIcon.displayName = "ServerIcon";

export { MemoizedServerIcon as ServerIcon };
