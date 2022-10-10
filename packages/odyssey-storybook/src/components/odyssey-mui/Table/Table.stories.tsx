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

import { Story } from "@storybook/react";
import * as React from "react";
import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import TableMdx from "./Table.mdx";

export default {
  title: `MUI Components/Table`,
  component: Table,
  parameters: {
    docs: {
      page: TableMdx,
    },
  },
  argTypes: {
    disabled: {
      control: "boolean",
      defaultValue: false,
    },
    icon: {
      control: "text",
      defaultValue: null,
    },
    label: {
      control: "text",
      defaultValue: "Asteroids",
    },
    wrapped: {
      control: "boolean",
      defaultValue: false,
    },
  },
  decorators: [MuiThemeDecorator],
};

interface Data {
  name: string;
  radius: number;
  type: string;
  perihelion: string;
  descriptor: string;
}

function createData(
  name: string,
  radius: number,
  type: string,
  perihelion: string,
  descriptor: string
): Data {
  return {
    name,
    radius,
    type,
    perihelion,
    descriptor,
  };
}

const rows = [
  createData("Mercury", 2440, "Terrestrial", "--", "Mercurian"),
  createData("Venus", 6051, "Terrestrial", "--", "Venusian"),
  createData("Earth", 6378, "Terrestrial", "January 4, 2023", "Terran"),
  createData("Mars", 3396, "Terrestrial", "June 21, 2022", "Martian"),
  createData("Jupiter", 71492, "Gas giant", "January 21, 2023", "Jovian"),
  createData("Saturn", 60268, "Gas giant", "November 29, 2032", "Saturnian"),
  createData("Uranus", 25559, "Ice giant", "August 17-19, 2050", "Uranian"),
  createData("Neptune", 24764, "Ice giant", "September 4, 2042", "Neptunian"),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends string | number | symbol>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Planet",
  },
  {
    id: "radius",
    numeric: true,
    disablePadding: false,
    label: "Radius (km)",
  },
  {
    id: "type",
    numeric: false,
    disablePadding: false,
    label: "Type",
  },
  {
    id: "perihelion",
    numeric: false,
    disablePadding: false,
    label: "Perihelion",
  },
  {
    id: "descriptor",
    numeric: false,
    disablePadding: false,
    label: "Descriptor",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTable() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("radius");
  const [selected, setSelected] = React.useState<readonly string[]>([]);

  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  return (
    <TableContainer>
      <Table aria-labelledby="tableTitle">
        <EnhancedTableHead
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={rows.length}
        />
        <TableBody>
          {rows
            .slice()
            .sort(getComparator(order, orderBy))
            .map((row, index) => {
              const isItemSelected = isSelected(row.name);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, row.name)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.name}
                  selected={isItemSelected}
                >
                  <TableCell>
                    <Checkbox
                      checked={isItemSelected}
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                    />
                  </TableCell>
                  <TableCell id={labelId}>{row.name}</TableCell>
                  <TableCell variant="number">
                    {row.radius.toLocaleString("en-US")}
                  </TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell variant="date">{row.perihelion}</TableCell>
                  <TableCell>{row.descriptor}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const DefaultTemplate: Story = (args) => {
  const {} = args;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Planet</TableCell>
            <TableCell variant="number">Radius (km)</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Perihelion date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell variant="number">{row.radius}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell variant="date">{row.perihelion}</TableCell>
              <TableCell variant="action">
                <Button variant="secondary" size="s">
                  Plot course
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const Default = DefaultTemplate.bind({});
Default.args = {};

const RowHeadingTemplate: Story = (args) => {
  const {} = args;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Planet</TableCell>
            <TableCell variant="number">Radius (km)</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Perihelion date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell variant="head">{row.name}</TableCell>
              <TableCell variant="number">{row.radius}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell variant="date">{row.perihelion}</TableCell>
              <TableCell variant="action">
                <Button variant="secondary" size="s">
                  Plot course
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const RowHeadings = RowHeadingTemplate.bind({});
RowHeadings.args = {};

const RowGroupingTemplate: Story = (args) => {
  const {} = args;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Planet</TableCell>
            <TableCell variant="number">Radius (km)</TableCell>
            <TableCell>Descriptor</TableCell>
            <TableCell>Perhihelion date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell variant="head" scope="row" rowSpan={2}>
              Gas giants
            </TableCell>
            <TableCell>Jupiter</TableCell>
            <TableCell variant="number">69,991</TableCell>
            <TableCell>Jovian</TableCell>
            <TableCell variant="date">January 21, 2023</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Saturn</TableCell>
            <TableCell variant="number">58,232</TableCell>
            <TableCell>Saturnian</TableCell>
            <TableCell variant="date">November 29, 2032</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head" scope="row" rowSpan={3}>
              Terrestrial
            </TableCell>
            <TableCell>Earth</TableCell>
            <TableCell variant="number">6,371</TableCell>
            <TableCell>Terran</TableCell>
            <TableCell variant="date">January 2, 2021</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Venus</TableCell>
            <TableCell variant="number">6,052</TableCell>
            <TableCell>Venusian</TableCell>
            <TableCell variant="date">--</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Mars</TableCell>
            <TableCell variant="number">3,389</TableCell>
            <TableCell>Martian</TableCell>
            <TableCell variant="date">August 3, 2020</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const RowGroupings = RowGroupingTemplate.bind({});
RowGroupings.args = {};

const EnhancedTemplate: Story = (args) => {
  const {} = args;

  return <EnhancedTable />;
};

export const Enhanced = EnhancedTemplate.bind({});
Enhanced.args = {};
