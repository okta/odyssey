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

import { HtmlProps } from "../../HtmlProps.js";
import { DesignTokens } from "../../OdysseyDesignTokensContext.js";

export type StepData = {
  /**
   * Optional description text below step label
   */
  description?: string;
  /**
   * The label text for the step
   */
  label: string;
};

//Define handler types for public API
export type StepChangeHandler = (step: number) => void;

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
   * Aria label for the stepper container,
   * Falls back to "Progress steps"
   */
  ariaLabel?: HtmlProps["ariaLabel"];
  /**
   * Tracks completed steps
   */
  completedSteps?: Set<number>;
  /**
   * Button label for the next navigation button
   */
  nextButtonLabel?: string;
  /**
   * Allow skipping to future steps
   */
  nonLinear?: boolean;
  /**
   * Callback fired when a step is clicked
   */
  onChange?: StepChangeHandler;
  /**
   * Layout orientation of the stepper
   */
  orientation?: "horizontal" | "vertical";
  /**
   * Button label for the previous navigation button
   */
  previousButtonLabel?: string;
  /**
   * Array of step data
   */
  steps: StepData[];
  /**
   * Visual variant of steps
   */
  variant?: "numeric" | "nonNumeric";
} & Pick<HtmlProps, "testId" | "translate">;

export type StepIconProps = {
  /**
   * Whether the step is currently active
   */
  active: boolean;
  /**
   * Whether the step is completed
   */
  completed: boolean;
  /**
   * Whether non-linear navigation is enabled
   */
  nonLinear: boolean;
  /**
   * Design tokens for styling
   */
  odysseyDesignTokens: DesignTokens;
  /**
   * The index number of the step (0-based)
   */
  stepNumber: number;
  /**
   * Visual variant of the step icon
   */
  variant: NonNullable<StepperProps["variant"]>;
};

export type StepperNavigationProps = {
  /**
   * Current active step (0-based index)
   */
  currentStep: number;
  /**
   * Function to determine if a step is clickable
   */
  isStepClickable: (step: number) => boolean;
  /**
   * Callback fired when back button is clicked.
   * @param currentStep - The index of the current step (before navigation)
   * @param targetStep - The index of the previous step (where navigation will go)
   */
  onBack: (currentStep: number, targetStep: number) => void;

  /**
   * Callback fired when next button is clicked.
   * @param currentStep - The index of the current step (before navigation)
   * @param targetStep - The index of the next step (where navigation will go)
   */
  onNext: (currentStep: number, targetStep: number) => void;
  /**
   * Callback fired when a step dot is clicked
   */
  onStepClick: StepChangeHandler;
  /**
   * Custom label for the next button
   */
  nextButtonLabel?: string;
  /**
   * Design tokens for styling
   */
  odysseyDesignTokens: DesignTokens;
  /**
   * Custom label for the previous button
   */
  previousButtonLabel?: string;
  /**
   * Total number of steps
   */
  totalSteps: number;
};
