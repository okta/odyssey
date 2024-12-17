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
  sideNavBackgroundColor: string;
  sideNavContrastColors?: ContrastColors | undefined;
  topNavBackgroundColor: string;
  appContentBackgroundColor: string;
};

const UiShellColorsContext = createContext<UiShellColors | undefined>(
  undefined,
);

export const useUiShellContrastColorContext = () => {
  return useContext(UiShellColorsContext);
};

export type UiShellColorsProviderProps = {
  sideNavBackgroundColor: string;
  topNavBackgroundColor?: string;
  contrastMode?: string;
};
const UiShellColorsProvider = ({
  sideNavBackgroundColor,
  topNavBackgroundColor,
  contrastMode,
  children,
}: PropsWithChildren<UiShellColorsProviderProps>) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const sideNavContrastColors =
    sideNavBackgroundColor != odysseyDesignTokens.HueNeutralWhite
      ? generateContrastColors(
          sideNavBackgroundColor || odysseyDesignTokens.HueNeutralWhite,
          odysseyDesignTokens,
        )
      : undefined;
  const isHightContrast = contrastMode === "highContrast";

  const topNavColor = topNavBackgroundColor || isHightContrast ? "red" : "blue";
  const appContentBackgroundColor = isHightContrast ? "red" : "blue";

  return (
    <UiShellColorsContext.Provider
      value={{
        sideNavBackgroundColor:
          sideNavBackgroundColor || odysseyDesignTokens.HueNeutralWhite,
        sideNavContrastColors,
        topNavBackgroundColor: topNavColor,
        appContentBackgroundColor,
      }}
    >
      {children}
    </UiShellColorsContext.Provider>
  );
};

const MemoizedUiShellColorsProvider = memo(UiShellColorsProvider);

export { MemoizedUiShellColorsProvider as UiShellColorsProvider };
