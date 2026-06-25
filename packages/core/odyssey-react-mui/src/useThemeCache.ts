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

import { Theme } from "@mui/material/styles";
import { createContext, useCallback, useContext, useMemo } from "react";

import { createOdysseyMuiTheme, DesignTokens } from "./theme/theme.js";
import { ContrastMode } from "./useContrastMode.js";

export type ThemeCache = {
  get: (contrastMode: ContrastMode) => Theme;
  odysseyTokens: DesignTokens;
  shadowRootElement: HTMLElement | undefined;
};

export const ThemeCacheContext = createContext<ThemeCache | null>(null);

export const useThemeCache = ({
  odysseyTokens,
  shadowRootElement,
}: {
  odysseyTokens: DesignTokens;
  shadowRootElement: HTMLElement | undefined;
}) => {
  const existingCache = useContext(ThemeCacheContext);

  const localCache = useMemo(
    () => new Map<ContrastMode, Theme>(),
    // Reset the cache when tokens or shadow root change so stale Themes
    // can't be returned for a different DesignTokens/shadowRootElement pair.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [odysseyTokens, shadowRootElement],
  );

  const getOrCreateTheme = useCallback(
    (mode: ContrastMode) => {
      if (
        existingCache &&
        existingCache.odysseyTokens === odysseyTokens &&
        existingCache.shadowRootElement === shadowRootElement
      ) {
        return existingCache.get(mode);
      }
      const cached = localCache.get(mode);
      if (cached) return cached;
      const theme = createOdysseyMuiTheme({
        contrastMode: mode,
        odysseyTokens,
        shadowRootElement,
      });
      localCache.set(mode, theme);
      return theme;
    },
    [existingCache, localCache, odysseyTokens, shadowRootElement],
  );

  const themeCache = useMemo<ThemeCache>(
    () => ({ get: getOrCreateTheme, odysseyTokens, shadowRootElement }),
    [getOrCreateTheme, odysseyTokens, shadowRootElement],
  );

  return { getOrCreateTheme, themeCache };
};
