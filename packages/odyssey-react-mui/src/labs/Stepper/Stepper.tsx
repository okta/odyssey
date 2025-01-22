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
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext";
import { StepIcon } from "./StepIcon";
import { StepperProps } from "./Stepper.types";
import {
  shouldForwardStepDescriptionProps,
  shouldForwardStepperProps,
  shouldForwardStepProps,
} from "./Stepper.utils";

const StyledStep = styled(MuiStep, {
  shouldForwardProp: shouldForwardStepProps,
})<{
  odysseyDesignTokens: DesignTokens;
  orientation?: "horizontal" | "vertical";
  isClickable: boolean;
}>(({ orientation, odysseyDesignTokens, isClickable }) => ({
  flex: orientation === "vertical" ? 1 : "none",
  padding: orientation === "vertical" ? `${odysseyDesignTokens.Spacing1} 0` : 0,
  "&:focus-visible": isClickable
    ? {
        boxShadow: `0 0 0 2px ${odysseyDesignTokens.HueNeutralWhite}, 0 0 0 4px ${odysseyDesignTokens.PalettePrimaryMain}`,
        outline: "2px solid transparent",
        outlineOffset: "1px",
      }
    : undefined,
}));

const StepperContainer = styled(MuiStepper, {
  shouldForwardProp: shouldForwardStepperProps,
})<{
  nonLinear?: boolean;
  odysseyDesignTokens: DesignTokens;
  orientation?: "horizontal" | "vertical";
  stepVariant?: "numeric" | "nonNumeric";
}>(({ nonLinear, odysseyDesignTokens, orientation, stepVariant }) => {
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
              ? odysseyDesignTokens.HueNeutral100
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
    padding: 0,
    borderRadius: odysseyDesignTokens.BorderRadiusMain,
    ...(orientation === "vertical" && {
      width: "fit-content",
      "& .MuiStep-root": {
        position: "relative",
        flex: 1,
        paddingLeft: odysseyDesignTokens.Spacing5,
        paddingTop:
          stepVariant === "nonNumeric" ? 0 : odysseyDesignTokens.Spacing2,
        paddingBottom: 0,
        borderRadius: odysseyDesignTokens.BorderRadiusMain,
        "&::before": {
          content: '""',
          position: "absolute",
          left: stepVariant === "nonNumeric" ? "31.5px" : "35.5px", //Half pixel values used for absolute center positioning
          top: stepVariant === "nonNumeric" ? "35px" : "40px",
          height:
            stepVariant === "nonNumeric"
              ? "calc(100% - 35px)"
              : "calc(100% - 40px)",
          width: "1px",
          backgroundColor: odysseyDesignTokens.HueNeutral200,
        },
        "&:last-child::before": {
          display: "none",
        },
        "& .MuiStepLabel-labelContainer": {
          minHeight: stepVariant === "nonNumeric" ? "20px" : "38px", //For proper verical alignment of the connector line
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
    "& .MuiStepConnector-line": {
      borderColor: odysseyDesignTokens.HueNeutral200,
      borderWidth: "1px",
      minWidth: odysseyDesignTokens.Spacing4,
      minHeight:
        orientation === "vertical" ? odysseyDesignTokens.Spacing4 : undefined,
    },
    "& .MuiStepConnector-root": {
      ...(orientation === "horizontal"
        ? {
            top: odysseyDesignTokens.Spacing5,
            left: "calc(-50% + 20px)",
            right: "calc(50% + 20px)",
            margin: `auto ${odysseyDesignTokens.Spacing2}`,
          }
        : {
            marginLeft: stepVariant === "nonNumeric" ? "31.5px" : "35.5px",
          }),
    },
  };
});

const StepLabel = styled(MuiStepLabel, {
  shouldForwardProp: (prop) =>
    ![
      "active",
      "allowBackStep",
      "completed",
      "nonLinear",
      "odysseyDesignTokens",
      "orientation",
      "variant",
    ].includes(prop),
})<{
  active: boolean;
  allowBackStep?: boolean;
  completed: boolean;
  odysseyDesignTokens: DesignTokens;
  nonLinear?: boolean;
  orientation?: "horizontal" | "vertical";
  variant?: "numeric" | "nonNumeric";
}>(
  ({
    active,
    allowBackStep,
    completed,
    nonLinear,
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
        color: odysseyDesignTokens.HueBlue600,
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
  active: boolean;
  completed: boolean;
  odysseyDesignTokens: DesignTokens;
  orientation?: "horizontal" | "vertical";
}>(({ active, completed, odysseyDesignTokens, orientation }) => ({
  fontSize: odysseyDesignTokens.TypographySizeSubordinate,
  fontWeight: odysseyDesignTokens.TypographyWeightBody,
  lineHeight: odysseyDesignTokens.TypographyLineHeightBody,
  maxWidth: orientation === "horizontal" ? "200px" : "170px",
  color: active
    ? odysseyDesignTokens.HueBlue600
    : completed
      ? odysseyDesignTokens.HueNeutral700
      : odysseyDesignTokens.HueNeutral600,
}));

const Stepper = ({
  activeStep,
  allowBackStep = false,
  ariaLabel,
  nonLinear = false,
  onChange,
  orientation = "horizontal",
  steps,
  testId,
  variant = "numeric",
}: StepperProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { t } = useTranslation();

  const isStepClickable = useCallback(
    (stepIndex: number) => {
      const isCompleted = stepIndex < activeStep;

      if (isCompleted && allowBackStep) {
        return true; // Allow clicking completed steps if allowBackStep is true
      }

      if (nonLinear) {
        return !isCompleted; // Allow clicking future steps if nonLinear
      }

      return stepIndex === activeStep; // Only allow clicking current step in linear mode
    },
    [activeStep, allowBackStep, nonLinear],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>, stepIndex: number): void => {
      if (!onChange || !isStepClickable(stepIndex)) return;

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onChange(stepIndex);
      }
    },
    [onChange, isStepClickable],
  );
  // Generates unique IDs, used by aria attirbutes to associate and describe a step's description
  const stepDescriptionIds = useMemo(
    () => steps.map((_, index) => `step-description-${index}`),
    [steps],
  );

  const handleStepClick = useCallback(
    (step: number) => {
      if (!onChange || !isStepClickable(step)) return;
      onChange(step);
    },
    [onChange, isStepClickable],
  );

  const renderedSteps = useMemo(() => {
    return steps.map((step, index) => {
      const completed = index < activeStep;
      const active = index === activeStep;
      const stepDescriptionId = stepDescriptionIds[index];
      const isClickable = isStepClickable(index);

      const getStepAriaLabel = (
        index: number,
        total: number,
        status: "completed" | "active" | "pending",
      ) => {
        const statusText = t(
          `stepper.aria.step.${status === "active" ? "current" : status}`,
        );
        return `Step ${index + 1} of ${total}: ${statusText}`;
      };

      const ariaProps = {
        "aria-current": active ? ("step" as const) : undefined,
        "aria-label": getStepAriaLabel(
          index,
          steps.length,
          completed ? "completed" : active ? "active" : "pending",
        ),
        ...(step.description && { "aria-describedby": stepDescriptionId }),
      };

      return (
        <StyledStep
          key={index}
          completed={completed}
          onClick={() => handleStepClick(index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          odysseyDesignTokens={odysseyDesignTokens}
          orientation={orientation}
          isClickable={isStepClickable(index)}
          role="tab"
          tabIndex={isClickable ? 0 : -1}
          {...ariaProps}
        >
          <StepLabel
            id={`step-label-${index}`}
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
        </StyledStep>
      );
    });
  }, [
    activeStep,
    allowBackStep,
    handleStepClick,
    handleKeyDown,
    isStepClickable,
    nonLinear,
    odysseyDesignTokens,
    orientation,
    stepDescriptionIds,
    steps,
    t,
    variant,
  ]);

  return (
    <StepperContainer
      activeStep={activeStep}
      orientation={orientation}
      odysseyDesignTokens={odysseyDesignTokens}
      data-se={testId}
      nonLinear={nonLinear}
      stepVariant={variant}
      aria-label={ariaLabel || t("stepper.aria.progress")}
      role="tablist"
    >
      {renderedSteps}
    </StepperContainer>
  );
};

const MemoizedStepper = memo(Stepper);
MemoizedStepper.displayName = "Stepper";

export { MemoizedStepper as Stepper };
