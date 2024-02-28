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
import {
  Box,
  Button,
  Tile,
  MenuItem,
  TileProps,
} from "@okta/odyssey-react-mui";

const storybookMeta: Meta<TileProps> = {
  title: "Labs Components/Tile",
  component: Tile,
  argTypes: {
    title: {
      control: "text",
      description: "The heading of the tile.",
      table: {
        type: {
          summary: "string",
        },
        defaultValue: "",
      },
    },
    description: {
      control: "text",
      description:
        "The body text of the tile. The consumer is responsible for truncating this string.",
      table: {
        type: {
          summary: "string",
        },
        defaultValue: "",
      },
    },
    overline: {
      control: "text",
      description: 'The "eyebrow" text above the tile title.',
      table: {
        type: {
          summary: "string",
        },
        defaultValue: "",
      },
    },
    image: {
      control: null,
      description:
        "An optional image or icon at the top of the tile, preferably as an img or svg element.",
      table: {
        type: {
          summary: "ReactElement",
        },
        defaultValue: "",
      },
    },
    onClick: {
      control: null,
      description: "The event handler for when the user clicks the tile.",
      table: {
        type: {
          summary: "MouseEventHandler",
        },
        defaultValue: "",
      },
    },
    button: {
      control: null,
      description:
        "The main action button for the tile. Not valid if the tile itself is clickable.",
      table: {
        type: {
          summary: "ReactElement<typeof Button>",
        },
        defaultValue: "",
      },
    },
    menuButtonChildren: {
      control: null,
      description:
        "Menu items to be rendered in the tile's optional menu button. If this prop is undefined, the menu button will not be shown. Not valid if the tile itself is clickable.",
      table: {
        type: {
          summary: "[MenuItem | Divider | ListSubheader]",
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
    onClick: undefined,
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

export const Default: StoryObj<TileProps> = {
  render: ({ ...props }) => (
    <Box sx={{ maxWidth: 262 }}>
      <Tile
        {...props}
        image={<img src="https://placehold.co/128" alt="Example logo" />}
        menuButtonChildren={
          <>
            <MenuItem>Menu option</MenuItem>
            <MenuItem>Menu option</MenuItem>
            <MenuItem>Menu option</MenuItem>
          </>
        }
        button={<Button variant="primary" label="Button" />}
      />
    </Box>
  ),
};

export const Clickable: StoryObj<TileProps> = {
  render: ({ ...props }) => {
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

export const ClickableWithoutImage: StoryObj<TileProps> = {
  render: ({ ...props }) => {
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

export const ButtonWithoutImage: StoryObj<typeof Tile> = {
  render: ({ ...props }) => (
    <Box sx={{ maxWidth: 262 }}>
      <Tile {...props} />
    </Box>
  ),
};
