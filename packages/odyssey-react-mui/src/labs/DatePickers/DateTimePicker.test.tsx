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

import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { DateTimePicker } from "./DateTimePicker";
import { OdysseyProvider } from "../../OdysseyProvider";
// import {
//   data,
//   columns,
// } from "../../../../odyssey-storybook/src/components/odyssey-labs/DataView/personData";
// import { filterData } from "../../../../odyssey-storybook/src/components/odyssey-labs/DataView/dataFunctions";

// const getData = ({ ...props }) => {
//   return filterData({ data, ...props });
// };

jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: jest.fn((str) => str),
      i18n: {
        language: "en",
      },
    };
  },
  initReactI18next: {
    type: "3rdParty",
    init: () => {},
  },
}));

describe("DateTimePicker", () => {
  it("displays the DateTimePicker", async () => {
    render(
      <DateTimePicker label="date time picker label" />
    )

     const input = await screen.getByLabelText("date time picker label");
     expect(input).toBeInTheDocument();
  })
})

//   // TODO: Figure out why this test broke when switching to happy-dom.
//   it.skip("displays the expected number of rows on load more", async () => {
//     render(
//       <DataView
//         availableLayouts={["table"]}
//         getData={getData}
//         tableLayoutOptions={{
//           columns: columns,
//         }}
//         hasSearch
//         hasPagination
//         // virtualization has to be false for the tests to work properly
//         enableVirtualization={false}
//         paginationType="loadMore"
//         resultsPerPage={20}
//       />,
//     );

//     const tableElement = await screen.findByRole("table", { name: "" });
//     const rowElements = within(tableElement).getAllByRole("row", {
//       hidden: false,
//     });
//     expect(rowElements.length).toBe(21);

//     waitFor(() => {
//       fireEvent.click(screen.getByText("Show more"));

//       const loadedRows = within(tableElement).getAllByRole("row", {
//         hidden: false,
//       });
//       expect(loadedRows.length).toBe(41);
//     });
//   });

//   // TODO: Figure out why this test broke when switching to happy-dom.
//   it.skip("resets the rows when searching", async () => {
//     render(
//       <DataView
//         availableLayouts={["table"]}
//         getData={getData}
//         tableLayoutOptions={{
//           columns: columns,
//         }}
//         hasSearch
//         hasPagination
//         // virtualization has to be false for the tests to work properly
//         enableVirtualization={false}
//         paginationType="loadMore"
//         resultsPerPage={20}
//       />,
//     );

//     const tableElement = await screen.findByRole("table", { name: "" });
//     const rowElements = within(tableElement).getAllByRole("row", {
//       hidden: false,
//     });
//     expect(rowElements.length).toBe(21);

//     fireEvent.click(screen.getByText("Show more"));

//     waitFor(() => {
//       const loadedRows = within(tableElement).getAllByRole("row", {
//         hidden: false,
//       });
//       expect(loadedRows.length).toBe(41);
//     });

//     const searchField = screen.getByPlaceholderText("Search");
//     fireEvent.change(searchField, { target: { value: "John" } });

//     waitFor(() => {
//       const rowsAfterFilter = within(tableElement).getAllByRole("row", {
//         hidden: false,
//       });
//       expect(rowsAfterFilter.length).toBeLessThanOrEqual(21);
//     });
//   });

//   it("fires onPaginationChange when pagination changes", async () => {
//     let currentPage = 1;
//     const onPaginationChange = (pagination: {
//       pageIndex: number;
//       pageSize: number;
//     }) => {
//       currentPage = pagination.pageIndex;
//     };

//     render(
//       <>
//         <DataView
//           getData={getData}
//           hasPagination
//           onPaginationChange={onPaginationChange}
//         />
//       </>,
//     );

//     const nextButton = screen.getByLabelText("Next page");
//     fireEvent.click(nextButton);

//     await waitFor(() => {
//       expect(currentPage).toBe(2);
//     });
//   });
// });
