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
  Button,
  Drawer,
  Heading5,
  Status,
  Tag,
  TagList,
} from "@okta/odyssey-react-mui";
import { useState } from "react";
import { SettingsIcon } from "@okta/odyssey-react-mui/icons";

const storybookMeta: Meta<AppTileProps> = {
  title: "MUI Components/AppTile",
  component: AppTile,
  argTypes: {
    actionAriaControls: {
      control: null,
      description:
        "The ID of the element which the button controls (for instance, a drawer or dialog), if any.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    actionAriaExpanded: {
      control: null,
      description:
        "Should be true if the button controls a popup element that is currently expanded. Should be synced to the state of the popup element",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    actionAriaHasPopup: {
      control: null,
      description:
        "Should be true if the button controls a popup element such as a Drawer or Dialog.",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    actionIcon: {
      control: null,
      description: "An icon for the action button.",
      table: {
        type: {
          summary: "ReactElement",
        },
      },
    },
    actionLabel: {
      control: null,
      description:
        "The label for the button, used as the aria-label and tooltip.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    auxiliaryText: {
      control: null,
      description: "Text that appears in the upper right corner of the tile.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    children: {
      control: null,
      description:
        "Arbitrary content to render underneath any other tile content.",
      table: {
        type: {
          summary: "ReactNode",
        },
      },
    },
    description: {
      control: null,
      description: "A string description.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    image: {
      control: null,
      description: "An image or icon at the top of the tile.",
      table: {
        type: {
          summary: "ReactElement",
        },
      },
    },
    onActionClick: {
      control: null,
      description:
        "Event that fires when the user clicks the action button in the upper-right corner. If this isn't set, the other action props can't be set either",
      table: {
        type: {
          summary: "MouseEventHandler",
        },
      },
    },
    onClick: {
      control: null,
      description: "Event handler for when the user clicks the tile.",
      table: {
        type: {
          summary: "MouseEventHandler",
        },
      },
    },
    overline: {
      control: null,
      description: "An 'eyebrow' of text above the title.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    title: {
      control: null,
      description: "A string for the tile title.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
  },
  decorators: [MuiThemeDecorator],
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

export const ActionButton: StoryObj<AppTileProps> = {
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

export const AuxiliaryText: StoryObj<AppTileProps> = {
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
            auxiliaryText="Single sign-on"
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

export const ActionButtonAndAuxiliaryText: StoryObj<AppTileProps> = {
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
            auxiliaryText="Single sign-on"
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

export const CustomContent: StoryObj<AppTileProps> = {
  render: function C() {
    return (
      <Box sx={{ maxWidth: 262 }}>
        <AppTile
          onClick={() => alert("Open the app")}
          children={
            <>
              <Box sx={{ marginBottom: 2 }}>
                <Status label="Active" severity="success" />
              </Box>
              <Heading5>This is arbitrary content.</Heading5>
              <Box>
                <Button variant="primary" label="Button 1" />
                <Button variant="secondary" label="Button 2" />
              </Box>
            </>
          }
        />
      </Box>
    );
  },
};
