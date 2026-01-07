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

import {
  createContext,
  memo,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
} from "react";

import { createShadowDomElements } from "./web-component/createShadowDomElements.js";

export type FullScreenOverlayContextType = {
  overlayEmotionRootElement?: HTMLDivElement | HTMLElement;
  overlayShadowRootElement?: HTMLDivElement | HTMLElement;
};

export const FullScreenOverlayContext =
  createContext<FullScreenOverlayContextType>({});

export const useFullScreenOverlayContext = () =>
  useContext(FullScreenOverlayContext);

export const OVERLAY_DATA_ATTRIBUTES = {
  dialog: "data-odyssey-react-dialog-overlay-component",
  drawer: "data-odyssey-react-drawer-overlay-component",
  default: "data-odyssey-react-overlay-component",
} as const;

export type OverlayType = keyof typeof OVERLAY_DATA_ATTRIBUTES;

export type FullScreenOverlayProviderProps = {
  children: ReactNode;
  hasShadowDom?: boolean;
  /**
   * @experimental This is the element overlays will render into. By default, it's set to `document.body`.
   *
   * If you specify this value , it will render overlays into this container, such as the `shadowRootElement` over the document body. Most likely, you don't need to change this value, but you might run into strange issues related iframes and other shadow roots. This is here as a safeguard; not meant to be used.
   */
  overlayParentElement?: HTMLDivElement | HTMLElement;
  /**
   * Type of overlay being rendered. This controls the data attribute set on the overlay parent element.
   * @default "default"
   */
  overlayType?: OverlayType;
};

const FullScreenOverlayProvider = ({
  children,
  hasShadowDom,
  overlayParentElement: overlayParentElementProp,
  overlayType = "default",
}: FullScreenOverlayProviderProps) => {
  const {
    overlayEmotionRootElement,
    overlayParentElement,
    overlayShadowRootElement,
  } = useMemo(() => {
    const overlayParentElement =
      overlayParentElementProp || document.createElement("div");

    if (hasShadowDom) {
      const { emotionRootElement, shadowRootElement } =
        createShadowDomElements(overlayParentElement);

      return {
        overlayEmotionRootElement: emotionRootElement,
        overlayParentElement,
        overlayShadowRootElement: shadowRootElement,
      };
    }

    return {
      overlayEmotionRootElement: undefined,
      overlayParentElement,
      overlayShadowRootElement: undefined,
    };
  }, [hasShadowDom, overlayParentElementProp]);

  useEffect(() => {
    if (overlayParentElement) {
      overlayParentElement.setAttribute(
        OVERLAY_DATA_ATTRIBUTES[overlayType],
        "",
      );
      document.body.append(overlayParentElement);
    }

    return () => {
      overlayParentElement.remove();
    };
  }, [overlayParentElement, overlayType]);

  const providerValue = useMemo(
    () => ({
      overlayEmotionRootElement,
      overlayShadowRootElement,
    }),
    [overlayEmotionRootElement, overlayShadowRootElement],
  );

  return (
    <FullScreenOverlayContext.Provider value={providerValue}>
      {children}
    </FullScreenOverlayContext.Provider>
  );
};

const MemoizedFullScreenOverlayProvider = memo(FullScreenOverlayProvider);
MemoizedFullScreenOverlayProvider.displayName = "FullScreenOverlayProvider";

export { MemoizedFullScreenOverlayProvider as FullScreenOverlayProvider };
