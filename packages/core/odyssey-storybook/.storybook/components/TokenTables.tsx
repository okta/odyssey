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

import {
  CSSProperties,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import * as Tokens from "@okta/odyssey-design-tokens";
import {
  DataTableColumn,
  DataTableRowData,
  Typography,
} from "@okta/odyssey-react-mui";
import { DataView } from "@okta/odyssey-react-mui/labs";

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
      borderColor: "#d7d7dc",
      borderRadius: `${token.name.includes("BorderRadius") ? token.value : ""}`,
      borderStyle: token.name.includes("BorderStyle")
        ? (token.value as string)
        : "solid",
      borderWidth: token.name.includes("BorderWidth") ? token.value : "1px",
      display: "inline-block",
      height: "1.25em",
      verticalAlign: "middle",
      width: "1.25em",
    }}
  ></span>
);

const renderOutline = (token: TokenDataItem) => (
  <span
    style={{
      display: "inline-block",
      height: "1.25em",
      outlineColor: "#d7d7dc",
      outlineStyle: token.name.includes("OutlineStyle")
        ? (token.value as string)
        : "solid",
      outlineWidth: token.name.includes("OutlineWidth") ? token.value : "1px",
      verticalAlign: "middle",
      width: "1.25em",
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

const renderAlpha = (value: TokenValue) => (
  <span
    style={{
      width: "1em",
      height: "1em",
      display: "inline-block",
      backgroundColor: `#000000${value}`,
      borderStyle: "solid",
      borderColor: "#000000",
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

const renderFont = ({ name, value }: TokenDataItem) => (
  <span
    style={{
      backgroundColor: `${name.includes("LineHeight") ? "#ebebed" : ""}`,
      display: `${name.includes("LineHeight") ? "inline-block" : ""}`,
      fontFamily: `${name.includes("TypographyFamily") ? value : ""}`,
      fontSize: `${name.includes("TypographySize") ? value : ""}`,
      fontWeight: `${name.includes("TypographyWeight") ? value : ""}`,
      lineHeight: `${name.includes("LineHeight") ? value : ""}`,
      maxWidth: `${name.includes("LineLength") ? value : ""}`,
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

const renderTransition = ({ name, value }: TokenDataItem) => {
  const defaultTransitionStyles = useMemo<CSSProperties>(
    () => ({
      background: "black",
      display: "inline-block",
      height: "1.5em",
      opacity: 1,
      transitionDuration: `${name.includes("Duration") ? value : "500ms"}`,
      transitionProperty: "all",
      transitionTimingFunction: `${
        name.includes("Timing") ? value : "ease-in-out"
      }`,
      width: "1.5em",
    }),
    [name, value],
  );

  const [styles, setStyles] = useState(defaultTransitionStyles);

  const onMouseEnter = useCallback(() => {
    setStyles((previousStyles) => ({
      ...previousStyles,
      opacity: 0.1,
    }));
  }, []);

  const onMouseLeave = useCallback(() => {
    setStyles((previousStyles) => ({
      ...previousStyles,
      opacity: defaultTransitionStyles.opacity,
    }));
  }, [defaultTransitionStyles]);

  return (
    <span
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={styles}
    ></span>
  );
};

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

const columns: DataTableColumn<DataTableRowData>[] = [
  {
    accessorKey: "name",
    Cell: ({ cell }) => <Typography>{cell.getValue<TokenValue>()}</Typography>,
    header: "Token Name",
  },
  {
    accessorKey: "example",
    Cell: ({ cell }) => {
      const name = cell.row.getValue<TokenName>("name");
      const value = Tokens[name] as TokenValue;

      if (name.includes("PaletteAlpha")) {
        return renderAlpha(value);
      }

      if (name.includes("TypographyColor")) {
        return renderColorText(value);
      }

      if (
        name.includes("Color") ||
        name.includes("Hue") ||
        name.includes("Palette")
      ) {
        return renderColor(value);
      }

      if (name.includes("Border")) {
        return renderBorder({
          name,
          value,
        });
      }

      if (name.includes("Outline")) {
        return renderOutline({
          name,
          value,
        });
      }

      if (name.includes("Spacing")) {
        return renderSpace(value);
      }

      if (name.includes("Typography")) {
        return renderFont({
          name,
          value,
        });
      }

      if (name.includes("Focus")) {
        return renderFocus(value);
      }

      if (name.includes("Shadow")) {
        return renderShadow(value);
      }

      if (name.includes("Transition")) {
        return renderTransition({
          name,
          value,
        });
      }

      return null;
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

const availableLayouts = ["table" as const];
const tableLayoutOptions = {
  columns,
  hasSorting: false,
};

export const TokenTables = (): ReactNode =>
  tokenTables.map(({ name, values }) => {
    const getData = useCallback(() => values, [values]);

    return (
      <DataView
        availableLayouts={availableLayouts}
        getData={getData}
        key={name}
        tableLayoutOptions={tableLayoutOptions}
      />
    );
  });
