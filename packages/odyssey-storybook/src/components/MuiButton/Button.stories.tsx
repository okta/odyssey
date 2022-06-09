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

import React, { ReactElement } from "react";
import type { Story } from "@storybook/react";
import { Button } from "@okta/odyssey-react-mui";
import type { ButtonProps } from "@mui/material";

import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { ThemeProvider } from "@storybook/theming";

import ButtonMdx from "./Button.mdx";

export default {
  title: `Components/MuiButton`,
  component: Button,
  parameters: {
    docs: {
      page: ButtonMdx,
    },
  },
  argTypes: {
    children: {
      control: "text",
      defaultValue: "Button label",
    },
    color: {
      options: ["primary", "secondary", "success", "error", "info", "warning"],
      control: { type: "radio" },
    },
    disabled: {
      control: "boolean",
    },
    disableElevation: {
      control: "boolean",
    },
    disableFocusRipple: {
      control: "boolean",
    },
    disableRipple: {
      control: "boolean",
    },
    fullWidth: {
      control: "boolean",
    },
    href: {
      control: "text",
    },
    size: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
    },
    variant: {
      options: ["text", "contained", "outlined"],
      control: { type: "radio" },
    },
    endIcon: {
      control: "text",
    },
  },
};

const Template: Story<ButtonProps> = (props) => <Button {...props} />;

export const MyMuiButton = Template.bind({});
MyMuiButton.args = { children: "My mui button" };

export const Themed = (
  props: ButtonProps & { PrimaryMain: string }
): ReactElement => {
  const { PrimaryMain, ...rest } = props;
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: PrimaryMain,
      },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <Button {...rest} />
      </ThemeProvider>
    </MuiThemeProvider>
  );
};

Themed.argTypes = {
  PrimaryMain: {
    name: "color override - primary",
    defaultValue: "#3fb466",
    type: "string",
    control: "color",
  },
};

export const ButtonPrimary = Template.bind({});
ButtonPrimary.args = {
  children: "primary",
  color: "primary",
  size: "medium",
  variant: "text",
  disabled: false,
  disableElevation: false,
  disableFocusRipple: false,
  disableRipple: false,
  fullWidth: false,
};
