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
import { Skeleton } from "@mui/material";
import { memo } from "react";

import { ContrastColors } from "../../createContrastColors.js";
import {
  type DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext.js";
import { Heading5 } from "../../Typography.js";
import {
  UiShellColors,
  useUiShellContext,
} from "../../ui-shell/UiShellProvider.js";
import { UiShellLogo, UiShellLogoProps } from "../UiShellLogo.js";
import {
  TOP_NAV_HEIGHT,
  UI_SHELL_BASE_Z_INDEX,
} from "../uiShellSharedConstants.js";

const SideNavHeaderContainer = styled("div")({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  zIndex: UI_SHELL_BASE_Z_INDEX,
});

const SideNavLogoContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "headerBackgroundColor" &&
    prop !== "isSameBackgroundAsMain" &&
    prop !== "odysseyDesignTokens",
})<{
  headerBackgroundColor?: UiShellColors["sideNavBackgroundColor"];
  isSameBackgroundAsMain: UiShellLogoProps["isSameBackgroundAsMain"];
  odysseyDesignTokens: DesignTokens;
}>(
  ({ headerBackgroundColor, isSameBackgroundAsMain, odysseyDesignTokens }) => ({
    display: "flex",
    alignItems: "center",
    height: TOP_NAV_HEIGHT,
    paddingBlock: odysseyDesignTokens.Spacing4,
    paddingInline: odysseyDesignTokens.Spacing5,
    backgroundColor: isSameBackgroundAsMain
      ? headerBackgroundColor
      : odysseyDesignTokens.HueNeutralWhite,

    "svg, img": {
      maxHeight: "100%",
      width: "auto",
      maxWidth: "100%",
    },
  }),
);

const SideNavHeadingContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "contrastFontColor",
})(
  ({
    contrastFontColor,
    odysseyDesignTokens,
  }: {
    contrastFontColor: ContrastColors["fontColor"];
    odysseyDesignTokens: DesignTokens;
  }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBlock: odysseyDesignTokens.Spacing4,
    paddingInline: odysseyDesignTokens.Spacing5,
    width: "100%",

    ["& .MuiTypography-root"]: {
      margin: 0,
      width: "100%",
      color: contrastFontColor || "inherit",
    },
  }),
);

export type SideNavHeaderProps = {
  /**
   * The app's name.
   */
  appName?: string;
  /**
   * If the side nav currently has no items, it will be loading.
   */
  isLoading?: boolean;
  /**
   * Properties for displaying the logo image or passing a logo image component instead.
   */
  logoProps?: UiShellLogoProps;
};

const SideNavHeader = ({
  appName,
  isLoading,
  logoProps,
}: SideNavHeaderProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const uiShellContext = useUiShellContext();

  return (
    <SideNavHeaderContainer>
      <SideNavLogoContainer
        data-se="sidenav-header-logo-container"
        headerBackgroundColor={uiShellContext?.sideNavBackgroundColor}
        isSameBackgroundAsMain={logoProps?.isSameBackgroundAsMain}
        odysseyDesignTokens={odysseyDesignTokens}
      >
        {isLoading ? (
          //  The skeleton takes the hardcoded dimensions of the Okta logo
          <Skeleton height={24} variant="rounded" width={67} />
        ) : (
          <UiShellLogo {...logoProps} />
        )}
      </SideNavLogoContainer>

      {appName && (
        <SideNavHeadingContainer
          contrastFontColor={uiShellContext?.sideNavContrastColors?.fontColor}
          odysseyDesignTokens={odysseyDesignTokens}
        >
          <Heading5 component="h2">
            {isLoading ? <Skeleton /> : appName}
          </Heading5>
        </SideNavHeadingContainer>
      )}
    </SideNavHeaderContainer>
  );
};

const MemoizedSideNavHeader = memo(SideNavHeader);
MemoizedSideNavHeader.displayName = "SideNavHeader";

export { MemoizedSideNavHeader as SideNavHeader };
