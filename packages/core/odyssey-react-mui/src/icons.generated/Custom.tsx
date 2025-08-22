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

export type CustomIconProps = SvgIconNoChildrenProps;

const CustomIcon = forwardRef<SVGSVGElement, CustomIconProps>((props, ref) => {
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
          d="M12 13.4H7v13.5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V13.4h-5m-8 0V6.9c0-1.5 1.146-3.8 3.5-3.8h1c1.714 0 3.5 1.36 3.5 3.8v6.5m-8 0h8"
          stroke="currentColor"
          strokeWidth={1.5}
        />
        <circle
          cx={15.8687}
          cy={20.8976}
          r={2.08081}
          stroke="currentColor"
          strokeWidth={1.5}
        />
      </>
    </SvgIcon>
  );
});

const MemoizedCustomIcon = memo(CustomIcon);
MemoizedCustomIcon.displayName = "CustomIcon";

export { MemoizedCustomIcon as CustomIcon };
