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

export type ChatIconProps = SvgIconNoChildrenProps;

const ChatIcon = forwardRef<SVGSVGElement, ChatIconProps>((props, ref) => {
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
          d="M6.2 2h-.039c-.527 0-.981 0-1.356.03-.395.033-.789.104-1.167.297a3 3 0 0 0-1.311 1.311c-.193.378-.264.772-.296 1.167C2 5.18 2 5.635 2 6.161v10.566l1.498-.86 3.069-1.762H9v2.636c0 .39 0 .74.024 1.03.025.313.083.644.248.97a2.5 2.5 0 0 0 1.093 1.092c.325.165.656.223.968.248.292.024.642.024 1.03.024h5.07l3.07 1.762 1.497.86V11.364c0-.39 0-.74-.024-1.03a2.535 2.535 0 0 0-.248-.969 2.5 2.5 0 0 0-1.093-1.093 2.538 2.538 0 0 0-.968-.248C19.375 8 19.025 8 18.637 8H15V2H6.2Zm8.8 8c0 .503-.001.94-.03 1.3-.033.396-.104.789-.297 1.167a3 3 0 0 1-1.311 1.311c-.378.193-.772.264-1.167.297-.336.027-.736.03-1.195.03v2.6c0 .437 0 .704.017.904a1.292 1.292 0 0 0 .034.215l.002.005a.5.5 0 0 0 .22.221l.008.004a1.285 1.285 0 0 0 .215.034c.2.017.468.017.904.017h5.567l.23.133L20 19.273V11.4c0-.437 0-.704-.017-.904a1.29 1.29 0 0 0-.034-.215l-.004-.008a.5.5 0 0 0-.226-.222 1.29 1.29 0 0 0-.215-.034A12.83 12.83 0 0 0 18.6 10H15ZM4.546 4.109c.05-.025.15-.063.422-.085C5.25 4 5.623 4 6.2 4H13v5.905c0 .577 0 .95-.024 1.232-.022.272-.06.373-.085.422a1 1 0 0 1-.437.437c-.05.025-.15.063-.422.085-.283.024-.655.024-1.232.024H6.033l-.23.133L4 13.273V6.2c0-.577 0-.949.024-1.232.022-.272.06-.373.085-.422a1 1 0 0 1 .437-.437Z"
          fill="currentColor"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedChatIcon = memo(ChatIcon);
MemoizedChatIcon.displayName = "ChatIcon";

export { MemoizedChatIcon as ChatIcon };
