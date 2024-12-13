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

import {
  Stepper as MuiStepper,
  Step as MuiStep,
  StepLabel as MuiStepLabel,
} from "@mui/material";
import { memo, useCallback } from "react";
import styled from "@emotion/styled";
import { CheckIcon } from "./icons.generated";
import { useOdysseyDesignTokens } from "./OdysseyDesignTokensContext";
import { HtmlProps } from "./HtmlProps";

export type StepData = {
  /**
   * The label text for the step
   */
  label: string;
  /**
   * Optional description text below step label
   */
  description?: string;
};

export type StepperProps = {
  /**
   * Current active step (0-based index)
   */
  activeStep: number;
  /**
   * Allow navigation to completed steps
   */
  allowBackStep?: boolean;
  /**
   * Allow skipping to future steps
   */
  nonLinear?: boolean;
  /**
   * Layout orientation of the stepper
   */
  orientation?: "horizontal" | "vertical";
  /**
   * Visual variant of steps
   */
  variant?: "numeric" | "nonNumeric";
  /**
   * Array of step data
   */
  steps: StepData[];
  /**
   * Callback fired when a step is clicked
   */
  onChange?: (step: number) => void;
} & Pick<HtmlProps, "testId">;

const StepperContainer = styled(MuiStepper, {
  shouldForwardProp: (prop) =>
    !["odysseyDesignTokens"].includes(prop as string),
})<{
  odysseyDesignTokens: ReturnType<typeof useOdysseyDesignTokens>;
}>(({ orientation, odysseyDesignTokens }) => ({
  padding:
    orientation === "horizontal"
      ? `${odysseyDesignTokens.Spacing1} ${odysseyDesignTokens.Spacing2}`
      : odysseyDesignTokens.Spacing2,
  borderRadius: "12px",
  "& .MuiStepConnector-line": {
    borderColor: odysseyDesignTokens.HueNeutral200,
    borderWidth: "1px",
    minHeight: orientation === "vertical" ? "24px" : undefined,
  },
  "& .MuiStepConnector-root": {
    marginLeft: orientation === "vertical" ? "11px" : undefined, // Center connector with circle (24px/2 - 1px)
    ...(orientation === "horizontal" && {
      top: "12px", // Center connector with circle
      left: "calc(-50% + 20px)",
      right: "calc(50% + 20px)",
    }),
  },
}));

