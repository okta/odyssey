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

export type EditIconProps = SvgIconNoChildrenProps;

const EditIcon = forwardRef<SVGSVGElement, EditIconProps>((props, ref) => {
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
          d="M11.138 2.08a.667.667 0 0 0-.943 0L9.276 3l2.39 2.39.92-.919a.667.667 0 0 0 0-.942L11.138 2.08ZM3.333 8.944l5-5 2.39 2.39-5 5h-2.39v-2.39Zm5.92-7.805a2 2 0 0 1 2.828 0l1.448 1.448a2 2 0 0 1 0 2.828L6.47 12.471l-.195.196H2V8.39l.195-.196 7.057-7.057ZM2 15.333h12V14H2v1.333Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedEditIcon = memo(EditIcon);
MemoizedEditIcon.displayName = "EditIcon";

export { MemoizedEditIcon as EditIcon };
