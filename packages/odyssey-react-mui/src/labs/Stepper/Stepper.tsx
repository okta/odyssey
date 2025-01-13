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
import {
  Step as MuiStep,
  StepLabel as MuiStepLabel,
  Stepper as MuiStepper,
} from "@mui/material";
import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../Buttons";
import { HtmlProps } from "../../HtmlProps";
import { CheckIcon } from "../../icons.generated";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext";

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
   * Aria label for the stepper container
   */
  ariaLabel?: string;
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
} & Pick<HtmlProps, "testId" | "translate">;

const createShouldForwardProp = (excludedProps: string[]) => (prop: string) =>
  !excludedProps.includes(prop);

const shouldForwardStepProps = createShouldForwardProp([
  "odysseyDesignTokens",
  "orientation",
  "isClickable",
]);

const shouldForwardStepIconContainerProps = createShouldForwardProp([
  "completed",
  "active",
  "variant",
  "odysseyDesignTokens",
  "nonLinear",
]);

const shouldForwardStepperProps = createShouldForwardProp([
  "odysseyDesignTokens",
  "allowBackStep",
  "nonLinear",
  "stepVariant",
]);

const shouldForwardStepDescriptionProps = createShouldForwardProp([
  "odysseyDesignTokens",
  "completed",
  "active",
  "orientation",
]);

const shouldForwardStepNumberProps = createShouldForwardProp([
  "odysseyDesignTokens",
  "completed",
  "active",
  "nonLinear",
]);

const shouldForwardStepperDotProps = createShouldForwardProp([
  "status",
  "odysseyDesignTokens",
  "isClickable",
]);

const shouldForwardStepperNavigationProps = createShouldForwardProp([
  "odysseyDesignTokens",
]);

const shouldForwardNavigationSectionProps = createShouldForwardProp(["align"]);

const StyledStep = styled(MuiStep, {
  shouldForwardProp: shouldForwardStepProps,
})<{
  previousButtonLabel?: string;
  nextButtonLabel?: string;
  odysseyDesignTokens: DesignTokens;
  orientation?: "horizontal" | "vertical";
  isClickable: boolean;
}>(({ orientation, odysseyDesignTokens }) => ({
  flex: orientation === "vertical" ? 1 : "none",
  padding: orientation === "vertical" ? `${odysseyDesignTokens.Spacing1} 0` : 0,
}));

