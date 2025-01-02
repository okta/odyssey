/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { Box, TextField } from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";

import { MuiThemeDecorator } from "../../../../.storybook/components";

const meta = {
  title: "MUI Components/Box",
  component: Box,
  argTypes: {
    children: {
      description:
        "The content of the component, whether text or other components.",
      table: {
        type: {
          summary: "ReactNode",
        },
      },
    },
    component: {
      description:
        "The HTML element the component should render, if different from the default.",
      table: {
        type: {
          summary: "ElementType",
        },
      },
    },
    id: {
      control: "text",
      description:
        "An optional id for the HTML elemenet rendered by the component.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    sx: {
      control: "object",
      description:
        "The system prop that allows defining system overrides as well as additional CSS styles. See the [MUI `sx` page](https://mui.com/system/getting-started/the-sx-prop/) for more details.",
      table: {
        type: {
          summary: "object",
        },
      },
    },
  },
  args: {
    children: "This is the tab content. This tab happens to be about stars.",
  },
  decorators: [MuiThemeDecorator],
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    children: "This is the content of the box.",
    sx: {
      borderColor: "lightGray",
      borderStyle: "dashed",
      borderWidth: 2,
      p: 3,
    },
    id: "container-id",
  },
  play: async ({ canvasElement, step }) => {
    await step("Box Id", ({ args }) => {
      const canvas = within(canvasElement);
      const box = canvas.getByText("This is the content of the box.");
      expect(box).toHaveAttribute("id", args.id);
    });
  },
};

export const Layout: Story = {
  args: {
    children: (
      <>
        <TextField label="Field One" />
        <TextField label="Field Two" />
        <TextField label="Field Three" />
      </>
    ),
    sx: {
      display: "flex",
      alignItems: "start",
      gap: 3,
      p: 3,
    },
  },
};
