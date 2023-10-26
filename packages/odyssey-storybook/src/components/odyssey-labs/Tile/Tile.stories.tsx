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
import { Box, Button, Callout, Tile, MenuItem } from "@okta/odyssey-react-mui";

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
    hasButton: {
      control: "boolean",
      description: "STORY ONLY: Does the card include a button?",
    },
    hasImage: {
      control: "boolean",
      description: "STORY ONLY: Does the card include an image?",
    },
    hasMenu: {
      control: "boolean",
      description: "STORY ONLY: Does the card include a menu?",
    },
    isClickable: {
      control: "boolean",
      description: "STORY ONLY: Is the card itself clickable?",
    },
  },
  args: {
    title: "Title",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...",
    overline: "Overline",
    isClickable: false,
    hasMenu: true,
    hasImage: true,
    hasButton: true,
  },
  decorators: [MuiThemeDecorator],
  parameters: {
    backgrounds: {
      default: "gray",
      values: [
        { name: "gray", value: "#d7d7d7" },
        { name: "white", value: "#ffffff" },
      ],
    },
  },
  tags: ["autodocs"],
};

export default storybookMeta;

export const Default: StoryObj = {
  render: function C(props: {
    hasButton?: boolean;
    isClickable?: boolean;
    title?: string;
    description?: string;
    overline?: string;
    hasImage?: boolean;
    hasMenu?: boolean;
  }) {
    const onClick = () => {
      alert("Clicked!");
    };

    return (
      <>
        {props.isClickable && props.hasButton && (
          <Callout severity="error">
            A card can't include a button while also being clickable. The button
            has been disabled while isClickable is true.
          </Callout>
        )}

        <Box sx={{ maxWidth: 242 }}>
          <Tile
            title={props.title}
            description={props.description}
            overline={props.overline}
            image={
              props.hasImage ? (
                <img src="https://placehold.co/128" alt="Example logo" />
              ) : undefined
            }
            menuItems={
              props.hasMenu ? (
                <>
                  <MenuItem>Menu option</MenuItem>
                  <MenuItem>Menu option</MenuItem>
                  <MenuItem>Menu option</MenuItem>
                </>
              ) : undefined
            }
            button={
              !props.isClickable && props.hasButton ? (
                <Button variant="primary" label="Button" />
              ) : undefined
            }
            onClick={props.isClickable ? onClick : undefined}
          />
        </Box>
      </>
    );
  },
};
