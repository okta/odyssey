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
import { useCallback } from "react";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext";
import { Tooltip } from "../../Tooltip";
import { MuiPropsContext, MuiPropsContextType } from "../../MuiPropsContext";

const APP_SIDE_LENGTH = "36px";
const APP_ICON_SIDE_LENGTH = "32px";

const NavRailAppWrapperComponent = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
  margin: "auto",
  marginBottom: odysseyDesignTokens.Spacing3,
  width: APP_SIDE_LENGTH,
  height: APP_SIDE_LENGTH,
}));

const NavRailAppLinkComponent = styled("a", {
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
    width: APP_SIDE_LENGTH,
    height: APP_SIDE_LENGTH,
    backgroundColor: isSelected ? odysseyDesignTokens.HueBlue50 : "transparent",
    borderRadius: odysseyDesignTokens.BorderRadiusTight,
    transition: `background-color ${odysseyDesignTokens.TransitionDurationMain}`,

    "&:hover, &:focus": {
      backgroundColor: odysseyDesignTokens.HueNeutral50,
    },
  }),
);

const NavRailAppImgComponent = styled("img")(() => ({
  margin: 0,
  width: APP_ICON_SIDE_LENGTH,
  height: APP_ICON_SIDE_LENGTH,
}));

export interface NavRailAppProps {
  appIconDefaultUrl: string;
  appIconSelectedUrl: string;
  appName: string;
  label: string;
  linkUrl: string;
  selectedAppName?: string;
}

export const NavRailApp = ({
  appIconDefaultUrl,
  appIconSelectedUrl,
  appName,
  label,
  linkUrl,
  selectedAppName,
}: NavRailAppProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const isSelected = appName === selectedAppName;

  const renderAppIconLink = useCallback(
    (muiProps: MuiPropsContextType) => {
      return (
        <NavRailAppLinkComponent
          {...muiProps}
          odysseyDesignTokens={odysseyDesignTokens}
          isSelected={isSelected}
          href={linkUrl}
        >
          <NavRailAppImgComponent
            src={isSelected ? appIconSelectedUrl : appIconDefaultUrl}
            alt="" // Tell screen reader to ignore the image; the Tooltip describes the link
          />
        </NavRailAppLinkComponent>
      );
    },
    [
      odysseyDesignTokens,
      isSelected,
      linkUrl,
      appIconDefaultUrl,
      appIconSelectedUrl,
    ],
  );

  return (
    <NavRailAppWrapperComponent odysseyDesignTokens={odysseyDesignTokens}>
      <Tooltip ariaType="label" placement="right" text={label} translate="no">
        <MuiPropsContext.Consumer>{renderAppIconLink}</MuiPropsContext.Consumer>
      </Tooltip>
    </NavRailAppWrapperComponent>
  );
};
