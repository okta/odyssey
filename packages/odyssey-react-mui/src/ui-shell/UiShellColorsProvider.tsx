/*!
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { createContext, memo, PropsWithChildren, useContext } from "react";
import {
  generateContrastColors,
  ContrastColors,
} from "../createContrastColors";
import { useOdysseyDesignTokens } from "../OdysseyDesignTokensContext";

export type UiShellColors = {
  appBackgroundColor: string;
  sideNavBackgroundColor: string;
  sideNavContrastColors?: ContrastColors | undefined;
  topNavBackgroundColor: string;
};

const UiShellColorsContext = createContext<UiShellColors | undefined>(
  undefined,
);

export const useUiShellContrastColorContext = () => {
  return useContext(UiShellColorsContext);
};

export type UiShellColorsProviderProps = {
  appBackgroundColor?: string;
  sideNavBackgroundColor?: string;
  topNavBackgroundColor?: string;
  appBackgroundContrastMode?: string;
};

const UiShellColorsProvider = ({
  appBackgroundColor,
  appBackgroundContrastMode,
  sideNavBackgroundColor,
  topNavBackgroundColor,
  children,
}: PropsWithChildren<UiShellColorsProviderProps>) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const defaultedSideNavBackgroundColor =
    sideNavBackgroundColor || odysseyDesignTokens.HueNeutralWhite;

  const sideNavContrastColors =
    defaultedSideNavBackgroundColor !== odysseyDesignTokens.HueNeutralWhite
      ? generateContrastColors(
          defaultedSideNavBackgroundColor,
          odysseyDesignTokens,
        )
      : undefined;

  const isAppBackgroundHightContrast =
    appBackgroundContrastMode === "highContrast";

  const defaultTopAndAppBackgroundColor = isAppBackgroundHightContrast
    ? odysseyDesignTokens.HueNeutralWhite
    : odysseyDesignTokens.HueNeutral50;

  const topNavColor = topNavBackgroundColor || defaultTopAndAppBackgroundColor;

  const appContentBackgroundColor =
    appBackgroundColor || defaultTopAndAppBackgroundColor;

  return (
    <UiShellColorsContext.Provider
      value={{
        appBackgroundColor: appContentBackgroundColor,
        sideNavBackgroundColor:
          sideNavBackgroundColor || odysseyDesignTokens.HueNeutralWhite,
        sideNavContrastColors,
        topNavBackgroundColor: topNavColor,
      }}
    >
      {children}
    </UiShellColorsContext.Provider>
  );
};

const MemoizedUiShellColorsProvider = memo(UiShellColorsProvider);

export { MemoizedUiShellColorsProvider as UiShellColorsProvider };
