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

import React, { forwardRef } from "react";
import type { ComponentPropsWithRef, ReactElement, ReactText } from "react";
import { withTheme } from "@okta/odyssey-react-theme";
import { useCx, useOmit } from "../../utils";
import { Box } from "../Box";
import styles from "./Button.module.scss";
import { theme } from "./Button.theme";

interface CommonProps
  extends Omit<
    ComponentPropsWithRef<"button">,
    "style" | "className" | "color"
  > {
  /**
   * Text content to be rendered within the button, usually label text.
   */
  children?: ReactText;

  /**
   * Icon to display
   */
  icon?: ReactElement;

  /**
   * The size to be displayed to the user.
   * @default m
   */
  size?: "s" | "m" | "l";

  /**
   * The visual variant to be displayed to the user.
   * @default primary
   */
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "dismiss"
    | "dismissInverted"
    | "clear"
    | "affix";

  /**
   * Extends the width of the button to that of its' parent.
   */
  wide?: boolean;
}

interface ChildrenProps extends CommonProps {
  children: ReactText;
}

interface IconProps extends CommonProps {
  icon: ReactElement;
}

interface AffixProps
  extends Omit<CommonProps, "variant" | "children" | "icon" | "size"> {
  variant: "affix";
  children: never;
  icon: ReactElement;
  size: "s";
}

export type ButtonProps = IconProps | ChildrenProps | AffixProps;

/**
 * A clickable button used for form submissions and most in-page interactions.
 */
export const Button = withTheme(
  theme,
  styles
)(
  forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const {
      children,
      size = "m",
      variant = "primary",
      wide,
      icon,
      ...rest
    } = props;

    const componentClass = useCx(
      styles.root,
      styles[`${variant}Variant`],
      styles[`${size}Size`],
      wide && styles.wideLayout
    );

    const omitProps = useOmit(rest);
    return (
      <Box
        as="button"
        color={false}
        fontWeight={false}
        fontSize={false}
        lineHeight={false}
        {...omitProps}
        ref={ref}
        className={componentClass}
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        {children && <span className={styles.label}>{children}</span>}
      </Box>
    );
  })
);

Button.displayName = "Button";
