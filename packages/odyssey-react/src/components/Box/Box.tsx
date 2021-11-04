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
import type { ComponentPropsWithRef } from "react";
import { useCx, useOmit, withStyles } from "../../utils";
import styles from "./Box.module.scss";

type spacing = "xs" | "s" | "m" | "l" | "xl";
type overflow = "visible" | "hidden" | "clip" | "scroll" | "auto";
type borderRadius = "base" | "outer" | "none";

export interface BoxProps
  extends Omit<ComponentPropsWithRef<"div">, "style" | "className"> {
  /**
   * Display type
   */
  display?:
    | "block"
    | "inline"
    | "inline-block"
    | "flex"
    | "inline-flex"
    | "grid"
    | "inline-grid"
    | "none";
  /**
   * Positioning
   */
  position?: "absolute" | "relative" | "static" | "fixed" | "sticky";
  /**
   * Grid columns
   */
  gridTemplateColumns?: "2" | "3" | "2-auto-1" | "3-auto-1-auto-3";
  /**
   * Grid columns
   */
  gridColumn?: "1" | "2" | "3";
  /**
   * Grid rows
   */
  gridRow?: "1" | "2" | "3" | "4" | "5";
  /**
   * [Main axis](https://developer.mozilla.org/en-US/docs/Glossary/Main_Axis) of flex layout
   */
  flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
  /**
   * Whether flex items are forced onto one line or can wrap
   */
  flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
  /**
   * Flex controls how a flex item both grows and shrinks.
   *
   * - Use `initial` to allow a flex item to shrink but not grow, taking into account its initial size
   * - Use `auto` to allow a flex item to grow and shrink, taking into account its initial size
   * - Use `evenly` to allow a flex item to grow and shrink as needed, ignoring its initial size
   * - Use `none` to prevent a flex item from growing or shrinking
   */
  flex?: "initial" | "auto" | "evenly" | "none";
  /**
   * Flex grow
   */
  flexGrow?: "0" | "1";
  /**
   * Flex shrink
   */
  flexShrink?: "0" | "1";
  /**
   * Flexbox alignment of items on the [Cross Axis](https://developer.mozilla.org/en-US/docs/Glossary/Cross_Axis)
   * (vertically if the flex direction is row, horizontally if the direction is column)
   *
   * - Use `stretch` to stretch items to fill the container
   * - Use `flex-start` to align items to the start of the container
   * - Use `center` to align items along the center of the container
   * - Use `flex-end` to align items to the end of the container
   * - Use `baseline` so that all the items baselines align
   */
  alignItems?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "baseline"
    | "stretch"
    | "auto";
  /**
   * Flexbox alignment of items on the [Main Axis](https://developer.mozilla.org/en-US/docs/Glossary/Main_Axis)
   * (horizontally if the flex direction is row, vertically if the direction is column)
   *
   * - Use `flex-start` to justify items against the start of the container
   * - Use `center` to justify items along the center of the container
   * - Use `flex-end` to justify items to the end of the container
   * - Use `space-between` to leave an equal amount of space between each item
   * - Use `space-around` to leave an equal amount of space around each item
   * - Use `space-evenly` to leave an equal amount of space around each item, and the edge of the container
   */
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  /**
   * Width
   */
  width?: "1px" | "1em" | "full" | "screen" | "max-line-length";
  /**
   * Maximum width
   */
  maxWidth?: "full" | "max-line-length" | "max-line-length-plus-padding";
  /**
   * Height
   */
  height?: "1em";
  /**
   * Maximum height
   */
  maxHeight?: "screen" | "screen-minus-padding";
  /**
   * Margin applied outside the box border
   */
  margin?: spacing | spacing[];
  /**
   * Top margin applied outside the box border
   */
  marginTop?: spacing;
  /**
   * Right margin applied outside the box border
   */
  marginRight?: spacing;
  /**
   * Bottom margin applied outside the box border
   */
  marginBottom?: spacing;
  /**
   * Left margin applied outside the box border
   */
  marginLeft?: spacing;
  /**
   * Padding applied inside the box between the border and the content
   */
  padding?: spacing | spacing[];
  /**
   * Padding applied inside the box at the top between the border and the content
   */
  paddingTop?: spacing;
  /**
   * Padding applied inside the box on the right side between the border and the content
   */
  paddingRight?: spacing;
  /**
   * Padding applied inside the box at the bottom between the border and the content
   */
  paddingBottom?: spacing;
  /**
   * Padding applied inside the box on the left side between the border and the content
   */
  paddingLeft?: spacing;
  /**
   * Overflow behavior
   */
  overflow?: overflow | overflow[];
  /**
   * Horizontal overflow behavior
   */
  overflowX?: overflow;
  /**
   * Vertical overflow behavior
   */
  overflowY?: overflow;
  /**
   * Border colors
   */
  borderColor?: "display" | "ui" | "danger" | "none";
  /**
   * Hover border
   */
  hoverBorderColor?: "primary" | "ui" | "none";
  /**
   * focus border
   */
  focusBorderColor?: "primary" | "danger" | "none";
  /**
   * Border radius
   */
  borderRadius?: borderRadius | borderRadius[];
  /**
   * Top left corner border radius
   */
  borderTopLeftRadius?: borderRadius;
  /**
   * Top right corner border radius
   */
  borderTopRightRadius?: borderRadius;
  /**
   * Bottom left corner border radius
   */
  borderBottomLeftRadius?: borderRadius;
  /**
   * Bottom right corner border radius
   */
  borderBottomRightRadius?: borderRadius;
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
  focusRing?: "primary" | "danger" | "none";
  /**
   * Background color
   */
  backgroundColor?:
    | "default"
    | "disabled"
    | "primary-light"
    | "primary-base"
    | "primary-dark"
    | "success-light"
    | "success-base"
    | "success-dark"
    | "caution-light"
    | "caution-base"
    | "caution-dark"
    | "danger-light"
    | "danger-base"
    | "danger-dark";
  /**
   * Cursor style
   */
  cursor?:
    | "auto"
    | "default"
    | "none"
    | "pointer"
    | "context-menu"
    | "help"
    | "progress"
    | "wait"
    | "cell"
    | "crosshair"
    | "text"
    | "vertical-text"
    | "alias"
    | "copy"
    | "move"
    | "no-drop"
    | "not-allowed"
    | "all-scroll"
    | "col-resize"
    | "row-resize"
    | "n-resize"
    | "e-resize"
    | "s-resize"
    | "w-resize"
    | "ns-resize"
    | "nw-resize"
    | "se-resize"
    | "sw-resize"
    | "nesw-resize"
    | "nwse-resize";
  /**
   * Mouse interaction
   */
  pointerEvents?: "none" | "auto";
  /**
   * Content selection
   */
  userSelect?: "none" | "text" | "contain" | "all" | "auto";
}

