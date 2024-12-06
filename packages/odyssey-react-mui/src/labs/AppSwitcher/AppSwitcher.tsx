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
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext";
import { ContrastMode, useContrastModeContext } from "../../useContrastMode";
import { OktaAura } from "./OktaAura";
import {
  AppSwitcherApp,
  AppSwitcherAppIconData,
  AppSwitcherAppSkeleton,
} from "./AppSwitcherApp";
import { TOP_NAV_HEIGHT } from "../TopNav";

export type AppSwitcherProps = {
  appIcons: AppSwitcherAppIconData[];
  selectedAppName: string;
  isLoading: boolean;
};

const AppSwitcherWrapperComponent = styled("nav", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "contrastMode",
})<{
  odysseyDesignTokens: DesignTokens;
  contrastMode: ContrastMode;
}>(({ odysseyDesignTokens, contrastMode }) => ({
  position: "relative",
  display: "inline-block",
  height: "100%",
  backgroundColor:
    contrastMode === "highContrast"
      ? "#121212"
      : odysseyDesignTokens.HueNeutralWhite,
  borderInlineEndStyle: "solid",
  borderInlineEndWidth: odysseyDesignTokens.BorderWidthMain,
  borderInlineEndColor:
    contrastMode === "highContrast"
      ? "#292930"
      : odysseyDesignTokens.BorderColorDisplay,
}));

const AppSwitcherOktaAuraWrapperComponent = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
  height: TOP_NAV_HEIGHT,
  padding: odysseyDesignTokens.Spacing4,
  margin: "auto",
  marginBlockEnd: odysseyDesignTokens.Spacing4,
}));

const AppSwitcherAppIconULComponent = styled("ul", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
  listStyleType: "none",
  margin: odysseyDesignTokens.Spacing0,
  padding: odysseyDesignTokens.Spacing0,
}));

const AppSwitcher = ({
  appIcons,
  isLoading,
  selectedAppName,
}: AppSwitcherProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { contrastMode } = useContrastModeContext();

  return (
    <AppSwitcherWrapperComponent
      odysseyDesignTokens={odysseyDesignTokens}
      contrastMode={contrastMode}
    >
      <AppSwitcherOktaAuraWrapperComponent
        odysseyDesignTokens={odysseyDesignTokens}
      >
        <OktaAura contrastMode={contrastMode} />
      </AppSwitcherOktaAuraWrapperComponent>
      <AppSwitcherAppIconULComponent odysseyDesignTokens={odysseyDesignTokens}>
        {isLoading
          ? [0, 1, 2].map((key) => <AppSwitcherAppSkeleton key={key} />)
          : appIcons?.map((appIcon) => (
              <AppSwitcherApp
                key={appIcon.appName}
                selectedAppName={selectedAppName}
                {...appIcon}
              />
            ))}
      </AppSwitcherAppIconULComponent>
    </AppSwitcherWrapperComponent>
  );
};

const MemoizedAppSwitcher = memo(AppSwitcher);
MemoizedAppSwitcher.displayName = "AppSwitcher";

export { MemoizedAppSwitcher as AppSwitcher };
