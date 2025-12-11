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

export type LinkIconProps = SvgIconNoChildrenProps;

const LinkIcon = forwardRef<SVGSVGElement, LinkIconProps>((props, ref) => {
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
          d="m13.952 1.956.045.046.046.045c.263.264.459.459.599.663a2.665 2.665 0 0 1 0 3.017c-.14.204-.336.4-.6.663l-.045.046-2.682 2.682-.02.02c-.379.379-.692.692-.968.926-.287.243-.577.44-.922.553a2.667 2.667 0 0 1-1.648 0c-.345-.113-.635-.31-.922-.553a14.502 14.502 0 0 1-.8-.759l.943-.942c.304.303.528.522.72.685.223.19.36.264.471.3.268.088.556.088.824 0 .111-.036.248-.11.471-.3.23-.195.505-.47.908-.873l2.682-2.682c.33-.33.428-.431.488-.52a1.333 1.333 0 0 0 0-1.509c-.06-.088-.159-.19-.488-.52-.329-.329-.43-.427-.52-.488a1.333 1.333 0 0 0-1.508 0c-.089.061-.19.16-.52.488l-.788.788a3.436 3.436 0 0 0-.48-.198 4 4 0 0 0-1.018-.19l1.343-1.342.046-.046c.263-.264.458-.459.662-.599a2.667 2.667 0 0 1 3.018 0c.204.14.4.335.663.6ZM9.748 5.355c.234.199.495.454.8.759l-.943.942a13.298 13.298 0 0 0-.72-.685c-.223-.19-.36-.264-.471-.3a1.333 1.333 0 0 0-.824 0c-.111.036-.248.11-.471.3-.23.195-.505.47-.908.873L2.944 10.51c-.329.33-.427.431-.488.52a1.333 1.333 0 0 0 0 1.509c.061.088.16.19.488.52.33.329.432.427.52.488a1.333 1.333 0 0 0 1.509 0c.089-.061.19-.16.52-.488l1.372-1.372c.149.075.308.142.48.198.332.107.674.17 1.018.19l-1.927 1.927-.046.045c-.263.264-.459.459-.663.6a2.667 2.667 0 0 1-3.017 0c-.204-.141-.4-.336-.663-.6l-.045-.046-.046-.045c-.264-.263-.459-.459-.599-.663a2.667 2.667 0 0 1 0-3.017c.14-.204.336-.4.6-.663l.045-.046 3.266-3.266.02-.02c.379-.379.692-.692.968-.926.286-.243.576-.44.922-.553a2.667 2.667 0 0 1 1.648 0c.345.113.635.31.922.553Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedLinkIcon = memo(LinkIcon);
MemoizedLinkIcon.displayName = "LinkIcon";

export { MemoizedLinkIcon as LinkIcon };
