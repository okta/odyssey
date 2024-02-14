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
import { MuiThemeDecorator } from "../../../../.storybook/components";
import { Box, Button, Tile, MenuItem } from "@okta/odyssey-react-mui";

const storybookMeta: Meta = {
  title: "Labs Components/Tile",
  component: Tile,
  argTypes: {
    title: {
      control: "text",
      description: "",
      table: {
        type: {
          summary: "string",
        },
        defaultValue: "",
      },
    },
    description: {
      control: "text",
      description: "",
      table: {
        type: {
          summary: "string",
        },
        defaultValue: "",
      },
    },
    overline: {
      control: "text",
      description: "",
      table: {
        type: {
          summary: "string",
        },
        defaultValue: "",
      },
    },
  },
  args: {
    title: "Title",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...",
    overline: "Overline",
  },
  decorators: [MuiThemeDecorator],
  parameters: {
    backgrounds: {
      default: "gray",
      values: [
        { name: "gray", value: "#f4f4f4" },
        { name: "white", value: "#ffffff" },
      ],
    },
  },
};

export default storybookMeta;

export const Default: StoryObj = {
  render: function C(props: {
    title?: string;
    description?: string;
    overline?: string;
  }) {
    return (
      <Box sx={{ maxWidth: 262 }}>
        <Tile
          {...props}
          image={<img src="https://placehold.co/128" alt="Example logo" />}
          menuItems={
            <>
              <MenuItem>Menu option</MenuItem>
              <MenuItem>Menu option</MenuItem>
              <MenuItem>Menu option</MenuItem>
            </>
          }
          button={<Button variant="primary" label="Button" />}
        />
      </Box>
    );
  },
};

export const Clickable: StoryObj = {
  render: function C(props: {
    title?: string;
    description?: string;
    overline?: string;
  }) {
    const onClick = () => {
      alert("Clicked!");
    };

    return (
      <Box sx={{ maxWidth: 262 }}>
        <Tile
          {...props}
          image={<img src="https://placehold.co/128" alt="Example logo" />}
          onClick={onClick}
        />
      </Box>
    );
  },
};

export const ClickableWithoutImage: StoryObj = {
  render: function C(props: {
    title?: string;
    description?: string;
    overline?: string;
  }) {
    const onClick = () => {
      alert("Clicked!");
    };

    return (
      <Box sx={{ maxWidth: 262 }}>
        <Tile {...props} onClick={onClick} />
      </Box>
    );
  },
};

export const ButtonWithoutImage: StoryObj = {
  render: function C(props: {
    title?: string;
    description?: string;
    overline?: string;
  }) {
    return (
      <Box sx={{ maxWidth: 262 }}>
        <Tile {...props} button={<Button variant="primary" label="Button" />} />
      </Box>
    );
  },
};
