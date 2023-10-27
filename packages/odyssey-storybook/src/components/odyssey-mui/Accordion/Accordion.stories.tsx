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
import { Accordion, AccordionProps } from "@okta/odyssey-react-mui";

const storybookMeta: Meta<AccordionProps> = {
  title: "Labs Components/Accordion",
  component: Accordion,
  argTypes: {
    children: {
      control: "text",
      description: "",
      table: {
        type: {
          summary: "ReactNode",
        },
      },
    },
    label: {
      control: "text",
      description: "",
      table: {
        type: {
          summary: "ReactNode",
        },
      },
    },
    hideShadow: {
      control: "boolean",
      description: "",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    isDisabled: {
      control: "boolean",
      description: "",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    isExpanded: {
      control: "boolean",
      description: "",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
  },
  args: {
    children: "Lorem ipsum dolor sit amet.",
    hideShadow: true,
    isDisabled: false,
    isExpanded: undefined,
    label: "Title",
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
};

export default storybookMeta;

export const Single: StoryObj<AccordionProps> = {
  args: {
    children: "This is the content of the box.",
  },
  render: function C(props) {
    return (
      <Accordion
        label={props.label}
        hideShadow={props.hideShadow}
        isDisabled={props.isDisabled}
        isExpanded={props.isExpanded}
      >
        {props.children}
      </Accordion>
    );
  },
};

export const Multi: StoryObj<AccordionProps> = {
  args: {
    children: "This is the content of the box.",
  },
  render: function C(props) {
    return (
      <>
        <Accordion
          label={props.label}
          hideShadow={props.hideShadow}
          isDisabled={props.isDisabled}
          isExpanded={props.isExpanded}
        >
          {props.children}
        </Accordion>
        <Accordion label="Accordion 2" hideShadow={props.hideShadow}>
          This is the second accordion item.
        </Accordion>
        <Accordion label="Accordion 3" hideShadow={props.hideShadow}>
          This is the third accordion item.
        </Accordion>
        <Accordion label="Accordion 4" hideShadow={props.hideShadow}>
          This is the fourth accordion item.
        </Accordion>
        <Accordion label="Accordion 5" hideShadow={props.hideShadow}>
          This is the fifth accordion item.
        </Accordion>
      </>
    );
  },
};
