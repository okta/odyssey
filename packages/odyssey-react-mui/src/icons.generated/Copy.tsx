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

export type CopyIconProps = SvgIconNoChildrenProps;

const CopyIcon = forwardRef<SVGSVGElement, CopyIconProps>((props, ref) => {
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
          d="M3.063 2.125h-1V15a3 3 0 0 0 3 3H18V5.125a3 3 0 0 0-3-3H3.062Zm1 12.875V4.125H15a1 1 0 0 1 1 1V16H5.062a1 1 0 0 1-1-1ZM20 7v12a1 1 0 0 1-1 1H6v2h13a3 3 0 0 0 3-3V7h-2Z"
          fill="currentColor"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedCopyIcon = memo(CopyIcon);
MemoizedCopyIcon.displayName = "CopyIcon";

export { MemoizedCopyIcon as CopyIcon };
