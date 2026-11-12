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
import { type ResolvedColorScheme } from "./useColorScheme.js";
import { ContrastMode } from "./useContrastMode.js";

export type ThemeCache = {
  colorScheme: ResolvedColorScheme;
  get: (contrastMode: ContrastMode) => Theme;
  odysseyTokens: DesignTokens;
  shadowRootElement?: HTMLElement;
};

export const ThemeCacheContext = createContext<ThemeCache | null>(null);

export const useThemeCache = ({
  colorScheme,
  isEnabled = true,
  odysseyTokens,
  shadowRootElement,
}: UseThemeCacheArgs) => {
  const existingCache = useContext(ThemeCacheContext);
  const hasMatchingParentCache = Boolean(
    existingCache &&
      existingCache.colorScheme === colorScheme &&
      existingCache.odysseyTokens === odysseyTokens &&
      existingCache.shadowRootElement === shadowRootElement,
  );

  const localCache = useMemo(
    () =>
      hasMatchingParentCache || !isEnabled
        ? undefined
        : {
            highContrast: createOdysseyMuiTheme({
              colorScheme,
              contrastMode: "highContrast",
              odysseyTokens,
              shadowRootElement,
            }),
            lowContrast: createOdysseyMuiTheme({
              colorScheme,
              contrastMode: "lowContrast",
              odysseyTokens,
              shadowRootElement,
            }),
          },
    [
      colorScheme,
      hasMatchingParentCache,
      isEnabled,
      odysseyTokens,
      shadowRootElement,
    ],
  );

  const getOrCreateTheme = useCallback(
    (contrastMode: ContrastMode) => {
      if (hasMatchingParentCache && existingCache)
        return existingCache.get(contrastMode);
      if (localCache) return localCache[contrastMode];
      throw new Error("Odyssey theme cache is unavailable");
    },
    [existingCache, hasMatchingParentCache, localCache],
  );

  const themeCache = useMemo<ThemeCache>(
    () => ({
      colorScheme,
      get: getOrCreateTheme,
      odysseyTokens,
      shadowRootElement,
    }),
    [colorScheme, getOrCreateTheme, odysseyTokens, shadowRootElement],
  );

  return { getOrCreateTheme, themeCache };
};

export type UseThemeCacheArgs = {
  colorScheme: ResolvedColorScheme;
  /**
   * If `false`, builds no themes. A provider passes `false` for a scheme it is not rendering when it cannot switch to that scheme on its own, so it never builds themes nothing reads.
   * @default true
   */
  isEnabled?: boolean;
  odysseyTokens: DesignTokens;
  shadowRootElement?: HTMLElement;
};
