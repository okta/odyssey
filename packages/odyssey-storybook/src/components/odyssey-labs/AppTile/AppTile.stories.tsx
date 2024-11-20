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
import { jest } from "@storybook/jest";
import {
  AppTile,
  AppTileProps,
  appTileVariantValues,
} from "@okta/odyssey-react-mui/labs";
import {
  Box,
  Drawer,
  Heading5,
  Status,
  Tag,
  TagList,
} from "@okta/odyssey-react-mui";
import { useCallback, useState } from "react";
import { MoreIcon, SettingsIcon } from "@okta/odyssey-react-mui/icons";

const storybookMeta: Meta<AppTileProps> = {
  title: "Labs Components/AppTile",
  component: AppTile,
  argTypes: {
    actionAriaControls: {
      control: "text",
      description:
        "The ID of the element which the button controls (for instance, a drawer or dialog), if any.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    actionAriaExpanded: {
      control: "boolean",
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
        "Should be filled if the button controls a popup element such as a Drawer or Dialog.",
      table: {
        type: {
          summary:
            'boolean | "false" | "true" | "menu" | "listbox" | "tree" | "grid" | "dialog" | undefined',
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
      control: "text",
      description:
        "The label for the button, used as the aria-label and tooltip.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    auxiliaryText: {
      control: "text",
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
      control: "text",
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
    isLoading: {
      control: "boolean",
      description: "If true, the component will display a loading state",
      table: {
        type: {
          summary: "boolean",
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
    title: {
      control: "text",
      description: "A string for the tile title.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    variant: {
      control: { type: "radio" },
      options: appTileVariantValues,
      description: "Whether the tile is comfortable or compact.",
      table: {
        defaultValue: {
          summary: appTileVariantValues[0],
        },
      },
    },
  },
  args: {
    title: "App name",
    description: "This is a description of the app.",
    image: <img src="https://placehold.co/128" alt="Example logo" />,
    onClick: jest.fn(),
    onActionClick: undefined,
    variant: "comfortable",
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
  args: {
    children: (
      <TagList>
        <Tag label="Tag 1" />
        <Tag label="Tag 2" />
      </TagList>
    ),
  },
};

export const Multiple: StoryObj<AppTileProps> = {
  render: function C() {
    return (
      <Box
        sx={{
          display: "flex",
          width: "800px",
          gap: "20px",

          ["& > *"]: {
            width: "100%",
          },
        }}
      >
        <AppTile
          title="App name"
          image={<img src="https://placehold.co/128" alt="Example logo" />}
          onClick={() => {}}
        />
        <AppTile
          title="App name"
          description="Lorem ipsum dolor sit amet."
          image={<img src="https://placehold.co/128" alt="Example logo" />}
          isLoading
          onClick={() => {}}
        />
        <AppTile
          title="App name"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac lectus vel dui ullamcorper commodo at vitae lectus. Proin porta urna vitae quam hendrerit pellentesque. Nam nec neque a sapien pharetra commodo. Curabitur ut lacinia dolor. Sed pulvinar nibh nec rutrum interdum. Duis velit nunc, fringilla ut eleifend lacinia, porta at neque. Nulla quis magna sollicitudin, feugiat tellus vitae, tristique magna. Pellentesque pretium leo vitae odio aliquet, eu placerat orci luctus. Nunc sagittis leo nec nulla rhoncus, ut tempus libero maximus."
          onClick={() => {}}
        />
      </Box>
    );
  },
};

export const Compact: StoryObj<AppTileProps> = {
  render: function C() {
    return (
      <Box
        sx={{
          display: "flex",
          width: "572px",
          gap: "20px",

          ["& > *"]: {
            width: "100%",
          },
        }}
      >
        <AppTile
          variant="compact"
          title="App name"
          image={<img src="https://placehold.co/128" alt="Example logo" />}
          onClick={() => {}}
          actionIcon={<MoreIcon />}
          actionLabel="Open app settings"
          onActionClick={() => {}}
        />
        <AppTile
          variant="compact"
          title="App name"
          image={<img src="https://placehold.co/256x48" alt="Example logo" />}
          onClick={() => {}}
          actionIcon={<MoreIcon />}
          actionLabel="Open app settings"
          onActionClick={() => {}}
        />
        <AppTile
          variant="compact"
          title="App name"
          image={<img src="https://placehold.co/256x96" alt="Example logo" />}
          onClick={() => {}}
          actionIcon={<MoreIcon />}
          actionLabel="Open app settings"
          onActionClick={() => {}}
        />
        <AppTile
          variant="compact"
          title="App name"
          image={<img src="https://placehold.co/128" alt="Example logo" />}
          onClick={() => {}}
          actionIcon={<MoreIcon />}
          actionLabel="Open app settings"
          onActionClick={() => {}}
          isLoading
        />
      </Box>
    );
  },
};

export const ActionButton: StoryObj<AppTileProps> = {
  args: {
    actionAriaControls: "",
    actionAriaExpanded: false,
    actionAriaHasPopup: "menu",
    actionIcon: <SettingsIcon />,
    actionLabel: "Open app settings",
    children: (
      <TagList>
        <Tag label="Tag 1" />
        <Tag label="Tag 2" />
      </TagList>
    ),
  },
  render: function C({ ...args }) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const toggleDrawer = useCallback(
      () => setIsDrawerOpen(!isDrawerOpen),
      [isDrawerOpen],
    );

    return (
      <>
        <Drawer
          isOpen={isDrawerOpen}
          onClose={toggleDrawer}
          showDividers={false}
        />
        <Box sx={{ maxWidth: 262 }}>
          <AppTile
            {...args}
            onClick={args.onClick}
            actionAriaExpanded={isDrawerOpen}
            onActionClick={toggleDrawer}
            actionIcon={args.actionIcon}
            actionLabel={args.actionLabel}
          />
        </Box>
      </>
    );
  },
};

export const SquareImage: StoryObj<AppTileProps> = {
  args: {
    image: <img src="https://placehold.co/600" alt="Square logo" />,
  },
};

export const TallImage: StoryObj<AppTileProps> = {
  args: {
    image: <img src="https://placehold.co/400x800" alt="Tall logo" />,
  },
};

export const WideImage: StoryObj<AppTileProps> = {
  args: {
    image: <img src="https://placehold.co/800x400" alt="Wide logo" />,
  },
};

export const WideImageWithActionButton: StoryObj<AppTileProps> = {
  args: {
    actionIcon: <SettingsIcon />,
    actionLabel: "Open app settings",
    auxiliaryText: "Single sign-on",
    image: <img src="https://placehold.co/800x400" alt="Wide logo" />,
  },
};

export const AuxiliaryText: StoryObj<AppTileProps> = {
  args: {
    auxiliaryText: "Single sign-on",
    children: (
      <TagList>
        <Tag label="Tag 1" />
        <Tag label="Tag 2" />
      </TagList>
    ),
  },
};

export const ActionButtonAndAuxiliaryText: StoryObj<AppTileProps> = {
  args: {
    actionAriaControls: "",
    actionAriaHasPopup: "menu",
    actionIcon: <SettingsIcon />,
    actionLabel: "Open app settings",
    auxiliaryText: "Single sign-on",
    children: (
      <TagList>
        <Tag label="Tag 1" />
        <Tag label="Tag 2" />
      </TagList>
    ),
  },
  render: function C({ ...args }) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(args.actionAriaExpanded);
    const toggleDrawer = useCallback(
      () => setIsDrawerOpen(!isDrawerOpen),
      [isDrawerOpen],
    );

    return (
      <>
        <Drawer
          isOpen={isDrawerOpen}
          onClose={toggleDrawer}
          showDividers={false}
        />
        <Box sx={{ maxWidth: 262 }}>
          <AppTile
            {...args}
            onClick={args.onClick}
            actionAriaExpanded={isDrawerOpen}
            onActionClick={toggleDrawer}
            actionIcon={args.actionIcon}
            actionLabel={args.actionLabel}
          />
        </Box>
      </>
    );
  },
};

export const FullyCustomContent: StoryObj<AppTileProps> = {
  args: {
    title: undefined,
    description: undefined,
    image: undefined,
    children: (
      <>
        <Box sx={{ marginBottom: 2 }}>
          <Status label="Active" severity="success" />
        </Box>
        <Heading5>This is arbitrary content.</Heading5>
        <TagList>
          <Tag label="Tag 1" />
          <Tag label="Tag 2" />
        </TagList>
      </>
    ),
  },
};

export const Loading: StoryObj<AppTileProps> = {
  args: {
    isLoading: true,
    actionAriaControls: "",
    actionAriaExpanded: false,
    actionAriaHasPopup: "menu",
    actionIcon: <SettingsIcon />,
    actionLabel: "Open app settings",
    auxiliaryText: "Single sign-on",
    children: (
      <TagList>
        <Tag label="Tag 1" />
        <Tag label="Tag 2" />
      </TagList>
    ),
  },
};
