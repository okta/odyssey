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
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(
      //Initialize with completed steps based on activeStep for linear mode
      new Set(Array.from({ length: args.activeStep || 0 }, (_, i) => i)),
    );

    const handleStepChange = (step: number) => {
      if (args.nonLinear) {
        //For non-linear, we update completed steps only when moving forward
        if (step > activeStep) {
          setCompletedSteps((prev) => new Set([...prev, activeStep]));
        }
      } else {
        //For linear mode, all steps before the new active step are completed
        setCompletedSteps(new Set(Array.from({ length: step }, (_, i) => i)));
      }
      setActiveStep(step);
    };

    return (
      <Stepper
        {...args}
        activeStep={activeStep}
        steps={args.steps || defaultSteps}
        onChange={handleStepChange}
        completedSteps={completedSteps}
      />
    );
  },
  play: async ({ canvasElement, step }) => {
    await step("verify stepper structure", async () => {
      const canvas = within(canvasElement);

      await waitFor(() => {
        //Verify basic structure
        const steps = canvas.getAllByRole("tab");
        expect(steps.length).toBeGreaterThan(0); //At least one step exists

        //Verify that each step has the expected structure
        steps.forEach((step) => {
          expect(step.querySelector(".MuiStepLabel-label")).toBeTruthy();

          expect(
            step.querySelector(".MuiStepLabel-iconContainer"),
          ).toBeTruthy();

          //At least one step should be active
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
    steps: [
      {
        label: "Account details",
      },
      {
        label: "Personal info",
      },
      {
        label: "Review",
      },
    ],
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
    nonLinear: true,
    allowBackStep: true,
    activeStep: 0,
  },
  parameters: {
    docs: {
      description: {
        story:
          "This example demonstrates non-linear navigation with completion state tracking. In non-linear mode, users can access steps in any order, and steps are automatically marked as complete when navigating forward. Previous steps maintain their completed state even when jumping to future steps. Users can also revisit completed steps when `allowBackStep` is enabled.",
      },
    },
  },
  render: function NonLinearExample(args) {
    const [activeStep, setActiveStep] = useState(args.activeStep || 0);
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(
      new Set(),
    );

    const handleStepChange = (step: number) => {
      if (step > activeStep) {
        setCompletedSteps((prev) => new Set([...prev, activeStep]));
      }
      setActiveStep(step);
    };

    return (
      <Stepper
        {...args}
        activeStep={activeStep}
        steps={args.steps || defaultSteps}
        onChange={handleStepChange}
        completedSteps={completedSteps}
      />
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("verify initial state", async () => {
      const steps = await canvas.findAllByRole("tab");
      const firstStep = steps[0];
      expect(firstStep.getAttribute("aria-current")).toBe("step");
    });

    await step("verify non-linear navigation and completion", async () => {
      const steps = await canvas.findAllByRole("tab");

      await userEvent.click(steps[2]);

      await waitFor(() => {
        expect(steps[0].classList.contains("Mui-completed")).toBe(true);
        expect(steps[2].getAttribute("aria-current")).toBe("step");
      });
    });
  },
};
export const WithLongDescription: StoryObj<StepperProps> = {
  ...DefaultTemplate,
  args: {
    steps: [
      {
        label: "Organization Details",
        description:
          "Set up your organization's name, domain, and basic information.",
      },
      {
        label: "Security Settings",
        description: "Configure multi-factor authentication and password.",
      },
      {
        label: "Directory Setup",
        description: "Connect your user directory or create a new one.",
      },
    ],
  },
};

export const VerticalWithLongDescriptions: StoryObj<StepperProps> = {
  storyName: "Vertical with long descriptions",
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

export const Navigation: StoryObj<StepperProps> = {
  args: {
    allowBackStep: true,
    nonLinear: true,
  },
  parameters: {
    docs: {
      description: {
        story: "With clickable steps (`nonLinear`)",
      },
    },
  },
  render: function C(args) {
    const [activeStep, setActiveStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(
      new Set(),
    );
    const odysseyDesignTokens = useOdysseyDesignTokens();

    const handleNext = () => {
      //Mark current step as completed when moving forward
      setCompletedSteps((prev) => new Set([...prev, activeStep]));
      setActiveStep((prevStep) =>
        Math.min(prevStep + 1, defaultSteps.length - 1),
      );
    };

    const handleBack = () => {
      setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
    };

    const handleStepClick = (step: number) => {
      if (step > activeStep) {
        //Mark current step as completed when skipping forward
        setCompletedSteps((prev) => new Set([...prev, activeStep]));
      }
      setActiveStep(step);
    };

    return (
      <>
        <Stepper
          {...args}
          activeStep={activeStep}
          steps={defaultSteps}
          onChange={handleStepClick}
          completedSteps={completedSteps}
        />
        <StepperNavigation
          totalSteps={defaultSteps.length}
          currentStep={activeStep}
          onBack={handleBack}
          onNext={handleNext}
          odysseyDesignTokens={odysseyDesignTokens}
        />
      </>
    );
  },
};

export const OnlyBackNavigation = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(
    new Set([0]),
  ); // Step 0 starts completed
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const steps = [
    { label: "Account Details", description: "Basic information" },
    { label: "Preferences", description: "Set your preferences" },
    { label: "Review", description: "Review your information" },
    { label: "Submit", description: "Complete registration" },
  ];

  const handleNext = () => {
    // Mark current step as complete when moving forward
    setCompletedSteps((prev) => new Set([...prev, activeStep]));
    setActiveStep((prev) => Math.min(steps.length - 1, prev + 1));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(0, prev - 1));
  };

  const handleStepChange = (step: number) => {
    // Only allow backward navigation
    if (step < activeStep) {
      setActiveStep(step);
    }
  };

  return (
    <>
      <Stepper
        steps={steps}
        activeStep={activeStep}
        allowBackStep={true}
        onChange={handleStepChange}
        completedSteps={completedSteps}
      />
      <StepperNavigation
        totalSteps={steps.length}
        currentStep={activeStep}
        onBack={handleBack}
        onNext={handleNext}
        odysseyDesignTokens={odysseyDesignTokens}
      />
    </>
  );
};
OnlyBackNavigation.parameters = {
  docs: {
    description: {
      story:
        "Users can navigate back to previously completed steps by clicking the step but cannot move forward without completing the current step",
    },
  },
};
