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

import { render, screen } from "@testing-library/react";
import Table from ".";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";
import TableRow from "./TableRow";
import TableHeaderCell from "./TableHeaderCell";

const caption = "test table";
const tableTitle = "test table";

describe("Table", () => {
  it("renders the table", () => {
    render(
      <Table caption={caption} title={tableTitle}>
        <TableHeader />
        <TableBody />
        <TableFooter />
      </Table>
    );

    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("renders the caption prop in the caption element", () => {
    render(<Table caption={caption} title={tableTitle} />);

    expect(screen.getByRole("table", { name: caption })).toBeVisible();
  });

  it("conditionally uses a container", () => {
    render(<Table caption={caption} withContainer={false} />);
    expect(
      screen.getByRole("table").parentElement?.classList.contains("figure")
    ).toBe(false);
  });
});

const title = "test title";

describe("Table Container", () => {
  it("renders the container", () => {
    render(<Table.Container title={title} />);
    expect(screen.getByRole("figure")).toBeInTheDocument();
  });

  it("renders the title", () => {
    render(<Table.Container title={title} />);
    expect(screen.getByText(title).tagName.toLowerCase()).toEqual("figcaption");
  });
});

describe("Table Data Cell", () => {
  it("renders the cell", () => {
    render(
      <Table caption={caption} title={tableTitle}>
        <Table.Body>
          <Table.Row>
            <Table.DataCell>data</Table.DataCell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
    expect(screen.getByText("data")).toBeInTheDocument();
  });

  it("adds the proper class for format prop", () => {
    render(
      <Table caption={caption} title={tableTitle}>
        <Table.Body>
          <Table.Row>
            <Table.DataCell format="num">1</Table.DataCell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
    expect(screen.getByText("1").classList.contains("numFormat")).toBe(true);
  });
});

describe("Table Header Cell", () => {
  it("renders the cell", () => {
    render(
      <Table caption={caption} title={tableTitle}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>heading</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );
    expect(screen.getByText("heading")).toBeInTheDocument();
  });

  it("adds the proper class for format prop", () => {
    render(
      <Table caption={caption} title={tableTitle}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell format="num">number</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );
    expect(screen.getByText("number").classList.contains("numFormat")).toBe(
      true
    );
  });
});

describe("Table Sort Button", () => {
  it("renders the button", () => {
    render(<Table.SortButton direction="unsorted" />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("uses direction prop to display an icon", () => {
    render(<Table.SortButton direction="asc" />);
    const sortIcon = screen.getByTitle("Ascending").parentElement;
    expect(sortIcon).toBeVisible();
  });
});

a11yCheck(() =>
  render(
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
  )
);
