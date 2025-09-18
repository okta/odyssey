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

import * as Tokens from "@okta/odyssey-design-tokens";
import {
  DataTableColumn,
  DataTableRowData,
  Typography,
} from "@okta/odyssey-react-mui";
import { DataView } from "@okta/odyssey-react-mui/labs";
import { CSSProperties, memo, useCallback, useMemo, useState } from "react";

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

const RenderBorder = ({ token }: { token: TokenDataItem }) => (
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

const RenderOutline = ({ token }: { token: TokenDataItem }) => (
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

const RenderColor = ({ token }: { token: TokenDataItem }) => (
  <span
    style={{
      width: "1em",
      height: "1em",
      display: "inline-block",
      backgroundColor: `${token.value}`,
      borderStyle: "solid",
      borderColor: `${token.value === "#ffffff" ? "#d7d7dc" : "transparent"}`,
      borderRadius: "4px",
      verticalAlign: "middle",
    }}
  ></span>
);

const RenderAlpha = ({ token }: { token: TokenDataItem }) => (
  <span
    style={{
      width: "1em",
      height: "1em",
      display: "inline-block",
      backgroundColor: `#000000${token.value}`,
      borderStyle: "solid",
      borderColor: "#000000",
      borderRadius: "4px",
      verticalAlign: "middle",
    }}
  ></span>
);

const RenderColorText = ({ token }: { token: TokenDataItem }) => (
  <span
    style={{
      color: `${token.value}`,
      display: "inline-block",
      paddingInline: "4px",
      backgroundColor: `${token.value === "#ffffff" ? "#000" : ""}`,
    }}
  >
    Aa
  </span>
);

const RenderSpace = ({ token }: { token: TokenDataItem }) => (
  <span
    style={{
      width: `${token.value}`,
      height: `${token.value}`,
      display: "inline-block",
      backgroundColor: "#f88c90",
    }}
  ></span>
);

const RenderFont = ({ token }: { token: TokenDataItem }) => (
  <span
    style={{
      backgroundColor: `${token.name.includes("LineHeight") ? "#ebebed" : ""}`,
      display: `${token.name.includes("LineHeight") ? "inline-block" : ""}`,
      fontFamily: `${token.name.includes("TypographyFamily") ? token.value : ""}`,
      fontSize: `${token.name.includes("TypographySize") ? token.value : ""}`,
      fontWeight: `${token.name.includes("TypographyWeight") ? token.value : ""}`,
      lineHeight: `${token.name.includes("LineHeight") ? token.value : ""}`,
      maxWidth: `${token.name.includes("LineLength") ? token.value : ""}`,
    }}
  >
    Waltz, bad nymph, for quick jigs vex!
  </span>
);

const RenderFocus = ({ token }: { token: TokenDataItem }) => (
  <span
    style={{
      width: "1.25em",
      height: "1.25em",
      display: "inline-block",
      boxShadow: `0 0 0 ${token.value} #a7b5ec`,
    }}
  ></span>
);

const RenderShadow = ({ token }: { token: TokenDataItem }) => (
  <span
    style={{
      width: "1.5em",
      height: "1.5em",
      display: "inline-block",
      boxShadow: `${token.value}`,
    }}
  ></span>
);

const RenderTransition = ({ token }: { token: TokenDataItem }) => {
  const defaultTransitionStyles = useMemo<CSSProperties>(
    () => ({
      background: "black",
      display: "inline-block",
      height: "1.5em",
      opacity: 1,
      transitionDuration: `${token.name.includes("Duration") ? token.value : "500ms"}`,
      transitionProperty: "all",
      transitionTimingFunction: `${
        token.name.includes("Timing") ? token.value : "ease-in-out"
      }`,
      width: "1.5em",
    }),
    [token],
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
      // eslint-disable-next-line import/namespace
      const value = Tokens[name] satisfies TokenValue;

      const token = useMemo<TokenDataItem>(
        () => ({
          name,
          value,
        }),
        [name, value],
      );

      if (name.includes("PaletteAlpha")) {
        return <RenderAlpha token={token} />;
      }

      if (name.includes("TypographyColor")) {
        return <RenderColorText token={token} />;
      }

      if (
        name.includes("Color") ||
        name.includes("Hue") ||
        name.includes("Palette")
      ) {
        return <RenderColor token={token} />;
      }

      if (name.includes("Border")) {
        return <RenderBorder token={token} />;
      }

      if (name.includes("Outline")) {
        return <RenderOutline token={token} />;
      }

      if (name.includes("Spacing")) {
        return <RenderSpace token={token} />;
      }

      if (name.includes("Typography")) {
        return <RenderFont token={token} />;
      }

      if (name.includes("Focus")) {
        return <RenderFocus token={token} />;
      }

      if (name.includes("Shadow")) {
        return <RenderShadow token={token} />;
      }

      if (name.includes("Transition")) {
        return <RenderTransition token={token} />;
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
      // eslint-disable-next-line import/namespace
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

const TokenTables = () => {
  const dataViewData = useMemo(
    () =>
      tokenTables.map(({ name, values }) => ({
        getData: () => values,
        name,
      })),
    [],
  );

  return dataViewData.map(({ getData, name }) => (
    <DataView
      availableLayouts={availableLayouts}
      getData={getData}
      key={name}
      tableLayoutOptions={tableLayoutOptions}
    />
  ));
};

const MemoizedTokenTables = memo(TokenTables);
MemoizedTokenTables.displayName = "TokenTables";

export { MemoizedTokenTables as TokenTables };
