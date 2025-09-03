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

import { SvgIcon, type SvgIconNoChildrenProps } from "../SvgIcon.js";

export type DeleteIconProps = SvgIconNoChildrenProps;

const DeleteIcon = forwardRef<SVGSVGElement, DeleteIconProps>((props, ref) => {
  return (
    <SvgIcon
      fill="none"
      ref={ref}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <>
        <path
          clipRule="evenodd"
          d="M8.28 1h7.44l.229.684L16.72 4H21v6h-1v8.838c0 .528 0 .982-.03 1.357-.033.395-.104.789-.297 1.167a3 3 0 0 1-1.311 1.311c-.378.193-.772.264-1.167.296-.375.031-.83.031-1.357.031H8.162c-.527 0-.981 0-1.356-.03-.395-.033-.789-.104-1.167-.297a3 3 0 0 1-1.311-1.311c-.193-.378-.264-.772-.296-1.167A17.9 17.9 0 0 1 4 18.838V10H3V4h4.28l.771-2.316L8.28 1ZM5 8h14V6H5v2Zm1 2v8.8c0 .577 0 .949.024 1.232.022.272.06.372.085.422a1 1 0 0 0 .437.437c.05.025.15.063.422.085C7.25 21 7.623 21 8.2 21h7.6c.577 0 .949 0 1.232-.024.272-.022.372-.06.422-.085a1 1 0 0 0 .437-.437c.025-.05.063-.15.085-.422C18 19.75 18 19.377 18 18.8V10H6Zm8.28-7 .333 1H9.387l.334-1h4.558Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedDeleteIcon = memo(DeleteIcon);
MemoizedDeleteIcon.displayName = "DeleteIcon";

export { MemoizedDeleteIcon as DeleteIcon };
