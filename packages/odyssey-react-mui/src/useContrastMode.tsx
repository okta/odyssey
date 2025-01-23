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

import {
  createContext,
  useContext,
  useRef,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";
import * as Tokens from "@okta/odyssey-design-tokens";

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

export const defaultParentBackgroundColor = "#ffffff";

/**
 * Determines the effective background color of an element.
 *
 * @param element - The HTML element to check.
 * @returns The effective background color. Returns  defaultParentBackgroundColor if no non-transparent background is found.
 *
 * Note:
 * - Low contrast mode is used for white background (defaultParentBackgroundColor or HueNeutralWhite).
 * - High contrast mode is used for gray background (#f4f4f4 or HueNeutral50).
 */
export const getBackgroundColor = (element: HTMLElement | null): string => {
  while (element) {
    const bgColor = getElementComputedBackgroundColor(element);
    if (!isTransparentColor(bgColor)) {
      return normalizeBackgroundColor(bgColor);
    }
    element = element.parentElement;
  }
  return defaultParentBackgroundColor; // Default to white/low contrast if no background color is found
};

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
  const [contrastMode, setContrastMode] = useState<ContrastMode>(
    () => explicitContrastMode || existingContrastMode,
  );

  const updateBackgroundColor = useCallback(() => {
    const newBgColor = getBackgroundColor(contrastContainerRef.current);
    setParentBackgroundColor(newBgColor);

    if (!explicitContrastMode) {
      setContrastMode(
        newBgColor === Tokens.HueNeutral50 ? "highContrast" : "lowContrast",
      );
    }
  }, [explicitContrastMode]);

  useLayoutEffect(() => {
    const observer = new MutationObserver(updateBackgroundColor);
    observer.observe(document.querySelector("html") as HTMLHtmlElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });
    observer.observe(document.head, {
      childList: true,
      subtree: true,
    });

    const onTransitionEnd = (event: TransitionEvent) => {
      if (event.propertyName === "background-color") {
        updateBackgroundColor();
      }
    };

    document.addEventListener("transitionend", onTransitionEnd);
    updateBackgroundColor();

    return () => {
      document.removeEventListener("transitionend", onTransitionEnd);
      observer.disconnect();
    };
  }, [updateBackgroundColor]);

  return {
    contrastContainerRef,
    contrastMode,
    parentBackgroundColor,
  };
};
