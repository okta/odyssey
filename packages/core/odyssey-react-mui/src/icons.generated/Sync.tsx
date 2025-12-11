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

export type SyncIconProps = SvgIconNoChildrenProps;

const SyncIcon = forwardRef<SVGSVGElement, SyncIconProps>((props, ref) => {
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
          d="M3.333 4.667h9.724L11.53 6.195l.942.943 2.29-2.29.01-.01c.057-.057.124-.124.178-.187a1 1 0 0 0 .197-.342 1 1 0 0 0 0-.618 1.006 1.006 0 0 0-.197-.342c-.054-.063-.121-.13-.177-.187l-.011-.01-2.29-2.29-.942.943 1.528 1.528H3.333a2 2 0 0 0-2 2v3.839l1.334-1.334V5.333c0-.368.298-.666.666-.666Zm10 6V8.162l1.334-1.334v3.839a2 2 0 0 1-2 2H2.943l1.528 1.528-.942.943-2.29-2.29-.01-.01a3.274 3.274 0 0 1-.178-.187 1.006 1.006 0 0 1-.197-.342 1 1 0 0 1 0-.618 1 1 0 0 1 .197-.342c.054-.063.121-.13.177-.187l.011-.01 2.29-2.29.942.943-1.528 1.528h9.724a.667.667 0 0 0 .666-.666Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedSyncIcon = memo(SyncIcon);
MemoizedSyncIcon.displayName = "SyncIcon";

export { MemoizedSyncIcon as SyncIcon };
