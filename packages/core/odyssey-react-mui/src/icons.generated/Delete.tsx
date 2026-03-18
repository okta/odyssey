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

export type DeleteIconProps = SvgIconNoChildrenProps;

const DeleteIcon = forwardRef<SVGSVGElement, DeleteIconProps>((props, ref) => {
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
          d="M5.52.667h4.96l.152.456.515 1.544H14v4h-.667v5.892c0 .352 0 .655-.02.904-.022.264-.07.526-.198.778a2 2 0 0 1-.874.874 2.036 2.036 0 0 1-.778.198c-.25.02-.552.02-.904.02H5.441c-.351 0-.655 0-.904-.02a2.036 2.036 0 0 1-.778-.198 2 2 0 0 1-.874-.874 2.036 2.036 0 0 1-.198-.778c-.02-.25-.02-.552-.02-.904V6.667H2v-4h2.853l.515-1.544.151-.456ZM3.332 5.333h9.334V4H3.333v1.333ZM4 6.667v5.866c0 .385 0 .633.016.822.015.18.04.248.057.281a.667.667 0 0 0 .291.291c.033.017.1.042.281.057.19.015.437.016.822.016h5.066c.385 0 .633 0 .822-.016.18-.015.248-.04.281-.057a.667.667 0 0 0 .291-.291c.017-.033.042-.1.057-.281.015-.19.016-.437.016-.822V6.667H4ZM9.52 2l.222.667H6.258L6.481 2h3.038Z"
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
