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
  Box,
} from "@mui/material";
import { memo, useCallback } from "react";
import { Button } from "./Buttons";
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

const StyledStep = styled(MuiStep, {
  shouldForwardProp: (prop) =>
    !["odysseyDesignTokens", "orientation", "isClickable"].includes(
      prop as string,
    ),
})<{
  odysseyDesignTokens: ReturnType<typeof useOdysseyDesignTokens>;
  orientation?: "horizontal" | "vertical";
  isClickable: boolean;
}>(({ orientation, odysseyDesignTokens }) => ({
  flex: orientation === "vertical" ? 1 : "none",
  padding: orientation === "vertical" ? `${odysseyDesignTokens.Spacing1} 0` : 0,
}));

const StepperContainer = styled(MuiStepper, {
  shouldForwardProp: (prop) =>
    !["odysseyDesignTokens", "allowBackStep", "nonLinear"].includes(
      prop as string,
    ),
})<{
  odysseyDesignTokens: ReturnType<typeof useOdysseyDesignTokens>;
  orientation?: "horizontal" | "vertical";
  allowBackStep?: boolean;
  nonLinear?: boolean;
  activeStep: number;
}>(({ orientation, odysseyDesignTokens, allowBackStep, nonLinear }) => ({
  ...(orientation === "horizontal" && {
    justifyContent: "flex-start", // Align steps to the start
    "& .MuiStep-root": {
      flex: "0 0 auto", // Prevent flex growth
      padding: "12px 16px",
      borderRadius: "12px",

      "&:not(:has(.Mui-active))": {
        // Exclude steps with active labels
        "&.Mui-completed": {
          "&:hover": {
            backgroundColor:
              nonLinear || allowBackStep
                ? odysseyDesignTokens.HueGreen50
                : "transparent",
            cursor: nonLinear || allowBackStep ? "pointer" : "default",
            // Apply hover text colors
            "& .MuiStepLabel-label": {
              color:
                nonLinear || allowBackStep
                  ? odysseyDesignTokens.HueNeutral800
                  : odysseyDesignTokens.HueNeutral800,
            },
            // Apply hover description colors
            "& .MuiStepLabel-labelContainer div": {
              color:
                nonLinear || allowBackStep
                  ? odysseyDesignTokens.HueNeutral800
                  : odysseyDesignTokens.HueNeutral500,
            },
          },
        },
        "&:not(.Mui-completed)": {
          "&:hover": {
            backgroundColor: nonLinear
              ? odysseyDesignTokens.HueNeutral300
              : "transparent",
            cursor: nonLinear ? "pointer" : "default",
            // Apply hover text colors
            "& .MuiStepLabel-label": {
              color: nonLinear
                ? odysseyDesignTokens.HueNeutral800
                : odysseyDesignTokens.HueNeutral900,
            },
            // Apply hover description colors
            "& .MuiStepLabel-labelContainer div": {
              color: nonLinear
                ? odysseyDesignTokens.HueNeutral800
                : odysseyDesignTokens.HueNeutral600,
            },
          },
        },
      },
    },
  }),
  ...(orientation === "vertical" && {
    "& .MuiStep-root": {
      flex: 1,
    },
  }),
  padding:
    orientation === "horizontal"
      ? `${odysseyDesignTokens.Spacing1} ${odysseyDesignTokens.Spacing2}`
      : odysseyDesignTokens.Spacing3,
  borderRadius: "12px",
  ...(orientation === "vertical" && {
    "& .MuiStep-root": {
      position: "relative",
      paddingLeft: "24px",
      "&::before": {
        content: '""',
        position: "absolute",
        left: "35.5px",
        top: "46px",
        height: "calc(100% - 46px)", // Subtract top offset to end at the right position
        width: "1px",
        backgroundColor: odysseyDesignTokens.HueNeutral200,
      },
      "&:last-child::before": {
        display: "none", // Remove connector from last step
      },
      // Hide default MUI connector
      "& .MuiStepConnector-root": {
        display: "none",
      },
    },
  }),
  "& .MuiStepConnector-line": {
    borderColor: odysseyDesignTokens.HueNeutral200,
    borderWidth: "1px",
    minWidth: "16px",
    minHeight: orientation === "vertical" ? "24px" : undefined,
  },
  "& .MuiStepConnector-root": {
    ...(orientation === "horizontal"
      ? {
          top: "24px",
          left: "calc(-50% + 20px)",
          right: "calc(50% + 20px)",
          margin: "0 8px",
        }
      : {
          marginLeft: "35.5px", // Center connector with circle
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
    ![
      "odysseyDesignTokens",
      "completed",
      "active",
      "allowBackStep",
      "nonLinear",
      "orientation",
    ].includes(prop as string),
})<{
  odysseyDesignTokens: ReturnType<typeof useOdysseyDesignTokens>;
  completed: boolean;
  active: boolean;
  allowBackStep?: boolean;
  nonLinear?: boolean;
  orientation?: "horizontal" | "vertical";
}>(
  ({
    completed,
    active,
    nonLinear,
    allowBackStep,
    odysseyDesignTokens,
    orientation,
  }) => ({
    "& .MuiStepLabel-iconContainer": {
      paddingRight: "12px",
      alignSelf: orientation === "horizontal" ? "center" : "flex-start",
      paddingTop: "2px",
    },
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
    },

    "&:hover": {
      cursor:
        !active && (nonLinear || (allowBackStep && completed))
          ? "pointer"
          : "default",
    },
  }),
);

const StepDescription = styled("div")<{
  odysseyDesignTokens: ReturnType<typeof useOdysseyDesignTokens>;
  completed: boolean;
  active: boolean;
  orientation?: "horizontal" | "vertical";
}>(({ completed, active, odysseyDesignTokens, orientation }) => ({
  fontSize: odysseyDesignTokens.TypographySizeSubordinate,
  fontWeight: "normal",
  lineHeight: odysseyDesignTokens.TypographyLineHeightBody,
  marginTop: "4px",
  maxWidth: orientation === "horizontal" ? "200px" : "170px",
  color: active
    ? odysseyDesignTokens.HueBlue600
    : completed
      ? odysseyDesignTokens.HueNeutral600
      : odysseyDesignTokens.HueNeutral700,
  className: "MuiStepDescription-root",
}));

const StepperDot = styled("div")<{
  status: "previous" | "current" | "next";
  odysseyDesignTokens: ReturnType<typeof useOdysseyDesignTokens>;
}>(({ status, odysseyDesignTokens }) => ({
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  border: "1px solid",
  borderColor:
    status === "current"
      ? odysseyDesignTokens.HueNeutral500
      : status === "previous"
        ? odysseyDesignTokens.HueNeutral400
        : odysseyDesignTokens.HueNeutral100,
  background:
    status === "current" ? odysseyDesignTokens.HueNeutral500 : "transparent",
  margin: "0 2px",
}));

const StepperNavigation = ({
  totalSteps,
  currentStep,
  onBack,
  onNext,
  odysseyDesignTokens,
}: {
  totalSteps: number;
  currentStep: number;
  onBack: () => void;
  onNext: () => void;
  odysseyDesignTokens: ReturnType<typeof useOdysseyDesignTokens>;
}) => {
  const dots = Array.from({ length: totalSteps }, (_, i) => {
    let status: "previous" | "current" | "next" = "next";
    if (i === currentStep) status = "current";
    else if (i < currentStep) status = "previous";
    return (
      <StepperDot
        key={i}
        status={status}
        odysseyDesignTokens={odysseyDesignTokens}
      />
    );
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mt: 2,
        gap: 2,
      }}
    >
      <Button
        label="Previous"
        variant="secondary"
        onClick={onBack}
        isDisabled={currentStep === 0}
        size="small"
      />
      <Box sx={{ display: "flex", alignItems: "center" }}>{dots}</Box>
      <Button
        label={currentStep === totalSteps - 1 ? "Finish" : "Next"}
        variant="primary"
        onClick={onNext}
        isDisabled={currentStep === totalSteps - 1}
        size="small"
      />
    </Box>
  );
};
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

  return (
    <StepperContainer
      activeStep={activeStep}
      orientation={orientation}
      odysseyDesignTokens={odysseyDesignTokens}
      data-se={testId}
      allowBackStep={allowBackStep}
      nonLinear={nonLinear}
    >
      {steps.map((step, index) => {
        const completed = index < activeStep;
        const active = index === activeStep;

        return (
          <StyledStep
            key={index}
            completed={completed}
            onClick={() => handleStepClick(index)}
            odysseyDesignTokens={odysseyDesignTokens}
            orientation={orientation}
            isClickable={
              nonLinear ? (completed && allowBackStep) || !completed : false
            }
          >
            <StepLabel
              odysseyDesignTokens={odysseyDesignTokens}
              completed={completed}
              active={active}
              allowBackStep={allowBackStep}
              nonLinear={nonLinear}
              orientation={orientation}
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
                  orientation={orientation}
                >
                  {step.description}
                </StepDescription>
              )}
            </StepLabel>
          </StyledStep>
        );
      })}
    </StepperContainer>
  );
};

const MemoizedStepper = memo(Stepper);
MemoizedStepper.displayName = "Stepper";

export { MemoizedStepper as Stepper, StepperNavigation };
