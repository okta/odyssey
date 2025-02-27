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

import {
  createContext,
  memo,
  PropsWithChildren,
  useContext,
  useMemo,
} from "react";
import {
  ContrastColors,
  generateContrastColors,
} from "../createContrastColors.js";
import { useOdysseyDesignTokens } from "../OdysseyDesignTokensContext.js";
import { createMessageBus, MessageBus } from "./createMessageBus.js";

export type UiShellColors = {
  appBackgroundColor: string;
  sideNavBackgroundColor: string;
  sideNavContrastColors?: ContrastColors | undefined;
  topNavBackgroundColor: string;
};

export type UiShellContext = {
  publishSideNavItemClicked: MessageBus<void>["publish"];
  subscribeSideNavItemClicked: MessageBus<void>["subscribe"];
} & UiShellColors;

const UiShellContext = createContext<UiShellContext | undefined>(undefined);

export const useUiShellContext = () => {
  return useContext(UiShellContext);
};

export type UiShellProviderProps = {
  appBackgroundContrastMode?: string;
} & Partial<
  Pick<
    UiShellColors,
    "appBackgroundColor" | "sideNavBackgroundColor" | "topNavBackgroundColor"
  >
>;

const UiShellProvider = ({
  appBackgroundColor,
  appBackgroundContrastMode = "lowContrast",
  children,
  sideNavBackgroundColor,
  topNavBackgroundColor,
}: PropsWithChildren<UiShellProviderProps>) => {
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

  const {
    publish: publishSideNavItemClicked,
    subscribe: subscribeSideNavItemClicked,
  } = useMemo(() => createMessageBus(), []);

  const memoizedContextValue = useMemo(
    () => ({
      appBackgroundColor: appContentBackgroundColor,
      publishSideNavItemClicked,
      sideNavBackgroundColor:
        sideNavBackgroundColor || odysseyDesignTokens.HueNeutralWhite,
      sideNavContrastColors,
      subscribeSideNavItemClicked,
      topNavBackgroundColor: topNavColor,
    }),
    [
      appContentBackgroundColor,
      odysseyDesignTokens,
      publishSideNavItemClicked,
      sideNavBackgroundColor,
      sideNavContrastColors,
      subscribeSideNavItemClicked,
      topNavColor,
    ],
  );

  return (
    <UiShellContext.Provider value={memoizedContextValue}>
      {children}
    </UiShellContext.Provider>
  );
};

const MemoizedUiShellProvider = memo(UiShellProvider);

export { MemoizedUiShellProvider as UiShellProvider };
