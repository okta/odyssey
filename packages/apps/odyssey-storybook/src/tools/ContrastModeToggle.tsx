/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
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
  Box,
  OdysseyProvider,
  OdysseyThemeProvider,
  Stack,
} from "@okta/odyssey-react-mui";
import { ReactNode, useCallback, useMemo, useState } from "react";

const HIGH_CONTRAST_BG = Tokens.HueNeutral50;
const LOW_CONTRAST_BG = Tokens.HueNeutralWhite;

type BackgroundColor = "white" | "gray" | "none";

const labelStyle = { fontSize: 12, fontWeight: "bold" } as const;

const buttonBaseStyle = { cursor: "pointer" } as const;

const getButtonStyle = (isActive: boolean) =>
  ({
    ...buttonBaseStyle,
    fontWeight: isActive ? "bold" : "normal",
  }) as const;

const getContainerSx = (bgColor: string) =>
  ({
    backgroundColor: bgColor,
    padding: "16px",
    borderRadius: "8px",
  }) as const;

const optionLabels: Record<BackgroundColor, string> = {
  white: "White (lowContrast)",
  gray: "Gray (highContrast)",
  none: "None (inherit)",
};

export const ContrastModeToggle = ({ children }: { children: ReactNode }) => {
  const [backgroundColor, setBackgroundColor] =
    useState<BackgroundColor>("none");

  const handleOptionClick = useCallback(
    (option: BackgroundColor) => () => setBackgroundColor(option),
    [],
  );

  const containerSx = useMemo(
    () =>
      backgroundColor !== "none"
        ? getContainerSx(
            backgroundColor === "gray" ? HIGH_CONTRAST_BG : LOW_CONTRAST_BG,
          )
        : undefined,
    [backgroundColor],
  );

  return (
    <OdysseyProvider>
      <Stack spacing={2}>
        <Stack direction="row" spacing={1}>
          <span style={labelStyle}>Background:</span>
          {(["white", "gray", "none"] as const).map((option) => (
            <button
              aria-pressed={backgroundColor === option}
              key={option}
              onClick={handleOptionClick(option)}
              style={getButtonStyle(backgroundColor === option)}
              type="button"
            >
              {optionLabels[option]}
            </button>
          ))}
        </Stack>
        {backgroundColor !== "none" ? (
          <Box sx={containerSx}>
            <OdysseyThemeProvider
              contrastMode={
                backgroundColor === "gray" ? "highContrast" : "lowContrast"
              }
              hasWrapperElement={false}
            >
              {children}
            </OdysseyThemeProvider>
          </Box>
        ) : (
          children
        )}
      </Stack>
    </OdysseyProvider>
  );
};
