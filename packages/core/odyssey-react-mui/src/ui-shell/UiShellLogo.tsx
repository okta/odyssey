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

import styled from "@emotion/styled";
import {
  memo,
  type MouseEventHandler,
  type ReactElement,
  useMemo,
} from "react";

import { OktaLogo } from "./SideNav/OktaLogo.js";

const StyledLogoContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "isLogoInteractive",
})<{
  isLogoInteractive?: boolean;
}>(({ isLogoInteractive }) => ({
  alignItems: "center",
  display: "flex",
  height: "100%",

  ...(isLogoInteractive && {
    cursor: "pointer",
  }),
}));

const StyledLogoLink = styled("a")(() => ({
  alignItems: "center",
  display: "flex",
  height: "100%",
}));

export type UiShellLogoProps = {
  isSameBackgroundAsMain?: boolean;
  /**
   * Event fired when the logo is clicked
   */
  onClick?: MouseEventHandler<HTMLDivElement | HTMLAnchorElement>;
} & (
  | {
      ariaLabel: string;
      href: string;
    }
  | {
      ariaLabel?: never;
      href?: never;
    }
) &
  (
    | {
        imageAltText?: never;
        imageUrl?: never;
        /**
         * a component to render as the logo
         */
        logoComponent: ReactElement;
      }
    | {
        /**
         * alt text for the img logo
         */
        imageAltText: string;
        /**
         * The src url to render in an `img` tag
         */
        imageUrl: string;
        logoComponent?: never;
      }
    | {
        /**
         * alt text for the img logo
         */
        imageAltText?: never;
        /**
         * The src url to render in an `img` tag
         */
        imageUrl?: never;
        logoComponent?: never;
      }
  );

const UiShellLogo = ({
  imageAltText,
  imageUrl,
  logoComponent,
  ...optionalProps
}: UiShellLogoProps) => {
  const logo = useMemo(() => {
    if (logoComponent) {
      return logoComponent;
    }

    if (imageAltText && imageUrl) {
      return <img alt={imageAltText} src={imageUrl} />;
    }

    return <OktaLogo />;
  }, [imageAltText, logoComponent, imageUrl]);

  return "href" in optionalProps && "ariaLabel" in optionalProps ? (
    <StyledLogoLink
      aria-label={optionalProps.ariaLabel}
      data-se="sidenav-header-logo"
      href={optionalProps.href}
      onClick={optionalProps.onClick}
    >
      {logo}
    </StyledLogoLink>
  ) : (
    <StyledLogoContainer
      aria-label={optionalProps.ariaLabel}
      data-se="sidenav-header-logo"
      isLogoInteractive={Boolean(optionalProps.onClick) || optionalProps.href}
      onClick={optionalProps.onClick}
      role="presentation"
    >
      {logo}
    </StyledLogoContainer>
  );
};

const MemoizedUiShellLogo = memo(UiShellLogo);
MemoizedUiShellLogo.displayName = "UiShellLogo";

export { MemoizedUiShellLogo as UiShellLogo };
