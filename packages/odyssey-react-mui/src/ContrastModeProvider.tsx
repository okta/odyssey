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
  contrastMode: "highContrast",
  parentBackgroundColor: "",
});

export const useContrastContext = () => useContext(ContrastModeContext);

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

  useLayoutEffect(() => {
    if (ref.current) {
      let element: HTMLElement | null = ref.current;
      while (element) {
        const bgColor = window.getComputedStyle(element).backgroundColor;

        if (bgColor !== "rgba(0, 0, 0, 0)" && bgColor !== "transparent") {
          if (bgColor === hueNeutral50Rgb) {
            setBackgroundColor(Tokens.HueNeutral50);
          } else {
            setBackgroundColor(bgColor);
          }
          break;
        }
        element = element.parentElement;
      }
    }
  }, [ref, hueNeutral50Rgb]);

  return backgroundColor;
};

type ContrastModeProviderProps = {
  children: ReactNode;
  contrastMode?: ContrastMode;
};

export const ContrastModeProvider = ({
  children,
  contrastMode: explicitContrastMode,
}: ContrastModeProviderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const parentBackgroundColor = useParentBackgroundColor(ref);
  const [contrastMode, setContrastMode] =
    useState<ContrastMode>("highContrast");

  useLayoutEffect(() => {
    if (explicitContrastMode) {
      setContrastMode(explicitContrastMode);
    } else {
      const isLowContrast = parentBackgroundColor === Tokens.HueNeutral50;
      setContrastMode(isLowContrast ? "lowContrast" : "highContrast");
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
