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
import {
  ElementType,
  ReactNode,
  memo,
  useMemo,
  useRef,
  useImperativeHandle,
} from "react";
import { SeleniumProps } from "./SeleniumProps";
import { FocusHandle } from "./@types/react-augment";

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
   * The color of the text.
   */
  color?: (typeof typographyColorValues)[number];
  /**
   * The HTML element the component should render, if different from the default.
   */
  component?: ElementType;
  /**
   * The ref forwarded to the Typography to expose focus()
   */
  typographyFocusRef?: React.RefObject<FocusHandle>;
  /**
   * The variant of Typography to render.
   */
  variant?: keyof typeof typographyVariantMapping;
} & SeleniumProps;

const Typography = ({
  ariaDescribedBy,
  ariaLabel,
  ariaLabelledBy,
  children,
  color,
  component: componentProp,
  testId,
  typographyFocusRef,
  variant = "body",
}: TypographyProps) => {
  const component = useMemo(() => {
    if (!componentProp) {
      if (variant === "body") {
        return "p";
      } else if (variant === "subordinate" || variant === "support") {
        return "p";
      } else {
        return variant;
      }
    }
    return componentProp;
  }, [componentProp, variant]);

  const ref = useRef<HTMLElement>(null);
  useImperativeHandle(
    typographyFocusRef,
    () => {
      const element = ref.current;
      return {
        focus: () => {
          element && element.focus();
        },
      };
    },
    []
  );

  return (
    <MuiTypography
      aria-describedby={ariaDescribedBy}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      children={children}
      color={color}
      component={component}
      data-se={testId}
      ref={ref}
      tabIndex={-1}
      variant={typographyVariantMapping[variant]}
    />
  );
};

const MemoizedTypography = memo(Typography);
MemoizedTypography.displayName = "Typography";

const Heading1 = ({
  ariaDescribedBy,
  ariaLabel,
  ariaLabelledBy,
  children,
  color,
  component,
  testId,
}: TypographyProps) => (
  <Typography
    ariaDescribedBy={ariaDescribedBy}
    ariaLabel={ariaLabel}
    ariaLabelledBy={ariaLabelledBy}
    children={children}
    color={color}
    component={component}
    data-se={testId}
    variant="h1"
  />
);

const MemoizedHeading1 = memo(Heading1);
MemoizedHeading1.displayName = "Heading1";

const Heading2 = ({
  ariaDescribedBy,
  ariaLabel,
  ariaLabelledBy,
  children,
  color,
  component,
  testId,
}: TypographyProps) => (
  <Typography
    ariaDescribedBy={ariaDescribedBy}
    ariaLabel={ariaLabel}
    ariaLabelledBy={ariaLabelledBy}
    children={children}
    color={color}
    component={component}
    data-se={testId}
    variant="h2"
  />
);

const MemoizedHeading2 = memo(Heading2);
MemoizedHeading2.displayName = "Heading2";

const Heading3 = ({
  ariaDescribedBy,
  ariaLabel,
  ariaLabelledBy,
  children,
  color,
  component,
  testId,
}: TypographyProps) => (
  <Typography
    ariaDescribedBy={ariaDescribedBy}
    ariaLabel={ariaLabel}
    ariaLabelledBy={ariaLabelledBy}
    children={children}
    color={color}
    component={component}
    data-se={testId}
    variant="h3"
  />
);

const MemoizedHeading3 = memo(Heading3);
MemoizedHeading3.displayName = "Heading3";

const Heading4 = ({
  ariaDescribedBy,
  ariaLabel,
  ariaLabelledBy,
  children,
  color,
  component,
  testId,
}: TypographyProps) => (
  <Typography
    ariaDescribedBy={ariaDescribedBy}
    ariaLabel={ariaLabel}
    ariaLabelledBy={ariaLabelledBy}
    children={children}
    color={color}
    component={component}
    data-se={testId}
    variant="h4"
  />
);