const StepperContainer = styled(MuiStepper, {
  shouldForwardProp: shouldForwardStepperProps,
})<{
  odysseyDesignTokens: DesignTokens;
  orientation?: "horizontal" | "vertical";
  allowBackStep?: boolean;
  nonLinear?: boolean;
  activeStep: number;
  stepVariant?: "numeric" | "nonNumeric";
}>(({ orientation, odysseyDesignTokens, nonLinear, stepVariant }) => {
  return {
    alignItems: "start",
    ...(orientation === "horizontal" && {
      justifyContent: "flex-start",
      "& .MuiStep-root": {
        flex: "0 0 auto",
        padding: `${odysseyDesignTokens.Spacing3} ${odysseyDesignTokens.Spacing4}`,
        borderRadius: odysseyDesignTokens.BorderRadiusMain,

        "&:has(.Mui-active)": {
          backgroundColor: odysseyDesignTokens.HueNeutralWhite,
        },

        "&:not(:has(.Mui-active))": {
          "&.Mui-completed": {
            "&:hover": {
              "& .MuiStepLabel-label": {
                color: odysseyDesignTokens.HueNeutral800,
              },
              "& .MuiStepLabel-labelContainer div": {
                color: odysseyDesignTokens.HueNeutral800,
              },
            },
          },
          "&:hover": {
            backgroundColor: nonLinear
              ? odysseyDesignTokens.HueNeutral200
              : "transparent",
            cursor: nonLinear ? "pointer" : "default",
            "& .MuiStepLabel-label": {
              color: nonLinear
                ? odysseyDesignTokens.HueNeutral900
                : odysseyDesignTokens.HueNeutral600,
            },
            "& .MuiStepLabel-labelContainer div": {
              color: nonLinear
                ? odysseyDesignTokens.HueNeutral800
                : odysseyDesignTokens.HueNeutral600,
            },
          },
        },
      },
    }),
    ...(orientation === "vertical" && {
      width: "fit-content",
      "& .MuiStep-root": {
        flex: 1,
        paddingBottom: 0,
        paddingTop: 0,
      },
    }),
    padding: 0,
    borderRadius: odysseyDesignTokens.BorderRadiusMain,
    ...(orientation === "vertical" && {
      "& .MuiStep-root": {
        position: "relative",
        paddingLeft: odysseyDesignTokens.Spacing5,
        paddingTop: odysseyDesignTokens.Spacing2,
        paddingBottom: 0,
        "&::before": {
          content: '""',
          position: "absolute",
          left: stepVariant === "nonNumeric" ? "29.5px" : "35.5px",
          top: "46px",
          height: "calc(100% - 46px)",
          width: "1px",
          backgroundColor: odysseyDesignTokens.HueNeutral200,
        },
        "&:last-child::before": {
          display: "none",
        },
        "& .MuiStepConnector-root": {
          display: "none",
        },
      },
    }),
    "& .MuiStepConnector-line": {
      borderColor: odysseyDesignTokens.HueNeutral200,
      borderWidth: "1px",
      minWidth: "16px",
      minHeight:
        orientation === "vertical" ? odysseyDesignTokens.Spacing3 : undefined,
    },
    "& .MuiStepConnector-root": {
      ...(orientation === "horizontal"
        ? {
            top: "24px",
            left: "calc(-50% + 20px)",
            right: "calc(50% + 20px)",
            margin: `auto ${odysseyDesignTokens.Spacing2}`,
          }
        : {
            marginLeft: stepVariant === "nonNumeric" ? "29.5px" : "35.5px",
          }),
    },
  };
});

