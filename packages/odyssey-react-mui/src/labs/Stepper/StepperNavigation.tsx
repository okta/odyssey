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

const StepperNavigation = ({
  currentStep,
  nextButtonLabel,
  odysseyDesignTokens,
  onBack,
  onNext,
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
      <NavigationSection align="center" />
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
