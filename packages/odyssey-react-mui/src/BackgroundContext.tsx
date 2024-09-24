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
  useEffect,
  useState,
  ReactNode,
} from "react";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import * as Tokens from "@okta/odyssey-design-tokens";

export type BackgroundType = "highContrast" | "lowContrast";

export type BackgroundContextType = {
  background: BackgroundType;
  isLowContrast: boolean;
  parentBackgroundColor: string;
};

const BackgroundContext = createContext<BackgroundContextType>({
  background: "highContrast",
  isLowContrast: false,
  parentBackgroundColor: "",
});

export const useBackground = () => useContext(BackgroundContext);

export const useParentBackgroundColor = (ref: React.RefObject<HTMLElement>) => {
  const [backgroundColor, setBackgroundColor] = useState("");

  useEffect(() => {
    if (ref.current) {
      const computedStyle = window.getComputedStyle(ref.current);
      setBackgroundColor(computedStyle.backgroundColor);
    }
  }, [ref]);

  return backgroundColor;
};

type BackgroundProviderProps = {
  children: ReactNode;
  background?: BackgroundType;
};

export const BackgroundProvider = ({
  children,
  background: explicitBackground,
}: BackgroundProviderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const parentBackgroundColor = useParentBackgroundColor(ref);
  const [background, setBackground] = useState<BackgroundType>("highContrast");

  useEffect(() => {
    if (explicitBackground) {
      setBackground(explicitBackground);
    } else {
      // Automatic detection logic using design token
      const isLowContrast = parentBackgroundColor === Tokens.HueNeutral50;
      setBackground(isLowContrast ? "lowContrast" : "highContrast");
    }
  }, [parentBackgroundColor, explicitBackground]);

  const contextValue: BackgroundContextType = {
    background,
    isLowContrast: background === "lowContrast",
    parentBackgroundColor,
  };

  const existingTheme = useTheme();
  const theme = createTheme({
    ...existingTheme,
    custom: {
      isLowContrast: contextValue.isLowContrast,
    },
  });

  return (
    <div ref={ref} style={{ height: "100%" }}>
      <BackgroundContext.Provider value={contextValue}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </BackgroundContext.Provider>
    </div>
  );
};
