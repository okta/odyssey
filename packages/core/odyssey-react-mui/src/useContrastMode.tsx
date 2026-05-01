/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import * as Tokens from "@okta/odyssey-design-tokens";
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { hexToRgb } from "./hexToRgb.js";

export type ContrastMode = "lowContrast" | "highContrast";
export type ContrastModeContextType = {
  contrastMode: ContrastMode;
};

export const ContrastModeContext = createContext<ContrastModeContextType>({
  contrastMode: "lowContrast",
});

export const defaultContrast = "lowContrast";

export const useContrastModeContext = () => useContext(ContrastModeContext);

export const hueNeutral50Rgb = hexToRgb(Tokens.HueNeutral50).asFormattedString;

export const isTransparentColor = (color: string) =>
  color === "rgba(0, 0, 0, 0)" || color === "transparent";

export const normalizeRgbaToRgb = (rgba: string) =>
  rgba.replace(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/, "rgb($1, $2, $3)");

export const getElementComputedBackgroundColor = (
  element: HTMLElement,
): string => window.getComputedStyle(element).backgroundColor;

export const normalizeBackgroundColor = (bgColor: string): string => {
  if (/rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/.test(bgColor)) {
    const normalizedColor = normalizeRgbaToRgb(bgColor);
    return normalizedColor === hueNeutral50Rgb
      ? Tokens.HueNeutral50
      : normalizedColor;
  }

  return bgColor === hueNeutral50Rgb ? Tokens.HueNeutral50 : bgColor;
};

/** Default background color when none is detected: HueNeutral50 (gray = highContrast). */
export const defaultParentBackgroundColor = Tokens.HueNeutral50;

/**
 * Returns the parent element, crossing shadow DOM boundaries when necessary.
 * When `parentElement` is null (e.g., at a shadow root), this checks if the
 * element is inside a ShadowRoot and jumps to the host element to continue
 * traversal.
 */
const getParentElement = (element: HTMLElement): HTMLElement | null => {
  if (element.parentElement) {
    return element.parentElement;
  }

  const root = element.getRootNode();
  if (root instanceof ShadowRoot && root.host instanceof HTMLElement) {
    return root.host;
  }

  return null;
};

/**
 * Determines the effective background color of an element.
 *
 * @param element - The HTML element to check.
 * @returns The effective background color. Returns  defaultParentBackgroundColor if no non-transparent background is found.
 *
 * Note:
 * - Low contrast mode is used for white background (HueNeutralWhite).
 * - High contrast mode is used for gray background (defaultParentBackgroundColor = HueNeutral50).
 * - Crosses shadow DOM boundaries via `getRootNode().host` to detect backgrounds
 *   set outside of shadow roots.
 */
export const getBackgroundColor = (element: HTMLElement | null): string => {
  while (element) {
    const bgColor = getElementComputedBackgroundColor(element);
    if (!isTransparentColor(bgColor)) {
      return normalizeBackgroundColor(bgColor);
    }
    element = getParentElement(element);
  }
  return defaultParentBackgroundColor; // Default to gray/high contrast if no background color is found
};

export const deriveContrastMode = (bgColor: string): ContrastMode =>
  bgColor === Tokens.HueNeutral50 ? "highContrast" : "lowContrast";

type UseContrastModeProps = {
  contrastMode?: ContrastMode;
};

export const useContrastMode = ({
  contrastMode: explicitContrastMode,
}: UseContrastModeProps) => {
  const contrastContainerRef = useRef<HTMLDivElement>(null);
  const { contrastMode: existingContrastMode } = useContrastModeContext();

  const [parentBackgroundColor, setParentBackgroundColor] = useState(
    defaultParentBackgroundColor,
  );
  const [detectedContrastMode, setDetectedContrastMode] =
    useState<ContrastMode>(() => existingContrastMode);

  const contrastMode = explicitContrastMode ?? detectedContrastMode;

  const updateBackgroundColor = useCallback(() => {
    const newBgColor = getBackgroundColor(contrastContainerRef.current);
    setParentBackgroundColor(newBgColor);
    setDetectedContrastMode(deriveContrastMode(newBgColor));
  }, []);

  useLayoutEffect(() => {
    if (explicitContrastMode) return;

    const observer = new MutationObserver(updateBackgroundColor);

    // In shadow DOM contexts, document.documentElement and
    // document.head may not be accessible. Guard against null to
    // prevent observer.observe(null) from throwing.
    const htmlElement = document.documentElement;
    if (htmlElement) {
      observer.observe(htmlElement, {
        attributes: true,
        attributeFilter: ["class", "style"],
      });
    }

    if (document.head) {
      observer.observe(document.head, {
        childList: true,
        subtree: true,
      });
    }

    const onTransitionEnd = (event: Event) => {
      if (
        event instanceof TransitionEvent &&
        event.propertyName === "background-color"
      ) {
        updateBackgroundColor();
      }
    };

    // Attach the transitionend listener to the element's root node so it
    // works inside shadow DOM (where events don't bubble to `document`).
    const eventRoot = contrastContainerRef.current?.getRootNode() ?? document;
    eventRoot.addEventListener("transitionend", onTransitionEnd);
    updateBackgroundColor();

    return () => {
      eventRoot.removeEventListener("transitionend", onTransitionEnd);
      observer.disconnect();
    };
  }, [explicitContrastMode, updateBackgroundColor]);

  return {
    contrastContainerRef,
    contrastMode,
    parentBackgroundColor,
  };
};
