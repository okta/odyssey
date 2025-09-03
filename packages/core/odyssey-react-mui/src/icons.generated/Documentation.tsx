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

export type DocumentationIconProps = SvgIconNoChildrenProps;

const DocumentationIcon = forwardRef<SVGSVGElement, DocumentationIconProps>(
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
            clipRule="evenodd"
            d="M2 3H1v18h7.667c1.093 0 2.003.199 2.67.75l.004.002.015.012a.688.688 0 0 0 .062.047l.003.002a1.012 1.012 0 0 0 .696.168c.3-.033.494-.192.522-.215l.003-.002c.029-.023.05-.043.058-.05a.808.808 0 0 0 .018-.017C13.228 21.21 14.08 21 15.2 21H23V3h-8.932a2.798 2.798 0 0 0-2.106.953 3.82 3.82 0 0 0-.232-.226A2.866 2.866 0 0 0 9.822 3H2Zm9 3.562c0-.513-.219-1.001-.601-1.343A.866.866 0 0 0 9.822 5H3v14h5.667c.746 0 1.553.076 2.333.331V6.561Zm0 14.4v.01-.01Zm2 0v.005-.008.003Zm0-1.666c.736-.232 1.509-.296 2.2-.296H21V5h-6.932a.8.8 0 0 0-.559.228A1.7 1.7 0 0 0 13 6.441v12.854ZM9 11H5V9h4v2Zm6 0h4V9h-4v2Zm4 4h-4v-2h4v2ZM5 15h4v-2H5v2Z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedDocumentationIcon = memo(DocumentationIcon);
MemoizedDocumentationIcon.displayName = "DocumentationIcon";

export { MemoizedDocumentationIcon as DocumentationIcon };
