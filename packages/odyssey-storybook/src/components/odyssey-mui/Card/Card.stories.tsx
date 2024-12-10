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
  Button,
  Card,
  MenuItem,
  CardProps,
  cardVariantValues,
  Checkbox,
} from "@okta/odyssey-react-mui";
import { CheckboxProps as MuiCheckboxProps } from "@okta/odyssey-react-mui";
import { ChevronDownIcon, ChevronUpIcon } from "@okta/odyssey-react-mui/icons";
import { jest } from "@storybook/jest";
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
  children?: boolean;
  detailPanel?: boolean;
  image?: boolean;
  accessory?: boolean;
  button?: boolean;
  menuButtonChildren?: boolean;
  onClick?: boolean;
};

const storybookMeta: Meta<CardMetaProps> = {
  title: "MUI Components/Card",
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
    children: false,
    description:
      "This is a description of the app. Descriptions should be concise, and truncation is handled by the consumer rather than the component, so if you write a novel, it will display a novel.",
    detailPanel: false,
    image: undefined,
    isLoading: false,
    overline: "Category",
    title: "App title",
    variant: "tile",
    accessory: false,
    button: undefined,
    menuButtonChildren: false,
    onClick: undefined,
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

const image = <img src="https://placehold.co/128" alt="Example logo" />;

const children = <>Children.</>;
const detailPanel = <>Detail panel.</>;
const button = <Button variant="primary" label="Access app" />;
const onClick: MouseEventHandler<HTMLButtonElement> = jest.fn();
const menuButtonChildren = (
  <>
    <MenuItem onClick={() => console.log("Action 1")}>Action 1</MenuItem>
    <MenuItem onClick={() => console.log("Action 2")}>Action 2</MenuItem>
  </>
);

const BaseStory: StoryObj<CardMetaProps> = {
  render: function Base(args: CardMetaProps) {
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
    }) => <Checkbox isChecked={isChecked} onChange={onChange} />;

    const ExpansionAccessory = ({
      isExpanded,
      onToggle,
    }: {
      isExpanded: boolean;
      onToggle: MouseEventHandler<HTMLButtonElement>;
    }) => (
      <Button
        ariaLabel={isExpanded ? "Collapse" : "Expand"}
        endIcon={isExpanded ? <ChevronDownIcon /> : <ChevronUpIcon />}
        variant="floating"
        size="small"
        onClick={onToggle}
      />
    );

    const Accessory = ({
      isExpandable,
      isSelected,
      isExpanded,
      onToggleExpansion,
      onChangeSelection,
    }: {
      isExpandable: boolean;
      isSelected: boolean;
      isExpanded: boolean;
      onToggleExpansion: MouseEventHandler<HTMLButtonElement>;
      onChangeSelection?: MuiCheckboxProps["onChange"];
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
          description={args.description}
          overline={args.overline}
          title={args.title}
          variant={args.variant}
          isLoading={args.isLoading}
          children={args.children ? children : undefined}
          detailPanel={args.detailPanel ? detailPanel : undefined}
          onClick={onClick}
          image={args.image ? image : undefined}
        />
      );
    }

    return (
      <Card
        description={args.description}
        overline={args.overline}
        title={args.title}
        variant={args.variant}
        isLoading={args.isLoading}
        children={args.children ? children : undefined}
        detailPanel={args.detailPanel && isExpanded ? detailPanel : undefined}
        button={args.button ? button : undefined}
        menuButtonChildren={
          args.menuButtonChildren ? menuButtonChildren : undefined
        }
        accessory={
          args.accessory ? (
            <Accessory
              isExpandable={Boolean(args.detailPanel)}
              isExpanded={isExpanded}
              isSelected={isSelected}
              onToggleExpansion={handleExpand}
              onChangeSelection={handleSelect}
            />
          ) : undefined
        }
        image={args.image ? image : undefined}
      />
    );
  },
};

export const Default: StoryObj<CardMetaProps> = {
  ...BaseStory,
  args: {
    image: true,
    children: false,
    menuButtonChildren: true,
    detailPanel: false,
    accessory: false,
    button: true,
  },
};

export const Clickable: StoryObj<CardMetaProps> = {
  ...BaseStory,
  args: {
    image: true,
    onClick: true,
  },
};

export const Tile: StoryObj<CardMetaProps> = {
  ...BaseStory,
  args: {
    image: true,
    children: true,
    menuButtonChildren: true,
    detailPanel: true,
    accessory: true,
    button: true,
    variant: "tile",
  },
};

export const Stack: StoryObj<CardMetaProps> = {
  ...BaseStory,
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

export const Compact: StoryObj<CardMetaProps> = {
  ...BaseStory,
  args: {
    image: true,
    children: true,
    menuButtonChildren: true,
    detailPanel: true,
    accessory: true,
    button: true,
    variant: "compact",
  },
};
