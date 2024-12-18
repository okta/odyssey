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
import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
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
   * Whether to show the stepper navigation controls
   * @default false
   */
  showNavigation?: boolean;
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
  /**
   * Button label for the previous navigation button
   */
  previousButtonLabel?: string;
  /**
   * Button label for the next navigation button
   */
  nextButtonLabel?: string;
} & Pick<HtmlProps, "testId">;

const StyledStep = styled(MuiStep, {
  shouldForwardProp: (prop) =>
    !["odysseyDesignTokens", "orientation", "isClickable"].includes(
      prop as string,
    ),
})<{
  previousButtonLabel?: string;
  nextButtonLabel?: string;

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
    justifyContent: "flex-start",
    "& .MuiStep-root": {
      flex: "0 0 auto",
      padding: `${odysseyDesignTokens.Spacing3} ${odysseyDesignTokens.Spacing4}`,
      borderRadius: odysseyDesignTokens.BorderRadiusMain,

      "&:not(:has(.Mui-active))": {
        // Exclude steps with active labels
        "&.Mui-completed": {
          "&:hover": {
            backgroundColor:
              nonLinear || allowBackStep
                ? odysseyDesignTokens.HueGreen50
                : "transparent",
            cursor: nonLinear || allowBackStep ? "pointer" : "default",

            "& .MuiStepLabel-label": {
              color:
                nonLinear || allowBackStep
                  ? odysseyDesignTokens.HueNeutral800
                  : odysseyDesignTokens.HueNeutral800,
            },
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
    width: "fit-content",
    "& .MuiStep-root": {
      flex: 1,
    },
  }),
  padding:
    orientation === "horizontal"
      ? `${odysseyDesignTokens.Spacing1} ${odysseyDesignTokens.Spacing2}`
      : odysseyDesignTokens.Spacing3,
  borderRadius: odysseyDesignTokens.BorderRadiusMain,
  ...(orientation === "vertical" && {
    "& .MuiStep-root": {
      position: "relative",
      paddingLeft: odysseyDesignTokens.Spacing5,
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
          margin: `0 ${odysseyDesignTokens.Spacing2}`,
        }
      : {
          marginLeft: "35.5px", // Center connector with circle
        }),
  },
}));

const StyledStepIconContainer = styled("div")<{
  completed: boolean;
  active: boolean;
  variant: "numeric" | "nonNumeric";
  odysseyDesignTokens: ReturnType<typeof useOdysseyDesignTokens>;
}>(({ completed, active, variant, odysseyDesignTokens }) => ({
  width:
    variant === "numeric"
      ? odysseyDesignTokens.Spacing5
      : odysseyDesignTokens.Spacing3,
  height:
    variant === "numeric"
      ? odysseyDesignTokens.Spacing5
      : odysseyDesignTokens.Spacing3,
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
  transition: `all ${odysseyDesignTokens.TransitionDurationMain}`,

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
      paddingRight: odysseyDesignTokens.Spacing3,
      alignSelf: orientation === "horizontal" ? "center" : "flex-start",
      paddingTop: odysseyDesignTokens.Spacing0,
    },
    "& .MuiStepLabel-label": {
      fontFamily: "inherit",
      fontSize: odysseyDesignTokens.TypographySizeHeading6,
      fontWeight: odysseyDesignTokens.TypographyWeightHeadingBold,
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

const StyledStepDescription = styled("div")<{
  odysseyDesignTokens: ReturnType<typeof useOdysseyDesignTokens>;
  completed: boolean;
  active: boolean;
  orientation?: "horizontal" | "vertical";
}>(({ completed, active, odysseyDesignTokens, orientation }) => ({
  fontSize: odysseyDesignTokens.TypographySizeSubordinate,
  fontWeight: odysseyDesignTokens.TypographyWeightBody,
  lineHeight: odysseyDesignTokens.TypographyLineHeightBody,
  maxWidth: orientation === "horizontal" ? "200px" : "170px",
  color: active
    ? odysseyDesignTokens.HueBlue600
    : completed
      ? odysseyDesignTokens.HueNeutral600
      : odysseyDesignTokens.HueNeutral700,
  className: "MuiStepDescription-root",
}));

const StyledStepNumber = styled("span")<{
  odysseyDesignTokens: ReturnType<typeof useOdysseyDesignTokens>;
  completed: boolean;
  active: boolean;
}>(({ completed, active, odysseyDesignTokens }) => ({
  fontWeight: odysseyDesignTokens.TypographyWeightHeadingBold,
  color:
    completed || active
      ? odysseyDesignTokens.HueNeutralWhite
      : odysseyDesignTokens.HueNeutral900,
}));

const StyledStepperDot = styled("div")<{
  status: "previous" | "current" | "next";
  odysseyDesignTokens: ReturnType<typeof useOdysseyDesignTokens>;
}>(({ status, odysseyDesignTokens }) => ({
  width: odysseyDesignTokens.Spacing2,
  height: odysseyDesignTokens.Spacing2,
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
  previousButtonLabel,
  nextButtonLabel,

  odysseyDesignTokens,
}: {
  totalSteps: number;
  currentStep: number;
  onBack: () => void;
  onNext: () => void;
  previousButtonLabel?: string;
  nextButtonLabel?: string;
  finishButtonLabel?: string;
  odysseyDesignTokens: ReturnType<typeof useOdysseyDesignTokens>;
}) => {
  const { t } = useTranslation();

  const labels = useMemo(
    () => ({
      previous: previousButtonLabel ?? t("pagination.previous"),
      next: nextButtonLabel ?? t("pagination.next"),
    }),
    [previousButtonLabel, nextButtonLabel, t],
  );

  const dots = Array.from({ length: totalSteps }, (_, i) => {
    let status: "previous" | "current" | "next" = "next";
    if (i === currentStep) status = "current";
    else if (i < currentStep) status = "previous";
    return (
      <StyledStepperDot
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
        label={labels.previous}
        variant="secondary"
        onClick={onBack}
        isDisabled={currentStep === 0}
        size="small"
      />
      <Box sx={{ display: "flex", alignItems: "center" }}>{dots}</Box>
      <Button
        label={labels.next}
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
  <StyledStepIconContainer
    completed={completed}
    active={active}
    variant={variant}
    odysseyDesignTokens={odysseyDesignTokens}
  >
    {completed && variant === "numeric" ? (
      <CheckIcon />
    ) : variant === "numeric" ? (
      <StyledStepNumber
        completed={completed}
        active={active}
        odysseyDesignTokens={odysseyDesignTokens}
      >
        {stepNumber + 1}
      </StyledStepNumber>
    ) : null}
  </StyledStepIconContainer>
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
  previousButtonLabel,
  nextButtonLabel,
  showNavigation = false,
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
                <StyledStepDescription
                  odysseyDesignTokens={odysseyDesignTokens}
                  completed={completed}
                  active={active}
                  orientation={orientation}
                >
                  {step.description}
                </StyledStepDescription>
              )}
            </StepLabel>
          </StyledStep>
        );
      })}
      {showNavigation && (
        <StepperNavigation
          totalSteps={steps.length}
          currentStep={activeStep}
          onBack={() => handleStepClick(activeStep - 1)}
          onNext={() => handleStepClick(activeStep + 1)}
          previousButtonLabel={previousButtonLabel}
          nextButtonLabel={nextButtonLabel}
          odysseyDesignTokens={odysseyDesignTokens}
        />
      )}
    </StepperContainer>
  );
};

const MemoizedStepper = memo(Stepper);
MemoizedStepper.displayName = "Stepper";

export { MemoizedStepper as Stepper, StepperNavigation };
