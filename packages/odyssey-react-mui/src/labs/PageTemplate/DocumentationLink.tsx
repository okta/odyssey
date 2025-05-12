/*!
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { memo, ReactElement, ReactNode } from "react";

import { Link as MuiLink } from "@mui/material";

export const linkVariantValues = ["default", "monochrome"] as const;

export type DocumentationLinkProps = {
  /**
   * The content within the Link
   */
  children: ReactNode;
  /**
   * The Link destination
   */
  href: string;
  /**
   * An optional Icon component at the start of the Link
   */
  icon?: ReactElement;
  /**
   * The HTML `target` attribute for the Link test
   */
  target?:
    | "_self"
    | "_blank"
    | "_parent"
    | "_top"
    | (string & NonNullable<unknown>);
};

const DocumentationLink = ({
  children,
  href,
  icon,
  target,
}: DocumentationLinkProps) => {
  return (
    <MuiLink href={href} target={target}>
      {icon && <span className="Link-icon">{icon}</span>}

      {children}
    </MuiLink>
  );
};

const MemoizedDocumentationLink = memo(DocumentationLink);

MemoizedDocumentationLink.displayName = "DocumentationLink";

export { MemoizedDocumentationLink as DocumentationLink };
