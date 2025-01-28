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
import { CheckIcon } from "../../icons.generated/index.js";
import { DesignTokens } from "../../OdysseyDesignTokensContext.js";
import type { StepIconProps } from "./Stepper.types.js";
import {
  shouldForwardStepIconContainerProps,
  shouldForwardStepNumberProps,
} from "./Stepper.utils.js";

const StyledStepNumber = styled("span", {
  shouldForwardProp: shouldForwardStepNumberProps,
})<{
  odysseyDesignTokens: DesignTokens;
  completed: boolean;
  active: boolean;
  nonLinear: boolean;
}>(({ completed, active, nonLinear, odysseyDesignTokens }) => ({
  fontWeight: odysseyDesignTokens.TypographyWeightHeadingBold,
  //Base color
  color: odysseyDesignTokens.HueNeutral600,

  //Override color for completed or active states
  ...(completed && {
    color: odysseyDesignTokens.HueNeutralWhite,
  }),
  ...(active && {
    color: odysseyDesignTokens.HueNeutralWhite,
  }),

  //Hover state
  ".MuiStep-root:hover &": {
    ...(!active &&
      !completed &&
      nonLinear && {
        color: odysseyDesignTokens.HueNeutral900,
      }),
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
}>(({ active, completed, variant, nonLinear, odysseyDesignTokens }) => {
  const isNumeric = variant === "numeric";

  return {
    width: isNumeric
      ? odysseyDesignTokens.Spacing5
      : odysseyDesignTokens.Spacing4,
    height: isNumeric
      ? odysseyDesignTokens.Spacing5
      : odysseyDesignTokens.Spacing4,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: `color ${odysseyDesignTokens.TransitionDurationMain}, 
    background-color ${odysseyDesignTokens.TransitionDurationMain}, 
    border ${odysseyDesignTokens.TransitionDurationMain}`,

    //Base color state
    color: odysseyDesignTokens.HueNeutral700,
    backgroundColor: "transparent",
    border: "1px solid",
    borderColor: `1px solid ${odysseyDesignTokens.HueNeutral600}`,

    ...(completed && {
      color: odysseyDesignTokens.HueNeutralWhite,
      backgroundColor: odysseyDesignTokens.HueGreen400,
      borderColor: odysseyDesignTokens.HueGreen400,
    }),

    ...(active && {
      color: odysseyDesignTokens.HueNeutralWhite,
      backgroundColor: odysseyDesignTokens.HueBlue600,
      borderColor: odysseyDesignTokens.HueBlue600,
    }),

    //Hover state for non-linear, non-active, non-completed
    ".MuiStep-root:hover &": {
      ...(!active &&
        !completed &&
        nonLinear && {
          border: `1px solid ${odysseyDesignTokens.HueNeutral900}`,
        }),
    },

    svg: {
      ...(isNumeric
        ? {
            width: odysseyDesignTokens.Spacing4,
            height: odysseyDesignTokens.Spacing4,
          }
        : {
            width: odysseyDesignTokens.Spacing3,
            height: odysseyDesignTokens.Spacing3,
          }),
    },
  };
});

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
    {completed ? (
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
