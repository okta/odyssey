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

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { memo, ReactElement, useMemo } from "react";

import { odysseyTheme } from "./theme";
import { useUniqueAlphabeticalId } from "./useUniqueAlphabeticalId";

const ThemeProvider = ({ children }: { children: ReactElement }) => {
  const uniqueAlphabeticalId = useUniqueAlphabeticalId();

  const emotionCache = useMemo(
    () =>
      createCache({
        key: uniqueAlphabeticalId,
        // @ts-expect-error ts(2345)
        nonce: window.cspNonce,
      }),
    [uniqueAlphabeticalId]
  );

  return (
    <CacheProvider value={emotionCache}>
      <MuiThemeProvider theme={odysseyTheme}>{children}</MuiThemeProvider>
    </CacheProvider>
  );
};

const MemoizedThemeProvider = memo(ThemeProvider);

export { MemoizedThemeProvider as ThemeProvider };
