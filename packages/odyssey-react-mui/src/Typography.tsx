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

export const typographyVariantValues: Record<
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body"
  | "subtitle2"
  | "caption"
  | "legend",
  MuiTypographyProps["variant"]
> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  body: "body1",
  caption: "subtitle1",
  subtitle2: "subtitle2",
  legend: "legend",
} as const;

export const typographyColorValues = [
  "primary",
  "textPrimary",
  "secondary",
  "textSecondary",
  "error",
] as const;

export type TypographyProps = {
  /**
   * The ID of the element that describes the component.
   */
  ariaDescribedBy?: string;
  /**
   * The ARIA label for the component.
   */
  ariaLabel?: string;
  /**
   * The ID of the element that labels the component.
   */
  ariaLabelledBy?: string;
  /**
   * The text content of the component.
   */
  children: ReactNode;
  /**
   * Additional classes to add to the component.
   */
  classes?: object;
  /**
   * The color of the text.
   */
  color?: (typeof typographyColorValues)[number];
  /**
   * The HTML element the component should render, if different from the default.
   */
  component?: ElementType;
  /**
   * The variant of Typography to render.
   */
  variant?: keyof typeof typographyVariantValues;
};

export const Typography = ({
  ariaDescribedBy,
  ariaLabel,
  ariaLabelledBy,
  children,
  classes,
  color,
  component,
  variant = "body",
}: TypographyProps) => {
  if (!component) {
    if (variant === "body") {
      component = "p";
    } else if (variant === "caption" || variant === "subtitle2") {
      component = "h6";
    } else {
      component = variant;
    }
  }

  return (
    <MuiTypography
      ariaDescribedBy={ariaDescribedBy}
      ariaLabel={ariaLabel}
      ariaLabelledBy={ariaLabelledBy}
      children={children}
      classes={classes}
      color={color}
      component={component}
      variant={typographyVariantValues[variant]}
    />
  );
};

Typography.displayName = "Typography";

export const H1 = ({
  ariaDescribedBy,
  ariaLabel,
  ariaLabelledBy,
  children,
  classes,
  color,
  component,
}: TypographyProps) => (
  <Typography
    ariaDescribedBy={ariaDescribedBy}
    ariaLabel={ariaLabel}
    ariaLabelledBy={ariaLabelledBy}
    children={children}
    classes={classes}
    color={color}
    component={component}
    variant="h1"
  />
);

H1.displayName = "H1";

export const H2 = ({
  ariaDescribedBy,
  ariaLabel,
  ariaLabelledBy,
  children,
  classes,
  color,
  component,
}: TypographyProps) => (
  <Typography
    ariaDescribedBy={ariaDescribedBy}
    ariaLabel={ariaLabel}
    ariaLabelledBy={ariaLabelledBy}
    children={children}
    classes={classes}
    color={color}
    component={component}
    variant="h2"
  />
);

H2.displayName = "H2";

export const H3 = ({
  ariaDescribedBy,
  ariaLabel,
  ariaLabelledBy,
  children,
  classes,
  color,
  component,
}: TypographyProps) => (
  <Typography
    ariaDescribedBy={ariaDescribedBy}
    ariaLabel={ariaLabel}
    ariaLabelledBy={ariaLabelledBy}
    children={children}
    classes={classes}
    color={color}
    component={component}
    variant="h3"
  />
);

H3.displayName = "H3";

export const H4 = ({
  ariaDescribedBy,
  ariaLabel,
  ariaLabelledBy,
  children,
  classes,
  color,
  component,
}: TypographyProps) => (
  <Typography
    ariaDescribedBy={ariaDescribedBy}
    ariaLabel={ariaLabel}
    ariaLabelledBy={ariaLabelledBy}
    children={children}
    classes={classes}
    color={color}
    component={component}
    variant="h4"
  />
);

H4.displayName = "H4";

export const H5 = ({
  ariaDescribedBy,
  ariaLabel,
  ariaLabelledBy,
  children,
  classes,
  color,
  component,
}: TypographyProps) => (
  <Typography
    ariaDescribedBy={ariaDescribedBy}
    ariaLabel={ariaLabel}
    ariaLabelledBy={ariaLabelledBy}
    children={children}
    classes={classes}
    color={color}
    component={component}
    variant="h5"
  />
);

H5.displayName = "H5";

export const H6 = ({
  ariaDescribedBy,
  ariaLabel,
  ariaLabelledBy,
  children,
  classes,
  color,
  component,
}: TypographyProps) => (
  <Typography
    ariaDescribedBy={ariaDescribedBy}
    ariaLabel={ariaLabel}
    ariaLabelledBy={ariaLabelledBy}
    children={children}
    classes={classes}
    color={color}
    component={component}
    variant="h6"
  />
);

H6.displayName = "H6";

export const P = ({
  ariaDescribedBy,
  ariaLabel,
  ariaLabelledBy,
  children,
  classes,
  color,
  component,
}: TypographyProps) => (
  <Typography
    ariaDescribedBy={ariaDescribedBy}
    ariaLabel={ariaLabel}
    ariaLabelledBy={ariaLabelledBy}
    children={children}
    classes={classes}
    color={color}
    component={component}
    variant="body"
  />
);

P.displayName = "P";

export const Caption = ({
  ariaDescribedBy,
  ariaLabel,
  ariaLabelledBy,
  children,
  classes,
  color,
  component,
}: TypographyProps) => (
  <Typography
    ariaDescribedBy={ariaDescribedBy}
    ariaLabel={ariaLabel}
    ariaLabelledBy={ariaLabelledBy}
    children={children}
    classes={classes}
    color={color}
    component={component}
    variant="caption"
  />
);

Caption.displayName = "Caption";

export const Legend = ({
  ariaDescribedBy,
  ariaLabel,
  ariaLabelledBy,
  children,
  classes,
  color,
  component,
}: TypographyProps) => (
  <Typography
    ariaDescribedBy={ariaDescribedBy}
    ariaLabel={ariaLabel}
    ariaLabelledBy={ariaLabelledBy}
    children={children}
    classes={classes}
    color={color}
    component={component}
    variant="legend"
  />
);

Legend.displayName = "Legend";
