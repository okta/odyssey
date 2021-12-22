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
import { Box } from "../Box";
import { withTheme } from "@okta/odyssey-react-theme";
import { useCx, useOmit } from "../../utils";
import styles from "./Heading.module.scss";

export interface HeadingProps
  extends Omit<ComponentPropsWithRef<"h1">, "style" | "className" | "color"> {
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
   * Specify explicit line height spacing
   */
  lineHeight?: "base" | "title";
}

/**
 * Heading are used to describe the main idea of a page, a section,
 * or content that follows it. By default, header tags (h1 through h6)
 * use the corresponding visual size.
 */
export const Heading = withTheme(
  () => ({}),
  styles
)(
  forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
    const {
      level = "1",
      visualLevel,
      children,
      noEndMargin = false,
      lineHeight,
      ...rest
    } = props;

    const tag = `h${level}` as const;

    const componentClass = useCx(
      styles.root,
      visualLevel && styles[`level${visualLevel}`],
      noEndMargin && styles.noEndMargin,
      lineHeight && styles[`${lineHeight}LineHeight`]
    );

    const omitProps = useOmit(rest);

    return (
      <Box
        as={tag}
        {...omitProps}
        ref={ref}
        className={componentClass}
        color={false}
        fontWeight={false}
        fontSize={false}
      >
        {children}
      </Box>
    );
  })
);

Heading.displayName = "Heading";
