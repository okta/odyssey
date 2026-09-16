/*!
 * Copyright (c) 2026-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  GraphNodeAttribute,
  graphNodeAttributeStatusValues,
  OktaAuraIcon,
} from "@okta/odyssey-contributions-wp-components";

import {
  staticBoardParameters,
  StoryCell,
  StoryGrid,
  StorySection,
} from "../../tools/boardStoryHelpers.js";
import icons from "../../tools/iconUtils.js";
import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";
import { WpComponentsStorybookThemeDecorator } from "../../tools/WpComponentsStorybookThemeDecorator.js";

const meta = {
  component: GraphNodeAttribute,
  decorators: [
    OdysseyStorybookThemeDecorator,
    WpComponentsStorybookThemeDecorator,
  ],
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: { type: "select" },
      description: 'Optional trailing icon. Ignored when status is "warning".',
      mapping: icons,
      options: Object.keys(icons),
    },
    label: {
      control: "text",
      description: "The label for the attribute.",
    },
    status: {
      control: { type: "radio" },
      description:
        "The status of the attribute. This affects the color of the label and value, and may also affect the trailing icon.",
      options: graphNodeAttributeStatusValues,
    },
    value: {
      control: "text",
      description: "The value for the attribute.",
    },
  },
  args: {
    label: "Client registration",
    status: "default",
    value: "CIMD",
  },
} satisfies Meta<typeof GraphNodeAttribute>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllStatuses: Story = {
  name: "All statuses",
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every status.">
        <StoryGrid columns={2}>
          {graphNodeAttributeStatusValues.map((status) => (
            <StoryCell key={status} label={status}>
              <GraphNodeAttribute
                label="Owners"
                status={status}
                value="1 group"
              />
            </StoryCell>
          ))}
        </StoryGrid>
      </StorySection>
    );
  },
};

export const AllContentPatterns: Story = {
  name: "All content patterns",
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every combination of label, value, and trailing icon.">
        <StoryGrid columns={1}>
          <StoryCell label="label only">
            <GraphNodeAttribute label="https://www.web.com/" />
          </StoryCell>

          <StoryCell label="label + value">
            <GraphNodeAttribute label="Owners" value="1 group" />
          </StoryCell>

          <StoryCell label="label + trailing icon">
            <GraphNodeAttribute
              icon={<OktaAuraIcon />}
              label="Total users in groups"
            />
          </StoryCell>

          <StoryCell label="label + warning">
            <GraphNodeAttribute label="https://www.web.com/" status="warning" />
          </StoryCell>

          <StoryCell label="label + value + trailing icon">
            <GraphNodeAttribute
              icon={<OktaAuraIcon />}
              label="Total users in groups"
              value="1,400"
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
