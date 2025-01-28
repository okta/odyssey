/*!
 * Copyright (c) 2021-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { useOdysseyDesignTokens } from "@okta/odyssey-react-mui";
import {
  Stepper,
  StepperNavigation,
  StepperProps,
} from "@okta/odyssey-react-mui/labs";
import { Meta, StoryObj } from "@storybook/react";
import { expect, waitFor, within } from "@storybook/test";
import { userEvent } from "@testing-library/user-event";
import { useState } from "react";
import { MuiThemeDecorator } from "../../../../.storybook/components/index.js";

const storybookMeta: Meta<StepperProps> = {
  title: "Labs Components/Stepper",
  component: Stepper,
  argTypes: {
    activeStep: {
      control: "number",
      description: "Current active step (0-based index)",
      table: {
        type: { summary: "number" },
      },
      type: {
        required: true,
        name: "number",
      },
    },
    allowBackStep: {
      control: "boolean",
      description: "Allow navigation to completed steps",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    nonLinear: {
      control: "boolean",
      description: "Allow skipping to future steps",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onChange: {
      control: { type: "object" },
      description: "Callback fired when a step is clicked",
      table: {
        type: { summary: "func" },
      },
    },
    orientation: {
      control: { type: "radio" },
      options: ["horizontal", "vertical"],
      description: "Layout orientation of the stepper",
      table: {
        type: { summary: '"horizontal" | "vertical"' },
        defaultValue: { summary: "horizontal" },
      },
    },
    variant: {
      control: { type: "radio" },
      options: ["numeric", "nonNumeric"],
      description: "Visual variant of steps",
      table: {
        type: { summary: '"numeric" | "nonNumeric"' },
        defaultValue: { summary: "numeric" },
      },
    },
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

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

const DefaultTemplate: StoryObj<StepperProps> = {
  render: function C(args) {
    const [activeStep, setActiveStep] = useState(args.activeStep || 0);
    const handleStepChange = (step: number) => {
      setActiveStep(step);
    };

    return (
      <Stepper
        {...args}
        activeStep={activeStep}
        steps={args.steps || defaultSteps}
        onChange={handleStepChange}
      />
    );
  },
  play: async ({ canvasElement, step }) => {
    await step("verify stepper structure", async () => {
      const canvas = within(canvasElement);

      await waitFor(() => {
        // Verify basic structure
        const steps = canvas.getAllByRole("tab");
        expect(steps.length).toBeGreaterThan(0); // At least one step exists

        // Verify that each step has the expected structure
        steps.forEach((step) => {
          expect(step.querySelector(".MuiStepLabel-label")).toBeTruthy();

          expect(
            step.querySelector(".MuiStepLabel-iconContainer"),
          ).toBeTruthy();

          // At least one step should be active
          expect(
            steps.some((s) => s.getAttribute("aria-current") === "step"),
          ).toBeTruthy();
        });
      });
    });
  },
};

export const Default: StoryObj<StepperProps> = {
  ...DefaultTemplate,
  args: {
    activeStep: 1,
  },
};

export const NonNumeric: StoryObj<StepperProps> = {
  ...DefaultTemplate,
  args: {
    variant: "nonNumeric",
  },
};

export const Vertical: StoryObj<StepperProps> = {
  ...DefaultTemplate,
  args: {
    orientation: "vertical",
    variant: "nonNumeric",
    nonLinear: true,
    allowBackStep: true,
  },
};

export const NonLinearNavigation: StoryObj<StepperProps> = {
  ...DefaultTemplate,
  args: {
    nonLinear: false,
    allowBackStep: false,
    activeStep: 0,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("verify future steps not clickable", async () => {
      const findStep = (text: string) => {
        const element = canvas.getByText(text);
        return element.closest('[role="tab"]');
      };
      const reviewStep = findStep("Review");
      await userEvent.click(reviewStep!);

      await waitFor(() => {
        const firstStep = findStep("Account details");
        expect(firstStep?.getAttribute("aria-current")).toBe("step");
      });
    });
  },
};

export const WithLongDescription: StoryObj<StepperProps> = {
  ...DefaultTemplate,
  args: {
    steps: [
      {
        label: "Account setup",
        description: "Configure your account settings.",
      },
      {
        label: "User profile",
        description: "Tell us more about yourself.",
      },
      { label: "Review", description: "Confirm the details." },
    ],
  },
};

export const VerticalUserOnboarding: StoryObj<StepperProps> = {
  ...DefaultTemplate,
  args: {
    activeStep: 2,
    orientation: "vertical",
    steps: [
      {
        label: "Organization Details",
        description:
          "Set up your organization's name, domain, and basic information.",
      },
      {
        label: "Security Settings",
        description:
          "Configure multi-factor authentication and password policies.",
      },
      {
        label: "Directory Setup",
        description:
          "Connect your user directory or create a new one for user management.",
      },
      {
        label: "Admin Configuration",
        description: "Set up initial administrator accounts and permissions.",
      },
      {
        label: "Review & Launch",
        description: "Review all settings and activate your organization.",
      },
    ],
  },
};

export const HorizontalWorkflow: StoryObj<StepperProps> = {
  ...DefaultTemplate,
  args: {
    orientation: "horizontal",
    steps: [
      {
        label: "Create Request",
        description: "Submit new workflow request",
      },
      {
        label: "Department Review",
        description: "Awaiting department approval",
      },
      {
        label: "Manager Approval",
        description: "Final management review",
      },
      {
        label: "Completion",
        description: "Process workflow completion",
      },
    ],
  },
};

export const BackNavigation = () => {
  const [activeStep, setActiveStep] = useState(1);
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const steps = [
    { label: "Account Details", description: "Basic information" },
    { label: "Preferences", description: "Set your preferences" },
    { label: "Review", description: "Review your information" },
    { label: "Submit", description: "Complete registration" },
  ];

  return (
    <>
      <Stepper
        steps={steps}
        activeStep={activeStep}
        allowBackStep={true}
        onChange={setActiveStep}
      />
      <StepperNavigation
        totalSteps={steps.length}
        currentStep={activeStep}
        onBack={() => setActiveStep((prev) => Math.max(0, prev - 1))}
        onNext={() =>
          setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))
        }
        onStepClick={setActiveStep}
        isStepClickable={(step) => step <= activeStep}
        odysseyDesignTokens={odysseyDesignTokens}
      />
    </>
  );
};

BackNavigation.parameters = {
  docs: {
    description: {
      story:
        "Users can navigate back to previously completed steps but are not able to move forward without completing the current step",
    },
  },
};

export const DescriptionTest: StoryObj<StepperProps> = {
  render: function C() {
    const [activeStep, setActiveStep] = useState(0);
    const handleStepChange = (step: number) => {
      setActiveStep(step);
    };

    const stepsWithDescription = [
      {
        label: "Step One",
        description: "First step description",
      },
      {
        label: "Step Two",
        description: "Second step description",
      },
      {
        label: "Step Three",
        description: "Third step description",
      },
    ];

    return (
      <Stepper
        orientation="horizontal"
        activeStep={activeStep}
        steps={stepsWithDescription}
        onChange={handleStepChange}
      />
    );
  },
};

export const WithNavigation: StoryObj<StepperProps> = {
  args: {
    allowBackStep: true,
    nonLinear: true,
  },
  render: function C(args) {
    const [activeStep, setActiveStep] = useState(0);
    const odysseyDesignTokens = useOdysseyDesignTokens();

    const handleNext = () => {
      setActiveStep((prevStep) =>
        Math.min(prevStep + 1, defaultSteps.length - 1),
      );
    };

    const handleBack = () => {
      setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
    };

    const handleStepClick = (step: number) => {
      setActiveStep(step);
    };

    const isStepClickable = (step: number) => {
      const isCompleted = step < activeStep;
      return (
        (isCompleted && (args.allowBackStep ?? false)) ||
        (!isCompleted && (args.nonLinear ?? false))
      );
    };

    return (
      <>
        <Stepper
          {...args}
          activeStep={activeStep}
          steps={defaultSteps}
          onChange={handleStepClick}
        />
        <StepperNavigation
          totalSteps={defaultSteps.length}
          currentStep={activeStep}
          onBack={handleBack}
          onNext={handleNext}
          onStepClick={handleStepClick}
          isStepClickable={isStepClickable}
          odysseyDesignTokens={odysseyDesignTokens}
        />
      </>
    );
  },
};
