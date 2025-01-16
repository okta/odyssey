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

import { HtmlProps } from "../../HtmlProps";
import { DesignTokens } from "../../OdysseyDesignTokensContext";

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

// Define handler types for public API
export type StepChangeHandler = (step: number) => void;

export type StepperProps = {
  /**
   * Aria label for the stepper container, Falls back to "Progress steps"
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
  onChange?: StepChangeHandler;
  /**
   * Button label for the previous navigation button
   */
  previousButtonLabel?: string;
  /**
   * Button label for the next navigation button
   */
  nextButtonLabel?: string;
} & Pick<HtmlProps, "testId" | "translate">;

export type StepIconProps = {
  /**
   * Whether the step is completed
   */
  completed: boolean;
  /**
   * Whether the step is currently active
   */
  active: boolean;
  /**
   * The index number of the step (0-based)
   */
  stepNumber: number;
  /**
   * Visual variant of the step icon
   */
  variant: NonNullable<StepperProps["variant"]>;
  /**
   * Design tokens for styling
   */
  odysseyDesignTokens: DesignTokens;
  /**
   * Whether non-linear navigation is enabled
   */
  nonLinear: boolean;
};

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
  onStepClick: StepChangeHandler;
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
