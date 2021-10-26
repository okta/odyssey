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

import type { ComponentPropsWithRef } from "react";
import { forwardRef } from "react";
import { useCx, useOmit, withStyles } from "../../utils";
import styles from "./Box.module.scss";

type spacing = "x-small" | "small" | "medium" | "large" | "x-large";

export interface BoxProps
  extends Omit<ComponentPropsWithRef<"div">, "style" | "className"> {
  /**
   * Padding applied inside box
   */
  padding?: spacing;
  /**
   * Border colors
   */
  borderColor?: "display" | "none";
  /**
   * Hover border
   */
  hoverBorderColor?: "interactive" | "none";
  /**
   * Border radius
   */
  borderRadius?: "base" | "none";
  /**
   * Shadow
   */
  boxShadow?: "default" | "none";
  /**
   * Hover shadow
   */
  hoverBoxShadow?: "default" | "none";
  /**
   * Focus indicator
   */
  focusRing?: "primary" | "none";
  /**
   * Display type
   */
  display?: "flex" | "none";
  /**
   * Flex grow
   */
  flexGrow?: "0" | "1";
  /**
   * flexbox alignment of items on the [Cross Axis](https://developer.mozilla.org/en-US/docs/Glossary/Cross_Axis)
   * (vertically if the flex direction is row, horizontally if the direction is column)
   */
  alignItems?: "center" | "auto";
  /**
   * Right margin
   */
  marginRight?: spacing;
  /**
   * Bottom margin
   */
  marginBottom?: spacing;
}

function convertProp(prop: string) {
  const str = prop.replace("-", "");
  return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}

/**
 * Low level building block for ui
 */
let Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  const {
    borderColor,
    hoverBorderColor,
    borderRadius,
    boxShadow,
    hoverBoxShadow,
    display,
    flexGrow,
    alignItems,
    focusRing,
    marginRight,
    marginBottom,
    padding,
    children,
    ...rest
  } = props;

  const componentClass = useCx(
    styles.root,
    borderColor !== "none" && styles.borderBase,
    borderColor && styles[`borderColor${convertProp(borderColor)}`],
    hoverBorderColor !== "none" && styles.borderBase,
    hoverBorderColor &&
      styles[`hoverBorderColor${convertProp(hoverBorderColor)}`],
    padding && styles[`padding${convertProp(padding)}`],
    borderRadius && styles[`borderRadius${convertProp(borderRadius)}`],
    boxShadow && styles[`boxShadow${convertProp(boxShadow)}`],
    hoverBoxShadow && styles[`hoverBoxShadow${convertProp(hoverBoxShadow)}`],
    focusRing && styles[`focusRing${convertProp(focusRing)}`],
    display && styles[`display${convertProp(display)}`],
    flexGrow && styles[`flexGrow${convertProp(flexGrow)}`],
    marginRight && styles[`marginRight${convertProp(marginRight)}`],
    alignItems && styles[`alignItems${convertProp(alignItems)}`],
    marginBottom && styles[`marginBottom${convertProp(marginBottom)}`]
  );

  const omitProps = useOmit(rest);
  return (
    <div {...omitProps} className={componentClass} ref={ref}>
      {children}
    </div>
  );
});

Box.displayName = "Box";

Box = withStyles(styles)(Box);

export { Box };
