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

export type ShowIconProps = SvgIconNoChildrenProps;

const ShowIcon = forwardRef<SVGSVGElement, ShowIconProps>((props, ref) => {
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
          d="M2.287 8.542A9 9 0 0 1 2.046 8a9.4 9.4 0 0 1 1.31-2.253C4.337 4.507 5.831 3.333 8 3.333s3.662 1.174 4.644 2.414A9.4 9.4 0 0 1 13.954 8a9.4 9.4 0 0 1-1.31 2.253c-.981 1.24-2.475 2.414-4.644 2.414s-3.663-1.174-4.644-2.414a9.4 9.4 0 0 1-1.069-1.711M15.3 7.789 14.667 8l.632.211v.003l-.003.005-.005.015a4 4 0 0 1-.091.242 10.8 10.8 0 0 1-1.51 2.604C12.56 12.508 10.72 14 8 14s-4.56-1.493-5.69-2.92A10.8 10.8 0 0 1 .8 8.477a7 7 0 0 1-.091-.242L.704 8.22l-.002-.005v-.002C.7 8.211.7 8.21 1.332 8L.7 7.789v-.003l.003-.005.005-.015A4 4 0 0 1 .8 7.524 10.8 10.8 0 0 1 2.31 4.92C3.44 3.493 5.28 2 8 2s4.56 1.493 5.69 2.92a10.8 10.8 0 0 1 1.51 2.604 7 7 0 0 1 .091.242l.005.015.002.005v.002M1.333 8l-.632.21L.63 8l.07-.21zm13.334 0 .632-.21.07.21-.07.21zM6 8a2 2 0 1 1 4 0 2 2 0 0 1-4 0m2-3.333a3.333 3.333 0 1 0 0 6.666 3.333 3.333 0 0 0 0-6.666"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedShowIcon = memo(ShowIcon);
MemoizedShowIcon.displayName = "ShowIcon";

export { MemoizedShowIcon as ShowIcon };
