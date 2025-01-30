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
} from "../../OdysseyDesignTokensContext.js";
import { StepIcon } from "./StepIcon.js";
import { StepperProps } from "./Stepper.types.js";
import {
  shouldForwardStepDescriptionProps,
  shouldForwardStepperProps,
  filterExcludedProps,
} from "./Stepper.utils.js";

const StyledStep = styled(MuiStep, {
  shouldForwardProp: filterExcludedProps([
    "odysseyDesignTokens",
    "orientation",
    "isClickable",
  ]),
})<{
  odysseyDesignTokens: DesignTokens;
  orientation?: "horizontal" | "vertical";
  isClickable: boolean;
}>(({ orientation, odysseyDesignTokens, isClickable }) => ({
  padding: 0,

  ...(orientation === "vertical" && {
    flex: 1,
    padding: `${odysseyDesignTokens.Spacing1} 0`,
  }),

  //Clickable focus styles
  ...(isClickable && {
    "&:focus-visible": {
      boxShadow: `0 0 0 2px ${odysseyDesignTokens.HueNeutralWhite}, 0 0 0 4px ${odysseyDesignTokens.PalettePrimaryMain}`,
      outline: "2px solid transparent",
      outlineOffset: "1px",
    },
  }),
}));

const StepperContainer = styled(MuiStepper, {
  shouldForwardProp: shouldForwardStepperProps,
})<{
  nonLinear?: boolean;
  odysseyDesignTokens: DesignTokens;
  orientation?: "horizontal" | "vertical";
  stepVariant?: "numeric" | "nonNumeric";
}>(({ nonLinear, odysseyDesignTokens, orientation, stepVariant }) => ({
  padding: 0,
  borderRadius: odysseyDesignTokens.BorderRadiusMain,

  //Horizontal orientation styles
  ...(orientation === "horizontal" && {
    justifyContent: "flex-start",
    "& .MuiStep-root": {
      flex: "0 0 auto",
      padding: `${odysseyDesignTokens.Spacing3} ${odysseyDesignTokens.Spacing4}`,
      borderRadius: odysseyDesignTokens.BorderRadiusMain,
      alignItems: "center",

      "&:not(:has(.Mui-active))": {
        "&.Mui-completed": {
          "&:hover": {
            "& .MuiStepLabel-label": {
              color: odysseyDesignTokens.HueNeutral800,
            },
            "& .MuiStepLabel-labelContainer div": {
              color: odysseyDesignTokens.PaletteNeutralDark,
            },
          },
        },
        "&:hover": {
          ...(nonLinear && {
            backgroundColor: odysseyDesignTokens.HueNeutral100,
            cursor: "pointer",
          }),
          "& .MuiStepLabel-label": {
            color: nonLinear
              ? odysseyDesignTokens.PaletteNeutralDark
              : odysseyDesignTokens.PaletteNeutralMain,
          },
          "& .MuiStepLabel-labelContainer div": {
            color: nonLinear
              ? odysseyDesignTokens.HueNeutral800
              : odysseyDesignTokens.PaletteNeutralMain,
          },
        },
      },
    },
  }),

  //Vertical orientation styles
  ...(orientation === "vertical" && {
    width: "fit-content",
    alignItems: "start",
    "& .MuiStep-root": {
      position: "relative" as const,
      flex: 1,
      paddingLeft: odysseyDesignTokens.Spacing5,
      paddingTop:
        stepVariant === "nonNumeric" ? 0 : odysseyDesignTokens.Spacing2,
      paddingBottom: 0,
      borderRadius: odysseyDesignTokens.BorderRadiusMain,

      "&::before": {
        content: '""',
        position: "absolute" as const,
        left: stepVariant === "nonNumeric" ? "31.5px" : "35.5px",
        top: stepVariant === "nonNumeric" ? "35px" : "40px",
        height:
          stepVariant === "nonNumeric"
            ? "calc(100% - 35px)"
            : "calc(100% - 40px)",
        width: "1px",
        backgroundColor: odysseyDesignTokens.BorderColorDisplay,
      },

      "&:last-child::before": {
        display: "none",
      },

      "& .MuiStepLabel-labelContainer": {
        minHeight: stepVariant === "nonNumeric" ? "20px" : "38px",
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
              ? odysseyDesignTokens.PaletteNeutralDark
              : odysseyDesignTokens.PaletteNeutralMain,
          },
          "& .MuiStepLabel-labelContainer div": {
            color: nonLinear
              ? odysseyDesignTokens.HueNeutral700
              : odysseyDesignTokens.PaletteNeutralMain,
          },
        },
      },
    },
  }),

  //Connector styles
  "& .MuiStepConnector-line": {
    borderColor: odysseyDesignTokens.BorderColorDisplay,
    borderWidth: "1px",
    minWidth: odysseyDesignTokens.Spacing4,
    ...(orientation === "vertical" && {
      minHeight: odysseyDesignTokens.Spacing4,
    }),
  },

  "& .MuiStepConnector-root": {
    ...(orientation === "horizontal" && {
      top: odysseyDesignTokens.Spacing5,
      left: "calc(-50% + 20px)",
      right: "calc(50% + 20px)",
      margin: `auto ${odysseyDesignTokens.Spacing2}`,
    }),
    ...(orientation === "vertical" && {
      marginLeft: stepVariant === "nonNumeric" ? "31.5px" : "35.5px",
    }),
  },
}));

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
  activeStep: number; // Add this
  allowBackStep?: boolean;
  completed: boolean;
  odysseyDesignTokens: DesignTokens;
  nonLinear?: boolean;
  orientation?: "horizontal" | "vertical";
  stepIndex: number;
  variant?: "numeric" | "nonNumeric";
}>(
  ({
    active,
    activeStep,
    allowBackStep,
    completed,
    nonLinear,
    odysseyDesignTokens,
    orientation,
    stepIndex,
    variant,
  }) => ({
    "&.MuiStepLabel-root": {
      paddingTop: 0,
      paddingBottom: 0,
    },

    "& .MuiStepLabel-iconContainer": {
      paddingRight: odysseyDesignTokens.Spacing3,
      paddingTop: odysseyDesignTokens.Spacing0,

      ...(orientation === "vertical" &&
        variant === "numeric" && {
          alignSelf: "flex-start",
        }),

      ...(variant === "nonNumeric" && {
        alignSelf: "center",
      }),
    },

    //Label styles
    "& .MuiStepLabel-label": {
      fontFamily: "inherit",
      fontSize: odysseyDesignTokens.TypographySizeHeading6,
      fontWeight: odysseyDesignTokens.TypographyWeightHeadingBold,
      lineHeight: odysseyDesignTokens.TypographyLineHeightHeading6,

      ...(active && {
        color: odysseyDesignTokens.PalettePrimaryText,
      }),

      ...(completed && {
        color: odysseyDesignTokens.PaletteNeutralDark,
      }),

      ...(!active &&
        !completed && {
          color: odysseyDesignTokens.PaletteNeutralMain,
        }),

      "&.Mui-active": {
        color: odysseyDesignTokens.PalettePrimaryText,
      },
    },

    "&:hover": {
      //Only show pointer cursor on clickable steps when allowBackStep and not nonLinear isn't
      ...(!active &&
        (nonLinear ||
          (allowBackStep && completed && stepIndex < activeStep)) && {
          cursor: "pointer",
        }),
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
  //Base styles
  fontSize: odysseyDesignTokens.TypographySizeSubordinate,
  fontWeight: odysseyDesignTokens.TypographyWeightBody,
  lineHeight: odysseyDesignTokens.TypographyLineHeightBody,
  maxWidth: orientation === "horizontal" ? "200px" : "170px",

  //State-based colors
  ...(active && {
    color: odysseyDesignTokens.PalettePrimaryText,
  }),
  ...(completed && {
    color: odysseyDesignTokens.PaletteNeutralDark,
  }),
  ...(!active &&
    !completed && {
      color: odysseyDesignTokens.PaletteNeutralMain,
    }),
}));

const Stepper = ({
  activeStep,
  allowBackStep = false,
  ariaLabel,
  completedSteps = new Set(),
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
      const isCompleted = completedSteps.has(stepIndex);

      if (isCompleted && allowBackStep) {
        return true; //Allow clicking completed steps if allowBackStep is true
      }

      if (nonLinear) {
        return stepIndex !== activeStep; //Allow clicking any non-active step if nonLinear
      }

      return stepIndex === activeStep; //Only allow clicking current step in linear mode
    },
    [activeStep, allowBackStep, nonLinear, completedSteps],
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
  //Generates unique IDs, used by aria attirbutes to associate and describe a step's description
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
      const completed = completedSteps.has(index);
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
          isClickable={isClickable}
          role="tab"
          tabIndex={isClickable ? 0 : -1}
          {...ariaProps}
        >
          <StepLabel
            id={`step-label-${index}`}
            odysseyDesignTokens={odysseyDesignTokens}
            completed={completed}
            active={active}
            activeStep={activeStep}
            allowBackStep={allowBackStep}
            nonLinear={nonLinear}
            orientation={orientation}
            variant={variant}
            stepIndex={index}
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
    completedSteps,
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