const StepIconContainer = styled("div")<{
  completed: boolean;
  active: boolean;
  variant: "numeric" | "nonNumeric";
  odysseyDesignTokens: ReturnType<typeof useOdysseyDesignTokens>;
}>(({ completed, active, variant, odysseyDesignTokens }) => ({
  width: variant === "numeric" ? "24px" : "16px",
  height: variant === "numeric" ? "24px" : "16px",
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
        ? odysseyDesignTokens.HueBlue700
        : odysseyDesignTokens.HueNeutral700
  }`,
  background: completed
    ? odysseyDesignTokens.HueGreen400
    : active
      ? odysseyDesignTokens.HueBlue600
      : "transparent",
  transition: "all 0.2s",

  "& svg": {
    width: variant === "numeric" ? "16px" : "12px",
    height: variant === "numeric" ? "16px" : "12px",
  },
}));

const StepLabel = styled(MuiStepLabel, {
  shouldForwardProp: (prop) =>
    !["odysseyDesignTokens"].includes(prop as string),
})<{
  odysseyDesignTokens: ReturnType<typeof useOdysseyDesignTokens>;
  completed: boolean;
  active: boolean;
}>(({ completed, active, odysseyDesignTokens }) => ({
  "& .MuiStepLabel-label": {
    fontFamily: "inherit",
    fontSize: odysseyDesignTokens.TypographySizeHeading6,
    fontWeight: "600",
    lineHeight: odysseyDesignTokens.TypographyLineHeightHeading6,
    color: active
      ? odysseyDesignTokens.HueBlue600
      : completed
        ? odysseyDesignTokens.HueNeutral800
        : odysseyDesignTokens.HueNeutral700,

    "&.Mui-active": {
      color: odysseyDesignTokens.HueBlue700,
    },

    "&:hover": {
      cursor: active ? "default" : "pointer",
      color: active
        ? odysseyDesignTokens.HueBlue600 // No hover color change for active
        : completed
          ? odysseyDesignTokens.HueNeutral800 // Keep color same for completed
          : odysseyDesignTokens.HueNeutral900,
      background: active
        ? "transparent"
        : completed
          ? "transparent"
          : "transparent",
    },
  },
}));

const StepDescription = styled("div")<{
  odysseyDesignTokens: ReturnType<typeof useOdysseyDesignTokens>;
  completed: boolean;
  active: boolean;
}>(({ completed, active, odysseyDesignTokens }) => ({
  fontSize: odysseyDesignTokens.TypographySizeSubordinate,
  lineHeight: odysseyDesignTokens.TypographyLineHeightBody,
  marginTop: "4px",
  color: active
    ? odysseyDesignTokens.HueBlue400
    : completed
      ? odysseyDesignTokens.HueNeutral500
      : odysseyDesignTokens.HueNeutral600,

  "&:hover": {
    color: active
      ? odysseyDesignTokens.HueBlue400 // No color change for active
      : completed
        ? odysseyDesignTokens.HueNeutral500 // Keep color same for completed
        : odysseyDesignTokens.HueNeutral800,
  },
}));

const StepIcon = ({
  completed,
  active,
  stepNumber,
  variant,
  odysseyDesignTokens,
}: {
  completed: boolean;
  active: boolean;
  stepNumber: number;
  variant: "numeric" | "nonNumeric";
  odysseyDesignTokens: ReturnType<typeof useOdysseyDesignTokens>;
}) => (
  <StepIconContainer
    completed={completed}
    active={active}
    variant={variant}
    odysseyDesignTokens={odysseyDesignTokens}
  >
    {completed && variant === "numeric" ? (
      <CheckIcon />
    ) : variant === "numeric" ? (
      <span style={{ fontWeight: 700 }}>{stepNumber + 1}</span>
    ) : null}
  </StepIconContainer>
);

const Stepper = ({
  activeStep,
  allowBackStep = false,
  nonLinear = false,
  orientation = "horizontal",
  variant = "numeric",
  steps,
  onChange,
  testId,
}: StepperProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const handleStepClick = useCallback(
    (step: number) => {
      if (!onChange) return;

      const isCompleted = step < activeStep;
      const canAdvance = nonLinear;
      const canGoBack = allowBackStep;

      if (
        (isCompleted && canGoBack) ||
        (!isCompleted && canAdvance) ||
        step === activeStep
      ) {
        onChange(step);
      }
    },
    [activeStep, allowBackStep, nonLinear, onChange],
  );

  if (steps.length > 5) {
    console.warn(
      "Stepper component supports maximum of 5 steps. Additional steps will be ignored.",
    );
  }

  return (
    <StepperContainer
      activeStep={activeStep}
      orientation={orientation}
      odysseyDesignTokens={odysseyDesignTokens}
      data-se={testId}
    >
      {steps.slice(0, 5).map((step, index) => {
        const completed = index < activeStep;
        const active = index === activeStep;

        return (
          <MuiStep
            key={index}
            completed={completed}
            onClick={() => handleStepClick(index)}
            sx={{
              cursor:
                (completed && allowBackStep) ||
                (!completed && nonLinear) ||
                index === activeStep
                  ? "pointer"
                  : "default",
              flex: orientation === "vertical" ? 1 : "none",
              padding:
                orientation === "vertical"
                  ? `${odysseyDesignTokens.Spacing1} 0`
                  : 0,
            }}
          >
            <StepLabel
              odysseyDesignTokens={odysseyDesignTokens}
              completed={completed}
              active={active}
              StepIconComponent={(props) => (
                <StepIcon
                  {...props}
                  completed={completed}
                  active={active}
                  stepNumber={index}
                  variant={variant}
                  odysseyDesignTokens={odysseyDesignTokens}
                />
              )}
            >
              {step.label}
              {step.description && (
                <StepDescription
                  odysseyDesignTokens={odysseyDesignTokens}
                  completed={completed}
                  active={active}
                >
                  {step.description}
                </StepDescription>
              )}
            </StepLabel>
          </MuiStep>
        );
      })}
    </StepperContainer>
  );
};

const MemoizedStepper = memo(Stepper);
MemoizedStepper.displayName = "Stepper";

export { MemoizedStepper as Stepper };
