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
import type { ComponentPropsWithRef, ReactNode } from "react";
import { useCx, useOmit, withStyles } from "../../utils";
import styles from "./Heading.module.scss";
import { Text, TextProps } from "../Text";

export interface HeadingProps
  extends Omit<ComponentPropsWithRef<"h1">, "style" | "className"> {
  /**
   * The semantic level for the underlying heading tag
   * @default 1
   */
  level?: "1" | "2" | "3" | "4" | "5" | "6";

  /**
   * The visual level level for the underlying heading tag
   */
  visualLevel?: HeadingProps["level"];

  /**
   * The human readable section title to be visually displayed
   */
  children: ReactNode;

  /**
   * Remove default block end margin
   * @default false
   */
  noEndMargin?: boolean;

  /**
   * The line-height for the title content.
   */
  lineHeight?: TextProps["lineHeight"];

  /**
   * The heading color style.
   * @default heading
   */
  color?: TextProps["color"];

  /**
   * The font weight for the heading.
   * @default bold
   */
  weight?: TextProps["weight"];
}

/**
 * Heading are used to describe the main idea of a page, a section,
 * or content that follows it. By default, header tags (h1 through h6)
 * use the corresponding visual size.
 */
let Heading = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  const {
    level = "1",
    visualLevel,
    children,
    noEndMargin = false,
    lineHeight,
    color = "heading",
    weight = "bold",
    ...rest
  } = props;
  const Tag = `h${level}` as const;
  const size = visualLevel
    ? (`heading${visualLevel}` as const)
    : (`heading${level}` as const);
  const componentClass = useCx(
    styles.root,
    visualLevel && styles[`level${visualLevel}`],
    noEndMargin && styles.noEndMargin
  );
  const lh = lineHeight ? lineHeight : parseInt(level) > 3 ? "title" : "base";
  const omitProps = useOmit(rest);

  return (
    <Tag {...omitProps} ref={ref} className={componentClass}>
      <Text color={color} weight={weight} size={size} lineHeight={lh}>
        {children}
      </Text>
    </Tag>
  );
});

Heading.displayName = "Heading";

Heading = withStyles(styles)(Heading);

export { Heading };
