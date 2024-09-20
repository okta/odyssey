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

import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { createContext, useContext, ReactNode } from "react";

export type BackgroundType = "highContrast" | "lowContrast";

export type BackgroundContextType = {
  background: BackgroundType;
  isLowContrast: boolean;
};

const BackgroundContext = createContext<BackgroundContextType>({
  background: "highContrast",
  isLowContrast: false,
});

export const useBackground = () => useContext(BackgroundContext);

export const BackgroundProvider = ({
  value,
  children,
}: {
  value: BackgroundType;
  children: ReactNode;
}) => {
  const contextValue = {
    background: value,
    isLowContrast: value === "lowContrast",
  };

  const existingTheme = useTheme();
  const theme = createTheme({
    ...existingTheme,
    custom: {
      isLowContrast: contextValue.isLowContrast,
    },
  });

  return (
    <BackgroundContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </BackgroundContext.Provider>
  );
};
