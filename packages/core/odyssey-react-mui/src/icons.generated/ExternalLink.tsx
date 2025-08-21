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

export type ExternalLinkIconProps = SvgIconNoChildrenProps;

const ExternalLinkIcon = forwardRef<SVGSVGElement, ExternalLinkIconProps>(
  (props, ref) => (
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
          d="M8.293 14.293 18.586 4H10V2h10.223c.12 0 .262 0 .387.01.145.012.353.042.571.153a1.5 1.5 0 0 1 .655.656c.112.218.142.426.154.571.01.125.01.268.01.387V14h-2V5.414L9.707 15.707l-1.414-1.414Zm7.745 5.74v-7.847l2-2.042v11.89H2.024V5.966h11.828l-2.041 2H4.024v12.068h12.014Z"
          fill="currentColor"
        />
      </>
    </SvgIcon>
  ),
);

const MemoizedExternalLinkIcon = memo(ExternalLinkIcon);
MemoizedExternalLinkIcon.displayName = "ExternalLinkIcon";

export { MemoizedExternalLinkIcon as ExternalLinkIcon };
