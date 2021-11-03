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
import type { Story } from "@storybook/react";
import type { ReactElement } from "react";
import { Table, TableProps } from "@okta/odyssey-react";
import { Table as Source } from "../../../../odyssey-react/src";

import TableMdx from "./Table.mdx";

export default {
  title: `Components/Table`,
  component: Source,
  parameters: {
    docs: {
      page: TableMdx,
    },
  },
  args: {
    title: "Big and small planets",
    caption: "Information about the largest and smallest planets.",
  },
  argTypes: {
    title: { control: "text" },
    caption: { control: "text" },
  },
};

const Template: Story = ({ title, caption, withContainer, direction }) => (
  <Table caption={caption} title={title} withContainer={withContainer}>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell scope="col">
          <Table.SortButton
            direction={direction}
            unsortedIconTitle="Unsorted"
            ascendingIconTitle="Ascending"
            descendingIconTitle="Descending"
            screenReaderCallToAction="click to sort"
          >
            Planet
          </Table.SortButton>
        </Table.HeaderCell>
        <Table.HeaderCell scope="col" format={"num"}>
          Radius (km)
        </Table.HeaderCell>
        <Table.HeaderCell scope="col">Type</Table.HeaderCell>
        <Table.HeaderCell scope="col" format={"date"}>
          Perihelion date
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.DataCell>Jupiter</Table.DataCell>
        <Table.DataCell format={"num"}>69,911</Table.DataCell>
        <Table.DataCell>Gas giant</Table.DataCell>
        <Table.DataCell format={"date"}>January 21, 2023</Table.DataCell>
      </Table.Row>
      <Table.Row>
        <Table.DataCell>Earth</Table.DataCell>
        <Table.DataCell format={"num"}>6,371</Table.DataCell>
        <Table.DataCell>Terrestrial</Table.DataCell>
        <Table.DataCell format={"date"}>January 2, 2021</Table.DataCell>
      </Table.Row>
      <Table.Row>
        <Table.DataCell>Mercury</Table.DataCell>
        <Table.DataCell format={"num"}>1,737</Table.DataCell>
        <Table.DataCell>Terrestrial</Table.DataCell>
        <Table.DataCell format={"date"}>&ndash;</Table.DataCell>
      </Table.Row>
    </Table.Body>
  </Table>
);

export const Default = Template.bind({});

(Default.args = {
  direction: "unsorted",
  withContainer: true,
}),
  (Default.argTypes = {
    direction: {
      control: { type: "select" },
      options: ["asc", "desc", "unsorted"],
    },
    withContainer: { control: { type: "boolean" } },
  });

export const RowGrouping = (args: TableProps): ReactElement => (
  <Table {...args}>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell scope="col">Type</Table.HeaderCell>
        <Table.HeaderCell scope="col">Planet</Table.HeaderCell>
        <Table.HeaderCell scope="col" format="num">
          Radius (km)
        </Table.HeaderCell>
        <Table.HeaderCell scope="col">Descriptor</Table.HeaderCell>
        <Table.HeaderCell scope="col" format="date">
          Perihelion date
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.HeaderCell scope="row" rowSpan={2}>
          Gas giants
        </Table.HeaderCell>
        <Table.DataCell>Jupiter</Table.DataCell>
        <Table.DataCell format="num">69,991</Table.DataCell>
        <Table.DataCell>Jovian</Table.DataCell>
        <Table.DataCell format="date">January 21, 2023</Table.DataCell>
      </Table.Row>
      <Table.Row>
        <Table.DataCell>Saturn</Table.DataCell>
        <Table.DataCell format="num">58,232</Table.DataCell>
        <Table.DataCell>Saturnian</Table.DataCell>
        <Table.DataCell format="date">November 29, 2032</Table.DataCell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell scope="row" rowSpan={3}>
          Terrestrial
        </Table.HeaderCell>
        <Table.DataCell>Earth</Table.DataCell>
        <Table.DataCell format="num">6,371</Table.DataCell>
        <Table.DataCell>Terran</Table.DataCell>
        <Table.DataCell format="date">January 2, 2021</Table.DataCell>
      </Table.Row>
      <Table.Row>
        <Table.DataCell>Venus</Table.DataCell>
        <Table.DataCell format="num">6,052</Table.DataCell>
        <Table.DataCell>Venusian</Table.DataCell>
        <Table.DataCell format="date">&ndash;</Table.DataCell>
      </Table.Row>
      <Table.Row>
        <Table.DataCell>Mars</Table.DataCell>
        <Table.DataCell format="num">3,389</Table.DataCell>
        <Table.DataCell>Martian</Table.DataCell>
        <Table.DataCell format="date">August 3, 2020</Table.DataCell>
      </Table.Row>
    </Table.Body>
  </Table>
);

export const EmptyTable = (args: TableProps): ReactElement => (
  <Table {...args}>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell scope="col">Planet</Table.HeaderCell>
        <Table.HeaderCell scope="col" format="num">
          Radius (km)
        </Table.HeaderCell>
        <Table.HeaderCell scope="col">Type</Table.HeaderCell>
        <Table.HeaderCell scope="col" format="date">
          Perihelion date
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Footer>
      <Table.Row>
        <Table.DataCell colSpan={4} empty={true}>
          Aw beans. This set of filters didn't return any results.
        </Table.DataCell>
      </Table.Row>
    </Table.Footer>
  </Table>
);
