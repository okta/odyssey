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

import { memo, useMemo } from "react";
import styled from "@emotion/styled";

import { OktaLogo } from "./OktaLogo.js";
import { SideNavLogoProps } from "./types.js";

const StyledLogoContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "isLogoClickable",
})<{
  isLogoClickable?: boolean;
}>(({ isLogoClickable }) => ({
  display: "flex",
  alignItems: "center",
  height: "100%",
  ...(isLogoClickable && {
    cursor: "pointer",
  }),
}));

const StyledLogoLink = styled("a")(() => ({
  display: "flex",
  alignItems: "center",
  height: "100%",
}));

const SideNavLogo = ({
  imageAltText,
  logoComponent,
  imageUrl,
  ...optionalProps
}: SideNavLogoProps) => {
  const logo = useMemo(() => {
    if (logoComponent) {
      return logoComponent;
    }

    if (imageAltText && imageUrl) {
      return <img src={imageUrl} alt={imageAltText} />;
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
      role="presentation"
      aria-label={optionalProps.ariaLabel}
      data-se="sidenav-header-logo"
      onClick={optionalProps.onClick}
      isLogoClickable={!!optionalProps.onClick || optionalProps.href}
    >
      {logo}
    </StyledLogoContainer>
  );
};

const MemoizedSideNavLogo = memo(SideNavLogo);
MemoizedSideNavLogo.displayName = "SideNavLogo";

export { MemoizedSideNavLogo as SideNavLogo };
