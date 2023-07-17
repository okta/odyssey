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

import {
  Typography as MuiTypography,
  TypographyProps as MuiTypographyProps,
} from "@mui/material";
import { ElementType, ReactNode } from "react";

export const typographyVariantValues = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  body: "body1",
  caption: "subtitle1",
  legend: "legend",
};

export type TypographyProps = {
  children: ReactNode;
  classes?: object;
  component?: ElementType;
  variant?: keyof typeof typographyVariantValues;
};

export const Typography = ({
  children,
  classes,
  component,
  variant = "body",
}: TypographyProps) => {
  if (!component) {
    component = variant;
    if (variant === "body") {
      component = "p";
    }
    if (variant === "caption") {
      component = "h6";
    }
  }

  return (
    <MuiTypography
      children={children}
      classes={classes}
      component={component}
      variant={
        typographyVariantValues[variant] as MuiTypographyProps["variant"]
      }
    />
  );
};

Typography.displayName = "Typography";

export const H1 = ({ children, classes, component }: TypographyProps) => (
  <Typography
    children={children}
    classes={classes}
    component={component}
    variant="h1"
  />
);

H1.displayName = "H1";

export const H2 = ({ children, classes, component }: TypographyProps) => (
  <Typography
    children={children}
    classes={classes}
    component={component}
    variant="h2"
  />
);

H2.displayName = "H2";

export const H3 = ({ children, classes, component }: TypographyProps) => (
  <Typography
    children={children}
    classes={classes}
    component={component}
    variant="h3"
  />
);

H3.displayName = "H3";

export const H4 = ({ children, classes, component }: TypographyProps) => (
  <Typography
    children={children}
    classes={classes}
    component={component}
    variant="h4"
  />
);

H4.displayName = "H4";

export const H5 = ({ children, classes, component }: TypographyProps) => (
  <Typography
    children={children}
    classes={classes}
    component={component}
    variant="h5"
  />
);

H5.displayName = "H5";

export const H6 = ({ children, classes, component }: TypographyProps) => (
  <Typography
    children={children}
    classes={classes}
    component={component}
    variant="h6"
  />
);

H6.displayName = "H6";

export const Body = ({ children, classes, component }: TypographyProps) => (
  <Typography
    children={children}
    classes={classes}
    component={component}
    variant="body"
  />
);

Body.displayName = "Body";

export const Caption = ({ children, classes, component }: TypographyProps) => (
  <Typography
    children={children}
    classes={classes}
    component={component}
    variant="caption"
  />
);

Caption.displayName = "Caption";

export const Legend = ({ children, classes, component }: TypographyProps) => (
  <Typography
    children={children}
    classes={classes}
    component={component}
    variant="legend"
  />
);

Legend.displayName = "Legend";
