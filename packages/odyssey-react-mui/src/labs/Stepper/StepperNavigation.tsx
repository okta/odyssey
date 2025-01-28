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
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../Buttons/index.js";
import { StepperNavigationProps } from "./Stepper.types.js";
import {
  shouldForwardNavigationSectionProps,
  shouldForwardStepperDotProps,
  shouldForwardStepperNavigationProps,
} from "./Stepper.utils.js";

const StepperNavigationContainer = styled("div", {
  shouldForwardProp: shouldForwardStepperNavigationProps,
})<{
  odysseyDesignTokens: StepperNavigationProps["odysseyDesignTokens"];
}>(({ odysseyDesignTokens }) => ({
  display: "grid",
  gridTemplateColumns: "1fr auto 1fr",
  alignItems: "center",
  marginBlockStart: odysseyDesignTokens.Spacing3,
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

const StyledStepperDot = styled("button", {
  shouldForwardProp: shouldForwardStepperDotProps,
})<{
  status: "previous" | "current" | "next";
  odysseyDesignTokens: StepperNavigationProps["odysseyDesignTokens"];
  isClickable: boolean;
}>(({ status, odysseyDesignTokens, isClickable }) => ({
  //Base styles
  position: "relative",
  width: odysseyDesignTokens.Spacing5,
  height: odysseyDesignTokens.Spacing5,
  padding: 0,
  border: "none",
  background: "transparent",

  ...(isClickable && {
    cursor: "pointer",
  }),

  //Visual dot styles
  "&::after": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: odysseyDesignTokens.Spacing2,
    height: odysseyDesignTokens.Spacing2,
    borderRadius: "50%",
    border: "1px solid",

    //Status-based styles
    ...(status === "current" && {
      borderColor: odysseyDesignTokens.HueNeutral500,
      background: odysseyDesignTokens.HueNeutral500,
    }),
    ...(status === "previous" && {
      borderColor: odysseyDesignTokens.HueNeutral400,
      background: "transparent",
    }),
    ...(status === "next" && {
      borderColor: odysseyDesignTokens.HueNeutral300,
      background: "transparent",
    }),
  },

  ...(isClickable && {
    //Hover styles - only apply when not current
    "&:hover": {
      ...(status !== "current" && {
        "&::after": {
          background: odysseyDesignTokens.HueNeutral300,
          borderColor: odysseyDesignTokens.HueNeutral500,
        },
      }),
    },
    //Focus styles - apply for all clickable states
    "&:focus-visible": {
      boxShadow: `0 0 0 2px ${odysseyDesignTokens.HueNeutralWhite}, 0 0 0 4px ${odysseyDesignTokens.PalettePrimaryMain}`,
      outline: "2px solid transparent",
      outlineOffset: "1px",
    },
  }),
}));

const StyledNav = styled("nav")({
  display: "flex",
  gap: "2px",
});

const StyledList = styled("ul")({
  display: "flex",
  gap: "2px",
  margin: 0,
  padding: 0,
  listStyle: "none",
});

const StyledListItem = styled("li")({
  margin: 0,
  padding: 0,
});
const StepperNavigation = ({
  currentStep,
  isStepClickable,
  nextButtonLabel,
  odysseyDesignTokens,
  onBack,
  onNext,
  onStepClick,
  previousButtonLabel,
  totalSteps,
}: StepperNavigationProps) => {
  const { t } = useTranslation();

  const labels = useMemo(
    () => ({
      previous: previousButtonLabel ?? t("stepper.navigation.previous"),
      next: nextButtonLabel ?? t("stepper.navigation.next"),
    }),
    [previousButtonLabel, nextButtonLabel, t],
  );

  const dots = useMemo(() => {
    return (
      <StyledNav aria-label={t("stepper.aria.progress")}>
        <StyledList>
          {Array.from({ length: totalSteps }, (_, i) => {
            const status: "previous" | "current" | "next" =
              i === currentStep
                ? "current"
                : i < currentStep
                  ? "previous"
                  : "next";
            const isClickable = isStepClickable(i);

            return (
              <StyledListItem key={i}>
                <StyledStepperDot
                  type="button"
                  status={status}
                  odysseyDesignTokens={odysseyDesignTokens}
                  isClickable={isClickable}
                  onClick={isClickable ? () => onStepClick(i) : undefined}
                  disabled={!isClickable}
                  aria-label={t("stepper.navigation.gotoStep", {
                    number: i + 1,
                  })}
                  aria-current={status === "current" ? "step" : undefined}
                />
              </StyledListItem>
            );
          })}
        </StyledList>
      </StyledNav>
    );
  }, [
    currentStep,
    odysseyDesignTokens,
    isStepClickable,
    onStepClick,
    t,
    totalSteps,
  ]);

  return (
    <StepperNavigationContainer odysseyDesignTokens={odysseyDesignTokens}>
      <NavigationSection align="start">
        {currentStep > 0 && (
          <Button
            label={labels.previous}
            variant="secondary"
            onClick={() => onBack(currentStep, currentStep - 1)}
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
            onClick={() => onNext(currentStep, currentStep + 1)}
            size="small"
          />
        )}
      </NavigationSection>
    </StepperNavigationContainer>
  );
};

const MemoizedStepperNavigation = memo(StepperNavigation);
MemoizedStepperNavigation.displayName = "StepperNavigation";

export { MemoizedStepperNavigation as StepperNavigation };
