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
import { Box, Button, Stepper, StepperProps } from "@okta/odyssey-react-mui";
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
  { label: "Account details", description: "Provide basic information" },
  { label: "Personal info", description: "Tell us about yourself" },
  { label: "Review", description: "Verify your information" },
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
        <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
          <Button
            label="Back"
            variant="secondary"
            onClick={handleBack}
            isDisabled={activeStep === 0}
            size="small"
          />
          <Button
            label={activeStep === defaultSteps.length - 1 ? "Finish" : "Next"}
            variant="primary"
            onClick={handleNext}
            isDisabled={activeStep === defaultSteps.length - 1}
            size="small"
          />
        </Box>
      </>
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

export const MaxSteps: StoryObj<StepperProps> = {
  ...DefaultTemplate,
  args: {
    steps: [
      { label: "Step 1", description: "First step" },
      { label: "Step 2", description: "Second step" },
      { label: "Step 3", description: "Third step" },
      { label: "Step 4", description: "Fourth step" },
      { label: "Step 5", description: "Fifth step" },
      { label: "Step 6", description: "This step will not be shown" },
    ],
  },
  play: async ({ canvasElement, step }) => {
    await step("verify max steps", async () => {
      const canvas = within(canvasElement);
      expect(canvas.getByText("Step 5")).toBeInTheDocument();
      expect(canvas.queryByText("Step 6")).not.toBeInTheDocument();
    });
  },
};
