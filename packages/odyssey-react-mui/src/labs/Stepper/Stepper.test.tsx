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

import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Stepper } from "./Stepper";
import { StepperNavigation } from "./StepperNavigation";
import { OdysseyProvider } from "../../OdysseyProvider";
import { useOdysseyDesignTokens } from "../../OdysseyDesignTokensContext";
import { useState } from "react";

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

    const steps = screen.getAllByRole("tab");
    expect(steps[1]).toHaveAttribute("aria-current", "step");
    expect(steps[0]).not.toHaveAttribute("aria-current", "step");
  });

  test("calls onChange when clicking a step in nonLinear mode", async () => {
    const user = userEvent.setup();
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

    await user.click(screen.getByText("Review"));
    expect(mockOnChange).toHaveBeenCalledWith(2);
  });

  test("prevents navigation to future steps in linear mode", async () => {
    const user = userEvent.setup();
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
    await user.click(futureStep);
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  test("renders stepper with correct ARIA attributes", () => {
    render(
      <OdysseyProvider>
        <Stepper activeStep={0} steps={defaultSteps} onChange={() => {}} />
      </OdysseyProvider>,
    );

    // This test doesn't involve user interaction, so no changes needed
    const stepList = screen.getByRole("tablist");
    expect(stepList).toHaveAttribute("aria-label", "Progress steps");
  });

  describe("StepperNavigation", () => {
    test("handles back and next navigation", async () => {
      const user = userEvent.setup();
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

      await user.click(backButton);
      expect(mockOnBack).toHaveBeenCalled();

      await user.click(nextButton);
      expect(mockOnNext).toHaveBeenCalled();
    });

    test("renders dots with correct states", () => {
      const mockIsStepClickable = jest.fn((step) => step <= 1);
      render(
        <OdysseyProvider>
          <StepperNavigation
            totalSteps={3}
            currentStep={1}
            onBack={() => {}}
            onNext={() => {}}
            odysseyDesignTokens={useOdysseyDesignTokens()}
            onStepClick={() => {}}
            isStepClickable={mockIsStepClickable}
          />
        </OdysseyProvider>,
      );

      const dots = screen
        .getAllByRole("button")
        .filter((elem) =>
          elem.getAttribute("aria-label")?.startsWith("Go to step"),
        );

      // Test previous, current, and next states
      expect(dots[0]).toHaveAttribute("data-status", "previous");
      expect(dots[1]).toHaveAttribute("data-status", "current");
      expect(dots[2]).toHaveAttribute("data-status", "next");
    });

    test("handles dot navigation correctly", async () => {
      const user = userEvent.setup();
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
      await user.click(dots[2]); // Click third dot
      expect(mockOnStepClick).toHaveBeenCalledWith(2);

      // Test clicking a non-clickable dot
      await user.click(dots[1]); // Click second dot
      expect(mockOnStepClick).not.toHaveBeenCalledWith(1);

      // Test dot accessibility attributes (these don't need async since they're just checking attributes)
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

    test("allows navigation to completed steps with allowBackStep", async () => {
      const user = userEvent.setup();
      const mockOnChange = jest.fn();

      render(
        <OdysseyProvider>
          <Stepper
            activeStep={2}
            steps={defaultSteps}
            onChange={mockOnChange}
            allowBackStep
          />
        </OdysseyProvider>,
      );

      await user.click(screen.getByText("Account details"));
      expect(mockOnChange).toHaveBeenCalledWith(0);
    });

    test("prevents navigation to completed steps when allowBackStep is false", async () => {
      const user = userEvent.setup();
      const mockOnChange = jest.fn();

      render(
        <OdysseyProvider>
          <Stepper
            activeStep={2}
            steps={defaultSteps}
            onChange={mockOnChange}
            allowBackStep={false}
          />
        </OdysseyProvider>,
      );

      const firstStep = screen.getByText("Account details");
      await user.click(firstStep);
      expect(mockOnChange).not.toHaveBeenCalled();
    });

    test("integrates with StepperNavigation correctly", async () => {
      const user = userEvent.setup();
      const TestComponent = () => {
        const [activeStep, setActiveStep] = useState(1);
        const odysseyDesignTokens = useOdysseyDesignTokens();

        return (
          <>
            <Stepper
              steps={defaultSteps}
              activeStep={activeStep}
              onChange={setActiveStep}
              allowBackStep
            />
            <StepperNavigation
              totalSteps={defaultSteps.length}
              currentStep={activeStep}
              onBack={() => setActiveStep((prev) => prev - 1)}
              onNext={() => setActiveStep((prev) => prev + 1)}
              onStepClick={setActiveStep}
              isStepClickable={(step) => step <= activeStep}
              odysseyDesignTokens={odysseyDesignTokens}
            />
          </>
        );
      };

      render(
        <OdysseyProvider>
          <TestComponent />
        </OdysseyProvider>,
      );

      // Test navigation synchronization
      await user.click(screen.getByText("Next"));
      expect(screen.getAllByRole("tab")[2]).toHaveAttribute(
        "aria-current",
        "step",
      );

      await user.click(screen.getByText("Previous"));
      expect(screen.getAllByRole("tab")[1]).toHaveAttribute(
        "aria-current",
        "step",
      );
    });

    test("supports keyboard navigation", async () => {
      const user = userEvent.setup();
      const mockOnChange = jest.fn();

      render(
        <OdysseyProvider>
          <Stepper
            activeStep={1}
            steps={defaultSteps}
            onChange={mockOnChange}
            allowBackStep
          />
        </OdysseyProvider>,
      );
      await user.tab(); // Move focus to first interactive element

      await user.keyboard("{Enter}");
      expect(mockOnChange).toHaveBeenCalledWith(0);

      await user.keyboard("{Space}");
      expect(mockOnChange).toHaveBeenCalledWith(0);
    });
  });
});
