/*!
 * Copyright (c) 2021-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import React from "react";
import type { Story } from "@storybook/react";

import { Button } from "@mui/material";
import type { ButtonProps } from "@mui/material";
import { MuiThemeDecorator } from "../../../.storybook/components/MuiThemeDecorator";

import ButtonMdx from "./MuiButton.mdx";

export default {
  title: `MUI Components/Button`,
  component: Button,
  parameters: {
    docs: {
      page: ButtonMdx,
    },
  },
  argTypes: {
    children: {
      control: "text",
      defaultValue: "Button labels",
    },
    size: {
      options: ["s", "m", "l"],
      control: { type: "radio" },
    },
    // if we choose to apply colors via "variants" then odyssey global theme will not apply
    variant: {
      options: [
        "primary",
        "secondary",
        "danger",
        "floating",
        "text",
        "contained",
      ],
      control: { type: "radio" },
    },
    disabled: {
      control: "boolean",
    },
    fullWidth: {
      // called 'wide' in original ods button
      control: "boolean",
    },
    startIcon: {
      // called 'icon' in original ods button
      control: "object",
    },
  },
  decorators: [MuiThemeDecorator],
};

const Template: Story<ButtonProps> = (props) => <Button {...props} />;

export const ButtonPrimary = Template.bind({});
ButtonPrimary.args = {
  children: "Button label",
};
