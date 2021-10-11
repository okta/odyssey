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

import type { ComponentPropsWithoutRef, ReactElement } from "react";
import { forwardRef } from "react";
import { withStyles, useCx, useOmit } from "../../utils";
import styles from "./Button.module.scss";

export interface Props
  extends Omit<ComponentPropsWithoutRef<"button">, "style" | "className"> {
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
  variant?: "primary" | "secondary" | "danger" | "dismiss" | "clear";

  /**
   * Extends the width of the button to that of its' parent.
   */
  wide?: boolean;
}

/**
 * A clickable button used for form submissions and most in-page interactions.
 */
const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
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
    {
      [styles.wideLayout]: wide,
    }
  );

  const omitProps = useOmit(rest);

  return (
    <button {...omitProps} ref={ref} className={componentClass}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children && <span className={styles.label}>{children}</span>}
    </button>
  );
});

Button.displayName = "Button";

export default withStyles(styles)(Button);
