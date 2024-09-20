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
import {
  Status,
  StatusProps,
  statusSeverityValues,
  statusVariantValues,
  BackgroundProvider,
  Box,
} from "@okta/odyssey-react-mui";
import * as Tokens from "@okta/odyssey-design-tokens";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { axeRun } from "../../../axe-util";

const storybookMeta: Meta<StatusProps> = {
  title: "MUI Components/Status",
  component: Status,
  argTypes: {
    label: {
      control: "text",
      description: "The text describing the Status",
      type: {
        required: true,
        name: "string",
      },
    },
    severity: {
      control: "radio",
      options: statusSeverityValues,
      description: "The severity of the Status, as indicated by its styling",
      table: {
        type: {
          summary: statusSeverityValues.join(" | "),
        },
        defaultValue: {
          summary: "default",
        },
      },
      type: {
        required: true,
        name: "other",
        value: "radio",
      },
    },
    variant: {
      control: "radio",
      options: statusVariantValues,
      description:
        "Whether the Status is displayed uncontained (`lamp`) or contained (`pill`)",
      table: {
        type: {
          summary: statusVariantValues.join(" | "),
        },
        defaultValue: {
          summary: "pill",
        },
      },
    },
  },
  args: {
    label: "Warp drive in standby",
    severity: "default",
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

const checkStatusStyles = async (
  canvas: ReturnType<typeof within>,
  testId: string,
  expectedBackgroundColor: string,
  expectedColor: string,
) => {
  const status = canvas.getByTestId(testId);
  await expect(status).toHaveStyle(
    `background-color: ${expectedBackgroundColor}`,
  );
  await expect(status).toHaveStyle(`color: ${expectedColor}`);
};
export const DefaultPill: StoryObj<StatusProps> = {
  args: {
    label: "Warp drive in standby",
  },
};

export const ErrorPill: StoryObj<StatusProps> = {
  args: {
    label: "Warp drive unstable",
    severity: "error",
  },
};

export const Info: StoryObj<StatusProps> = {
  args: {
    label: "Warp drive unstable",
    severity: "info",
  },
};

export const Success: StoryObj<StatusProps> = {
  args: {
    label: "Warp drive online",
    severity: "success",
  },
};

export const WarningPill: StoryObj<StatusProps> = {
  args: {
    label: "Warp fuel low",
    severity: "warning",
  },
};
export const StatusesOnWhiteBackground: StoryObj<StatusProps> = {
  name: "Statuses on White Background",
  render: () => (
    <BackgroundProvider value="highContrast">
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <Status label="Default" severity="default" data-se="status-default" />
        <Status label="Error" severity="error" data-se="status-error" />
        <Status label="Info" severity="info" data-se="status-info" />
        <Status label="Success" severity="success" data-se="status-success" />
        <Status label="Warning" severity="warning" data-se="status-warning" />
      </Box>
    </BackgroundProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await checkStatusStyles(
      canvas,
      "status-default",
      Tokens.HueNeutral50,
      Tokens.TypographyColorSubordinate,
    );
    await checkStatusStyles(
      canvas,
      "status-error",
      Tokens.PaletteDangerLighter,
      Tokens.TypographyColorDanger,
    );
    await checkStatusStyles(
      canvas,
      "status-info",
      Tokens.PalettePrimaryLighter,
      Tokens.PalettePrimaryText,
    );
    await checkStatusStyles(
      canvas,
      "status-success",
      Tokens.PaletteSuccessLighter,
      Tokens.TypographyColorSuccess,
    );
    await checkStatusStyles(
      canvas,
      "status-warning",
      Tokens.PaletteWarningLighter,
      Tokens.TypographyColorWarning,
    );
    await axeRun("Statuses on white (`highContrast`) background");
  },
  parameters: {
    docs: {
      source: {
        code: `<BackgroundProvider value="highContrast">
  <Status label="Default" severity="default" />
  <Status label="Error" severity="error" />
  <Status label="Info" severity="info" />
  <Status label="Success" severity="success" />
  <Status label="Warning" severity="warning" />
</BackgroundProvider>`,
      },
      description: {
        story:
          "Demonstrates how the `Status` component behaves on a white (`highContrast`) background using `BackgroundProvider`.",
      },
    },
  },
};

export const StatusesOnGrayBackground: StoryObj<StatusProps> = {
  name: "Statuses on Gray Background",
  render: () => (
    <BackgroundProvider value="lowContrast">
      <Box
        sx={{
          backgroundColor: Tokens.HueNeutral50,
          padding: "24px",
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Status label="Default" severity="default" data-se="status-default" />
        <Status label="Error" severity="error" data-se="status-error" />
        <Status label="Info" severity="info" data-se="status-info" />
        <Status label="Success" severity="success" data-se="status-success" />
        <Status label="Warning" severity="warning" data-se="status-warning" />
      </Box>
    </BackgroundProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await checkStatusStyles(
      canvas,
      "status-default",
      Tokens.HueNeutral100,
      Tokens.TypographyColorBody,
    );
    await checkStatusStyles(
      canvas,
      "status-error",
      Tokens.PaletteDangerLight,
      Tokens.PaletteDangerDark,
    );
    await checkStatusStyles(
      canvas,
      "status-info",
      Tokens.PalettePrimaryLight,
      Tokens.PalettePrimaryDark,
    );
    await checkStatusStyles(
      canvas,
      "status-success",
      Tokens.PaletteSuccessLight,
      Tokens.PaletteSuccessDark,
    );
    await checkStatusStyles(
      canvas,
      "status-warning",
      Tokens.PaletteWarningLight,
      Tokens.PaletteWarningDark,
    );
    await axeRun("Statuses on gray (`lowContrast`) background");
  },
  parameters: {
    docs: {
      source: {
        code: `<BackgroundProvider value="lowContrast">
  <Status label="Default" severity="default" />
  <Status label="Error" severity="error" />
  <Status label="Info" severity="info" />
  <Status label="Success" severity="success" />
  <Status label="Warning" severity="warning" />
</BackgroundProvider>`,
      },
      description: {
        story:
          "Demonstrates how the `Status` component behaves on a gray (`lowContrast`) background using `BackgroundProvider`.",
      },
    },
  },
};
export const DefaultLamp: StoryObj<StatusProps> = {
  args: {
    label: "Warp drive in standby",
    variant: "lamp",
  },
};

export const ErrorLamp: StoryObj<StatusProps> = {
  args: {
    label: "Warp drive unstable",
    severity: "error",
    variant: "lamp",
  },
};

export const SuccessLamp: StoryObj<StatusProps> = {
  args: {
    label: "Warp drive online",
    severity: "success",
    variant: "lamp",
  },
};

export const WarningLamp: StoryObj<StatusProps> = {
  args: {
    label: "Warp fuel low",
    severity: "warning",
    variant: "lamp",
  },
};
