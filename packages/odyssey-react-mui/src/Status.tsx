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

import { memo } from "react";
import { Chip } from "@mui/material";
import { chipClasses } from "@mui/material/Chip";
import styled from "@emotion/styled";

import { useMuiProps } from "./MuiPropsContext";
import type { HtmlProps } from "./HtmlProps";
import { useBackground } from "./BackgroundContext";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "./OdysseyDesignTokensContext";

export const statusSeverityValues = [
  "default",
  "error",
  "info",
  "success",
  "warning",
] as const;
export const statusVariantValues = ["lamp", "pill"] as const;

export type StatusProps = {
  /**
   * The text content of the Status
   */
  label: string;
  /**
   * Determine the color and icon of the Status
   */
  severity: (typeof statusSeverityValues)[number];
  /**
   * The style of the Status indicator
   */
  variant?: (typeof statusVariantValues)[number];
} & Pick<HtmlProps, "testId" | "translate">;

const nonForwardedProps = ["isLowContrast", "odysseyDesignTokens"];

const StyledChip = styled(Chip, {
  shouldForwardProp: (prop) => !nonForwardedProps.includes(prop as string),
})<{
  isLowContrast: boolean;
  odysseyDesignTokens: DesignTokens;
}>(({ isLowContrast, odysseyDesignTokens }) => ({
  ...(isLowContrast && {
    [`&.${chipClasses.root}`]: {
      backgroundColor: odysseyDesignTokens.HueNeutral200,
      color: odysseyDesignTokens.TypographyColorBody,
    },
    [`&.${chipClasses.colorError}`]: {
      backgroundColor: odysseyDesignTokens.PaletteDangerLight,
      color: odysseyDesignTokens.PaletteDangerDark,
    },
    [`&.${chipClasses.colorInfo}`]: {
      backgroundColor: odysseyDesignTokens.PalettePrimaryLight,
      color: odysseyDesignTokens.PalettePrimaryDark,
    },
    [`&.${chipClasses.colorSuccess}`]: {
      backgroundColor: odysseyDesignTokens.PaletteSuccessLight,
      color: odysseyDesignTokens.PaletteSuccessDark,
    },
    [`&.${chipClasses.colorWarning}`]: {
      backgroundColor: odysseyDesignTokens.PaletteWarningLight,
      color: odysseyDesignTokens.PaletteWarningDark,
    },
  }),
}));

const Status = ({
  label,
  severity,
  testId,
  translate,
  variant = "pill",
}: StatusProps) => {
  const muiProps = useMuiProps();
  const background = useBackground();
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const isLowContrast = background === "lowContrast";

  return (
    <StyledChip
      {...muiProps}
      color={severity}
      data-se={testId}
      label={label}
      translate={translate}
      variant={variant}
      isLowContrast={isLowContrast}
      odysseyDesignTokens={odysseyDesignTokens}
    />
  );
};

const MemoizedStatus = memo(Status);
MemoizedStatus.displayName = "Status";

export { MemoizedStatus as Status };
