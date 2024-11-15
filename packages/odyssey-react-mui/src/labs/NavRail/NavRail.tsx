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
import { NavRailApp, NavRailAppProps } from "./NavRailApp";

const NAV_RAIL_WIDTH = "64px";

export type NavRailProps = {
  appIcons?: Omit<NavRailAppProps, "selectedAppName">[];
  selectedAppName?: string;
};

const NavRailWrapperComponent = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
  position: "relative",
  display: "inline-block",
  width: NAV_RAIL_WIDTH,
  height: "100%",
  backgroundColor: odysseyDesignTokens.HueNeutralWhite,
  borderStyle: "none solid none none",
  borderRightWidth: odysseyDesignTokens.BorderWidthMain,
  borderRightColor: odysseyDesignTokens.BorderColorDisplay,
}));

const NavRailOktaAuraWrapperComponent = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
  width: "100%",
  height: NAV_RAIL_WIDTH,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: odysseyDesignTokens.Spacing4,
}));

const NavRail = ({ appIcons, selectedAppName }: NavRailProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  if (!appIcons || !appIcons.length) {
    // If no apps are shown, then don't display the nav rail at all
    return null;
  }

  return (
    <NavRailWrapperComponent odysseyDesignTokens={odysseyDesignTokens}>
      <NavRailOktaAuraWrapperComponent
        odysseyDesignTokens={odysseyDesignTokens}
      >
        <OktaAura />
      </NavRailOktaAuraWrapperComponent>
      {appIcons.map((appIcon) => (
        <NavRailApp selectedAppName={selectedAppName} {...appIcon} />
      ))}
    </NavRailWrapperComponent>
  );
};

const MemoizedNavRail = memo(NavRail);
MemoizedNavRail.displayName = "NavRail";

export { MemoizedNavRail as NavRail };
