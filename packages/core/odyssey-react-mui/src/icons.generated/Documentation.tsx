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

export type DocumentationIconProps = SvgIconNoChildrenProps;

const DocumentationIcon = forwardRef<SVGSVGElement, DocumentationIconProps>(
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
            d="M1.333 2H.667v12h5.111c.729 0 1.335.133 1.78.5l.012.01.042.03.002.002a.675.675 0 0 0 .464.112c.2-.022.33-.128.348-.144l.002-.001c.02-.015.033-.029.039-.033l.011-.011c.341-.325.91-.465 1.655-.465h5.2V2H9.38a1.866 1.866 0 0 0-1.404.635 2.534 2.534 0 0 0-.155-.15A1.91 1.91 0 0 0 6.548 2H1.333Zm6 2.374a1.2 1.2 0 0 0-.4-.894.577.577 0 0 0-.385-.147H2v9.334h3.778c.497 0 1.036.05 1.555.22V4.375Zm0 9.6v.003-.002Zm1.334.005v-.004.004Zm0-1.115c.49-.155 1.006-.197 1.466-.197H14V3.333H9.379a.532.532 0 0 0-.373.153c-.217.212-.34.504-.34.808v8.57ZM6 7.334H3.333V6H6v1.333Zm4 0h2.667V6H10v1.333ZM12.667 10H10V8.667h2.667V10Zm-9.334 0H6V8.667H3.333V10Z"
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
