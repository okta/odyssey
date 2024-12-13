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

import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Stepper,
  StepperNavigation,
  StepperProps,
  useOdysseyDesignTokens,
} from "@okta/odyssey-react-mui";
import { expect } from "@storybook/jest";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import { axeRun } from "../../../axe-util";
import type { PlaywrightProps } from "../storybookTypes";

const storybookMeta: Meta<StepperProps> = {
  title: "MUI Components/Stepper",
  component: Stepper,
  argTypes: {
    activeStep: {
      control: "number",
      description: "Current active step (0-based index)",
      table: {
        type: {
          summary: "number",
        },
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
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: false,
        },
      },
    },
    nonLinear: {
      control: "boolean",
      description: "Allow skipping to future steps",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: false,
        },
      },
    },
    orientation: {
      control: { type: "radio" },
      options: ["horizontal", "vertical"],
      description: "Layout orientation of the stepper",
      table: {
        type: {
          summary: '"horizontal" | "vertical"',
        },
        defaultValue: {
          summary: "horizontal",
        },
      },
    },
    variant: {
      control: { type: "radio" },
      options: ["numeric", "nonNumeric"],
      description: "Visual variant of steps",
      table: {
        type: {
          summary: '"numeric" | "nonNumeric"',
        },
        defaultValue: {
          summary: "numeric",
        },
      },
    },
    onChange: {
      control: null,
      description: "Callback fired when a step is clicked",
      table: {
        type: {
          summary: "func",
        },
      },
    },
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

const defaultSteps = [
  { label: "Account details" },
  { label: "Personal info" },
  { label: "Review" },
];

// Helper function to test step navigation
const navigateSteps = async (
  { canvasElement, step }: PlaywrightProps<StepperProps>,
  stepLabel: string,
) => {
  await step(`navigate to ${stepLabel}`, async () => {
    await axeRun("Step Navigation");

    await waitFor(() => {
      const canvas = within(canvasElement);
      const stepElement = canvas.getByText(stepLabel);
      userEvent.click(stepElement);
    });
  });
};

// Default template with controlled state
const DefaultTemplate: StoryObj<StepperProps> = {
  render: function C(args) {
    const [activeStep, setActiveStep] = useState(0);
    const handleStepChange = (step: number) => {
      setActiveStep(step);
    };

    return (
      <Stepper
        {...args}
        activeStep={activeStep}
        steps={defaultSteps}
        onChange={handleStepChange}
      />
    );
  },
};

export const Default: StoryObj<StepperProps> = {
  ...DefaultTemplate,
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
  },
};

export const AllowBackNavigation: StoryObj<StepperProps> = {
  ...DefaultTemplate,
  args: {
    allowBackStep: true,
  },
  play: async ({ canvasElement, step }) => {
    // First advance the stepper
    await step("advance to second step", async () => {
      const canvas = within(canvasElement);
      const nextButton = canvas.getByText("Next");
      await userEvent.click(nextButton);
    });

    // Then try to navigate back
    await navigateSteps({ canvasElement, step }, "Account details");

    await step("verify navigation", async () => {
      const canvas = within(canvasElement);
      const backButton = canvas.getByText("Back");
      expect(backButton).toBeEnabled();
    });
  },
};

export const NonLinearNavigation: StoryObj<StepperProps> = {
  ...DefaultTemplate,
  args: {
    nonLinear: true,
  },
  play: async ({ canvasElement, step }) => {
    // Try to skip to last step
    await navigateSteps({ canvasElement, step }, "Review");

    await step("verify navigation", async () => {
      const canvas = within(canvasElement);
      const finishButton = canvas.getByText("Finish");
      expect(finishButton).toBeEnabled();
    });
  },
};

export const WithLongDescription: StoryObj<StepperProps> = {
  ...DefaultTemplate,
  args: {
    steps: [
      {
        label: "Account setup",
        description:
          "Configure your account settings including authentication preferences, security options, and basic profile information.",
      },
      {
        label: "User profile",
        description:
          "Tell us more about yourself including your role, department, and any relevant professional details.",
      },
      { label: "Review" },
    ],
  },
};
export const WithNavigation: StoryObj<StepperProps> = {
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

    const handleStepChange = (step: number) => {
      setActiveStep(step);
    };

    return (
      <>
        <Stepper
          {...args}
          activeStep={activeStep}
          steps={defaultSteps}
          onChange={handleStepChange}
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