const StyledStepIconContainer = styled("div", {
  shouldForwardProp: shouldForwardStepIconContainerProps,
})<{
  completed: boolean;
  active: boolean;
  variant: "numeric" | "nonNumeric";
  nonLinear: boolean;
  odysseyDesignTokens: DesignTokens;
}>(({ completed, active, variant, nonLinear, odysseyDesignTokens }) => ({
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
        : odysseyDesignTokens.HueNeutral600
  }`,
  background: completed
    ? odysseyDesignTokens.HueGreen400
    : active
      ? odysseyDesignTokens.HueBlue600
      : "transparent",
  transition: `all ${odysseyDesignTokens.TransitionDurationMain}`,
  ".MuiStep-root:hover &": {
    border:
      !active && !completed && nonLinear
        ? `1px solid ${odysseyDesignTokens.HueNeutral900}`
        : undefined,
  },

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
      "variant",
    ].includes(prop as string),
})<{
  odysseyDesignTokens: DesignTokens;
  completed: boolean;
  active: boolean;
  allowBackStep?: boolean;
  nonLinear?: boolean;
  orientation?: "horizontal" | "vertical";
  variant?: "numeric" | "nonNumeric";
}>(
  ({
    completed,
    active,
    nonLinear,
    allowBackStep,
    odysseyDesignTokens,
    orientation,
    variant,
  }) => ({
    "& .MuiStepLabel-iconContainer": {
      paddingRight: odysseyDesignTokens.Spacing3,
      alignSelf:
        orientation === "vertical" && variant === "nonNumeric"
          ? "center"
          : orientation === "horizontal" && variant === "numeric"
            ? "flex-start"
            : variant === "nonNumeric" && orientation === "horizontal"
              ? "center"
              : "flex-start",
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
          : odysseyDesignTokens.HueNeutral600,

      "&.Mui-active": {
        color: odysseyDesignTokens.HueBlue700,
      },
    },

    "&.MuiStepLabel-root": { paddingTop: 0, paddingBottom: 0 },
    "&:hover": {
      cursor:
        !active && (nonLinear || (allowBackStep && completed))
          ? "pointer"
          : "default",
    },
  }),
);

const StyledStepDescription = styled("div", {
  shouldForwardProp: shouldForwardStepDescriptionProps,
})<{
  odysseyDesignTokens: DesignTokens;
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
      ? odysseyDesignTokens.HueNeutral700
      : odysseyDesignTokens.HueNeutral600,
  className: "MuiStepDescription-root",
}));

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

const StyledStepperDot = styled("div", {
  shouldForwardProp: shouldForwardStepperDotProps,
})<{
  status: "previous" | "current" | "next";
  odysseyDesignTokens: DesignTokens;
  isClickable: boolean;
}>(({ status, odysseyDesignTokens, isClickable }) => ({
  width: odysseyDesignTokens.Spacing2,
  height: odysseyDesignTokens.Spacing2,
  borderRadius: "50%",
  border: "1px solid",
  borderColor:
    status === "current"
      ? odysseyDesignTokens.HueNeutral500
      : status === "previous"
        ? odysseyDesignTokens.HueNeutral400
        : odysseyDesignTokens.HueNeutral300,
  background:
    status === "current" ? odysseyDesignTokens.HueNeutral500 : "transparent",
  margin: "0 2px",
  cursor: isClickable ? "pointer" : "default",
  "&:hover": isClickable
    ? {
        background: odysseyDesignTokens.HueNeutral300,
        borderColor: odysseyDesignTokens.HueNeutral500,
      }
    : undefined,
}));

const StepperNavigationContainer = styled("div", {
  shouldForwardProp: shouldForwardStepperNavigationProps,
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  display: "grid",
  gridTemplateColumns: "1fr auto 1fr",
  alignItems: "center",
  marginTop: odysseyDesignTokens.Spacing3,
  gap: odysseyDesignTokens.Spacing3,
}));

const NavigationSection = styled("div", {
  shouldForwardProp: shouldForwardNavigationSectionProps,
})<{
  align: "start" | "center" | "end";
}>(({ align }) => ({
  display: "flex",
  justifySelf:
    align === "start" ? "flex-start" : align === "end" ? "flex-end" : "center",
  alignItems: "center",
}));

export type StepperNavigationProps = {
  /**
   * Total number of steps
   */
  totalSteps: number;
  /**
   * Current active step (0-based index)
   */
  currentStep: number;
  /**
   * Callback fired when back button is clicked
   */
  onBack: () => void;
  /**
   * Callback fired when next button is clicked
   */
  onNext: () => void;
  /**
   * Callback fired when a step dot is clicked
   */
  onStepClick: (step: number) => void;
  /**
   * Function to determine if a step is clickable
   */
  isStepClickable: (step: number) => boolean;
  /**
   * Custom label for the previous button
   */
  previousButtonLabel?: string;
  /**
   * Custom label for the next button
   */
  nextButtonLabel?: string;
  /**
   * Design tokens for styling
   */
  odysseyDesignTokens: DesignTokens;
};

const StepperNavigation = ({
  totalSteps,
  currentStep,
  onBack,
  onNext,
  previousButtonLabel,
  nextButtonLabel,
  odysseyDesignTokens,
  onStepClick,
  isStepClickable,
}: StepperNavigationProps) => {
  const { t } = useTranslation();

  const labels = useMemo(
    () => ({
      //TODO: Determine if translation is needed or if we can re-use
      previous: previousButtonLabel ?? t("pagination.previous"),
      next: nextButtonLabel ?? t("pagination.next"),
    }),
    [previousButtonLabel, nextButtonLabel, t],
  );

  const dots = useMemo(() => {
    return Array.from({ length: totalSteps }, (_, i) => {
      const status: "previous" | "current" | "next" =
        i === currentStep ? "current" : i < currentStep ? "previous" : "next";
      const isClickable = isStepClickable(i);

      const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (!isClickable) return;

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault(); // Prevent page scroll on space
          onStepClick(i);
        }
      };

      return (
        <StyledStepperDot
          key={i}
          status={status}
          odysseyDesignTokens={odysseyDesignTokens}
          isClickable={isClickable}
          onClick={isClickable ? () => onStepClick(i) : undefined}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={isClickable ? 0 : -1}
          aria-label={`Go to step ${i + 1}`}
        />
      );
    });
  }, [
    totalSteps,
    currentStep,
    isStepClickable,
    onStepClick,
    odysseyDesignTokens,
  ]);

  return (
    <StepperNavigationContainer odysseyDesignTokens={odysseyDesignTokens}>
      <NavigationSection align="start">
        {currentStep > 0 && (
          <Button
            label={labels.previous}
            variant="secondary"
            onClick={onBack}
            size="small"
          />
        )}
      </NavigationSection>
      <NavigationSection align="center">{dots}</NavigationSection>
      <NavigationSection align="end">
        {currentStep < totalSteps - 1 && (
          <Button
            label={labels.next}
            variant="secondary"
            onClick={onNext}
            size="small"
          />
        )}
      </NavigationSection>
    </StepperNavigationContainer>
  );
};
const StepIcon = ({
  completed,
  active,
  stepNumber,
  variant,
  odysseyDesignTokens,
  nonLinear,
}: {
  completed: boolean;
  active: boolean;
  stepNumber: number;
  variant: "numeric" | "nonNumeric";
  odysseyDesignTokens: DesignTokens;
  nonLinear: boolean;
}) => (
  <StyledStepIconContainer
    completed={completed}
    active={active}
    variant={variant}
    odysseyDesignTokens={odysseyDesignTokens}
    nonLinear={nonLinear}
  >
    {completed && variant === "numeric" ? (
      <CheckIcon />
    ) : variant === "numeric" ? (
      <StyledStepNumber
        completed={completed}
        active={active}
        odysseyDesignTokens={odysseyDesignTokens}
        nonLinear={nonLinear}
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
  ariaLabel,
}: StepperProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>, stepIndex: number) => {
      if (!onChange) return;

      const isCompleted = stepIndex < activeStep;
      const canAdvance = nonLinear;
      const canGoBack = allowBackStep;
      const isClickable =
        (isCompleted && canGoBack) || (!isCompleted && canAdvance);

      if (!isClickable) return;

      switch (event.key) {
        case "Enter":
        case " ":
          event.preventDefault();
          onChange(stepIndex);
          break;
        case "ArrowRight":
          event.preventDefault();
          if (stepIndex < steps.length - 1) {
            const nextElement = document.querySelector(
              `[data-step-index="${stepIndex + 1}"]`,
            ) as HTMLElement;
            nextElement?.focus();
          }
          break;
        case "ArrowLeft":
          event.preventDefault();
          if (stepIndex > 0) {
            const prevElement = document.querySelector(
              `[data-step-index="${stepIndex - 1}"]`,
            ) as HTMLElement;
            prevElement?.focus();
          }
          break;
      }
    },
    [onChange, activeStep, nonLinear, allowBackStep, steps.length],
  );

  // Generates unique IDs, used by aria attirbutes to associate and describe a step's description
  const stepDescriptionIds = useMemo(
    () => steps.map((_, index) => `step-description-${index}`),
    [steps],
  );

  const handleStepClick = useCallback(
    (step: number) => {
      if (!onChange) return;

      const isCompleted = step < activeStep;
      const canAdvance = nonLinear;
      const canGoBack = allowBackStep;

      if ((isCompleted && canGoBack) || (!isCompleted && canAdvance)) {
        onChange(step);
      }
    },
    [activeStep, allowBackStep, nonLinear, onChange],
  );

  // Memoize steps mapping to prevent unnecessary recalculations
  const renderedSteps = useMemo(() => {
    return steps.map((step, index) => {
      const completed = index < activeStep;
      const active = index === activeStep;
      const stepDescriptionId = stepDescriptionIds[index];
      const isClickable = nonLinear
        ? (completed && allowBackStep) || !completed
        : index === activeStep;

      const getStepAriaLabel = (
        index: number,
        total: number,
        status: "completed" | "active" | "pending",
      ) => {
        const statusText = {
          completed: "Completed",
          active: "Current",
          pending: "Pending",
        }[status];
        return `Step ${index + 1} of ${total}: ${statusText}`;
      };

      const ariaProps = {
        "aria-current": active ? ("step" as const) : undefined, // Type assertion to ensure correct aria-current value
        "aria-label": getStepAriaLabel(
          index,
          steps.length,
          completed ? "completed" : active ? "active" : "pending",
        ),
        ...(step.description && { "aria-describedby": stepDescriptionId }),
        ...(orientation === "vertical" && {
          "aria-expanded": active,
          "aria-controls": `step-content-${index}`,
        }),
      };

      return (
        <StyledStep
          key={index}
          completed={completed}
          onClick={() => handleStepClick(index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          odysseyDesignTokens={odysseyDesignTokens}
          orientation={orientation}
          isClickable={
            nonLinear ? (completed && allowBackStep) || !completed : false
          }
          role="tab"
          tabIndex={isClickable ? 0 : -1}
          data-step-index={index}
          {...ariaProps}
        >
          <StepLabel
            odysseyDesignTokens={odysseyDesignTokens}
            completed={completed}
            active={active}
            allowBackStep={allowBackStep}
            nonLinear={nonLinear}
            orientation={orientation}
            variant={variant}
            StepIconComponent={(props) => (
              <StepIcon
                {...props}
                completed={completed}
                active={active}
                stepNumber={index}
                variant={variant}
                odysseyDesignTokens={odysseyDesignTokens}
                nonLinear={nonLinear}
              />
            )}
          >
            {step.label}
            {step.description && (
              <StyledStepDescription
                id={stepDescriptionId}
                odysseyDesignTokens={odysseyDesignTokens}
                completed={completed}
                active={active}
                orientation={orientation}
              >
                {step.description}
              </StyledStepDescription>
            )}
          </StepLabel>
          {orientation === "vertical" && (
            <div
              id={`step-content-${index}`}
              role="region"
              aria-labelledby={stepDescriptionId}
            >
              {/* Step content would go here */}
            </div>
          )}
        </StyledStep>
      );
    });
  }, [
    steps,
    activeStep,
    allowBackStep,
    nonLinear,
    handleStepClick,
    handleKeyDown,
    odysseyDesignTokens,
    orientation,
    variant,
    stepDescriptionIds,
  ]);

  return (
    <StepperContainer
      activeStep={activeStep}
      orientation={orientation}
      odysseyDesignTokens={odysseyDesignTokens}
      data-se={testId}
      allowBackStep={allowBackStep}
      nonLinear={nonLinear}
      stepVariant={variant}
      aria-label={ariaLabel || "Progress steps"} // TODO: Use Trasnlated string
      role="tablist"
    >
      {renderedSteps}
    </StepperContainer>
  );
};

const MemoizedStepperNavigation = memo(StepperNavigation);
MemoizedStepperNavigation.displayName = "StepperNavigation";

const MemoizedStepIcon = memo(StepIcon);
MemoizedStepIcon.displayName = "StepIcon";

const MemoizedStepper = memo(Stepper);
MemoizedStepper.displayName = "Stepper";

export {
  MemoizedStepper as Stepper,
  MemoizedStepperNavigation as StepperNavigation,
};
