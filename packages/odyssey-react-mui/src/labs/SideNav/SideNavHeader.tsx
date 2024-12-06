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
import { memo } from "react";
import { Skeleton } from "@mui/material";

import {
  type DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext";
import { ContrastMode } from "../../useContrastMode";
import { SideNavLogo } from "./SideNavLogo";
import { SideNavProps } from "./types";
import { Heading6 } from "../../Typography";
import { TOP_NAV_HEIGHT } from "../TopNav";

const SideNavHeaderContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "contrastMode",
})<{
  odysseyDesignTokens: DesignTokens;
  contrastMode: ContrastMode;
}>(({ odysseyDesignTokens, contrastMode }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  backgroundColor:
    contrastMode === "highContrast"
      ? "#121212"
      : odysseyDesignTokens.HueNeutralWhite,
  zIndex: 1,
}));

const SideNavLogoContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
  display: "flex",
  alignItems: "center",
  height: TOP_NAV_HEIGHT,
  padding: odysseyDesignTokens.Spacing4,

  "svg, img": {
    maxHeight: "100%",
    width: "auto",
    maxWidth: "100%",
  },
}));

const SideNavHeadingContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "contrastMode",
})<{
  odysseyDesignTokens: DesignTokens;
  contrastMode: ContrastMode;
}>(({ odysseyDesignTokens, contrastMode }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: odysseyDesignTokens.Spacing4,
  width: "100%",

  ["& .MuiTypography-root"]: {
    margin: 0,
    width: "100%",
    color:
      contrastMode === "highContrast"
        ? odysseyDesignTokens.HueNeutralWhite
        : odysseyDesignTokens.HueNeutral800,
  },
}));

export type SideNavHeaderProps = {
  /**
   * The app's name.
   */
  appName: string;
  /**
   * If the side nav currently has no items, it will be loading.
   */
  isLoading?: boolean;
  /**
   * The current contrast mode
   */
  contrastMode: ContrastMode;
} & Pick<SideNavProps, "logoProps">;

const SideNavHeader = ({
  appName,
  isLoading,
  logoProps,
  contrastMode,
}: SideNavHeaderProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  return (
    <SideNavHeaderContainer
      odysseyDesignTokens={odysseyDesignTokens}
      contrastMode={contrastMode}
    >
      <SideNavLogoContainer odysseyDesignTokens={odysseyDesignTokens}>
        {isLoading ? (
          <Skeleton variant="rounded" height={24} width={67} />
        ) : (
          <SideNavLogo {...logoProps} contrastMode={contrastMode} />
        )}
      </SideNavLogoContainer>

      <SideNavHeadingContainer
        odysseyDesignTokens={odysseyDesignTokens}
        contrastMode={contrastMode}
      >
        <Heading6 component="h2">{isLoading ? <Skeleton /> : appName}</Heading6>
      </SideNavHeadingContainer>
    </SideNavHeaderContainer>
  );
};

const MemoizedSideNavHeader = memo(SideNavHeader);
MemoizedSideNavHeader.displayName = "SideNavHeader";

export { MemoizedSideNavHeader as SideNavHeader };
