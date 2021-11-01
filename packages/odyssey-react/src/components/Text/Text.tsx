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

import type { ReactNode, ComponentPropsWithRef } from "react";
import { forwardRef } from "react";
import type { ReactNode } from "react";
import { useCx, useOmit, withStyles } from "../../utils";
import styles from "./Text.module.scss";

type TagProps =
  | "address"
  | "span"
  | "div"
  | "dfn"
  | "p"
  | "abbr"
  | "em"
  | "strong"
  | "sup"
  | "sub"
  | "blockquote"
  | "cite"
  | "del"
  | "pre"
  | "var"
  | "q"
  | "s"
  | "samp"
  | "small"
  | "kbd"
  | "ins"
  | "mark"
  | "code";

export interface Props
  extends Omit<ComponentPropsWithRef<TagProps>, "style" | "className"> {
  /**
   * Text content to be rendered
   */
  children: ReactNode;

  /**
   * Text content to be rendered
   */
  children?: ReactNode;

  /**
   * The semantic element to be rendered in to the DOM
   * @default span
   */
  as?: TagProps;

  /**
   * The text color style for the text content.
   * @default body
   */
  color?: "body" | "bodyInverse" | "code" | "danger" | "dangerDisabled" | "sub";

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
   * @default normal
   */
  size?: "lede" | "base" | "caption";

  /**
   * The line-height for the text content.
   * @default normal
   */
  lineHeight?: "normal" | "title" | "font";

  /**
   * The overflow wrapping behavior for the text content.
   * @default normal
   */
  wrap?: "normal" | "breakWord" | "anywhere";
}

interface PropsCite extends Props {
  cite?: string;
}

interface PropsAbbr extends Props {
  title: string;
}

/**
 * A component which provides style for visible text elements.
 */
let Text = forwardRef<HTMLElement, Props | PropsCite | PropsAbbr>(
  (props, ref) => {
    const {
      children,
      as = "p",
      color = "body",
      weight = "regular",
      fontStyle = "normal",
      transform = "none",
      size = "base",
      wrap = "normal",
      lineHeight = "normal",
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
      styles[lineHeight + "LineHeight"]
    );

    const omitProps = useOmit(rest);

    return (
      <Tag ref={ref} {...omitProps} className={componentClass}>
        {children}
      </Tag>
    );
  }
);

Text.displayName = "Text";

Text = withStyles(styles)(Text);

export { Text };
