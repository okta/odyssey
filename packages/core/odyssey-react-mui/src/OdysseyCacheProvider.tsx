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

import createCache, { type EmotionCache, StylisPlugin } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { memo, ReactNode, useLayoutEffect, useMemo, useRef } from "react";

import { type ResolvedColorScheme } from "./useColorScheme.js";
import { useUniqueAlphabeticalId } from "./useUniqueAlphabeticalId.js";

export type OdysseyCacheProviderProps = {
  children: ReactNode;
  /**
   * The color scheme rendered inside this cache. Changing it replaces the cache, so the new scheme's styles are inserted in the same order as a first render.
   */
  colorScheme?: ResolvedColorScheme;
  /**
   * @deprecated Use `EmotionRootElement` instead. This was incorrectly configured as an `HTMLStyleElement`, but then we're rendering `<style>` inside `<style>`. We need this to be a `<div>` instead.
   *
   * Emotion caches styles into the style element.
   * When enabling this prop, Emotion caches the styles at this element, rather than in <head>.
   */
  emotionRoot?: HTMLStyleElement;
  /**
   * Emotion adds `<style>` elements into this DOM node. Normally, Emotion puts these in `document.head`. This is useful if you want to render into a Shadow DOM or iframe.
   */
  emotionRootElement?: HTMLElement;
  /**
   * @deprecated No longer necessary.
   *
   * Required to know if a Shadow DOM is in use. This tells Emotion to change its cache configuration.
   */
  hasShadowDom?: boolean;
  /**
   * A cryptographic nonce ("number used once") that allows `<style>` tags injected by Emotion to pass a Content Security Policy that restricts inline styles.
   */
  nonce?: string;
  /**
   * @deprecated No longer necessary.
   *
   * Emotion renders into this HTML element.
   * When enabling this prop, Emotion renders at the top of this component rather than the bottom like it does in the HTML `<head>`.
   */
  shadowDomElement?: HTMLDivElement | HTMLElement;
  /** Custom Stylis plugins applied to Emotion's CSS processing pipeline. */
  stylisPlugins?: StylisPlugin[];
};

/**
 * Configures Emotion's style cache for Odyssey components. Wrap your application in this provider when you need to render into a Shadow DOM, iframe, or non-`<head>` target element, or when your CSP requires a nonce on injected `<style>` tags.
 */
const OdysseyCacheProvider = ({
  children,
  colorScheme,
  emotionRoot,
  emotionRootElement,
  nonce,
  stylisPlugins,
}: OdysseyCacheProviderProps) => {
  const uniqueAlphabeticalId = useUniqueAlphabeticalId();

  // Emotion resolves equal-specificity rules by insertion order. Switching the color scheme regenerates every class built from color tokens and appends it after the classes that did not change, so an ancestor's rule can start beating a descendant's override that won on the first render. A fresh cache per scheme keeps first-render order.
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
    // `colorScheme` is not read in the factory. It is a dependency so a scheme change builds a new cache.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      colorScheme,
      emotionRoot,
      emotionRootElement,
      nonce,
      stylisPlugins,
      uniqueAlphabeticalId,
    ],
  );

  const previousEmotionCacheRef = useRef<EmotionCache>(undefined);

  // The replaced cache's `<style>` tags stay in the DOM until flushed. This runs before paint so the old rules never apply alongside the new ones, and it compares against the previous cache rather than flushing on cleanup, because Strict Mode's simulated unmount would otherwise flush the cache still in use.
  useLayoutEffect(() => {
    const previousEmotionCache = previousEmotionCacheRef.current;

    previousEmotionCacheRef.current = emotionCache;

    if (previousEmotionCache && previousEmotionCache !== emotionCache) {
      previousEmotionCache.sheet.flush();
    }
  }, [emotionCache]);

  return <CacheProvider value={emotionCache}>{children}</CacheProvider>;
};

const MemoizedOdysseyCacheProvider = memo(OdysseyCacheProvider);
MemoizedOdysseyCacheProvider.displayName = "OdysseyCacheProvider";

export { MemoizedOdysseyCacheProvider as OdysseyCacheProvider };
