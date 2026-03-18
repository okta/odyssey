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

export type SadIconProps = SvgIconNoChildrenProps;

const SadIcon = forwardRef<SVGSVGElement, SadIconProps>((props, ref) => {
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
          d="M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0Zm1.333 0A7.333 7.333 0 1 1 .667 8a7.333 7.333 0 0 1 14.666 0ZM6 6.667a.667.667 0 1 0 0-1.334.667.667 0 0 0 0 1.334ZM10.667 6a.667.667 0 1 1-1.334 0 .667.667 0 0 1 1.334 0Zm-5.901 5.29a.667.667 0 0 0 .857-.385l.002-.007.018-.041a2.917 2.917 0 0 1 .5-.734c.372-.398.956-.79 1.857-.79s1.485.392 1.857.79a2.918 2.918 0 0 1 .5.734l.018.041.002.007a.667.667 0 0 0 1.247-.472l-.624.234.624-.235v-.002l-.002-.004-.004-.009-.01-.027a3.689 3.689 0 0 0-.179-.363 4.252 4.252 0 0 0-.599-.816A3.778 3.778 0 0 0 8 8a3.778 3.778 0 0 0-2.83 1.21 4.25 4.25 0 0 0-.74 1.095 2.533 2.533 0 0 0-.037.085l-.011.027-.004.01-.001.003v.001l-.001.001.624.235-.624-.234a.667.667 0 0 0 .39.858Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedSadIcon = memo(SadIcon);
MemoizedSadIcon.displayName = "SadIcon";

export { MemoizedSadIcon as SadIcon };
