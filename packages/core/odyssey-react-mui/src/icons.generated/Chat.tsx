/*!
 * Copyright (c) 2026-present, Okta, Inc. and/or its affiliates. All rights reserved.
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

export type ChatIconProps = SvgIconNoChildrenProps;

const ChatIcon = forwardRef<SVGSVGElement, ChatIconProps>((props, ref) => {
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
          d="M4.133 1.333h-.025c-.352 0-.655 0-.905.02-.263.022-.525.07-.778.198a2 2 0 0 0-.874.874 2 2 0 0 0-.197.778c-.02.25-.02.553-.02.905v7.044l.998-.574 2.046-1.174H6v1.757c0 .26 0 .493.016.687.017.208.055.429.166.645.16.314.414.57.728.729.217.11.438.149.646.166.194.015.427.015.687.015h3.379l2.046 1.175.999.574V7.576c0-.26 0-.493-.016-.687a1.7 1.7 0 0 0-.166-.646 1.67 1.67 0 0 0-.728-.728 1.7 1.7 0 0 0-.646-.166c-.194-.016-.428-.016-.687-.016H10v-4zM10 6.667c0 .335 0 .626-.02.867-.022.263-.07.525-.198.777a2 2 0 0 1-.874.875 2 2 0 0 1-.778.197c-.224.018-.49.02-.797.02v1.734c0 .29 0 .469.012.602a1 1 0 0 0 .023.144q.001.006.002.005a.33.33 0 0 0 .15.148l.022.006a1 1 0 0 0 .122.017c.133.01.312.011.603.011h3.711l.154.089 1.201.69V7.6c0-.291 0-.47-.011-.603a1 1 0 0 0-.025-.148.33.33 0 0 0-.15-.148l-.022-.006a1 1 0 0 0-.123-.017 8 8 0 0 0-.602-.011zM3.03 2.739c.034-.016.1-.042.282-.056.189-.016.437-.016.821-.016h4.534v3.937c0 .384 0 .632-.016.82-.015.182-.04.25-.057.282a.67.67 0 0 1-.291.292c-.033.016-.1.041-.282.056a11 11 0 0 1-.821.016H4.022l-.154.089-1.201.69V4.132c0-.384 0-.632.016-.821.014-.181.04-.248.056-.281a.67.67 0 0 1 .292-.292"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedChatIcon = memo(ChatIcon);
MemoizedChatIcon.displayName = "ChatIcon";

export { MemoizedChatIcon as ChatIcon };