const MemoizedHeading4 = memo(Heading4);
MemoizedHeading4.displayName = "Heading4";

const Heading5 = ({
  ariaDescribedBy,
  ariaLabel,
  ariaLabelledBy,
  children,
  color,
  component,
  testId,
}: TypographyProps) => (
  <Typography
    ariaDescribedBy={ariaDescribedBy}
    ariaLabel={ariaLabel}
    ariaLabelledBy={ariaLabelledBy}
    children={children}
    color={color}
    component={component}
    data-se={testId}
    variant="h5"
  />
);

const MemoizedHeading5 = memo(Heading5);
MemoizedHeading5.displayName = "Heading5";

const Heading6 = ({
  ariaDescribedBy,
  ariaLabel,
  ariaLabelledBy,
  children,
  color,
  component,
  testId,
}: TypographyProps) => (
  <Typography
    ariaDescribedBy={ariaDescribedBy}
    ariaLabel={ariaLabel}
    ariaLabelledBy={ariaLabelledBy}
    children={children}
    color={color}
    component={component}
    data-se={testId}
    variant="h6"
  />
);

const MemoizedHeading6 = memo(Heading6);
MemoizedHeading6.displayName = "Heading6";

const Paragraph = ({
  ariaDescribedBy,
  ariaLabel,
  ariaLabelledBy,
  children,
  color,
  component,
  testId,
}: TypographyProps) => (
  <Typography
    ariaDescribedBy={ariaDescribedBy}
    ariaLabel={ariaLabel}
    ariaLabelledBy={ariaLabelledBy}
    children={children}
    color={color}
    component={component}
    data-se={testId}
    variant="body"
  />
);

const MemoizedParagraph = memo(Paragraph);
MemoizedParagraph.displayName = "Paragraph";

const Subordinate = ({
  ariaDescribedBy,
  ariaLabel,
  ariaLabelledBy,
  children,
  color,
  component,
  testId,
}: TypographyProps) => (
  <Typography
    ariaDescribedBy={ariaDescribedBy}
    ariaLabel={ariaLabel}
    ariaLabelledBy={ariaLabelledBy}
    children={children}
    color={color}
    component={component}
    data-se={testId}
    variant="subordinate"
  />
);

const MemoizedSubordinate = memo(Subordinate);
MemoizedSubordinate.displayName = "Subordinate";

const Support = ({
  ariaDescribedBy,
  ariaLabel,
  ariaLabelledBy,
  children,
  color,
  component,
  testId,
}: TypographyProps) => (
  <Typography
    ariaDescribedBy={ariaDescribedBy}
    ariaLabel={ariaLabel}
    ariaLabelledBy={ariaLabelledBy}
    children={children}
    color={color}
    component={component}
    data-se={testId}
    variant="support"
  />
);

const MemoizedSupport = memo(Support);
MemoizedSupport.displayName = "Support";

const Legend = ({
  ariaDescribedBy,
  ariaLabel,
  ariaLabelledBy,
  children,
  color,
  component,
  testId,
}: TypographyProps) => (
  <Typography
    ariaDescribedBy={ariaDescribedBy}
    ariaLabel={ariaLabel}
    ariaLabelledBy={ariaLabelledBy}
    children={children}
    color={color}
    component={component}
    data-se={testId}
    variant="legend"
  />
);

const MemoizedLegend = memo(Legend);
MemoizedLegend.displayName = "Legend";

export {
  MemoizedTypography as Typography,
  MemoizedHeading1 as Heading1,
  MemoizedHeading2 as Heading2,
  MemoizedHeading3 as Heading3,
  MemoizedHeading4 as Heading4,
  MemoizedHeading5 as Heading5,
  MemoizedHeading6 as Heading6,
  MemoizedLegend as Legend,
  MemoizedParagraph as Paragraph,
  MemoizedSubordinate as Subordinate,
  MemoizedSupport as Support,
};
