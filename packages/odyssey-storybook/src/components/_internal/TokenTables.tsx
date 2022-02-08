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

/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from "react";
import * as Tokens from "@okta/odyssey-design-tokens";
import { Table, Text } from "@okta/odyssey-react";
/* eslint-enable import/no-extraneous-dependencies */
import type { ReactNode } from "react";

type FontWeight = 400 | 600;

type Token = {
  name: string;
  value: string | number;
};

type TableData = {
  name: string;
  values: Array<Token>;
};

type TokenName = keyof typeof Tokens;

const TokenTables = (): ReactNode => {
  const [tables, setTables] = useState<Array<TableData>>([]);

  useEffect(() => {
    const tokenKeys = Object.keys(Tokens);
    const tempTables: Array<TableData> = [];
    let currentType: string;
    let currentValues: Array<Token>;
    tokenKeys.forEach((tokenName) => {
      const parts = tokenName.match(/[A-Z][a-z]+/g);
      if (!parts) return;

      let tokenType = parts[0];
      if (parts[0] === "Color") {
        tokenType = `${parts[1]} ${parts[0]}s`;
      }

      if (tokenType !== currentType) {
        currentValues = [];
        tempTables.push({ name: tokenType, values: currentValues });
        currentType = tokenType;
      }

      currentValues.push({
        name: tokenName,
        value: Tokens[tokenName as TokenName],
      });
    });

    tempTables
      .find((table) => table.name === "Palette Colors")
      ?.values.sort((a: Token, b: Token) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });

    setTables(tempTables);
  }, [setTables]);

  const renderBorder = (token: Token) => (
    <span
      style={{
        width: "1.25em",
        height: "1.25em",
        borderWidth: token.name.includes("BorderWidth") ? token.value : "1px",
        borderStyle: token.name.includes("BorderStyle")
          ? (token.value as string)
          : "solid",
        borderColor: "#d7d7dc",
        borderRadius: `${
          token.name.includes("BorderRadius") ? token.value : ""
        }`,
        display: "inline-block",
        verticalAlign: "middle",
      }}
    ></span>
  );

  const renderColor = (val: string | number) => (
    <span
      style={{
        width: "1em",
        height: "1em",
        display: "inline-block",
        backgroundColor: `${val}`,
        borderStyle: "solid",
        borderColor: `${val === "#ffffff" ? "#d7d7dc" : "transparent"}`,
        borderRadius: "4px",
        verticalAlign: "middle",
      }}
    ></span>
  );

  const renderColorText = (val: string | number) => (
    <span
      style={{
        color: `${val}`,
        display: "inline-block",
        paddingInline: "4px",
        backgroundColor: `${val === "#ffffff" ? "#000" : ""}`,
      }}
    >
      Aa
    </span>
  );

  const renderSpace = (val: string | number) => (
    <span
      style={{
        width: `${val}`,
        height: `${val}`,
        display: "inline-block",
        backgroundColor: "#f88c90",
      }}
    ></span>
  );

  const renderFont = (token: Token) => (
    <span
      style={{
        fontFamily: `${token.name.includes("FontFamily") ? token.value : ""}`,
        fontSize: `${token.name.includes("FontSize") ? token.value : ""}`,
        fontWeight: `${
          token.name.includes("FontWeight") ? token.value : ""
        }` as unknown as FontWeight,
        lineHeight: `${token.name.includes("LineHeight") ? token.value : ""}`,
        backgroundColor: `${
          token.name.includes("LineHeight") ? "#ebebed" : ""
        }`,
        display: `${token.name.includes("LineHeight") ? "inline-block" : ""}`,
      }}
    >
      Waltz, bad nymph, for quick jigs vex!
    </span>
  );

  const renderFocus = (val: string | number) => (
    <span
      style={{
        width: "1.25em",
        height: "1.25em",
        display: "inline-block",
        boxShadow: `0 0 0 ${val} #a7b5ec`,
      }}
    ></span>
  );

  const renderShadow = (val: string | number) => (
    <span
      style={{
        width: "1.5em",
        height: "1.5em",
        display: "inline-block",
        boxShadow: `${val}`,
      }}
    ></span>
  );

  function getDisplayedValue(tableName: string, val: string | number) {
    if (!tableName.includes("Colors") || tableName === "Palette Colors") {
      return val;
    }
    const tokenValue = tables
      .find((table) => table.name === "Palette Colors")
      ?.values.find((value) => value.value === val) ?? { name: "" };
    return tokenValue.name;
  }

  return (
    <>
      {tables.map((table) => (
        <Table screenReaderCaption={"Design tokens"} caption={table.name}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell scope="col">Token Name</Table.HeaderCell>
              <Table.HeaderCell scope="col">Example</Table.HeaderCell>
              <Table.HeaderCell scope="col">Value</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {table.values.map((token: Token) => (
              <Table.Row>
                <Table.DataCell>
                  <Text as="code">{token.name}</Text>
                </Table.DataCell>
                <Table.DataCell>
                  {token.name.includes("Border") &&
                    !token.name.includes("ColorBorder") &&
                    renderBorder(token)}
                  {token.name.includes("Color") &&
                    !token.name.includes("ColorText") &&
                    renderColor(token.value)}
                  {token.name.includes("ColorText") &&
                    renderColorText(token.value)}
                  {token.name.includes("Space") && renderSpace(token.value)}
                  {token.name.includes("Font") && renderFont(token)}
                  {token.name.includes("Focus") &&
                    !token.name.includes("ColorFocus") &&
                    renderFocus(token.value)}
                  {token.name.includes("Shadow") && renderShadow(token.value)}
                </Table.DataCell>
                <Table.DataCell>
                  <Text as="code">
                    {getDisplayedValue(table.name, token.value)}
                  </Text>
                </Table.DataCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ))}
    </>
  );
};

export { TokenTables };
