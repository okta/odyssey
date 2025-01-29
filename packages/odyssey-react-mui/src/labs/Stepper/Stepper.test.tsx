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
import { vi } from "vitest";
import { Stepper } from "./Stepper.js";
import { StepperNavigation } from "./StepperNavigation.js";
import { OdysseyProvider } from "../../OdysseyProvider.js";
import { useOdysseyDesignTokens } from "../../OdysseyDesignTokensContext.js";
import { StepperNavigationProps } from "./Stepper.types.js";
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
  // Rendering tests
  describe("rendering", () => {
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

    test("renders correctly in vertical orientation", () => {
      render(
        <OdysseyProvider>
          <Stepper
            activeStep={1}
            steps={defaultSteps}
            onChange={() => {}}
            orientation="vertical"
          />
        </OdysseyProvider>,
      );

      const stepList = screen.getByRole("tablist");
      expect(stepList).toHaveAttribute("aria-label", "Progress steps");
    });

    test("renders correctly with nonNumeric variant", () => {
      render(
        <OdysseyProvider>
          <Stepper
            activeStep={1}
            steps={defaultSteps}
            onChange={() => {}}
            variant="nonNumeric"
          />
        </OdysseyProvider>,
      );

      const stepLabels = screen.getAllByRole("tab");
      stepLabels.forEach((step) => {
        expect(step).not.toHaveTextContent(/^\d+$/);
      });
    });
  });

  // Accessibility tests
  describe("accessibility", () => {
    test("associates descriptions with steps correctly", () => {
      render(
        <OdysseyProvider>
          <Stepper activeStep={0} steps={defaultSteps} onChange={() => {}} />
        </OdysseyProvider>,
      );

      const steps = screen.getAllByRole("tab");
      steps.forEach((step, index) => {
        const descriptionId = step.getAttribute("aria-describedby");
        expect(
          screen.getByText(defaultSteps[index].description),
        ).toHaveAttribute("id", descriptionId);
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

    test("renders stepper with correct ARIA attributes", () => {
      render(
        <OdysseyProvider>
          <Stepper activeStep={0} steps={defaultSteps} onChange={() => {}} />
        </OdysseyProvider>,
      );

      const stepList = screen.getByRole("tablist");
      expect(stepList).toHaveAttribute("aria-label", "Progress steps");
    });
  });

  // Helper component for navigation tests
  type NavigationTestProps = Omit<
    StepperNavigationProps,
    "odysseyDesignTokens"
  >;
  const NavigationTest = ({
    totalSteps,
    currentStep,
    onBack,
    onNext,
    previousButtonLabel,
    nextButtonLabel,
  }: NavigationTestProps) => {
    const odysseyDesignTokens = useOdysseyDesignTokens();
    return (
      <StepperNavigation
        totalSteps={totalSteps}
        currentStep={currentStep}
        onBack={onBack}
        onNext={onNext}
        previousButtonLabel={previousButtonLabel}
        nextButtonLabel={nextButtonLabel}
        odysseyDesignTokens={odysseyDesignTokens}
      />
    );
  };

  // Navigation tests
  describe("navigation", () => {
    test("enforces navigation rules based on mode", async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();

      // Test nonLinear mode
      const { unmount: unmountNonLinear } = render(
        <OdysseyProvider>
          <Stepper
            activeStep={0}
            steps={defaultSteps}
            onChange={mockOnChange}
            nonLinear
          />
        </OdysseyProvider>,
      );

      await user.click(
        screen.getByRole("tab", {
          name: "Step 3 of 3: Pending",
        }),
      );
      expect(mockOnChange).toHaveBeenCalledWith(2);
      unmountNonLinear();
      mockOnChange.mockClear();

      // Test linear mode
      const { unmount: unmountLinear } = render(
        <OdysseyProvider>
          <Stepper
            activeStep={0}
            steps={defaultSteps}
            onChange={mockOnChange}
            nonLinear={false}
          />
        </OdysseyProvider>,
      );

      await user.click(
        screen.getByRole("tab", {
          name: "Step 3 of 3: Pending",
        }),
      );
      expect(mockOnChange).not.toHaveBeenCalled();
      unmountLinear();
      mockOnChange.mockClear();

      // Test backStep behavior
      const { unmount: unmountBackStep } = render(
        <OdysseyProvider>
          <Stepper
            activeStep={2}
            steps={defaultSteps}
            onChange={mockOnChange}
            allowBackStep
            completedSteps={new Set([0, 1])}
          />
        </OdysseyProvider>,
      );

      const steps = screen.getAllByRole("tab");
      await user.click(steps[0]);
      expect(mockOnChange).toHaveBeenCalledWith(0);
      unmountBackStep();
      mockOnChange.mockClear();

      // Test disabled backStep
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

      const disabledSteps = screen.getAllByRole("tab");
      await user.click(disabledSteps[0]);
      expect(mockOnChange).not.toHaveBeenCalled();
    });

    test("supports keyboard navigation", async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();

      render(
        <OdysseyProvider>
          <Stepper
            activeStep={1}
            steps={defaultSteps}
            onChange={mockOnChange}
            allowBackStep
            completedSteps={new Set([0])}
          />
        </OdysseyProvider>,
      );

      const steps = screen.getAllByRole("tab");
      const firstStep = steps[0];

      await user.tab();
      expect(document.activeElement).toBe(firstStep);

      await user.keyboard("{Enter}");
      expect(mockOnChange).toHaveBeenCalledWith(0);
      mockOnChange.mockClear();

      await user.keyboard(" ");
      expect(mockOnChange).toHaveBeenCalledWith(0);
    });

    test("handles navigation controls and button states correctly", async () => {
      const user = userEvent.setup();
      const TestComponent = () => {
        const [activeStep, setActiveStep] = useState(1);

        return (
          <>
            <Stepper
              steps={defaultSteps}
              activeStep={activeStep}
              onChange={setActiveStep}
              allowBackStep
            />
            <NavigationTest
              totalSteps={defaultSteps.length}
              currentStep={activeStep}
              onBack={() => setActiveStep((prev) => prev - 1)}
              onNext={() => setActiveStep((prev) => prev + 1)}
            />
          </>
        );
      };

      render(
        <OdysseyProvider>
          <TestComponent />
        </OdysseyProvider>,
      );

      // Test starting state (middle step)
      expect(
        screen.getByRole("button", { name: /previous/i }),
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();

      // Test navigation to last step
      await user.click(screen.getByRole("button", { name: /next/i }));
      expect(screen.getAllByRole("tab")[2]).toHaveAttribute(
        "aria-current",
        "step",
      );
      expect(
        screen.queryByRole("button", { name: /next/i }),
      ).not.toBeInTheDocument();

      // Test navigation back
      await user.click(screen.getByRole("button", { name: /previous/i }));
      expect(screen.getAllByRole("tab")[1]).toHaveAttribute(
        "aria-current",
        "step",
      );
    });
  });
});
