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

import { MuiPropsContext, MuiPropsContextType } from "../../MuiPropsContext.js";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext.js";
import { Tooltip } from "../../Tooltip.js";

const AppSwitcherAppWrapperComponent = styled("li", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  margin: "auto",
  marginBlockEnd: odysseyDesignTokens.Spacing3,
  textAlign: "center",
}));

const AppSwitcherAppLinkComponent = styled("a", {
  shouldForwardProp: (prop) =>
    !["isSelected", "odysseyDesignTokens"].includes(prop),
})(
  ({
    odysseyDesignTokens,
    isSelected,
  }: {
    isSelected: boolean;
    odysseyDesignTokens: DesignTokens;
  }) => ({
    display: "inline-block",
    margin: "auto",
    padding: odysseyDesignTokens.Spacing1,
    backgroundColor: isSelected
      ? odysseyDesignTokens.PalettePrimaryLighter
      : "transparent",
    borderRadius: odysseyDesignTokens.BorderRadiusTight,
    transition: `background-color ${odysseyDesignTokens.TransitionDurationMain}`,

    "&:hover, &:focus": {
      backgroundColor: odysseyDesignTokens.HueNeutral50,
    },
  }),
);

// Similar to AppSwitcherAppLinkComponent
const AppSwitcherAppSkeletonWrapperComponent = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  display: "inline-block",
  margin: "auto",
  padding: odysseyDesignTokens.Spacing1,
}));

const AppSwitcherAppImgComponent = styled("img", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
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

  const renderAppIconLink = useCallback(
    (muiProps: MuiPropsContextType) => (
      <AppSwitcherAppLinkComponent
        {...muiProps}
        aria-current={isSelected ? "page" : undefined}
        href={linkUrl}
        isSelected={isSelected}
        odysseyDesignTokens={odysseyDesignTokens}
      >
        <AppSwitcherAppImgComponent
          odysseyDesignTokens={odysseyDesignTokens}
          role="presentation"
          src={isSelected ? appIconSelectedUrl : appIconDefaultUrl}
        />
      </AppSwitcherAppLinkComponent>
    ),
    [
      odysseyDesignTokens,
      isSelected,
      linkUrl,
      appIconDefaultUrl,
      appIconSelectedUrl,
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
          height={odysseyDesignTokens.Spacing6}
          variant="rounded"
          width={odysseyDesignTokens.Spacing6}
        />
      </AppSwitcherAppSkeletonWrapperComponent>
    </AppSwitcherAppWrapperComponent>
  );
};
