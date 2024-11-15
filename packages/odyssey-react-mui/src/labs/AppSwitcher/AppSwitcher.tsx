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
import { OktaAura } from "./OktaAura";
import {
  AppSwitcherApp,
  AppSwitcherAppIconData,
  AppSwitcherAppSkeleton,
} from "./AppSwitcherApp";
import { TOP_NAV_HEIGHT } from "../TopNav";

const APP_SWITCHER_WIDTH = `${64 / 14}rem`;

export type AppSwitcherProps = {
  appIcons: AppSwitcherAppIconData[];
  selectedAppName: string;
  isLoading: boolean;
};

const AppSwitcherWrapperComponent = styled("nav", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
  position: "relative",
  display: "inline-block",
  width: APP_SWITCHER_WIDTH,
  height: "100%",
  backgroundColor: odysseyDesignTokens.HueNeutralWhite,
  borderInlineEndStyle: "solid",
  borderInlineEndWidth: odysseyDesignTokens.BorderWidthMain,
  borderInlineEndColor: odysseyDesignTokens.BorderColorDisplay,
}));

const AppSwitcherOktaAuraWrapperComponent = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
  width: "100%",
  height: TOP_NAV_HEIGHT,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: odysseyDesignTokens.Spacing4,
}));

const AppSwitcherAppIconULComponent = styled("ul")(() => ({
  listStyleType: "none",
  margin: 0,
  padding: 0,
}));

const AppSwitcher = ({
  appIcons,
  isLoading,
  selectedAppName,
}: AppSwitcherProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  return (
    <AppSwitcherWrapperComponent odysseyDesignTokens={odysseyDesignTokens}>
      <AppSwitcherOktaAuraWrapperComponent
        odysseyDesignTokens={odysseyDesignTokens}
      >
        <OktaAura />
      </AppSwitcherOktaAuraWrapperComponent>
      <AppSwitcherAppIconULComponent>
        {isLoading
          ? [...Array(3)].map(() => <AppSwitcherAppSkeleton />)
          : appIcons?.map((appIcon) => (
              <AppSwitcherApp selectedAppName={selectedAppName} {...appIcon} />
            ))}
      </AppSwitcherAppIconULComponent>
    </AppSwitcherWrapperComponent>
  );
};

const MemoizedAppSwitcher = memo(AppSwitcher);
MemoizedAppSwitcher.displayName = "AppSwitcher";

export { MemoizedAppSwitcher as AppSwitcher };
