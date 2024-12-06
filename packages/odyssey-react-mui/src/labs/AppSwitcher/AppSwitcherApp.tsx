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
import { useCallback } from "react";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext";
import { ContrastMode, useContrastModeContext } from "../../useContrastMode";
import { Tooltip } from "../../Tooltip";
import { MuiPropsContext, MuiPropsContextType } from "../../MuiPropsContext";

const AppSwitcherAppWrapperComponent = styled("li", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
  margin: "auto",
  marginBlockEnd: odysseyDesignTokens.Spacing3,
  textAlign: "center",
}));

const AppSwitcherAppLinkComponent = styled("a", {
  shouldForwardProp: (prop) =>
    !["odysseyDesignTokens", "isSelected", "contrastMode"].includes(prop),
})(
  ({
    odysseyDesignTokens,
    isSelected,
    contrastMode,
  }: {
    odysseyDesignTokens: DesignTokens;
    isSelected: boolean;
    contrastMode: ContrastMode;
  }) => ({
    display: "inline-block",
    margin: "auto",
    padding: odysseyDesignTokens.Spacing1,
    backgroundColor: isSelected
      ? contrastMode === "highContrast"
        ? "#292930"
        : odysseyDesignTokens.PalettePrimaryLighter
      : "transparent",
    borderRadius: odysseyDesignTokens.BorderRadiusTight,
    transition: `background-color ${odysseyDesignTokens.TransitionDurationMain}`,
    "&:hover, &:focus": {
      backgroundColor:
        contrastMode === "highContrast"
          ? "#252525"
          : odysseyDesignTokens.HueNeutral50,
    },
  }),
);

// Similar to AppSwitcherAppLinkComponent
const AppSwitcherAppSkeletonWrapperComponent = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
  display: "inline-block",
  margin: "auto",
  padding: odysseyDesignTokens.Spacing1,
}));

const AppSwitcherAppImgComponent = styled("img", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
  display: "block",
  width: odysseyDesignTokens.Spacing6,
  height: odysseyDesignTokens.Spacing6,
}));

export interface AppSwitcherAppIconData {
  appIconDefaultUrl: string;
  appIconSelectedUrl: string;
  appName: string;
  label: string;
  linkUrl: string;
}

export type AppSwitcherAppProps = AppSwitcherAppIconData & {
  selectedAppName?: string;
};

export const AppSwitcherApp = ({
  appIconDefaultUrl,
  appIconSelectedUrl,
  appName,
  label,
  linkUrl,
  selectedAppName,
}: AppSwitcherAppProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const isSelected = appName === selectedAppName;
  const { contrastMode } = useContrastModeContext();

  const renderAppIconLink = useCallback(
    (muiProps: MuiPropsContextType) => (
      <AppSwitcherAppLinkComponent
        {...muiProps}
        odysseyDesignTokens={odysseyDesignTokens}
        isSelected={isSelected}
        contrastMode={contrastMode}
        href={linkUrl}
        aria-current={isSelected ? "page" : undefined}
      >
        <AppSwitcherAppImgComponent
          odysseyDesignTokens={odysseyDesignTokens}
          src={isSelected ? appIconSelectedUrl : appIconDefaultUrl}
          role="presentation"
        />
      </AppSwitcherAppLinkComponent>
    ),
    [
      odysseyDesignTokens,
      isSelected,
      linkUrl,
      appIconDefaultUrl,
      appIconSelectedUrl,
      contrastMode,
    ],
  );

  return (
    <AppSwitcherAppWrapperComponent odysseyDesignTokens={odysseyDesignTokens}>
      <Tooltip ariaType="label" placement="right" text={label} translate="no">
        <MuiPropsContext.Consumer>{renderAppIconLink}</MuiPropsContext.Consumer>
      </Tooltip>
    </AppSwitcherAppWrapperComponent>
  );
};

export const AppSwitcherAppSkeleton = () => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  return (
    <AppSwitcherAppWrapperComponent odysseyDesignTokens={odysseyDesignTokens}>
      <AppSwitcherAppSkeletonWrapperComponent
        odysseyDesignTokens={odysseyDesignTokens}
      >
        <Skeleton
          variant="rounded"
          width={odysseyDesignTokens.Spacing6}
          height={odysseyDesignTokens.Spacing6}
        />
      </AppSwitcherAppSkeletonWrapperComponent>
    </AppSwitcherAppWrapperComponent>
  );
};
