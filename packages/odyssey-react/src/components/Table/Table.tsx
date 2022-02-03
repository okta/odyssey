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

import React from "react";
import type { ReactText, ReactElement, ComponentPropsWithRef } from "react";
import { withTheme } from "@okta/odyssey-react-theme";
import { useOmit, forwardRefWithStatics } from "../../utils";
import { Box } from "../Box";
import { TableContainer } from "./TableContainer";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { TableFooter } from "./TableFooter";
import { TableRow } from "./TableRow";
import { TableDataCell } from "./TableDataCell";
import { TableHeaderCell } from "./TableHeaderCell";
import { TableSortButton } from "./TableSortButton";
import { ScreenReaderText } from "../ScreenReaderText";
import styles from "./Table.module.scss";
import { theme } from "./Table.theme";

type ContainerProps =
  | { withContainer: false; caption?: never }
  | {
      /**
       * Whether to use a Table.Container around the Table
       */
      withContainer?: true;
      /**
       * The visible caption for the table
       */
      caption?: ReactText;
    };

interface ElementProps
  extends Omit<
    ComponentPropsWithRef<"table">,
    "style" | "className" | "color" | "width"
  > {
  /**
   * Valid Table child elements including Head, Body, and Foot
   */
  children?: ReactElement | ReactElement[];
  /**
   * Provides users of assistive technologies with context for the table contents
   */
  screenReaderCaption: string;
}

export type TableProps = ContainerProps & ElementProps;

type Statics = {
  Container: typeof TableContainer;
  Header: typeof TableHeader;
  Body: typeof TableBody;
  Footer: typeof TableFooter;
  Row: typeof TableRow;
  DataCell: typeof TableDataCell;
  HeaderCell: typeof TableHeaderCell;
  SortButton: typeof TableSortButton;
};

/**
 * Tables provide structure for displaying sets of data across rows and columns.
 */
export const Table = withTheme(
  theme,
  styles
)(
  forwardRefWithStatics<HTMLTableElement, TableProps, Statics>((props, ref) => {
    const {
      children,
      screenReaderCaption,
      caption,
      withContainer = true,
      ...rest
    } = props;

    const omitProps = useOmit(rest);

    const TableEl = () => (
      <Box
        as="table"
        {...omitProps}
        ref={ref}
        className={styles.root}
        lineHeight={false}
      >
        <caption>
          <ScreenReaderText>{screenReaderCaption}</ScreenReaderText>
        </caption>
        {children}
      </Box>
    );

    return (
      <>
        {withContainer ? (
          <TableContainer caption={caption}>
            <TableEl />
          </TableContainer>
        ) : (
          <TableEl />
        )}
      </>
    );
  })
);

Table.Container = TableContainer;
Table.Header = TableHeader;
Table.Body = TableBody;
Table.Footer = TableFooter;
Table.Row = TableRow;
Table.DataCell = TableDataCell;
Table.HeaderCell = TableHeaderCell;
Table.SortButton = TableSortButton;

Table.displayName = "Table";
