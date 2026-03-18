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

import {
  Status,
  StatusProps,
  statusSeverityValues,
  statusVariantValues,
} from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react-vite";

import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";

const storybookMeta: Meta<StatusProps> = {
  component: Status,
  decorators: [OdysseyStorybookThemeDecorator],
  tags: ["autodocs"],
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
};

export default storybookMeta;

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

export const InfoPill: StoryObj<StatusProps> = {
  args: {
    label: "Warp drive unstable",
    severity: "info",
  },
};

export const SuccessPill: StoryObj<StatusProps> = {
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

export const InfoLamp: StoryObj<StatusProps> = {
  args: {
    label: "Warp drive unstable",
    severity: "info",
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

export const OverflowLamp: StoryObj<StatusProps> = {
  args: {
    label:
      "A really long label that will overflow the container and should be truncated",
    variant: "lamp",
  },
  render: function C(props) {
    return (
      <div style={{ width: "200px" }}>
        <Status {...props} />
      </div>
    );
  },
};