function convertProp(prop: string) {
  function clearAndUpper(text: string) {
    return text.replace(/-/, "").toUpperCase();
  }
  return prop.replace(/(^\w|-\w)/g, clearAndUpper);
}

/**
 * Low level building block for ui
 */
let Box = forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      display,
      position,
      flexDirection,
      flexWrap,
      flex,
      flexGrow,
      flexShrink,
      alignItems,
      justifyContent,
      gridTemplateColumns,
      gridColumn,
      gridRow,
      width,
      maxWidth,
      height,
      maxHeight,
      margin,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      padding,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      overflow,
      overflowX,
      overflowY,
      borderColor,
      hoverBorderColor,
      focusBorderColor,
      borderRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      backgroundColor,
      boxShadow,
      hoverBoxShadow,
      focusRing,
      cursor,
      pointerEvents,
      userSelect,
      children,
      ...rest
    },
    ref
  ) => {
    if (Array.isArray(margin)) {
      switch (margin.length) {
        case 2:
          marginTop = margin[0];
          marginBottom = margin[0];
          marginLeft = margin[1];
          marginRight = margin[1];
          break;
        case 3:
          marginTop = margin[0];
          marginRight = margin[1];
          marginLeft = margin[1];
          marginBottom = margin[2];
          break;
        case 4:
          marginTop = margin[0];
          marginRight = margin[1];
          marginBottom = margin[2];
          marginLeft = margin[3];
          break;
        default:
          margin = margin[0];
      }
    }

    if (Array.isArray(padding)) {
      switch (padding.length) {
        case 2:
          paddingTop = padding[0];
          paddingBottom = padding[0];
          paddingLeft = padding[1];
          paddingRight = padding[1];
          break;
        case 3:
          paddingTop = padding[0];
          paddingRight = padding[1];
          paddingLeft = padding[1];
          paddingBottom = padding[2];
          break;
        case 4:
          paddingTop = padding[0];
          paddingRight = padding[1];
          paddingBottom = padding[2];
          paddingLeft = padding[3];
          break;
        default:
          padding = padding[0];
      }
    }

    if (Array.isArray(borderRadius)) {
      switch (borderRadius.length) {
        case 2:
          borderTopLeftRadius = borderRadius[0];
          borderBottomRightRadius = borderRadius[0];
          borderTopRightRadius = borderRadius[1];
          borderBottomLeftRadius = borderRadius[1];
          break;
        case 3:
          borderTopLeftRadius = borderRadius[0];
          borderTopRightRadius = borderRadius[1];
          borderBottomLeftRadius = borderRadius[1];
          borderBottomRightRadius = borderRadius[2];
          break;
        case 4:
          borderTopLeftRadius = borderRadius[0];
          borderTopRightRadius = borderRadius[1];
          borderBottomRightRadius = borderRadius[2];
          borderBottomLeftRadius = borderRadius[3];
          break;
        default:
          borderRadius = borderRadius[0];
      }
    }

    if (Array.isArray(overflow)) {
      switch (overflow.length) {
        case 2:
          overflowX = overflow[0];
          overflowY = overflow[1];
          break;
        default:
          overflowX = overflow[0];
      }
    }

    const componentClass = useCx(
      styles.root,
      display && styles[`display${convertProp(display)}`],
      position && styles[`position${convertProp(position)}`],
      flexDirection && styles[`flexDirection${convertProp(flexDirection)}`],
      flexWrap && styles[`flexWrap${convertProp(flexWrap)}`],
      flex && styles[`flex${convertProp(flex)}`],
      flexGrow && styles[`flexGrow${convertProp(flexGrow)}`],
      flexShrink && styles[`flexShrink${convertProp(flexShrink)}`],
      alignItems && styles[`alignItems${convertProp(alignItems)}`],
      justifyContent && styles[`justifyContent${convertProp(justifyContent)}`],
      gridTemplateColumns &&
        styles[`gridTemplateColumns${convertProp(gridTemplateColumns)}`],
      gridColumn && styles[`gridColumn${convertProp(gridColumn)}`],
      gridRow && styles[`gridRow${convertProp(gridRow)}`],
      width && styles[`width${convertProp(width)}`],
      maxWidth && styles[`maxWidth${convertProp(maxWidth)}`],
      height && styles[`height${convertProp(height)}`],
      maxHeight && styles[`maxHeight${convertProp(maxHeight)}`],
      margin &&
        !Array.isArray(margin) &&
        styles[`margin${convertProp(margin)}`],
      marginTop && styles[`marginTop${convertProp(marginTop)}`],
      marginRight && styles[`marginRight${convertProp(marginRight)}`],
      marginBottom && styles[`marginBottom${convertProp(marginBottom)}`],
      marginLeft && styles[`marginLeft${convertProp(marginLeft)}`],
      padding &&
        !Array.isArray(padding) &&
        styles[`padding${convertProp(padding)}`],
      paddingTop && styles[`paddingTop${convertProp(paddingTop)}`],
      paddingRight && styles[`paddingRight${convertProp(paddingRight)}`],
      paddingBottom && styles[`paddingBottom${convertProp(paddingBottom)}`],
      paddingLeft && styles[`paddingLeft${convertProp(paddingLeft)}`],
      overflow &&
        !Array.isArray(overflow) &&
        styles[`overflow${convertProp(overflow)}`],
      overflowX && styles[`overflowX${convertProp(overflowX)}`],
      overflowY && styles[`overflowY${convertProp(overflowY)}`],
      borderColor !== "none" && styles.borderBase,
      borderColor && styles[`borderColor${convertProp(borderColor)}`],
      hoverBorderColor !== "none" && styles.borderBase,
      hoverBorderColor &&
        styles[`hoverBorderColor${convertProp(hoverBorderColor)}`],
      focusBorderColor &&
        styles[`focusBorderColor${convertProp(focusBorderColor)}`],
      borderRadius &&
        !Array.isArray(borderRadius) &&
        styles[`borderRadius${convertProp(borderRadius)}`],
      borderTopLeftRadius &&
        styles[`borderTopLeftRadius${convertProp(borderTopLeftRadius)}`],
      borderTopRightRadius &&
        styles[`borderTopRightRadius${convertProp(borderTopRightRadius)}`],
      borderBottomLeftRadius &&
        styles[`borderBottomLeftRadius${convertProp(borderBottomLeftRadius)}`],
      borderBottomRightRadius &&
        styles[
          `borderBottomRightRadius${convertProp(borderBottomRightRadius)}`
        ],
      backgroundColor &&
        styles[`backgroundColor${convertProp(backgroundColor)}`],
      boxShadow && styles[`boxShadow${convertProp(boxShadow)}`],
      hoverBoxShadow && styles[`hoverBoxShadow${convertProp(hoverBoxShadow)}`],
      focusRing && styles[`focusRing${convertProp(focusRing)}`],
      cursor && styles[`cursor${convertProp(cursor)}`],
      pointerEvents && styles[`pointerEvents${convertProp(pointerEvents)}`],
      userSelect && styles[`userSelect${convertProp(userSelect)}`]
    );

    const omitProps = useOmit(rest);
    return (
      <div {...omitProps} className={componentClass} ref={ref}>
        {children}
      </div>
    );
  }
);

Box.displayName = "Box";

Box = withStyles(styles)(Box);

export { Box };
