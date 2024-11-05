/*!
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { memo, ReactNode } from "react";
import styled from "@emotion/styled";
import { Paper as MuiPaper } from "@mui/material";

import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "./OdysseyDesignTokensContext";
import { OdysseyThemeProvider } from "./OdysseyThemeProvider";
import { useContrastModeContext, ContrastMode } from "./useContrastMode";

const StyledContainer = styled(MuiPaper, {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "contrastMode",
})<{
  contrastMode: ContrastMode;
  odysseyDesignTokens: DesignTokens;
}>(({ contrastMode, odysseyDesignTokens }) => ({
  borderRadius: odysseyDesignTokens.Spacing4,
  padding: odysseyDesignTokens.Spacing5,
  border:
    contrastMode === "lowContrast"
      ? `1px solid ${odysseyDesignTokens.HueNeutral100}`
      : "none",
  boxShadow: "none",
}));

export type SurfaceProps = {
  children: ReactNode;
};

const Surface = ({ children }: SurfaceProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { contrastMode } = useContrastModeContext();

  return (
    <StyledContainer
      contrastMode={contrastMode}
      odysseyDesignTokens={odysseyDesignTokens}
    >
      <OdysseyThemeProvider>{children}</OdysseyThemeProvider>
    </StyledContainer>
  );
};

const MemoizedSurface = memo(Surface);
MemoizedSurface.displayName = "Surface";

export { MemoizedSurface as Surface };
