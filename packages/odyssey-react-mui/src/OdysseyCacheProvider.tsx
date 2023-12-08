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

declare global {
  interface Window {
    cspNonce: string;
  }
}

import createCache, { StylisPlugin } from "@emotion/cache";
import { memo, useMemo, ReactNode } from "react";
import { useUniqueAlphabeticalId } from "./useUniqueAlphabeticalId";
import { CacheProvider } from "@emotion/react";

export type OdysseyCacheProviderProps = {
  children: ReactNode;
  nonce?: string;
  /**
   * Emotion caches styles into the style element.
   * When enabling this prop, Emotion caches the styles at this element, rather than in <head>.
   */
  emotionRoot?: HTMLStyleElement;
  /**
   * Emotion renders into this HTML element.
   * When enabling this prop, Emotion renders at the top of this component rather than the bottom like it does in the HTML `<head>`.
   */
  shadowDomElement?: HTMLDivElement | HTMLElement;
  stylisPlugins?: StylisPlugin[];
};

const OdysseyCacheProvider = ({
  children,
  emotionRoot,
  nonce,
  stylisPlugins,
}: OdysseyCacheProviderProps) => {
  const uniqueAlphabeticalId = useUniqueAlphabeticalId();

  const emotionCache = useMemo(() => {
    return createCache({
      ...(emotionRoot && { container: emotionRoot }),
      key: uniqueAlphabeticalId,
      nonce: nonce ?? window.cspNonce,
      prepend: true,
      speedy: false, // <-- Needs to be set to false when shadow-dom is used!! https://github.com/emotion-js/emotion/issues/2053#issuecomment-713429122
      ...(stylisPlugins && { stylisPlugins }),
    });
  }, [emotionRoot, nonce, stylisPlugins, uniqueAlphabeticalId]);

  return <CacheProvider value={emotionCache}>{children}</CacheProvider>;
};

const MemoizedOdysseyCacheProvider = memo(OdysseyCacheProvider);
MemoizedOdysseyCacheProvider.displayName = "OdysseyCacheProvider";

export { MemoizedOdysseyCacheProvider as OdysseyCacheProvider };
