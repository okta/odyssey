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

export type SecurityQuestionIconProps = SvgIconNoChildrenProps;

const SecurityQuestionIcon = forwardRef<
  SVGSVGElement,
  SecurityQuestionIconProps
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
          d="M16.012 30.536C6.926 24.272 2.759 19.298 2.759 6.09l12.548-4.395a2 2 0 0 1 1.323 0l12.61 4.422c0 14.807-5.72 19.027-13.228 24.418Z"
          stroke="currentColor"
          strokeWidth={1.5}
        />
        <path
          d="m18.054 16.134.335.671.019-.01.018-.01-.372-.65Zm-3.384 3.732a.75.75 0 1 0 1.5 0h-1.5Zm-2.232-7.682c0-2 1.64-3.64 3.64-3.64v-1.5a5.153 5.153 0 0 0-5.14 5.14h1.5Zm3.64-3.64c2 0 3.64 1.64 3.64 3.64h1.5a5.153 5.153 0 0 0-5.14-5.14v1.5Zm3.64 3.64c0 1.45-.7 2.535-2.037 3.3l.745 1.301c1.736-.992 2.792-2.54 2.792-4.601h-1.5Zm-2 3.28a6.069 6.069 0 0 0-2.075 1.757c-.558.744-.973 1.666-.973 2.645h1.5c0-.558.243-1.172.673-1.745a4.574 4.574 0 0 1 1.546-1.316l-.67-1.341Z"
          fill="currentColor"
        />
        <circle cx={15.5279} cy={23.3061} r={0.825} fill="currentColor" />
      </>
    </SvgIcon>
  );
});

const MemoizedSecurityQuestionIcon = memo(SecurityQuestionIcon);
MemoizedSecurityQuestionIcon.displayName = "SecurityQuestionIcon";

export { MemoizedSecurityQuestionIcon as SecurityQuestionIcon };
