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
    const mockOnStepClick = jest.fn();
    const mockIsStepClickable = jest.fn();

    render(
      <OdysseyProvider>
        <StepperNavigation
          totalSteps={3}
          currentStep={1}
          onBack={mockOnBack}
          onNext={mockOnNext}
          odysseyDesignTokens={useOdysseyDesignTokens()}
          onStepClick={mockOnStepClick}
          isStepClickable={mockIsStepClickable}
        />
      </OdysseyProvider>,
    );

    const backButton = screen.getByText("Previous");
    const nextButton = screen.getByText("Next");

    fireEvent.click(backButton);
    expect(mockOnBack).toHaveBeenCalled();

    fireEvent.click(nextButton);
    expect(mockOnNext).toHaveBeenCalled();
  });

  test("handles dot navigation correctly", () => {
    const mockOnBack = jest.fn();
    const mockOnNext = jest.fn();
    const mockOnStepClick = jest.fn();
    const mockIsStepClickable = (step: number) => step !== 1; // Example: All steps clickable except step 1

    render(
      <OdysseyProvider>
        <StepperNavigation
          totalSteps={3}
          currentStep={1}
          onBack={mockOnBack}
          onNext={mockOnNext}
          odysseyDesignTokens={useOdysseyDesignTokens()}
          onStepClick={mockOnStepClick}
          isStepClickable={mockIsStepClickable}
        />
      </OdysseyProvider>,
    );

    // Find dots by their aria-label
    const dots = screen
      .getAllByRole("button")
      .filter((elem) =>
        elem.getAttribute("aria-label")?.startsWith("Go to step"),
      );

    // Test clicking a clickable dot
    fireEvent.click(dots[2]); // Click third dot
    expect(mockOnStepClick).toHaveBeenCalledWith(2);

    // Test clicking a non-clickable dot
    fireEvent.click(dots[1]); // Click second dot
    expect(mockOnStepClick).not.toHaveBeenCalledWith(1);

    // Test dot accessibility attributes
    expect(dots[0]).toHaveAttribute("tabIndex", "0"); // Clickable
    expect(dots[1]).toHaveAttribute("tabIndex", "-1"); // Not clickable
    expect(dots[2]).toHaveAttribute("tabIndex", "0"); // Clickable
  });

  test("hides navigation buttons appropriately", () => {
    const mockOnStepClick = jest.fn();
    const mockIsStepClickable = jest.fn();

    render(
      <OdysseyProvider>
        <StepperNavigation
          totalSteps={3}
          currentStep={0}
          onBack={() => {}}
          onNext={() => {}}
          odysseyDesignTokens={useOdysseyDesignTokens()}
          onStepClick={mockOnStepClick}
          isStepClickable={mockIsStepClickable}
        />
      </OdysseyProvider>,
    );

    // Previous button should be hidden on first step
    expect(screen.queryByText("Previous")).not.toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();

    // Re-render with last step
    render(
      <OdysseyProvider>
        <StepperNavigation
          totalSteps={3}
          currentStep={2}
          onBack={() => {}}
          onNext={() => {}}
          odysseyDesignTokens={useOdysseyDesignTokens()}
          onStepClick={mockOnStepClick}
          isStepClickable={mockIsStepClickable}
        />
      </OdysseyProvider>,
    );

    // Next button should be hidden on last step
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.queryByText("Next")).not.toBeInTheDocument();
  });
});
