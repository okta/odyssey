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

import type { Story } from "@storybook/react";
import React from "react";
import Table from ".";

export default {
  title: `Components/Table`,
  component: Table,
  args: {
    title: 'Big and small planets',
    caption: 'Information about the largest and smallest planets.',
    direction: 'unsorted',
  },
  argTypes: {
    title: { control: 'text' },
    caption: { control: 'text' },
    direction: {control: { type: "select", options: ['asc', 'desc', 'unsorted'] }}
  }
};

const Template: Story = ({title, caption, direction}) => (
  <Table 
    caption={caption}
    title={title}
  >
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell scope="col">
          <Table.SortButton direction={direction}>
            Planet
          </Table.SortButton>
        </Table.HeaderCell>
        <Table.HeaderCell scope="col" className="is-ods-table-num">Radius (km)</Table.HeaderCell>
        <Table.HeaderCell scope="col">Type</Table.HeaderCell>
        <Table.HeaderCell scope="col" className="is-ods-table-date">Perihelion date</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.DataCell>Jupiter</Table.DataCell>
        <Table.DataCell className="is-ods-table-num">69,911</Table.DataCell>
        <Table.DataCell>Gas giant</Table.DataCell>
        <Table.DataCell className="is-ods-table-date">January 21, 2023</Table.DataCell>
      </Table.Row>
      <Table.Row>
        <Table.DataCell>Earth</Table.DataCell>
        <Table.DataCell className="is-ods-table-num">6,371</Table.DataCell>
        <Table.DataCell>Terrestrial</Table.DataCell>
        <Table.DataCell className="is-ods-table-date">January 2, 2021</Table.DataCell>
      </Table.Row>
      <Table.Row>
        <Table.DataCell>Mercury</Table.DataCell>
        <Table.DataCell className="is-ods-table-num">1,737</Table.DataCell>
        <Table.DataCell>Terrestrial</Table.DataCell>
        <Table.DataCell className="is-ods-table-date">&ndash;</Table.DataCell>
      </Table.Row>
    </Table.Body>
  </Table>
)

export const Default = Template.bind({});

