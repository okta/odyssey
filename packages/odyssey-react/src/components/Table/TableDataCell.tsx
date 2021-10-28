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
import type { CellTextFormats } from "./types";
import { useCx, useOmit, withStyles } from "../../utils";
import styles from "./Table.module.scss";

export interface TableDataCellProps
  extends Omit<ComponentPropsWithRef<"td">, "style" | "className"> {
  children?: ReactNode;
  /**
   * The basic text format for the cell.
   */
  format?: CellTextFormats;
  empty?: boolean;
}

let TableDataCell = forwardRef<HTMLTableCellElement, TableDataCellProps>(
  (props, ref) => {
    const { children, format, empty, ...rest } = props;

    const componentClass = useCx(
      styles.cell,
      format && styles[`${format}Format`],
      empty && styles[`${empty}State`]
    );

    const omitProps = useOmit(rest);

    return (
      <td {...omitProps} ref={ref} className={componentClass}>
        {children}
      </td>
    );
  }
);

TableDataCell.displayName = "TableDataCell";

TableDataCell = withStyles(styles)(TableDataCell);

export { TableDataCell };
