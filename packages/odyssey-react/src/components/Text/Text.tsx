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
import type { ReactNode } from "react";
import { useCx, useOmit, withStyles } from "../../utils";
import type { PolymorphicForwardRef } from "../../utils";
import styles from "./Text.module.scss";

export interface TextProps {
  /**
   * Text content to be rendered
   */
  children: ReactNode;

  /**
   * The semantic element to be rendered in to the DOM
   * @default span
   */
  as?:
    | "abbr"
    | "address"
    | "blockquote"
    | "cite"
    | "code"
    | "del"
    | "dfn"
    | "div"
    | "em"
    | "ins"
    | "kbd"
    | "mark"
    | "p"
    | "pre"
    | "q"
    | "s"
    | "samp"
    | "small"
    | "span"
    | "strong"
    | "sub"
    | "sup"
    | "var";

  /**
   * The text color style for the text content.
   * @default body
   */
  color?:
    | "body"
    | "bodyInverse"
    | "code"
    | "danger"
    | "dangerDisabled"
    | "sub"
    | "heading"
    | "headingInverse"
    | "dangerDisabled"
    | "primary";

  /**
   * The font weight for the text content.
   * @default regular
   */
  weight?: "regular" | "bold";

  /**
   * The font style (normal or italic) for the text content.
   * @default normal
   */
  fontStyle?: "normal" | "italic";

  /**
   * The text-transform for the text content.
   * @default none
   */
  transform?:
    | "none"
    | "capitalize"
    | "uppercase"
    | "lowercase"
    | "fullWidth"
    | "fullSizeKana";

  /**
   * The font-size for the text content.
   * @default base
   */
  size?:
    | "lede"
    | "base"
    | "caption"
    | "heading1"
    | "heading2"
    | "heading3"
    | "heading4"
    | "heading5"
    | "heading6";

  /**
   * The line-height for the text content.
   * @default normal
   */
  lineHeight?: "base" | "title" | "font";

  /**
   * The overflow wrapping behavior for the text content.
   * @default normal
   */
  wrap?: "normal" | "breakWord" | "anywhere" | "nowrap";

  /**
   * The text color style on hover.
   */
  hoverColor?: "body" | "bodyInverse" | "primaryDark";

  /**
   * The text color style on focus.
   */
  focusColor?: "body" | "bodyInverse" | "primary";

  /**
   * The text color style when disabled.
   */
  disabledColor?: "bodyInverse" | "primaryLight" | "sub";

  /**
   * The text color style when the parent element is hovered.
   */
  parentHoveredColor?: "body" | "bodyInverse" | "primaryDark";

  /**
   * The text color style when the parent element has focus.
   */
  parentFocusedColor?: "body" | "bodyInverse" | "primary";

  /**
   * The text color style when the parent element is disabled.
   */
  parentDisabledColor?: "bodyInverse" | "primaryLight" | "sub";

  /**
   * Transitions
   */
  transition?: "inherit";
}

/**
 * A component which provides style for visible text elements.
 */
let Text = forwardRef((props, ref) => {
  const {
    children,
    as = "span",
    color = "body",
    weight = "regular",
    fontStyle = "normal",
    transform = "none",
    size = "base",
    wrap = "normal",
    lineHeight = "normal",
    hoverColor,
    focusColor,
    disabledColor,
    parentHoveredColor,
    parentFocusedColor,
    parentDisabledColor,
    transition,
    ...rest
  } = props;

  const Tag = as;

  const componentClass = useCx(
    styles.root,
    styles[as],
    styles[color + "Color"],
    styles[weight + "Weight"],
    styles[fontStyle + "Style"],
    styles[transform + "Transform"],
    styles[size + "Size"],
    styles[wrap + "Wrap"],
    styles[lineHeight + "LineHeight"],
    styles[hoverColor + "HoverColor"],
    styles[focusColor + "FocusColor"],
    styles[disabledColor + "DisabledColor"],
    styles[parentHoveredColor + "ParentHoveredColor"],
    styles[parentFocusedColor + "ParentFocusedColor"],
    styles[parentDisabledColor + "ParentDisabledColor"],
    styles[transition + "Transition"]
  );
  const omitProps = useOmit(rest);

  return (
    <Tag
      {...omitProps}
      ref={ref}
      className={componentClass}
      children={children}
    />
  );
}) as PolymorphicForwardRef<"span", TextProps>;

Text.displayName = "Text";

Text = withStyles(styles)(Text);

export { Text };
