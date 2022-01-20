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
import type { ReactNode, ReactElement, ComponentPropsWithRef } from "react";
import { withTheme } from "@okta/odyssey-react-theme";
import { useOmit } from "../../utils";
import { Box } from "../Box";
import styles from "./TableContainer.module.scss";
import { theme } from "./TableContainer.theme";

export interface TableContainerProps
  extends Omit<
    ComponentPropsWithRef<"figure">,
    "style" | "className" | "title" | "color"
  > {
  /**
   * The table for this container
   */
  children?: ReactElement | ReactElement[];
  /**
   * The visible heading for the table
   */
  title: ReactNode;
}

export const TableContainer = withTheme(
  theme,
  styles
)(
  forwardRef<HTMLElement, TableContainerProps>((props, ref) => {
    const { children, title, ...rest } = props;

    const omitProps = useOmit(rest);

    return (
      <Box as="figure" {...omitProps} ref={ref} className={styles.root}>
        <figcaption className={styles.title}>{title}</figcaption>
        {children}
      </Box>
    );
  })
);

TableContainer.displayName = "TableContainer";
