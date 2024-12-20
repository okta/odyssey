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
import { SideNavLogo } from "./SideNavLogo";
import { SideNavLogoProps, SideNavProps } from "./types";
import { Heading5 } from "../../Typography";
import { TOP_NAV_HEIGHT } from "../TopNav";
import { ContrastColors } from "../../createContrastColors";
import { useUiShellContrastColorContext } from "../../ui-shell/UiShell/UiShellColorsProvider";

const SideNavHeaderContainer = styled("div")(() => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  zIndex: 1,
}));

const SideNavLogoContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "isSameBackgroundAsMain",
})(
  ({
    isSameBackgroundAsMain,
    odysseyDesignTokens,
  }: {
    isSameBackgroundAsMain: SideNavLogoProps["isSameBackgroundAsMain"];
    odysseyDesignTokens: DesignTokens;
  }) => ({
    display: "flex",
    alignItems: "center",
    height: TOP_NAV_HEIGHT,
    paddingBlock: odysseyDesignTokens.Spacing4,
    paddingInline: odysseyDesignTokens.Spacing5,
    backgroundColor: isSameBackgroundAsMain
      ? "transparent"
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
} & Pick<SideNavProps, "logoProps">;

const SideNavHeader = ({
  appName,
  isLoading,
  logoProps,
}: SideNavHeaderProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const shellContrastColors = useUiShellContrastColorContext();

  return (
    <SideNavHeaderContainer>
      <SideNavLogoContainer
        isSameBackgroundAsMain={logoProps?.isSameBackgroundAsMain}
        odysseyDesignTokens={odysseyDesignTokens}
      >
        {isLoading ? (
          //  The skeleton takes the hardcoded dimensions of the Okta logo
          <Skeleton variant="rounded" height={24} width={67} />
        ) : (
          <SideNavLogo {...logoProps} />
        )}
      </SideNavLogoContainer>

      {appName && (
        <SideNavHeadingContainer
          contrastFontColor={
            shellContrastColors?.sideNavContrastColors?.fontColor
          }
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
