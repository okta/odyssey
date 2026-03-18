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
  type OverlayType,
  useFullScreenOverlayContext,
} from "./FullScreenOverlayContext.js";
import { OdysseyProvider } from "./OdysseyProvider.js";

export type FullScreenOverlayProps = {
  children: ReactNode;
  overlayType?: OverlayType;
};

const FullScreenOverlay = ({
  children,
  overlayType,
}: FullScreenOverlayProps) => {
  const { overlayEmotionRootElement, overlayShadowRootElement } =
    useFullScreenOverlayContext();

  return overlayShadowRootElement ? (
    <OdysseyProvider
      emotionRootElement={overlayEmotionRootElement}
      hasScopedCssBaseline={false}
      hasTranslationProvider={false}
      hasWrapperElement={false}
      overlayType={overlayType}
      shadowRootElement={overlayShadowRootElement}
    >
      {children}
    </OdysseyProvider>
  ) : (
    <>{children}</>
  );
};

const MemoizedFullScreenOverlay = memo(FullScreenOverlay);
MemoizedFullScreenOverlay.displayName = "FullScreenOverlay";

export { MemoizedFullScreenOverlay as FullScreenOverlay };
