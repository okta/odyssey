/*!
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

declare module "@mui/material/Alert" {
  interface AlertPropsVariantOverrides {
    // Enable Odyssey variants
    banner: true;
    callout: true;
    // Disable Mui defaults
    filled: false;
    outlined: false;
    standard: false;
    toast: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    contained: false;
    danger: true;
    dangerSecondary: true;
    floating: true;
    floatingAction: true;
    outlined: false;
    primary: true;
    secondary: true;
    tertiary: true;
    text: false;
  }
  interface ButtonPropsColorOverrides {
    error: false;
    info: false;
    inherit: false;
    primary: false;
    secondary: false;
    success: false;
    warning: false;
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsVariantOverrides {
    // Enable Odyssey variant for Status component
    lamp: true;
    pill: true;
  }
}

declare module "@mui/material/Link" {
  interface LinkPropsVariantOverrides {
    body1: false;
    body2: false;
    button: false;
    default: true;
    h1: false;
    h2: false;
    h3: false;
    h4: false;
    h5: false;
    h6: false;
    inherit: false;
    monochrome: true;
    overline: false;
    subtitle1: false;
    subtitle2: false;
  }

  interface LinkPropsUnderlineOverrides {
    always: false;
    hover: false;
    none: false;
  }

  interface LinkPropsColorOverrides {
    error: false;
    info: false;
    inherit: false;
    primary: false;
    secondary: false;
    success: false;
    warning: false;
  }
}

declare module "@mui/material/TableCell" {
  interface TableCellPropsVariantOverrides {
    action: true;
    body: true;
    date: true;
    footer: true;
    head: true;
    number: true;
  }
}

declare module "@mui/material/Tooltip" {
  interface TooltipComponentsPropsOverrides {
    placement?: "bottom" | "left" | "right" | "top";
  }
}

export {};
