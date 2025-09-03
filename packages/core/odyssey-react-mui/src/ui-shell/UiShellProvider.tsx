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
import { ContrastMode } from "../useContrastMode.js";
import { createMessageBus, MessageBus } from "./createMessageBus.js";

export const defaultCloseSideNavMessageBus = createMessageBus();
export const defaultSubscribeToCloseRightSideMenu = () => () => {};

export type UiShellColors = {
  /**
   * Custom background color for the app content area.
   */
  appBackgroundColor: string;
  /**
   * Custom background color for the side nav area.
   */
  sideNavBackgroundColor: string;
  /**
   * Custom color for fonts and other contrasted colors in the side nav area. Other contrast colors are derived from this one.
   *
   * If not passed, it gets computed from Odyssey.
   */
  sideNavBackgroundContrastColor?: string;
  sideNavContrastColors?: ContrastColors;
  /**
   * Custom background color for the top nav area.
   */
  topNavBackgroundColor: string;
};

export type UiShellContext = {
  /**
   * This is a callback that publishes a change to all subscribers listening for when to close the side nav.
   */
  closeSideNavMenu: MessageBus<void>["publish"];
  /**
   * This is a callback that provides a subscriber callback to listen for changes to state.
   * It allows UI Shell to listen for a publisher that asks us to close the right-side menu.
   */
  subscribeToCloseRightSideMenu: MessageBus<void>["subscribe"];
  /**
   * This is a callback that provides a subscriber callback to listen for changes to state.
   * It allows UI Shell to listen for a publisher that asks us to close the side nav.
   */
  subscribeToCloseSideNavMenu: MessageBus<void>["subscribe"];
} & UiShellColors;

const UiShellContext = createContext<UiShellContext | undefined>(undefined);

export const useUiShellContext = () => {
  return useContext(UiShellContext);
};

export type UiShellProviderProps = {
  /**
   * Sets either a gray or white background color for the app content area.
   */
  appBackgroundContrastMode?: ContrastMode;
} & Partial<UiShellContext>;

const UiShellProvider = ({
  appBackgroundColor,
  appBackgroundContrastMode = "lowContrast",
  children,
  closeSideNavMenu,
  sideNavBackgroundColor,
  sideNavBackgroundContrastColor,
  subscribeToCloseRightSideMenu,
  subscribeToCloseSideNavMenu,
  topNavBackgroundColor,
}: PropsWithChildren<UiShellProviderProps>) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const defaultedSideNavBackgroundColor =
    sideNavBackgroundColor || odysseyDesignTokens.HueNeutralWhite;

  const sideNavContrastColors =
    defaultedSideNavBackgroundColor !== odysseyDesignTokens.HueNeutralWhite
      ? generateContrastColors({
          backgroundColor:
            sideNavBackgroundColor || defaultedSideNavBackgroundColor,
          backgroundContrastColor: sideNavBackgroundContrastColor,
          odysseyDesignTokens,
        })
      : undefined;

  const isAppBackgroundHightContrast =
    appBackgroundContrastMode === "highContrast";

  const defaultTopAndAppBackgroundColor = isAppBackgroundHightContrast
    ? odysseyDesignTokens.HueNeutralWhite
    : odysseyDesignTokens.HueNeutral50;

  const topNavColor = topNavBackgroundColor || defaultTopAndAppBackgroundColor;

  const appContentBackgroundColor =
    appBackgroundColor || defaultTopAndAppBackgroundColor;

  const memoizedContextValue = useMemo(
    () => ({
      appBackgroundColor: appContentBackgroundColor,
      closeSideNavMenu:
        closeSideNavMenu ?? defaultCloseSideNavMessageBus.publish,
      sideNavBackgroundColor:
        sideNavBackgroundColor || odysseyDesignTokens.HueNeutralWhite,
      sideNavContrastColors,
      subscribeToCloseSideNavMenu:
        subscribeToCloseSideNavMenu ?? defaultCloseSideNavMessageBus.subscribe,
      subscribeToCloseRightSideMenu:
        subscribeToCloseRightSideMenu ?? defaultSubscribeToCloseRightSideMenu,
      topNavBackgroundColor: topNavColor,
    }),
    [
      appContentBackgroundColor,
      odysseyDesignTokens.HueNeutralWhite,
      closeSideNavMenu,
      sideNavBackgroundColor,
      sideNavContrastColors,
      subscribeToCloseRightSideMenu,
      subscribeToCloseSideNavMenu,
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
