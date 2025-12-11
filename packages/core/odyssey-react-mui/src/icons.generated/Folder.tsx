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

export type FolderIconProps = SvgIconNoChildrenProps;

const FolderIcon = forwardRef<SVGSVGElement, FolderIconProps>((props, ref) => {
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
          d="M5.738 3.333c.384 0 .425.008.452.017a.333.333 0 0 1 .12.07c.02.018.048.05.239.384l2.205 3.86.192.336H14v3.2c0 .384 0 .633-.016.821-.015.181-.04.249-.057.282a.667.667 0 0 1-.291.291c-.033.017-.1.042-.281.057a11.35 11.35 0 0 1-.822.016H3.467c-.385 0-.633 0-.822-.016-.18-.015-.248-.04-.281-.057a.667.667 0 0 1-.291-.291c-.017-.033-.042-.1-.057-.282A11.336 11.336 0 0 1 2 11.2V3.333h3.738Zm.865-1.25c-.255-.084-.528-.084-.8-.083H.667v9.226c0 .351 0 .654.02.904.022.264.07.526.198.778a2 2 0 0 0 .874.874c.252.129.514.176.778.198.25.02.553.02.904.02h9.118c.351 0 .655 0 .904-.02.264-.022.526-.07.778-.198a2 2 0 0 0 .874-.874c.129-.252.176-.514.198-.778.02-.25.02-.553.02-.904V3.333H7.815l-.109-.19-.032-.057c-.134-.237-.27-.474-.469-.654a1.667 1.667 0 0 0-.602-.35Zm1.974 2.584 1.143 2H14v-2H8.577Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedFolderIcon = memo(FolderIcon);
MemoizedFolderIcon.displayName = "FolderIcon";

export { MemoizedFolderIcon as FolderIcon };
