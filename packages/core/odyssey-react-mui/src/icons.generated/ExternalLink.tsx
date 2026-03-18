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

export type ExternalLinkIconProps = SvgIconNoChildrenProps;

const ExternalLinkIcon = forwardRef<SVGSVGElement, ExternalLinkIconProps>(
  (props, ref) => {
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
            d="m5.529 9.529 6.861-6.862H6.667V1.333h6.815c.08 0 .174 0 .258.007.097.008.235.028.38.102a1 1 0 0 1 .438.437c.074.146.094.284.102.381.007.084.007.178.007.258v6.815h-1.334V3.61l-6.862 6.862-.942-.942Zm5.163 3.827V8.124l1.333-1.361v7.926H1.349V3.977h7.886L7.874 5.311H2.683v8.045h8.009Z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedExternalLinkIcon = memo(ExternalLinkIcon);
MemoizedExternalLinkIcon.displayName = "ExternalLinkIcon";

export { MemoizedExternalLinkIcon as ExternalLinkIcon };
