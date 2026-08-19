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

import {
  staticBoardParameters,
  StoryCell,
  StoryConstrainedWidth,
  StoryGrid,
  StorySection,
} from "../../tools/boardStoryHelpers.js";
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

export const Playground: StoryObj<StatusProps> = {
  args: {
    label: "Warp drive in standby",
  },
};

export const AllVariants: StoryObj<StatusProps> = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every severity across both variants (pill and lamp), plus label overflow.">
        <StoryGrid columns={statusVariantValues.length}>
          {statusSeverityValues.flatMap((severity) =>
            statusVariantValues.map((variant) => (
              <StoryCell
                key={`${severity}-${variant}`}
                label={`${severity} · ${variant}`}
              >
                <Status
                  label={severity}
                  severity={severity}
                  variant={variant}
                />
              </StoryCell>
            )),
          )}

          {statusVariantValues.map((variant) => (
            <StoryCell
              key={`overflow-${variant}`}
              label={`overflow · ${variant}`}
            >
              <StoryConstrainedWidth>
                <Status
                  label="A really long label that will overflow the container and should be truncated"
                  severity="default"
                  variant={variant}
                />
              </StoryConstrainedWidth>
            </StoryCell>
          ))}
        </StoryGrid>
      </StorySection>
    );
  },
};
