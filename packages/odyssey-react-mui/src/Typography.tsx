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
import { ElementType, ReactNode, useMemo } from "react";

export type TypographyVariantValue =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body"
  | "subordinate"
  | "support"
  | "legend";

export const typographyVariantMapping: Record<
  TypographyVariantValue,
  MuiTypographyProps["variant"]
> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  body: "body1",
  subordinate: "subtitle1",
  support: "subtitle2",
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
  variant?: keyof typeof typographyVariantMapping;
};

export const Typography = ({
  ariaDescribedBy,
  ariaLabel,
  ariaLabelledBy,
  children,
  classes,
  color,
  component: componentProp,
  variant = "body",
}: TypographyProps) => {
  const component = useMemo(() => {
    if (!componentProp) {
      if (variant === "body") {
        return "p";
      } else if (variant === "subordinate" || variant === "support") {
        return "h6";
      } else {
        return variant;
      }
    }
    return componentProp;
  }, [componentProp, variant]);

  return (
    <MuiTypography
      aria-describedby={ariaDescribedBy}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      children={children}
      classes={classes}
      color={color}
      component={component}
      variant={typographyVariantMapping[variant]}
    />
  );
};

Typography.displayName = "Typography";

export const Heading1 = ({
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

Heading1.displayName = "Heading1";

export const Heading2 = ({
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

Heading2.displayName = "Heading2";

export const Heading3 = ({
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

Heading3.displayName = "Heading3";

export const Heading4 = ({
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

Heading4.displayName = "Heading4";

export const Heading5 = ({
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

Heading5.displayName = "Heading5";

export const Heading6 = ({
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

Heading6.displayName = "Heading6";

export const Paragraph = ({
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

Paragraph.displayName = "Paragraph";

export const Subordinate = ({
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
    variant="subordinate"
  />
);

Subordinate.displayName = "Subordinate";

export const Support = ({
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
    variant="support"
  />
);

Support.displayName = "Support";

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
