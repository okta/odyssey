/*!
 * Copyright (c) 2026-present, Okta, Inc. and/or its affiliates. All rights reserved.
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

export type HideIconProps = SvgIconNoChildrenProps;

const HideIcon = forwardRef<SVGSVGElement, HideIconProps>((props, ref) => {
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
          d="M8 2a6.7 6.7 0 0 1 3.86 1.19l-1.1.881A5.4 5.4 0 0 0 8 3.333c-2.17 0-3.663 1.174-4.644 2.414A9.4 9.4 0 0 0 2.046 8a9.5 9.5 0 0 0 1.187 2.093l-1.042.834A10.8 10.8 0 0 1 .8 8.477a7 7 0 0 1-.091-.243L.704 8.22l-.002-.005v-.002C.7 8.211.7 8.21 1.332 8L.7 7.789v-.003l.003-.005.005-.015A4 4 0 0 1 .8 7.524 10.8 10.8 0 0 1 2.31 4.92C3.44 3.493 5.28 2 8 2M1.333 8l-.632.21L.63 8l.07-.21zM8 4.667a3.3 3.3 0 0 1 1.543.378l-1.225.98a2 2 0 0 0-2.314 1.851l-1.226.981A3.333 3.333 0 0 1 8 4.667m1.995 3.19L7.423 9.916a2 2 0 0 0 2.572-2.057m-3.734 2.988-1.21.968A5.4 5.4 0 0 0 8 12.669c2.17 0 3.662-1.174 4.644-2.414A9.4 9.4 0 0 0 13.954 8a9.4 9.4 0 0 0-1.31-2.253l-.004-.005-1.483 1.186a3.333 3.333 0 0 1-4.896 3.917m7.42-5.936 1.736-1.388-.833-1.042L1.25 13.146l.833 1.041 1.879-1.503A6.73 6.73 0 0 0 8 14c2.72 0 4.56-1.493 5.69-2.92a10.8 10.8 0 0 0 1.51-2.604 7 7 0 0 0 .091-.242l.005-.015.002-.005v-.002c.001 0 .001-.001-.631-.212l.632.21.07-.21-.07-.21-.632.21.632-.211v-.003l-.003-.005-.005-.015a4 4 0 0 0-.091-.242 10.8 10.8 0 0 0-1.51-2.604z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedHideIcon = memo(HideIcon);
MemoizedHideIcon.displayName = "HideIcon";

export { MemoizedHideIcon as HideIcon };
