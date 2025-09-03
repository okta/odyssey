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

import { Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material";
import {
  memo,
  ReactElement,
  ReactNode,
  RefObject,
  useImperativeHandle,
  useRef,
} from "react";

import type { HtmlProps } from "./HtmlProps.js";

import { ExternalLinkIcon } from "./icons.generated/index.js";
import { FocusHandle } from "./inputUtils.js";

export const linkVariantValues = ["default", "monochrome"] as const;

export type LinkProps = {
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
   * The ref forwarded to the TextField
   */
  linkRef?: RefObject<FocusHandle>;
  /**
   * The click event handler for the Link
   */
  onClick?: MuiLinkProps["onClick"];
  /**
   * The rel attribute defines the relationship between a linked resource and the current document
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel
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
} & Pick<HtmlProps, "ariaLabel" | "testId" | "translate">;

const Link = ({
  ariaLabel,
  children,
  href,
  icon,
  linkRef,
  rel,
  target,
  testId,
  translate,
  variant,
  onClick,
}: LinkProps) => {
  const localLinkRef = useRef<HTMLAnchorElement>(null);
  useImperativeHandle(linkRef, () => {
    return {
      focus: () => {
        localLinkRef.current?.focus();
      },
    };
  }, []);

  return (
    <MuiLink
      aria-label={ariaLabel}
      data-se={testId}
      href={href}
      onClick={onClick}
      ref={localLinkRef}
      rel={rel}
      target={target}
      translate={translate}
      variant={variant}
    >
      {icon && <span className="Link-icon">{icon}</span>}

      {children}

      {target === "_blank" && (
        <span className="Link-indicator" role="presentation">
          <ExternalLinkIcon />
        </span>
      )}
    </MuiLink>
  );
};

const MemoizedLink = memo(Link);

MemoizedLink.displayName = "Link";

export { MemoizedLink as Link };
