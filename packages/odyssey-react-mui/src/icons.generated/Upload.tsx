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

export type UploadIconProps = SvgIconNoChildrenProps;

const UploadIcon = forwardRef<SVGSVGElement, UploadIconProps>((props, ref) => {
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
          d="M5.707 9.707 11 4.414V18h2V4.414l5.293 5.293 1.414-1.414-6.434-6.434-.016-.017c-.085-.084-.185-.185-.281-.266a1.508 1.508 0 0 0-.512-.295 1.5 1.5 0 0 0-.927 0 1.508 1.508 0 0 0-.513.295 4.949 4.949 0 0 0-.28.266l-.017.017-6.434 6.434 1.414 1.414ZM5 20v-4H3v4a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-4h-2v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1Z"
          fill="currentColor"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedUploadIcon = memo(UploadIcon);
MemoizedUploadIcon.displayName = "UploadIcon";

export { MemoizedUploadIcon as UploadIcon };
