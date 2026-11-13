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

import { memo, type ReactNode } from "react";

import {
  FullScreenOverlayContext,
  type FullScreenOverlayContextType,
  type OverlayType,
  useFullScreenOverlayContext,
} from "./FullScreenOverlayContext.js";
import { OdysseyCacheProvider } from "./OdysseyCacheProvider.js";
import { OdysseyThemeProvider } from "./OdysseyThemeProvider.js";
import { useColorScheme } from "./useColorScheme.js";

export type FullScreenOverlayProps = {
  children: ReactNode;
  /**
   * @deprecated Every overlay renders into the app's one overlay container, which is always labeled `data-odyssey-react-overlay-component`, so this no longer has any effect.
   */
  overlayType?: OverlayType;
};

// Marks everything inside an overlay, so a dialog opened from a drawer renders into the app's overlay container next to the drawer, not into a container of the drawer's own. One container per app is what Selenium selectors and `fullScreenOverlayId` expect.
const withinOverlayContextValue: FullScreenOverlayContextType = {
  isWithinOverlay: true,
};

const FullScreenOverlay = ({ children }: FullScreenOverlayProps) => {
  const {
    isWithinOverlay,
    overlayEmotionRootElement,
    overlayShadowRootElement,
  } = useFullScreenOverlayContext();
  const colorScheme = useColorScheme();

  // Only the style cache and theme move into the overlay container. A whole `OdysseyProvider` here would append another container to `<body>` for every overlay on the page, open or closed, and reset the app's animation setting.
  return overlayShadowRootElement && !isWithinOverlay ? (
    <OdysseyCacheProvider
      colorScheme={colorScheme}
      emotionRootElement={overlayEmotionRootElement}
    >
      <OdysseyThemeProvider
        hasWrapperElement={false}
        shadowRootElement={overlayShadowRootElement}
      >
        <FullScreenOverlayContext.Provider value={withinOverlayContextValue}>
          {children}
        </FullScreenOverlayContext.Provider>
      </OdysseyThemeProvider>
    </OdysseyCacheProvider>
  ) : (
    <>{children}</>
  );
};

const MemoizedFullScreenOverlay = memo(FullScreenOverlay);
MemoizedFullScreenOverlay.displayName = "FullScreenOverlay";

export { MemoizedFullScreenOverlay as FullScreenOverlay };
