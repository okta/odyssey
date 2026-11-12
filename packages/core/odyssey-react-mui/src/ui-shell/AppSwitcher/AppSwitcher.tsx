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

import { useTranslation } from "../../i18n.generated/i18n.js";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext.js";
import { ScreenReaderText } from "../../ScreenReaderText.js";
import { TOP_NAV_HEIGHT } from "../uiShellSharedConstants.js";
import {
  AppSwitcherApp,
  AppSwitcherAppIconData,
  AppSwitcherAppSkeleton,
} from "./AppSwitcherApp.js";
import { OktaAura } from "./OktaAura.js";

export type AppSwitcherProps = {
  appIcons: AppSwitcherAppIconData[];
  isLoading: boolean;
  selectedAppName: string;
};

const AppSwitcherWrapperComponent = styled("nav", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  position: "relative",
  display: "inline-block",
  height: "100%",
  backgroundColor: odysseyDesignTokens.HueNeutralWhite,
  borderInlineEndStyle: "solid",
  borderInlineEndWidth: odysseyDesignTokens.BorderWidthMain,
  borderInlineEndColor: odysseyDesignTokens.BorderColorDisplay,
}));

const AppSwitcherOktaAuraWrapperComponent = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  height: TOP_NAV_HEIGHT,
  padding: odysseyDesignTokens.Spacing4,
  margin: "auto",
  marginBlockEnd: odysseyDesignTokens.Spacing4,
}));

const AppSwitcherAppIconULComponent = styled("ul", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
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
  const { t } = useTranslation();

  return (
    <AppSwitcherWrapperComponent
      aria-label={t("appswitcher.navigation.label")}
      odysseyDesignTokens={odysseyDesignTokens}
    >
      <AppSwitcherOktaAuraWrapperComponent
        odysseyDesignTokens={odysseyDesignTokens}
      >
        <OktaAura />
      </AppSwitcherOktaAuraWrapperComponent>
      {/*
       * Not a live region: the shell mounts in this state on every first paint, so announcing it would interrupt every page load. Users reach it by moving to the landmark instead.
       */}
      {isLoading && (
        <ScreenReaderText>{t("appswitcher.loading.text")}</ScreenReaderText>
      )}
      <AppSwitcherAppIconULComponent
        aria-busy={isLoading}
        odysseyDesignTokens={odysseyDesignTokens}
      >
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
