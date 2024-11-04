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

export type DuoIconProps = SvgIconNoChildrenProps;

const DuoIcon = forwardRef<SVGSVGElement, DuoIconProps>((props, ref) => {
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
          d="M5.176 10.927H0v4.784h10.342c-.154-2.667-2.408-4.784-5.166-4.784Z"
          fill="currentColor"
        />
        <path
          d="M10.829 10.927v5.077c0 2.706 2.158 4.918 4.877 5.07V10.926H10.83Z"
          fill="currentColor"
        />
        <path
          d="M26.833 10.927c-2.757 0-5.011 2.117-5.166 4.784H32c-.155-2.667-2.41-4.784-5.167-4.784Z"
          fill="currentColor"
        />
        <path
          d="M5.176 21.073H0v-4.78h10.342c-.154 2.666-2.408 4.78-5.166 4.78Z"
          fill="currentColor"
        />
        <path
          d="M26.833 21.073c-2.757 0-5.011-2.114-5.166-4.78H32c-.155 2.666-2.41 4.78-5.167 4.78Z"
          fill="currentColor"
        />
        <path
          d="M21.17 21.064h-4.868V10.927h4.878V16c0 .098-.004.195-.01.293v4.771Z"
          fill="currentColor"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedDuoIcon = memo(DuoIcon);
MemoizedDuoIcon.displayName = "DuoIcon";

export { MemoizedDuoIcon as DuoIcon };
