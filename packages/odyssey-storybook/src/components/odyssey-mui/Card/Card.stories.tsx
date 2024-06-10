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
  Card,
  MenuItem,
  CardProps,
} from "@okta/odyssey-react-mui";
import { Checkbox as MuiCheckbox } from "@mui/material";

const storybookMeta: Meta<CardProps> = {
  title: "MUI Components/Card",
  component: Card,
  argTypes: {
    title: {
      control: "text",
      description: "The heading of the card.",
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
        "The body text of the card. The consumer is responsible for truncating this string.",
      table: {
        type: {
          summary: "string",
        },
        defaultValue: "",
      },
    },
    overline: {
      control: "text",
      description: 'The "eyebrow" text above the card title.',
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
        "An optional image or icon at the top of the card, preferably as an img or svg element.",
      table: {
        type: {
          summary: "ReactElement",
        },
        defaultValue: "",
      },
    },
    onClick: {
      control: null,
      description: "The event handler for when the user clicks the card.",
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
        "The main action button for the card. Not valid if the card itself is clickable.",
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
        "Menu items to be rendered in the card's optional menu button. If this prop is undefined, the menu button will not be shown. Not valid if the card itself is clickable.",
      table: {
        type: {
          summary: "[MenuItem | Divider | ListSubheader]",
        },
        defaultValue: "",
      },
    },
    children: {
      control: null,
      description: "Arbitrary content to be added at the bottom of the card.",
      table: {
        type: {
          summary: "ReactNode",
        },
        defaultValue: "",
      },
    },
    Accessory: {
      control: null,
      description:
        "Arbitrary content to be added at the start of the card (in LTR languages, the left side).",
      table: {
        type: {
          summary: "ReactNode",
        },
        defaultValue: "",
      },
    },
  },
  args: {
    title: "Title",
    description:
      "Identity can create great user experiences, increase customer sign-ups, and...",
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

export const Default: StoryObj<CardProps> = {
  render: ({ ...props }) => (
    <Box sx={{ maxWidth: 262 }}>
      <Card
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

export const Clickable: StoryObj<CardProps> = {
  render: ({ ...props }) => {
    const onClick = () => {
      alert("Clicked!");
    };

    return (
      <Box sx={{ maxWidth: 262 }}>
        <Card
          overline={props.overline}
          title={props.title}
          description={props.description}
          image={<img src="https://placehold.co/128" alt="Example logo" />}
          onClick={onClick}
        />
      </Box>
    );
  },
};

export const ClickableWithoutImage: StoryObj<CardProps> = {
  render: ({ ...props }) => {
    const onClick = () => {
      alert("Clicked!");
    };

    return (
      <Box sx={{ maxWidth: 262 }}>
        <Card
          overline={props.overline}
          title={props.title}
          description={props.description}
          image={props.image}
          onClick={onClick}
        />
      </Box>
    );
  },
};

export const ButtonWithoutImage: StoryObj<typeof Card> = {
  render: ({ ...props }) => (
    <Box sx={{ maxWidth: 262 }}>
      <Card
        overline={props.overline}
        title={props.title}
        description={props.description}
        image={props.image}
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

export const CustomContent: StoryObj<typeof Card> = {
  render: ({ ...props }) => (
    <Box sx={{ maxWidth: 262 }}>
      <Card
        overline={props.overline}
        title={props.title}
        description={props.description}
        image={props.image}
        children={<Box>This is arbitrary content.</Box>}
      />
    </Box>
  ),
};

export const JustCustomContent: StoryObj<typeof Card> = {
  render: () => (
    <Box sx={{ maxWidth: 262 }}>
      <Card children={<Box>This is arbitrary content.</Box>} />
    </Box>
  ),
};

export const Accessory: StoryObj<typeof Card> = {
  render: ({ ...props }) => (
    <Box sx={{ maxWidth: 262 }}>
      <Card
        overline={props.overline}
        title={props.title}
        description={props.description}
        image={props.image}
        Accessory={
          <Box sx={{ marginBlockStart: -1 }}>
            <MuiCheckbox inputProps={{ "aria-label": "Accessory checkbox" }} />
          </Box>
        }
      />
    </Box>
  ),
};
