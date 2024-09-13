/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { DataView } from "./index";
import {
  data,
  columns,
} from "@okta/odyssey-storybook/src/components/odyssey-labs/DataView/personData";
import { filterData } from "@okta/odyssey-storybook/src/components/odyssey-labs/DataView/dataFunctions";

const getData = ({ ...props }) => {
  return filterData({ data, ...props });
};

const testView = (
  <DataView
    availableLayouts={["table"]}
    getData={getData}
    tableLayoutOptions={{
      columns: columns,
    }}
    hasSearch
    hasPagination
    paginationType="loadMore"
    resultsPerPage={20}
  />
);

describe("DataView", () => {
  it("displays the expected number of rows by default", async () => {
    render(testView);

    await waitFor(() => {
      const rows = screen.getAllByRole("row");
      // one more than resultsPerPage, because of the thead row
      expect(rows.length).toBe(21);
    });
  });

  it("displays the expected number of rows on load more", async () => {
    render(testView);

    await waitFor(() => {
      const rows = screen.getAllByRole("row");
      // one more than resultsPerPage, because of the thead row
      expect(rows.length).toBe(21);

      fireEvent.click(screen.getByText("Show more"));

      const loadedRows = screen.getAllByRole("row");
      expect(loadedRows.length).toBe(41);
    });
  });

  it("resets the rows when searching", async () => {
    render(testView);

    await waitFor(() => {
      const rows = screen.getAllByRole("row");
      // one more than resultsPerPage, because of the thead row
      expect(rows.length).toBe(21);

      fireEvent.click(screen.getByText("Show more"));

      const loadedRows = screen.getAllByRole("row");
      expect(loadedRows.length).toBe(41);

      const searchField = screen.getByPlaceholderText("Search");
      fireEvent.change(searchField, { target: { value: "John" } });
    });

    await waitFor(() => {
      const rowsAfterFilter = screen.getAllByRole("row");
      // At most 21 rows, since searching resets the pagination
      // Probably less than 21 rows, unless there are that many users with the search value of "John"
      expect(rowsAfterFilter.length).toBeLessThanOrEqual(21);
    });
  });
});
