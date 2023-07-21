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

import { Meta, StoryObj } from "@storybook/react";

import { Box, TextField, BoxProps } from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";

const storybookMeta: Meta<BoxProps> = {
  title: "MUI Components/Box",
  component: Box,
  argTypes: {
    children: {
      control: null,
      description:
        "The content of the component, whether text or other components.",
      table: {
        type: {
          summary: "ReactNode",
        },
      },
    },
    component: {
      control: null,
      description:
        "The HTML element the component should render, if different from the default",
      table: {
        type: {
          summary: "ElementType",
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
};

export default storybookMeta;

export const Simple: StoryObj<BoxProps> = {
  args: {
    children: "This is the content of the box.",
    sx: {
      borderColor: "lightGray",
      borderStyle: "dashed",
      borderWidth: 2,
      p: 3,
    },
  },
};

export const Layout: StoryObj<BoxProps> = {
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
