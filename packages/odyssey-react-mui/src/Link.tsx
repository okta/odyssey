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

import { forwardRef, memo, ReactElement } from "react";
import { ExternalLinkIcon } from "./icons.generated";
import type { SeleniumProps } from "./SeleniumProps";

import { Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material";

export const linkVariantValues = ["default", "monochrome"] as const;

export type LinkProps = {
  /**
   * The content within the Link
   */
  children: React.ReactNode;
  /**
   * The Link destination
   */
  href: string;
  /**
   * An optional Icon component at the start of the Link
   */
  icon?: ReactElement;
  /**
   * The click event handler for the Link
   */
  onClick?: MuiLinkProps["onClick"];
  /**
   * The HTML `rel` attribute for the Link
   */
  rel?: string;
  /**
   * The HTML `target` attribute for the Link
   */
  target?:
    | "_self"
    | "_blank"
    | "_parent"
    | "_top"
    | (string & NonNullable<unknown>);
  /**
   * The visual presentation of the Link (default or monochrome)
   */
  variant?: (typeof linkVariantValues)[number];
} & SeleniumProps;

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    { children, href, icon, rel, target, testId, variant, onClick }: LinkProps,
    ref
  ) => (
    <MuiLink
      data-se={testId}
      href={href}
      rel={rel}
      target={target}
      variant={variant}
      onClick={onClick}
      ref={ref}
    >
      {icon && <span className="Link-icon">{icon}</span>}

      {children}

      {target === "_blank" && (
        <span className="Link-indicator" role="presentation">
          <ExternalLinkIcon />
        </span>
      )}
    </MuiLink>
  )
);

const MemoizedLink = memo(Link);

MemoizedLink.displayName = "Link";

export { MemoizedLink as Link };
