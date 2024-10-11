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
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import * as Tokens from "@okta/odyssey-design-tokens";

declare module "@mui/material/styles" {
  interface Theme {
    odysseyContrastMode: ContrastMode;
  }
  interface ThemeOptions {
    odysseyContrastMode?: ContrastMode;
  }
}

export type ContrastMode = "lowContrast" | "highContrast";

export type ContrastModeContextType = {
  contrastMode: ContrastMode;
  parentBackgroundColor: string;
};

const ContrastModeContext = createContext<ContrastModeContextType>({
  contrastMode: "lowContrast",
  parentBackgroundColor: "",
});

export const useContrastModeContext = () => useContext(ContrastModeContext);

const hexToRgb = (hex: string): string => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgb(${r}, ${g}, ${b})`;
};

export const useParentBackgroundColor = (ref: React.RefObject<HTMLElement>) => {
  const [backgroundColor, setBackgroundColor] = useState("");

  const hueNeutral50Rgb = useMemo(() => hexToRgb(Tokens.HueNeutral50), []);

  const getBackgroundColor = useCallback(() => {
    if (ref.current) {
      let element: HTMLElement | null = ref.current;
      while (element) {
        const bgColor = window.getComputedStyle(element).backgroundColor;

        if (bgColor !== "rgba(0, 0, 0, 0)" && bgColor !== "transparent") {
          return bgColor === hueNeutral50Rgb ? Tokens.HueNeutral50 : bgColor;
        }
        element = element.parentElement;
      }
    }
    return "";
  }, [ref, hueNeutral50Rgb]);

  useLayoutEffect(() => {
    const updateBackgroundColor = () => {
      const newBackgroundColor = getBackgroundColor();
      if (newBackgroundColor !== backgroundColor) {
        setBackgroundColor(newBackgroundColor);
      }
    };

    updateBackgroundColor();

    const observer = new MutationObserver(() => {
      requestAnimationFrame(updateBackgroundColor);
    });

    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [getBackgroundColor, backgroundColor]);

  return backgroundColor;
};

type ContrastModeProviderProps = {
  children: ReactNode;
  contrastMode?: ContrastMode;
};

export const ContrastModeProvider: React.FC<ContrastModeProviderProps> = ({
  children,
  contrastMode: explicitContrastMode,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const parentBackgroundColor = useParentBackgroundColor(ref);
  const [contrastMode, setContrastMode] = useState<ContrastMode>(
    () => explicitContrastMode || "highContrast",
  );

  useLayoutEffect(() => {
    if (explicitContrastMode) {
      setContrastMode(explicitContrastMode);
    } else {
      const isHighContrast = parentBackgroundColor === Tokens.HueNeutral50;
      setContrastMode(isHighContrast ? "highContrast" : "lowContrast");
    }
  }, [parentBackgroundColor, explicitContrastMode]);

  const contextValue = useMemo<ContrastModeContextType>(
    () => ({
      contrastMode,
      parentBackgroundColor,
    }),
    [contrastMode, parentBackgroundColor],
  );

  const existingTheme = useTheme();
  const theme = useMemo(
    () =>
      createTheme({
        ...existingTheme,
        odysseyContrastMode: contrastMode,
      }),
    [existingTheme, contrastMode],
  );

  return (
    <div ref={ref}>
      <ContrastModeContext.Provider value={contextValue}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ContrastModeContext.Provider>
    </div>
  );
};
