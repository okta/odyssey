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

export type ThumbsDownIconProps = SvgIconNoChildrenProps;

const ThumbsDownIcon = forwardRef<SVGSVGElement, ThumbsDownIconProps>(
  (props, ref) => {
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
            d="M7.735 14.65a.733.733 0 0 1-.754-.406L4.56 9.247H3.192a1.867 1.867 0 0 1-1.866-1.869l.006-4.038a2 2 0 0 1 2-1.997h2.296v.005h6.466c.819 0 1.516.595 1.646 1.403l.912 5.697a1.733 1.733 0 0 1-1.711 2.008h-2.902v1.522c0 .412-.086 1.005-.426 1.541-.358.565-.964 1.012-1.878 1.132ZM5.632 8.404l2.338 4.824a1.05 1.05 0 0 0 .517-.421c.162-.256.219-.575.219-.828V9.122h4.235a.4.4 0 0 0 .395-.463l-.913-5.697a.333.333 0 0 0-.33-.28h-6.46v5.72Zm-2.44-.489h1.103V2.677h-.963a.667.667 0 0 0-.667.665L2.659 7.38c0 .295.238.534.533.534Z"
            fill="currentColor"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedThumbsDownIcon = memo(ThumbsDownIcon);
MemoizedThumbsDownIcon.displayName = "ThumbsDownIcon";

export { MemoizedThumbsDownIcon as ThumbsDownIcon };
