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
import type { PolymorphicForwardRef } from "../../utils";
import { withTheme } from "@okta/odyssey-react-theme";
import { Box } from "../Box";
import type { BoxProps } from "../Box";
import { useCx, useOmit, toCamelCase } from "../../utils";
import { theme } from "./Text.theme";
import styles from "./Text.module.scss";

export interface TextProps
  extends Pick<
    BoxProps,
    | "margin"
    | "marginTop"
    | "marginRight"
    | "marginBottom"
    | "marginLeft"
    | "padding"
    | "paddingTop"
    | "paddingRight"
    | "paddingBottom"
    | "paddingLeft"
  > {
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
  color?: "body" | "body-inverse" | "danger" | "sub" | "primary";

  /**
   * The font weight for the text content.
   * @default normal
   */
  fontWeight?: "normal" | "bold";

  /**
   * The font style (normal or italic) for the text content.
   * @default normal
   */
  fontStyle?: "normal" | "italic";

  /**
   * The text-transform for the text content.
   * @default none
   */
  textTransform?: "none" | "capitalize" | "uppercase" | "lowercase";

  /**
   * The font-size for the text content.
   * @default base
   */
  fontSize?: "base" | "caption";

  /**
   * The line-height for the text content.
   * @default normal
   */
  lineHeight?: "normal" | "title";

  /**
   * The overflow wrapping behavior for the text content.
   * @default normal
   */
  overflowWrap?: "normal" | "break-word";
}

/**
 * A component which provides style for visible text elements.
 */
export const Text = withTheme(
  theme,
  styles
)(
  forwardRef((props, ref) => {
    const {
      children,
      as = "span",
      color = "body",
      fontWeight = "normal",
      fontStyle = "normal",
      textTransform = "none",
      fontSize = "base",
      overflowWrap = "normal",
      lineHeight = "normal",
      ...rest
    } = props;

    const componentClass = useCx(
      styles.root,
      styles[as],
      styles[toCamelCase(color) + "Color"],
      styles[toCamelCase(fontWeight) + "Weight"],
      styles[toCamelCase(fontStyle) + "Style"],
      styles[toCamelCase(textTransform) + "Transform"],
      styles[toCamelCase(fontSize) + "Size"],
      styles[toCamelCase(overflowWrap) + "Wrap"],
      styles[toCamelCase(lineHeight) + "LineHeight"]
    );
    const omitProps = useOmit(rest);

    return (
      <Box
        as={as}
        {...omitProps}
        ref={ref}
        className={componentClass}
        color={false}
        fontWeight={false}
        fontStyle={false}
        fontSize={false}
        lineHeight={false}
        children={children}
      />
    );
  })
) as PolymorphicForwardRef<"span", TextProps>;

Text.displayName = "Text";
