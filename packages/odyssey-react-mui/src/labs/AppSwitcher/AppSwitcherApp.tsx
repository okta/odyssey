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
import { Tooltip } from "../../Tooltip";
import { MuiPropsContext, MuiPropsContextType } from "../../MuiPropsContext";

const APP_SIDE_LENGTH_VAL = 36;
const APP_SIDE_LENGTH_REM = `${APP_SIDE_LENGTH_VAL / 14}rem`;
const APP_ICON_SIDE_LENGTH = `${32 / 14}rem`;

const AppSwitcherAppWrapperComponent = styled("li", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
  margin: "auto",
  marginBottom: odysseyDesignTokens.Spacing3,
  width: APP_SIDE_LENGTH_REM,
  height: APP_SIDE_LENGTH_REM,
}));

const AppSwitcherAppLinkComponent = styled("a", {
  shouldForwardProp: (prop) =>
    !["odysseyDesignTokens", "isSelected"].includes(prop),
})(
  ({
    odysseyDesignTokens,
    isSelected,
  }: {
    odysseyDesignTokens: DesignTokens;
    isSelected: boolean;
  }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    width: APP_SIDE_LENGTH_REM,
    height: APP_SIDE_LENGTH_REM,
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

const AppSwitcherAppImgComponent = styled("img")(() => ({
  margin: 0,
  width: APP_ICON_SIDE_LENGTH,
  height: APP_ICON_SIDE_LENGTH,
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
        odysseyDesignTokens={odysseyDesignTokens}
        isSelected={isSelected}
        href={linkUrl}
        aria-current={isSelected ? "page" : undefined}
      >
        <AppSwitcherAppImgComponent
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
      <Skeleton
        variant="rounded"
        width={APP_SIDE_LENGTH_VAL}
        height={APP_SIDE_LENGTH_VAL}
      />
    </AppSwitcherAppWrapperComponent>
  );
};
