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

import { render, screen, fireEvent } from "@testing-library/react";
import { Stepper, StepperNavigation } from "./Stepper";
import { OdysseyProvider } from "./OdysseyProvider";
import { useOdysseyDesignTokens } from "./OdysseyDesignTokensContext";

const defaultSteps = [
  {
    label: "Account details",
    description: "Setup login and preferences",
  },
  {
    label: "Personal info",
    description: "Basic user information",
  },
  {
    label: "Review",
    description: "Verify all information",
  },
];

describe("Stepper", () => {
  test("displays steps with labels and descriptions", () => {
    render(
      <OdysseyProvider>
        <Stepper activeStep={0} steps={defaultSteps} onChange={() => {}} />
      </OdysseyProvider>,
    );

    defaultSteps.forEach((step) => {
      expect(screen.getByText(step.label)).toBeInTheDocument();
      expect(screen.getByText(step.description)).toBeInTheDocument();
    });
  });

  test("highlights active step correctly", () => {
    render(
      <OdysseyProvider>
        <Stepper activeStep={1} steps={defaultSteps} onChange={() => {}} />
      </OdysseyProvider>,
    );

    expect(screen.getByText("Personal info")).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByText("Account details")).toHaveAttribute(
      "aria-selected",
      "false",
    );
  });

  test("calls onChange when clicking a step in nonLinear mode", () => {
    const mockOnChange = jest.fn();
    render(
      <OdysseyProvider>
        <Stepper
          activeStep={0}
          steps={defaultSteps}
          onChange={mockOnChange}
          nonLinear
        />
      </OdysseyProvider>,
    );

    fireEvent.click(screen.getByText("Review"));
    expect(mockOnChange).toHaveBeenCalledWith(2);
  });

  test("prevents navigation to future steps in linear mode", () => {
    const mockOnChange = jest.fn();
    render(
      <OdysseyProvider>
        <Stepper
          activeStep={0}
          steps={defaultSteps}
          onChange={mockOnChange}
          nonLinear={false}
        />
      </OdysseyProvider>,
    );

    const futureStep = screen.getByText("Review");
    expect(futureStep).toHaveAttribute("aria-disabled", "true");
    fireEvent.click(futureStep);
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  test("renders stepper with correct ARIA attributes", () => {
    render(
      <OdysseyProvider>
        <Stepper activeStep={0} steps={defaultSteps} onChange={() => {}} />
      </OdysseyProvider>,
    );

    const stepList = screen.getByRole("tablist");
    expect(stepList).toHaveAttribute("aria-label", "Progress");
    expect(stepList).toHaveAttribute("aria-orientation", "horizontal");
  });
});

describe("StepperNavigation", () => {
  test("handles back and next navigation", () => {
    const mockOnBack = jest.fn();
    const mockOnNext = jest.fn();

    render(
      <OdysseyProvider>
        <StepperNavigation
          totalSteps={3}
          currentStep={1}
          onBack={mockOnBack}
          onNext={mockOnNext}
          odysseyDesignTokens={useOdysseyDesignTokens()}
        />
      </OdysseyProvider>,
    );

    const backButton = screen.getByText("Back");
    const nextButton = screen.getByText("Next");

    fireEvent.click(backButton);
    expect(mockOnBack).toHaveBeenCalled();

    fireEvent.click(nextButton);
    expect(mockOnNext).toHaveBeenCalled();
  });

  test("disables back button on first step", () => {
    render(
      <OdysseyProvider>
        <StepperNavigation
          totalSteps={3}
          currentStep={0}
          onBack={() => {}}
          onNext={() => {}}
          odysseyDesignTokens={useOdysseyDesignTokens()}
        />
      </OdysseyProvider>,
    );

    expect(screen.getByText("Back")).toBeDisabled();
    expect(screen.getByText("Next")).toBeEnabled();
  });

  test("shows Finish instead of Next on last step", () => {
    render(
      <OdysseyProvider>
        <StepperNavigation
          totalSteps={3}
          currentStep={2}
          onBack={() => {}}
          onNext={() => {}}
          odysseyDesignTokens={useOdysseyDesignTokens()}
        />
      </OdysseyProvider>,
    );

    expect(screen.getByText("Back")).toBeEnabled();
    expect(screen.getByText("Finish")).toBeInTheDocument();
    expect(screen.queryByText("Next")).not.toBeInTheDocument();
  });
});
