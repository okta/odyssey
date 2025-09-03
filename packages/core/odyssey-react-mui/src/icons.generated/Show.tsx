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

export type ShowIconProps = SvgIconNoChildrenProps;

const ShowIcon = forwardRef<SVGSVGElement, ShowIconProps>((props, ref) => {
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
          d="M3.43 12.813A12.814 12.814 0 0 1 3.069 12a14.153 14.153 0 0 1 1.966-3.38C6.506 6.762 8.746 5 12 5s5.494 1.761 6.966 3.62A14.152 14.152 0 0 1 20.932 12a14.151 14.151 0 0 1-1.966 3.38C17.494 17.238 15.254 19 12 19s-5.494-1.761-6.966-3.62a14.152 14.152 0 0 1-1.603-2.567Zm19.518-1.13L22 12c.949.316.949.317.948.317v.004l-.003.007-.008.024a7.012 7.012 0 0 1-.137.362 16.147 16.147 0 0 1-2.266 3.906C18.84 18.762 16.08 21 12 21c-4.08 0-6.84-2.239-8.534-4.38A16.15 16.15 0 0 1 1.2 12.715a10.039 10.039 0 0 1-.137-.362l-.008-.024-.002-.007-.001-.003c0-.001 0-.002.948-.318a91.698 91.698 0 0 1-.948-.317v-.004l.003-.007.008-.024.029-.08c.025-.067.06-.163.108-.282A16.15 16.15 0 0 1 3.466 7.38C5.16 5.24 7.92 3 12 3c4.08 0 6.84 2.239 8.534 4.38a16.147 16.147 0 0 1 2.266 3.906 10.026 10.026 0 0 1 .137.362l.008.024.002.007.001.003ZM2 12l-.949.316L.946 12l.105-.316L2 12Zm20 0 .949-.316.105.316-.105.316L22 12ZM9 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"
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
