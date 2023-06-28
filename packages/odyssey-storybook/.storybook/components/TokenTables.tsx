/*!
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { Fragment, ReactNode } from "react";
import * as Tokens from "@okta/odyssey-design-tokens";
import {
  StaticTable,
  type TableColumn,
  Typography,
} from "@okta/odyssey-react-mui";

type FontWeight = 400 | 600;

type TokenName = keyof typeof Tokens;
type TokenValue = (typeof Tokens)[TokenName];

type TokenDataItem = {
  name: TokenName;
  value: TokenValue;
};

type TokenTableItem = TokenDataItem & {
  tableName: string;
};

type TableData = {
  name: string;
  values: TokenTableItem[];
};

const renderBorder = (token: TokenDataItem) => (
  <span
    style={{
      width: "1.25em",
      height: "1.25em",
      borderWidth: token.name.includes("BorderWidth") ? token.value : "1px",
      borderStyle: token.name.includes("BorderStyle")
        ? (token.value as string)
        : "solid",
      borderColor: "#d7d7dc",
      borderRadius: `${token.name.includes("BorderRadius") ? token.value : ""}`,
      display: "inline-block",
      verticalAlign: "middle",
    }}
  ></span>
);

const renderColor = (value: TokenValue) => (
  <span
    style={{
      width: "1em",
      height: "1em",
      display: "inline-block",
      backgroundColor: `${value}`,
      borderStyle: "solid",
      borderColor: `${value === "#ffffff" ? "#d7d7dc" : "transparent"}`,
      borderRadius: "4px",
      verticalAlign: "middle",
    }}
  ></span>
);

const renderColorText = (value: TokenValue) => (
  <span
    style={{
      color: `${value}`,
      display: "inline-block",
      paddingInline: "4px",
      backgroundColor: `${value === "#ffffff" ? "#000" : ""}`,
    }}
  >
    Aa
  </span>
);

const renderSpace = (value: TokenValue) => (
  <span
    style={{
      width: `${value}`,
      height: `${value}`,
      display: "inline-block",
      backgroundColor: "#f88c90",
    }}
  ></span>
);

const renderFont = (token: TokenDataItem) => (
  <span
    style={{
      fontFamily: `${token.name.includes("FontFamily") ? token.value : ""}`,
      fontSize: `${token.name.includes("FontSize") ? token.value : ""}`,
      fontWeight: `${
        token.name.includes("FontWeight") ? token.value : ""
      }` as unknown as FontWeight,
      lineHeight: `${token.name.includes("LineHeight") ? token.value : ""}`,
      backgroundColor: `${token.name.includes("LineHeight") ? "#ebebed" : ""}`,
      display: `${token.name.includes("LineHeight") ? "inline-block" : ""}`,
    }}
  >
    Waltz, bad nymph, for quick jigs vex!
  </span>
);

const renderFocus = (value: TokenValue) => (
  <span
    style={{
      width: "1.25em",
      height: "1.25em",
      display: "inline-block",
      boxShadow: `0 0 0 ${value} #a7b5ec`,
    }}
  ></span>
);

const renderShadow = (value: TokenValue) => (
  <span
    style={{
      width: "1.5em",
      height: "1.5em",
      display: "inline-block",
      boxShadow: `${value}`,
    }}
  ></span>
);

const tokenTables = Object.entries(Tokens as Record<TokenName, TokenValue>)
  .map(([key, value]) => ({
    name: key as TokenName,
    value,
  }))
  .reduce((tokenTables, { name, value }) => {
    const parts = name.match(/[A-Z][a-z]+/g);

    if (!parts) {
      return tokenTables;
    }

    const tableName =
      parts[0] === "Color" || parts[0] === "Hue" || parts[0] === "Palette"
        ? `${parts[1]} ${parts[0]}s`
        : parts[0];

    const existingTokenTable =
      tokenTables.find(({ name }) => name === tableName) ||
      ({
        name: tableName,
        values: [],
      } satisfies TableData);

    return tokenTables
      .filter(({ name }) => name !== tableName)
      .concat({
        ...existingTokenTable,
        values: existingTokenTable.values
          .concat({
            name,
            tableName,
            value,
          })
          .sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();

            if (nameA < nameB) {
              return -1;
            }

            if (nameA > nameB) {
              return 1;
            }

            return 0;
          }),
      });
  }, [] as Array<TableData>);

function getDisplayedValue(tableName: string, value: TokenValue) {
  if (!tableName.includes("Colors") || tableName === "Palette Colors") {
    return value;
  }

  const tokenValue = tokenTables
    .find(({ name }) => name === "Palette Colors")
    ?.values.find(({ value: tokenValue }) => tokenValue === value) ?? {
    name: "",
  };

  return tokenValue.name;
}

const columns: TableColumn<TokenTableItem>[] = [
  {
    accessorKey: "name",
    Cell: ({ cell }) => <Typography>{cell.getValue<TokenValue>()}</Typography>,
    header: "Token Name",
  },
  {
    accessorFn: ({ name }) => `${name} example`,
    Cell: ({ cell }) => {
      const name = cell.row.getValue<TokenName>("name");
      const value = Tokens[name] as TokenValue;

      return (
        <>
          {name.includes("Border") &&
            !name.includes("ColorBorder") &&
            renderBorder({
              name,
              value,
            })}
          {(name.includes("Hue") || name.includes("Palette")) &&
            !name.includes("ColorText") &&
            renderColor(value)}
          {name.includes("ColorText") && renderColorText(value)}
          {name.includes("Space") && renderSpace(value)}
          {name.includes("Font") &&
            renderFont({
              name,
              value,
            })}
          {name.includes("Focus") &&
            !name.includes("ColorFocus") &&
            renderFocus(value)}
          {name.includes("Shadow") && renderShadow(value)}
        </>
      );
    },
    header: "Example",
  },
  {
    accessorKey: "tableName",
    header: "Table Name",
  },
  {
    accessorKey: "value",
    Cell: ({ cell }) => {
      const tableName = cell.row.getValue<string>("tableName");
      const name = cell.row.getValue<TokenName>("name");
      const value = Tokens[name] as TokenValue;

      return <Typography>{getDisplayedValue(tableName, value)}</Typography>;
    },
    header: "Value",
  },
];

const getRowId = ({ name }: { name: TokenDataItem["name"] }) => name;

const initialState = {
  columnVisibility: {
    tableName: false,
  },
};

export const TokenTables = (): ReactNode =>
  tokenTables.map(({ name, values }) => (
    <Fragment key={name}>
      <Typography component="h2">{name}</Typography>

      <StaticTable
        columns={columns}
        data={values}
        getRowId={getRowId}
        initialState={initialState}
      />
    </Fragment>
  ));
