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
  var cspNonce: string; // Adding types to `globalThis` requires we use `var`.
}

import createCache, { StylisPlugin } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { memo, ReactNode, useMemo } from "react";

import { useUniqueAlphabeticalId } from "./useUniqueAlphabeticalId.js";

export type OdysseyCacheProviderProps = {
  children: ReactNode;
  /**
   * @deprecated Use `EmotionRootElement` instead. This was incorrectly configured as an `HTMLStyleElement`, but then we're rendering `<style>` inside `<style>`. We need this to be a `<div>` instead.
   *
   * Emotion caches styles into the style element.
   * When enabling this prop, Emotion caches the styles at this element, rather than in <head>.
   */
  emotionRoot?: HTMLStyleElement;
  /**
   * Emotion adds `<style>` elements into this DOM node. Normally, Emotion puts these in `document.head`.
   * This is useful if you want to render into a Shadow DOM or iframe.
   */
  emotionRootElement?: HTMLElement;
  /**
   * @deprecated No longer necessary.
   *
   * Required to know if a Shadow DOM is in use. This tells Emotion to change its cache configuration.
   */
  hasShadowDom?: boolean;
  nonce?: string;
  /**
   * @deprecated No longer necessary.
   *
   * Emotion renders into this HTML element.
   * When enabling this prop, Emotion renders at the top of this component rather than the bottom like it does in the HTML `<head>`.
   */
  shadowDomElement?: HTMLDivElement | HTMLElement;
  stylisPlugins?: StylisPlugin[];
};

const OdysseyCacheProvider = ({
  children,
  emotionRoot,
  emotionRootElement,
  nonce,
  stylisPlugins,
}: OdysseyCacheProviderProps) => {
  const uniqueAlphabeticalId = useUniqueAlphabeticalId();

  const emotionCache = useMemo(
    () =>
      createCache({
        ...((emotionRootElement || emotionRoot) && {
          container: emotionRootElement || emotionRoot,
        }),
        key: uniqueAlphabeticalId,
        nonce: nonce ?? globalThis.cspNonce,
        prepend: true,
        speedy: true,
        ...(stylisPlugins && { stylisPlugins }),
      }),
    [
      emotionRoot,
      emotionRootElement,
      nonce,
      stylisPlugins,
      uniqueAlphabeticalId,
    ],
  );

  return <CacheProvider value={emotionCache}>{children}</CacheProvider>;
};

const MemoizedOdysseyCacheProvider = memo(OdysseyCacheProvider);
MemoizedOdysseyCacheProvider.displayName = "OdysseyCacheProvider";

export { MemoizedOdysseyCacheProvider as OdysseyCacheProvider };
