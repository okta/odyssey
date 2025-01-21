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

import styled from "@emotion/styled";
import { CheckIcon } from "../../icons.generated";
import { DesignTokens } from "../../OdysseyDesignTokensContext";
import type { StepIconProps } from "./Stepper.types";
import {
  shouldForwardStepIconContainerProps,
  shouldForwardStepNumberProps,
} from "./Stepper.utils";

const StyledStepNumber = styled("span", {
  shouldForwardProp: shouldForwardStepNumberProps,
})<{
  odysseyDesignTokens: DesignTokens;
  completed: boolean;
  active: boolean;
  nonLinear: boolean;
}>(({ completed, active, nonLinear, odysseyDesignTokens }) => ({
  fontWeight: odysseyDesignTokens.TypographyWeightHeadingBold,
  color:
    completed || active
      ? odysseyDesignTokens.HueNeutralWhite
      : odysseyDesignTokens.HueNeutral600,

  ".MuiStep-root:hover &": {
    color:
      !active && !completed && nonLinear
        ? odysseyDesignTokens.HueNeutral900
        : undefined,
  },
}));

const StyledStepIconContainer = styled("div", {
  shouldForwardProp: shouldForwardStepIconContainerProps,
})<{
  active: boolean;
  completed: boolean;
  nonLinear: boolean;
  odysseyDesignTokens: DesignTokens;
  variant: "numeric" | "nonNumeric";
}>(({ active, completed, variant, nonLinear, odysseyDesignTokens }) => ({
  width:
    variant === "numeric"
      ? odysseyDesignTokens.Spacing5
      : odysseyDesignTokens.Spacing4,
  height:
    variant === "numeric"
      ? odysseyDesignTokens.Spacing5
      : odysseyDesignTokens.Spacing4,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color:
    completed || active
      ? odysseyDesignTokens.HueNeutralWhite
      : odysseyDesignTokens.HueNeutral700,
  border: `1px solid ${
    completed
      ? odysseyDesignTokens.HueGreen400
      : active
        ? odysseyDesignTokens.HueBlue600
        : odysseyDesignTokens.HueNeutral600
  }`,
  background: completed
    ? odysseyDesignTokens.HueGreen400
    : active
      ? odysseyDesignTokens.HueBlue600
      : "transparent",
  transition: `all ${odysseyDesignTokens.TransitionDurationMain}`,

  ".MuiStep-root:hover &":
    !active && !completed && nonLinear
      ? { border: `1px solid ${odysseyDesignTokens.HueNeutral900}` }
      : undefined,

  "& svg": {
    width:
      variant === "numeric"
        ? odysseyDesignTokens.Spacing4
        : odysseyDesignTokens.Spacing3,
    height:
      variant === "numeric"
        ? odysseyDesignTokens.Spacing4
        : odysseyDesignTokens.Spacing3,
  },
}));

export const StepIcon = ({
  active,
  completed,
  nonLinear,
  odysseyDesignTokens,
  stepNumber,
  variant,
}: StepIconProps) => (
  <StyledStepIconContainer
    active={active}
    completed={completed}
    nonLinear={nonLinear}
    odysseyDesignTokens={odysseyDesignTokens}
    variant={variant}
  >
    {completed && variant === "numeric" ? (
      <CheckIcon />
    ) : variant === "numeric" ? (
      <StyledStepNumber
        active={active}
        completed={completed}
        nonLinear={nonLinear}
        odysseyDesignTokens={odysseyDesignTokens}
      >
        {stepNumber + 1}
      </StyledStepNumber>
    ) : null}
  </StyledStepIconContainer>
);
