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

import React, {
  createContext,
  useContext,
  useRef,
  useLayoutEffect,
  useState,
  useMemo,
  useCallback,
  ReactNode,
} from "react";
import * as Tokens from "@okta/odyssey-design-tokens";

export type ContrastMode = "lowContrast" | "highContrast";

export type ContrastModeContextType = {
  contrastMode: ContrastMode;
  parentBackgroundColor: string;
};

const ThemeContrastModeContext = createContext<ContrastModeContextType>({
  contrastMode: "lowContrast",
  parentBackgroundColor: "",
});

export const useThemeContrastModeContext = () =>
  useContext(ThemeContrastModeContext);

const hexToRgb = (hex: string): string => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgb(${r}, ${g}, ${b})`;
};

export const hueNeutral50Rgb = hexToRgb(Tokens.HueNeutral50);

const isTransparentColor = (color: string): boolean =>
  color === "rgba(0, 0, 0, 0)" || color === "transparent";

const normalizeRgbaToRgb = (rgba: string): string =>
  rgba.replace(/rgba\((\d+), (\d+), (\d+), \d+\)/, "rgb($1, $2, $3)");

const getElementComputedBackgroundColor = (element: HTMLElement): string =>
  window.getComputedStyle(element).backgroundColor;

const normalizeBackgroundColor = (bgColor: string): string => {
  if (/rgba\((\d+), (\d+), (\d+), \d+\)/.test(bgColor)) {
    const normalizedColor = normalizeRgbaToRgb(bgColor);
    return normalizedColor === hueNeutral50Rgb
      ? Tokens.HueNeutral50
      : normalizedColor;
  }
  return bgColor === hueNeutral50Rgb ? Tokens.HueNeutral50 : bgColor;
};

/**
 * Determines the effective background color of an element.
 *
 * @param element - The HTML element to check.
 * @returns The effective background color. Returns "#ffffff" if no non-transparent background is found.
 *
 * Note:
 * - Low contrast mode is used for white background (#ffffff or HueNeutralWhite).
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
  return "#ffffff"; // Default to white/low contrast if no background color is found
};

type ThemeContrastProviderProps = {
  children: ReactNode;
  contrastMode?: ContrastMode;
};

export const ThemeContrastProvider: React.FC<ThemeContrastProviderProps> = ({
  children,
  contrastMode: explicitContrastMode,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [parentBackgroundColor, setParentBackgroundColor] = useState("#ffffff");
  const [contrastMode, setContrastMode] = useState<ContrastMode>(
    () => explicitContrastMode || "highContrast",
  );

  const updateBackgroundColor = useCallback(() => {
    const newBgColor = getBackgroundColor(ref.current);
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

  const contextValue = useMemo(
    () => ({
      contrastMode,
      parentBackgroundColor,
    }),
    [contrastMode, parentBackgroundColor],
  );

  return (
    <div ref={ref}>
      <ThemeContrastModeContext.Provider value={contextValue}>
        {children}
      </ThemeContrastModeContext.Provider>
    </div>
  );
};
