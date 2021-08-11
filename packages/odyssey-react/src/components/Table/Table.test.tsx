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

import { render } from "@testing-library/react";
import Table from ".";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";
import TableRow from "./TableRow";
import TableHeaderCell from "./TableHeaderCell";

const caption = 'test table';
const tableTitle = 'test table';

describe("Table", () => {
  it("renders the table", () => {
    const { getByRole } = render(
      <Table caption={caption} title={tableTitle}>
        <TableHeader />
        <TableBody />
        <TableFooter />
      </Table>
    );

    expect(getByRole('table')).toBeInTheDocument();
  });

  it('renders the caption prop in the caption element', () => {
    const { getByRole } = render(
      <Table caption={caption} title={tableTitle} />
    );

    expect(getByRole('table', { name: caption })).toBe(true);
  });

  it('conditionally uses a container', () => {
    const { getByRole } = render(
      <Table caption={caption} withContainer={false} />
    );
    expect(getByRole('table').parentElement?.classList.contains('figure')).toBe(false);
  });
});

const title="test title";

describe("Table Container", () => {
  it("renders the container", () => {
    const { getByRole } = render(
      <Table.Container title={title} />
    );
    expect(getByRole('figure')).toBeInTheDocument();
  });

  it("renders the title", () => {
    const { getByText } = render(
      <Table.Container title={title} />
    );
    expect(getByText(title).tagName.toLowerCase()).toEqual('figcaption');
  });
});

describe("Table Data Cell", () => {
  it("renders the cell", () => {
    const { getByText } = render(
      <Table caption={caption} title={tableTitle}>
        <Table.Body>
          <Table.Row>
            <Table.DataCell>data</Table.DataCell>
          </Table.Row>
        </Table.Body>
      </Table>
      
    );
    expect(getByText('data')).toBeInTheDocument();
  });

  it("adds the proper class for format prop", () => {
    const { getByText } = render(
      <Table caption={caption} title={tableTitle}>
        <Table.Body>
          <Table.Row>
            <Table.DataCell format="num">1</Table.DataCell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
    expect(getByText('1').classList.contains('num')).toBe(true);
  });
});

describe("Table Header Cell", () => {
  it("renders the cell", () => {
    const { getByText } = render(
      <Table caption={caption} title={tableTitle}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>heading</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
      
    );
    expect(getByText('heading')).toBeInTheDocument();
  });

  it("adds the proper class for format prop", () => {
    const { getByText } = render(
      <Table caption={caption} title={tableTitle}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell format="num">number</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );
    expect(getByText('number').classList.contains('num')).toBe(true);
  });
});

describe("Table Sort Button", () => {
  it("renders the button", () => {
    const { getByRole } = render(
      <Table.SortButton direction="unsorted" />
    );

    expect(getByRole('button')).toBeInTheDocument();
  });

  it("uses direction prop to set class", () => {
    const { getByRole } = render(
      <Table.SortButton direction="asc" />
    );

    expect(getByRole('button').classList.contains('asc')).toBe(true);
  });
});

a11yCheck(() => render(
  <Table.Container title={title}>
    <Table caption={caption} title={tableTitle}>
      <TableHeader>
        <TableRow>
          <TableHeaderCell></TableHeaderCell>
        </TableRow>
      </TableHeader>
      <Table.Body>
        <Table.Row>
          <Table.DataCell></Table.DataCell>
        </Table.Row>
      </Table.Body>
      <TableFooter>
        <Table.Row>
          <Table.DataCell></Table.DataCell>
        </Table.Row>
      </TableFooter>
    </Table>
  </Table.Container>
))
