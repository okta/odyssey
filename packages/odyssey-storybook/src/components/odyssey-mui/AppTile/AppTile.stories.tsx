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
  AppTile,
  AppTileProps,
  Box,
  Drawer,
  Tag,
  TagList,
} from "@okta/odyssey-react-mui";
import { useState } from "react";
import { SettingsIcon } from "@okta/odyssey-react-mui/icons";

const storybookMeta: Meta<AppTileProps> = {
  title: "MUI Components/AppTile",
  component: AppTile,
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
    image: {
      control: null,
      description: "",
      table: {
        type: {
          summary: "ReactElement",
        },
        defaultValue: "",
      },
    },
    onClick: {
      control: null,
      description: "",
      table: {
        type: {
          summary: "MouseEventHandler",
        },
        defaultValue: "",
      },
    },

    // onActionClick: MouseEventHandler;
    // actionAriaControls?: HTMLAttributes < HTMLElement > ["aria-controls"];
    // actionAriaHasPopup?: HTMLAttributes < HTMLElement > ["aria-haspopup"];
    // actionAriaExpanded?: HTMLAttributes < HTMLElement > ["aria-expanded"];
    // actionLabel: string;
    // actionIcon: ReactElement;
  },
  args: {
    title: "Title",
    description:
      "Identity can create great user experiences, increase customer sign-ups, and...",
    overline: "Overline",
    onClick: () => alert("Clicked"),
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

export const Default: StoryObj<AppTileProps> = {
  render: function C() {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    return (
      <>
        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          showDividers={false}
        />
        <Box sx={{ maxWidth: 262 }}>
          <AppTile
            actionAriaControls=""
            actionAriaExpanded={isDrawerOpen}
            actionAriaHasPopup="menu"
            actionIcon={<SettingsIcon />}
            actionLabel="Open app settings"
            onActionClick={() => setIsDrawerOpen(true)}
            onClick={() => alert("Open the app")}
            title="App name"
            description="This is a description of the app."
            image={<img src="https://placehold.co/128" alt="Example logo" />}
            children={
              <TagList>
                <Tag label="Tag 1" />
                <Tag label="Tag 2" />
              </TagList>
            }
          />
        </Box>
      </>
    );
  },
};
