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

export type EditIconProps = SvgIconNoChildrenProps;

const EditIcon = forwardRef<SVGSVGElement, EditIconProps>((props, ref) => {
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
          d="M16.707 3.121a1 1 0 0 0-1.414 0L13.914 4.5 17.5 8.086l1.379-1.379a1 1 0 0 0 0-1.414L16.707 3.12ZM5 13.414l7.5-7.5L16.086 9.5l-7.5 7.5H5v-3.586Zm8.879-11.707a3 3 0 0 1 4.242 0l2.172 2.172a3 3 0 0 1 0 4.242L9.707 18.707 9.414 19H3v-6.414l.293-.293L13.879 1.707ZM3 23h18v-2H3v2Z"
          fill="currentColor"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedEditIcon = memo(EditIcon);
MemoizedEditIcon.displayName = "EditIcon";

export { MemoizedEditIcon as EditIcon };
