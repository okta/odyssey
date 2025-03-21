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

export type GroupIconProps = SvgIconNoChildrenProps;

const GroupIcon = forwardRef<SVGSVGElement, GroupIconProps>((props, ref) => {
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
          d="M19 6.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm2 0a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm-11 5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm2 0a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM7.5 19c-1.807 0-3.479 1.744-3.5 4.01l-2-.02C2.03 19.872 4.368 17 7.5 17c3.135 0 5.482 2.86 5.5 5.994l-2 .012C10.987 20.738 9.316 19 7.5 19Zm5.583-1.808C13.45 15.317 14.921 14 16.5 14c1.81 0 3.487 1.74 3.5 4.006l2-.012C21.982 14.86 19.628 12 16.5 12c-2.735 0-4.87 2.204-5.38 4.808-.075.384-.116.78-.12 1.183l2 .018a4.47 4.47 0 0 1 .083-.817Z"
          fill="currentColor"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedGroupIcon = memo(GroupIcon);
MemoizedGroupIcon.displayName = "GroupIcon";

export { MemoizedGroupIcon as GroupIcon };
