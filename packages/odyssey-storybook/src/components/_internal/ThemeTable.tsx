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
import React from "react";
import type { Theme, ThemeReducer } from "@okta/odyssey-react-theme";
import { tokens } from "@okta/odyssey-react-theme/dist/ThemeProvider/context";
import type { ThemeKey } from "@okta/odyssey-react-theme/dist/ThemeProvider/context";
import { Table, Text } from "@okta/odyssey-react";
/* eslint-enable import/no-extraneous-dependencies */
import type { ReactNode } from "react";

type ThemeTableProps = {
  componentThemeReducer: ThemeReducer;
};

const ThemeTable = ({ componentThemeReducer }: ThemeTableProps): ReactNode => {
  const remappedTokens: { [key: string]: string } = {};
  for (const [k] of Object.entries(tokens)) {
    remappedTokens[k] = k;
  }
  const componentVariables = componentThemeReducer(
    remappedTokens as unknown as Theme
  );

  function getTokenValue(tokenName: string | number): string | number | null {
    let tokenValue = null;
    let p: ThemeKey;
    for (p in tokens) {
      if (p === tokenName) {
        tokenValue = tokens[p];
      }
    }
    return tokenValue;
  }

  return (
    <Table caption="Theme Variables" screenReaderCaption="Themeing variables">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell scope="col">Variable Name</Table.HeaderCell>
          <Table.HeaderCell scope="col">Token Value</Table.HeaderCell>
          <Table.HeaderCell scope="col" format={"num"}></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Object.keys(componentVariables).map((variable) => (
          <Table.Row key={`${variable}-row`}>
            <Table.DataCell>
              <Text as="code">{variable}</Text>
            </Table.DataCell>
            <Table.DataCell>
              <Text as="code">{componentVariables[variable]}</Text>
            </Table.DataCell>
            <Table.DataCell format={"num"}>
              <Text as="code" color="sub" fontSize="caption">
                {getTokenValue(componentVariables[variable])
                  ? `(${getTokenValue(componentVariables[variable])})`
                  : ""}
              </Text>
            </Table.DataCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export { ThemeTable };
