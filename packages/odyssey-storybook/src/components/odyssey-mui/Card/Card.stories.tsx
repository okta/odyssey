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
import { MuiThemeDecorator } from "../../../../.storybook/components/index.js";
import { Box, Button, Card, MenuItem } from "@okta/odyssey-react-mui";

const meta = {
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
        defaultValue: {
          summary: "",
        },
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
        defaultValue: {
          summary: "",
        },
      },
    },
    overline: {
      control: "text",
      description: 'The "eyebrow" text above the card title.',
      table: {
        type: {
          summary: "string",
        },
        defaultValue: {
          summary: "",
        },
      },
    },
    image: {
      description:
        "An optional image or icon at the top of the card, preferably as an img or svg element.",
      table: {
        type: {
          summary: "ReactElement",
        },
        defaultValue: {
          summary: "",
        },
      },
    },
    onClick: {
      description: "The event handler for when the user clicks the card.",
      table: {
        type: {
          summary: "MouseEventHandler",
        },
        defaultValue: {
          summary: "",
        },
      },
    },
    button: {
      description:
        "The main action button for the card. Not valid if the card itself is clickable.",
      table: {
        type: {
          summary: "ReactElement<typeof Button>",
        },
        defaultValue: {
          summary: "",
        },
      },
    },
    menuButtonChildren: {
      description:
        "Menu items to be rendered in the card's optional menu button. If this prop is undefined, the menu button will not be shown. Not valid if the card itself is clickable.",
      table: {
        type: {
          summary: "[MenuItem | Divider | ListSubheader]",
        },
        defaultValue: {
          summary: "",
        },
      },
    },
  },
  args: {
    title: "Title",
    description:
      "Identity can create great user experiences, increase customer sign-ups, and...",
    overline: "Overline",
  },
  decorators: [MuiThemeDecorator],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Box sx={{ maxWidth: 262 }}>
      <Card
        title={args.title}
        description={args.description}
        overline={args.overline}
        button={<Button variant="primary" label="Button" />}
        image={<img src="https://placehold.co/128" alt="Example logo" />}
        menuButtonChildren={
          <>
            <MenuItem>Menu option</MenuItem>
            <MenuItem>Menu option</MenuItem>
            <MenuItem>Menu option</MenuItem>
          </>
        }
      />
    </Box>
  ),
};

export const Clickable: Story = {
  render: (args) => {
    const onClick = () => {
      alert("Clicked!");
    };

    return (
      <Box sx={{ maxWidth: 262 }}>
        <Card
          title={args.title}
          description={args.description}
          overline={args.overline}
          image={<img src="https://placehold.co/128" alt="Example logo" />}
          onClick={onClick}
        />
      </Box>
    );
  },
};

export const ClickableWithoutImage: Story = {
  render: (args) => {
    const onClick = () => {
      alert("Clicked!");
    };

    return (
      <Box sx={{ maxWidth: 262 }}>
        <Card
          title={args.title}
          description={args.description}
          overline={args.overline}
          onClick={onClick}
        />
      </Box>
    );
  },
};

export const ButtonWithoutImage: Story = {
  render: (args) => (
    <Box sx={{ maxWidth: 262 }}>
      <Card
        title={args.title}
        description={args.description}
        overline={args.overline}
        button={<Button variant="primary" label="Button" />}
        image={args.image}
        menuButtonChildren={
          <>
            <MenuItem>Menu option 1</MenuItem>
            <MenuItem>Menu option 2</MenuItem>
            <MenuItem>Menu option 3</MenuItem>
          </>
        }
      />
    </Box>
  ),
};
