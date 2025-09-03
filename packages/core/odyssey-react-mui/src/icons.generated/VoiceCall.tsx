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

export type VoiceCallIconProps = SvgIconNoChildrenProps;

const VoiceCallIcon = forwardRef<SVGSVGElement, VoiceCallIconProps>(
  (props, ref) => {
    return (
      <SvgIcon
        fill="none"
        ref={ref}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <>
          <path
            d="M13.5 4.5h-9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-20a2 2 0 0 0-2-2Z"
            stroke="currentColor"
            strokeWidth={1.5}
          />
          <path d="M7 25.5h4" stroke="currentColor" strokeWidth={1.5} />
          <circle cx={9.11084} cy={8.00488} fill="currentColor" r={1.25} />
          <path
            d="M19.005 12.995a4.25 4.25 0 0 1 0 6.01"
            stroke="currentColor"
            strokeWidth={1.5}
          />
          <path
            d="M22.54 9.46a9.25 9.25 0 0 1 0 13.08"
            stroke="currentColor"
            strokeWidth={1.5}
          />
          <path
            d="M26.076 5.924a14.25 14.25 0 0 1 0 20.152"
            stroke="currentColor"
            strokeWidth={1.5}
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedVoiceCallIcon = memo(VoiceCallIcon);
MemoizedVoiceCallIcon.displayName = "VoiceCallIcon";

export { MemoizedVoiceCallIcon as VoiceCallIcon };
