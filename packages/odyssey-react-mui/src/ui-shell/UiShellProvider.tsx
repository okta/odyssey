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
  Dispatch,
  memo,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  generateContrastColors,
  ContrastColors,
} from "../createContrastColors.js";
import { useOdysseyDesignTokens } from "../OdysseyDesignTokensContext.js";
import { DEFAULT_SIDE_NAV_WIDTH, SideNavProps } from "./SideNav/index.js";

const pxToRem = (px: number, rootFontSize: number) => px / rootFontSize;

export type UiShellColors = {
  appBackgroundColor: string;
  sideNavBackgroundColor: string;
  sideNavContrastColors?: ContrastColors | undefined;
  topNavBackgroundColor: string;
};

export type UiShellContextValue = UiShellColors & {
  isMobile: boolean;
  isSideNavCollapsed: SideNavProps["isCollapsed"];
  setIsSideNavCollapsed: Dispatch<SetStateAction<boolean | undefined>>;
};

const UiShellContext = createContext<UiShellContextValue | undefined>(
  undefined,
);

export const useUiShellContext = () => {
  return useContext(UiShellContext);
};

export type UiShellProviderProps = {
  appBackgroundColor?: string;
  appBackgroundContrastMode?: string;
  hasAppSwitcher?: boolean;
  hasSideNav?: boolean;
  isSideNavCollapsed?: SideNavProps["isCollapsed"];
  sideNavBackgroundColor?: string;
  topNavBackgroundColor?: string;
};

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);
  // console.log(window.innerWidth);
  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);

    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

const BASE_MOBILE_BREAKPOINT = 768;
const APP_SWITCHER_WIDTH = 64;

const UiShellProvider = ({
  appBackgroundColor,
  appBackgroundContrastMode = "lowContrast",
  hasAppSwitcher,
  hasSideNav,
  isSideNavCollapsed: isSideNavCollapsedProp,
  sideNavBackgroundColor,
  topNavBackgroundColor,
  children,
}: PropsWithChildren<UiShellProviderProps>) => {
  const [isSideNavCollapsed, setIsSideNavCollapsed] = useState(
    isSideNavCollapsedProp,
  );

  const odysseyDesignTokens = useOdysseyDesignTokens();

  // 87.5
  const odysseyBaseFontSizeAsNumber = parseFloat(
    odysseyDesignTokens.TypographySizeBase,
  );

  // 87.5 needs to be applied as a percentage of the baseFontSize of 16
  const rootFontSize = (16 * odysseyBaseFontSizeAsNumber) / 100;

  const [mobileBreakPoint, setMobileBreakpoint] = useState<number>(
    pxToRem(BASE_MOBILE_BREAKPOINT, rootFontSize),
  );

  useEffect(() => {
    if (hasSideNav) {
      const baseBreakpoint =
        BASE_MOBILE_BREAKPOINT + parseInt(DEFAULT_SIDE_NAV_WIDTH);

      if (hasAppSwitcher) {
        const breakpointWithAppSwitcher = baseBreakpoint + APP_SWITCHER_WIDTH;

        setMobileBreakpoint(pxToRem(breakpointWithAppSwitcher, rootFontSize));
      } else {
        setMobileBreakpoint(pxToRem(baseBreakpoint, rootFontSize));
      }
    }

    if (hasAppSwitcher && !hasSideNav) {
      setMobileBreakpoint(
        pxToRem(BASE_MOBILE_BREAKPOINT + APP_SWITCHER_WIDTH, rootFontSize),
      );
    }
  }, [hasAppSwitcher, hasSideNav, rootFontSize]);

  const isMobile = useMediaQuery(`(max-width: ${mobileBreakPoint}rem)`);

  useEffect(() => {
    if (isMobile) {
      setIsSideNavCollapsed(true);
    } else {
      setIsSideNavCollapsed(isSideNavCollapsedProp || false);
    }
  }, [isMobile, isSideNavCollapsed, isSideNavCollapsedProp]);

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

  const memoizedContextValue = useMemo(
    () => ({
      appBackgroundColor: appContentBackgroundColor,
      isMobile,
      isSideNavCollapsed,
      setIsSideNavCollapsed,
      sideNavBackgroundColor:
        sideNavBackgroundColor || odysseyDesignTokens.HueNeutralWhite,
      sideNavContrastColors,
      topNavBackgroundColor: topNavColor,
    }),
    [
      appContentBackgroundColor,
      isMobile,
      isSideNavCollapsed,
      odysseyDesignTokens,
      setIsSideNavCollapsed,
      sideNavBackgroundColor,
      sideNavContrastColors,
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
