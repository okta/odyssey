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

export type FolderIconProps = SvgIconNoChildrenProps;

const FolderIcon = forwardRef<SVGSVGElement, FolderIconProps>((props, ref) => {
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
          d="M8.607 5c.575 0 .638.012.678.025a.5.5 0 0 1 .18.104c.031.029.072.077.358.576l3.309 5.791.288.504H21v4.8c0 .577 0 .949-.024 1.232-.022.272-.06.373-.085.422a1 1 0 0 1-.437.437c-.05.025-.15.063-.422.085C19.75 19 19.377 19 18.8 19H5.2c-.577 0-.949 0-1.232-.024-.272-.022-.373-.06-.422-.085a1 1 0 0 1-.437-.437c-.025-.05-.063-.15-.085-.422C3 17.75 3 17.377 3 16.8V5h5.607Zm1.298-1.877C9.522 2.998 9.112 3 8.705 3H1v13.838c0 .528 0 .982.03 1.357.033.395.104.789.297 1.167a3 3 0 0 0 1.311 1.311c.378.193.772.264 1.167.296.375.031.83.031 1.356.031H18.84c.527 0 .982 0 1.356-.03.395-.033.789-.104 1.167-.297a3 3 0 0 0 1.311-1.311c.193-.378.264-.772.296-1.167.031-.375.031-.83.031-1.356V5H11.723l-.164-.287-.048-.085c-.201-.354-.404-.71-.703-.98a2.5 2.5 0 0 0-.903-.525ZM12.866 7l1.714 3H21V7h-8.134Z"
          fill="currentColor"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedFolderIcon = memo(FolderIcon);
MemoizedFolderIcon.displayName = "FolderIcon";

export { MemoizedFolderIcon as FolderIcon };
