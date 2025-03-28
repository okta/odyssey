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

export type QuestionCircleFilledIconProps = SvgIconNoChildrenProps;

const QuestionCircleFilledIcon = forwardRef<
  SVGSVGElement,
  QuestionCircleFilledIconProps
>((props, ref) => {
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
          d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11ZM12.022 8c-.82 0-1.494.675-1.494 1.494h-2A3.501 3.501 0 0 1 12.022 6a3.501 3.501 0 0 1 3.494 3.494c0 1.406-.736 2.462-1.875 3.113l-.024.014-.025.012a2.027 2.027 0 0 0-.676.579c-.195.26-.268.49-.268.647a1 1 0 1 1-2 0c0-.717.302-1.36.668-1.847a4.03 4.03 0 0 1 1.353-1.153c.592-.345.847-.782.847-1.365A1.5 1.5 0 0 0 12.022 8ZM11.7 18.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"
          fill="currentColor"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedQuestionCircleFilledIcon = memo(QuestionCircleFilledIcon);
MemoizedQuestionCircleFilledIcon.displayName = "QuestionCircleFilledIcon";

export { MemoizedQuestionCircleFilledIcon as QuestionCircleFilledIcon };
