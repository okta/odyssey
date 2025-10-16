/*!
 * Copyright (c) 2025-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { ThemeOptions } from "@mui/material";
import {
  createContext,
  memo,
  type ReactNode,
  useContext,
  useMemo,
} from "react";

import { DesignTokensOverride } from "./theme/index.js";

export type OdysseyThemeProviderContextProps = {
  designTokensOverride?: DesignTokensOverride;
  shadowRootElement?: HTMLDivElement | HTMLElement;
  themeOverride?: ThemeOptions;
};

export const OdysseyThemeProviderPropsContext =
  createContext<OdysseyThemeProviderContextProps>({});

export const useOdysseyThemeProviderPropsContext = () =>
  useContext(OdysseyThemeProviderPropsContext);

export type OdysseyThemeProviderPropsProviderProps =
  OdysseyThemeProviderContextProps & {
    children: ReactNode;
  };

const OdysseyThemeProviderPropsProvider = ({
  children,
  designTokensOverride,
  shadowRootElement,
  themeOverride,
}: OdysseyThemeProviderPropsProviderProps) => {
  const odysseyThemeProviderPropsContext =
    useOdysseyThemeProviderPropsContext();

  const providerValue = useMemo(
    () => ({
      ...odysseyThemeProviderPropsContext,
      designTokensOverride,
      shadowRootElement,
      themeOverride,
    }),
    [
      designTokensOverride,
      odysseyThemeProviderPropsContext,
      shadowRootElement,
      themeOverride,
    ],
  );

  return (
    <OdysseyThemeProviderPropsContext.Provider value={providerValue}>
      {children}
    </OdysseyThemeProviderPropsContext.Provider>
  );
};

const MemoizedOdysseyThemeProviderPropsProvider = memo(
  OdysseyThemeProviderPropsProvider,
);
MemoizedOdysseyThemeProviderPropsProvider.displayName =
  "OdysseyThemeProviderPropsProvider";

export { MemoizedOdysseyThemeProviderPropsProvider as OdysseyThemeProviderPropsProvider };
