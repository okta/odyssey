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
import { ContrastMode } from "../../useContrastMode";
import { OktaLogo } from "./OktaLogo";
import { SideNavLogoProps } from "./types";

// Create a styled wrapper for the logo
const LogoWrapper = styled.div<{ contrastMode: ContrastMode }>(
  ({ contrastMode }) => ({
    "& svg, & img": {
      filter:
        contrastMode === "highContrast"
          ? "brightness(0) invert(1)" // makes logo white in Dark Mode
          : "none",
    },
  }),
);

const SideNavLogo = ({
  imageAltText,
  href,
  logoComponent,
  imageUrl,
  contrastMode,
}: SideNavLogoProps & { contrastMode: ContrastMode }) => {
  const logo = useMemo(() => {
    if (logoComponent) {
      return logoComponent;
    }

    if (imageAltText && imageUrl) {
      return <img src={imageUrl} alt={imageAltText} />;
    }

    return <OktaLogo />;
  }, [imageAltText, logoComponent, imageUrl]);

  const wrappedLogo = (
    <LogoWrapper contrastMode={contrastMode}>{logo}</LogoWrapper>
  );

  return href ? <a href={href}>{wrappedLogo}</a> : wrappedLogo;
};

const MemoizedSideNavLogo = memo(SideNavLogo);
MemoizedSideNavLogo.displayName = "SideNavLogo";

export { MemoizedSideNavLogo as SideNavLogo };
