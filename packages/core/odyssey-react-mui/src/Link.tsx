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
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";

import type { HtmlProps } from "./HtmlProps.js";

import { useTranslation } from "./i18n.generated/i18n.js";
import { ExternalLinkIcon } from "./icons.generated/index.js";
import { FocusHandle } from "./inputUtils.js";
import { ScreenReaderText } from "./ScreenReaderText.js";

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
   * Ref attached to the underlying <a> element.
   */
  linkRef?: RefObject<FocusHandle>;
  /**
   * Called when the link is clicked.
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
   * Controls the visual presentation of the link.
   * - If `'default'`, renders in the brand link color.
   * - If `'monochrome'`, renders in the current text color; use on colored backgrounds where the default color would clash.
   */
  variant?: (typeof linkVariantValues)[number];
} & Pick<HtmlProps, "ariaLabel" | "id" | "testId" | "translate">;

/**
 * A navigational element that renders an anchor tag. Supports internal and external links,
 * an optional leading icon, and automatically appends an external link indicator when
 * opening in a new tab.
 */
const Link = ({
  ariaLabel,
  children,
  href,
  id,
  icon,
  linkRef,
  rel,
  target,
  testId,
  translate,
  variant,
  onClick,
}: LinkProps) => {
  const { t } = useTranslation();
  const localLinkRef = useRef<HTMLAnchorElement>(null);
  useImperativeHandle(linkRef, () => {
    return {
      focus: () => {
        localLinkRef.current?.focus();
      },
    };
  }, []);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      // Prevent default navigation when onClick is provided
      if (onClick && (href === "#" || href === "")) {
        event.preventDefault();
      }
      onClick?.(event);
    },
    [onClick, href],
  );

  return (
    <MuiLink
      aria-label={ariaLabel}
      data-se={testId}
      href={href}
      id={id}
      onClick={onClick ? handleClick : undefined}
      ref={localLinkRef}
      rel={rel}
      target={target}
      translate={translate}
      variant={variant}
    >
      {icon && <span className="Link-icon">{icon}</span>}

      {children}

      {target === "_blank" && (
        <>
          <ScreenReaderText translate={translate}>
            {t("link.external.newwindow")}
          </ScreenReaderText>
          <span className="Link-indicator" role="presentation">
            <ExternalLinkIcon />
          </span>
        </>
      )}
    </MuiLink>
  );
};

const MemoizedLink = memo(Link);

MemoizedLink.displayName = "Link";

export { MemoizedLink as Link };
