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

import type {
  FunctionComponent,
  ReactText,
  ReactNode,
  HTMLAttributes,
} from "react";
import { useCx, useOmit } from "../../utils";
import styles from "./Text.module.scss";
import ScreenReaderText from "../ScreenReaderText";

export interface Props extends HTMLAttributes<HTMLElement> {
  /**
   * Text content to be rendered
   */
  children: ReactText | ReactNode;

  /**
   * Prepends visually hidden assistive text to the child contents
   */
  a11yStart?: ReactText;

  /**
   * Appends visually hidden assistive text to the child contents
   */
  a11yEnd?: ReactText;

  /**
   * The semantic element to be rendered in to the DOM
   * @default span
   */
  as?:
    | "address"
    | "span"
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

  /** @todo This should be an inherited HTML type, need to fix prior to merge */
  cite?: any;
}

/**
 * A component which provides style for visible text elements.
 *
 * @component
 * @example
 * <Text>Text label</Text>
 */
const Text: FunctionComponent<Props> = (props) => {
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
    a11yStart,
    a11yEnd,
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
    <Tag {...omitProps} className={componentClass}>
      {a11yStart && <ScreenReaderText>{a11yStart}</ScreenReaderText>}
      {children}
      {a11yEnd && <ScreenReaderText>{a11yEnd}</ScreenReaderText>}
    </Tag>
  );
};

export default Text;
