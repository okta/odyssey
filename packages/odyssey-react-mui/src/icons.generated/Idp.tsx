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

export type IdpIconProps = SvgIconNoChildrenProps;

const IdpIcon = forwardRef<SVGSVGElement, IdpIconProps>((props, ref) => {
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
          d="M13.144 7.33a10.75 10.75 0 1 1-.01 17.332"
          stroke="currentColor"
          strokeWidth={1.5}
        />
        <path
          d="M5.506 16.014H25.49m-19.984 0L8 13.491m-2.494 2.523L8 18.495m17.49-2.48-4.502-4.51m4.502 4.51L21 20.494"
          stroke="currentColor"
          strokeWidth={1.5}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.427 11.558a4.5 4.5 0 0 1 4.464 2.203h1.667a6 6 0 1 0-.002 4.524H10.89a4.5 4.5 0 1 1-4.462-6.727Z"
          fill="currentColor"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedIdpIcon = memo(IdpIcon);
MemoizedIdpIcon.displayName = "IdpIcon";

export { MemoizedIdpIcon as IdpIcon };
