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

export type VideoIconProps = SvgIconNoChildrenProps;

const VideoIcon = forwardRef<SVGSVGElement, VideoIconProps>((props, ref) => {
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
          d="M4 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H4ZM3 6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6Zm13.553 7.342c1.105-.553 1.105-2.13 0-2.684l-6.382-3.19A1.5 1.5 0 0 0 8 8.808v6.382a1.5 1.5 0 0 0 2.17 1.342l6.383-3.191ZM10 9.618 14.764 12 10 14.382V9.618Z"
          fill="currentColor"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedVideoIcon = memo(VideoIcon);
MemoizedVideoIcon.displayName = "VideoIcon";

export { MemoizedVideoIcon as VideoIcon };
