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

import styled from "@emotion/styled";
import { IconButton as MuiIconButton } from "@mui/material";
import {
  Button,
  Card,
  CardProps,
  cardVariantValues,
  Checkbox,
  MenuItem,
  CheckboxProps as MuiCheckboxProps,
} from "@okta/odyssey-react-mui";
import { ChevronDownIcon, ChevronUpIcon } from "@okta/odyssey-react-mui/icons";
import { action } from "@storybook/addon-actions";
import { type Meta, StoryObj } from "@storybook/react";
import { MouseEventHandler, useCallback, useState } from "react";

type CardMetaProps = Omit<
  CardProps,
  | "children"
  | "detailPanel"
  | "image"
  | "accessory"
  | "button"
  | "menuButtonChildren"
  | "onClick"
> & {
  accessory?: boolean;
  button?: boolean;
  children?: boolean;
  detailPanel?: boolean;
  image?: boolean;
  menuButtonChildren?: boolean;
  onClick?: boolean;
};

const image = <img alt="Example logo" src="https://placehold.co/128" />;
const children = <>Children.</>;
const detailPanel = <>Detail panel.</>;
const onClick = action("onClick");
const button = (
  <Button label="Access app" onClick={onClick} variant="primary" />
);
const menuButtonChildren = (
  <>
    <MenuItem onClick={onClick}>Action 1</MenuItem>
    <MenuItem onClick={onClick}>Action 2</MenuItem>
  </>
);

const CheckboxContainer = styled("div")(() => ({
  "& *": {
    margin: 0,
    display: "block",
  },
}));

const meta = {
  argTypes: {
    children: {
      control: "boolean",
    },
    description: {
      control: "text",
    },
    detailPanel: {
      control: "boolean",
    },
    image: {
      control: "boolean",
    },
    isLoading: {
      control: "boolean",
    },
    overline: {
      control: "text",
    },
    title: {
      control: "text",
    },
    variant: {
      control: "select",
      options: cardVariantValues,
    },
    accessory: {
      control: "boolean",
    },
    button: {
      control: "boolean",
    },
    menuButtonChildren: {
      control: "boolean",
    },
    onClick: {
      control: "boolean",
    },
  },
  args: {
    accessory: false,
    button: undefined,
    children: false,
    description:
      "This is a description of the app. Descriptions should be concise, and truncation is handled by the consumer rather than the component, so if you write a novel, it will display a novel.",
    detailPanel: false,
    image: undefined,
    isLoading: false,
    menuButtonChildren: false,
    onClick: undefined,
    overline: "Category",
    title: "App title",
    variant: "tile",
  },
  render: function C(args) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    const handleSelect = useCallback(() => {
      setIsSelected(!isSelected);
    }, [isSelected, setIsSelected]);

    const handleExpand = useCallback(() => {
      setIsExpanded(!isExpanded);
    }, [isExpanded, setIsExpanded]);

    const SelectionAccessory = ({
      isChecked,
      onChange,
    }: {
      isChecked: boolean;
      onChange: MuiCheckboxProps["onChange"];
    }) => (
      <CheckboxContainer>
        <Checkbox
          ariaLabel="Selecton toggle"
          isChecked={isChecked}
          onChange={onChange}
        />
      </CheckboxContainer>
    );

    const ExpansionAccessory = ({
      isExpanded,
      onToggle,
    }: {
      isExpanded: boolean;
      onToggle: MouseEventHandler<HTMLButtonElement>;
    }) => (
      <MuiIconButton
        aria-label={isExpanded ? "Collapse" : "Expand"}
        onClick={onToggle}
        size="small"
      >
        {isExpanded ? <ChevronDownIcon /> : <ChevronUpIcon />}
      </MuiIconButton>
    );

    const Accessory = ({
      isExpandable,
      isSelected,
      isExpanded,
      onToggleExpansion,
      onChangeSelection,
    }: {
      isExpandable: boolean;
      isExpanded: boolean;
      isSelected: boolean;
      onChangeSelection?: MuiCheckboxProps["onChange"];
      onToggleExpansion: MouseEventHandler<HTMLButtonElement>;
    }) => (
      <>
        <SelectionAccessory
          isChecked={isSelected}
          onChange={onChangeSelection}
        />
        {isExpandable && (
          <ExpansionAccessory
            isExpanded={isExpanded}
            onToggle={onToggleExpansion}
          />
        )}
      </>
    );

    if (args.onClick) {
      return (
        <Card
          children={args.children ? children : undefined}
          description={args.description}
          detailPanel={args.detailPanel ? detailPanel : undefined}
          image={args.image ? image : undefined}
          isLoading={args.isLoading}
          onClick={onClick}
          overline={args.overline}
          title={args.title}
          variant={args.variant}
        />
      );
    }

    return (
      <Card
        accessory={
          args.accessory ? (
            <Accessory
              isExpandable={Boolean(args.detailPanel)}
              isExpanded={isExpanded}
              isSelected={isSelected}
              onChangeSelection={handleSelect}
              onToggleExpansion={handleExpand}
            />
          ) : undefined
        }
        button={args.button ? button : undefined}
        children={args.children ? children : undefined}
        description={args.description}
        detailPanel={args.detailPanel && isExpanded ? detailPanel : undefined}
        image={args.image ? image : undefined}
        isLoading={args.isLoading}
        menuButtonChildren={
          args.menuButtonChildren ? menuButtonChildren : undefined
        }
        overline={args.overline}
        title={args.title}
        variant={args.variant}
      />
    );
  },
} satisfies Meta<CardMetaProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    accessory: false,
    button: true,
    children: false,
    detailPanel: false,
    image: true,
    menuButtonChildren: true,
  },
};

export const Clickable: Story = {
  args: {
    image: true,
    onClick: true,
  },
};

export const Tile: Story = {
  args: {
    accessory: true,
    button: true,
    children: true,
    detailPanel: true,
    image: true,
    menuButtonChildren: true,
    variant: "tile",
  },
};

export const Stack: Story = {
  args: {
    image: true,
    children: true,
    menuButtonChildren: true,
    detailPanel: true,
    accessory: true,
    button: true,
    variant: "stack",
  },
};

export const Compact: Story = {
  args: {
    accessory: true,
    button: true,
    children: true,
    detailPanel: true,
    image: true,
    menuButtonChildren: true,
    variant: "compact",
  },
};

export const Loading: Story = {
  args: {
    accessory: true,
    button: true,
    children: true,
    detailPanel: true,
    image: true,
    isLoading: true,
    menuButtonChildren: true,
    variant: "tile",
  },
};
