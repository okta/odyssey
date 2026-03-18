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

export type VideoIconProps = SvgIconNoChildrenProps;

const VideoIcon = forwardRef<SVGSVGElement, VideoIconProps>((props, ref) => {
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
          d="M2.667 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10.666a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2.667ZM2 4c0-.368.298-.667.667-.667h10.666c.368 0 .667.299.667.667v8a.667.667 0 0 1-.667.667H2.667A.667.667 0 0 1 2 12V4Zm4.78 7.022 4.255-2.128a1 1 0 0 0 0-1.788L6.781 4.978a1 1 0 0 0-1.448.895v4.254a1 1 0 0 0 1.448.895Zm-.113-4.61L9.843 8 6.667 9.588V6.412Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedVideoIcon = memo(VideoIcon);
MemoizedVideoIcon.displayName = "VideoIcon";

export { MemoizedVideoIcon as VideoIcon };
