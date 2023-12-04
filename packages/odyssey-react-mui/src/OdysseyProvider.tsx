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

import { memo, ReactNode } from "react";

import {
  OdysseyCacheProvider,
  OdysseyCacheProviderProps,
} from "./OdysseyCacheProvider";
import {
  OdysseyThemeProvider,
  OdysseyThemeProviderProps,
} from "./OdysseyThemeProvider";
import {
  OdysseyTranslationProvider,
  OdysseyTranslationProviderProps,
} from "./OdysseyTranslationProvider";

export type OdysseyProviderProps<Languages extends string> =
  OdysseyCacheProviderProps &
    OdysseyThemeProviderProps &
    OdysseyTranslationProviderProps<Languages> & {
      children: ReactNode;
    };

const OdysseyProvider = <Languages extends string>({
  children,
  designTokensOverride,
  languageCode,
  nonce,
  stylisPlugins,
  themeOverride,
  translationOverrides,
}: OdysseyProviderProps<Languages>) => (
  <OdysseyCacheProvider nonce={nonce} stylisPlugins={stylisPlugins}>
    <OdysseyThemeProvider
      themeOverride={themeOverride}
      designTokensOverride={designTokensOverride}
    >
      <OdysseyTranslationProvider
        languageCode={languageCode}
        translationOverrides={translationOverrides}
      >
        {children}
      </OdysseyTranslationProvider>
    </OdysseyThemeProvider>
  </OdysseyCacheProvider>
);

const MemoizedThemeProvider = memo(OdysseyProvider);

export { MemoizedThemeProvider as OdysseyProvider };
