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

export type ThumbsUpIconProps = SvgIconNoChildrenProps;

const ThumbsUpIcon = forwardRef<SVGSVGElement, ThumbsUpIconProps>(
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
            d="M7.73 1.359a.733.733 0 0 0-.756.407l-2.42 4.996H3.186a1.867 1.867 0 0 0-1.867 1.87l.006 4.037a2 2 0 0 0 2 1.997h2.297v-.005h6.466c.818 0 1.516-.594 1.645-1.403l.913-5.697a1.733 1.733 0 0 0-1.712-2.008h-2.901V4.031c0-.412-.086-1.004-.426-1.541-.358-.565-.965-1.012-1.878-1.131ZM5.625 7.607l2.337-4.825c.263.105.417.263.518.422.162.256.219.574.219.827v2.856h4.234a.4.4 0 0 1 .395.463l-.912 5.697a.333.333 0 0 1-.33.28H5.627v-5.72Zm-2.44.488h1.102v5.238h-.963a.667.667 0 0 1-.666-.666l-.006-4.038c0-.295.238-.534.533-.534Z"
            fill="currentColor"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedThumbsUpIcon = memo(ThumbsUpIcon);
MemoizedThumbsUpIcon.displayName = "ThumbsUpIcon";

export { MemoizedThumbsUpIcon as ThumbsUpIcon };
