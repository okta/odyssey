/*!
 * Copyright (c) 2026-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { renderWithOdysseyProvider } from "@okta/odyssey-test-tooling/browser";
import { page, userEvent } from "vitest/browser";

import { DataTableRowActions } from "./DataTableRowActions.js";

describe(DataTableRowActions.displayName!, () => {
  test.each([
    {
      disabledNames: ["Bring to front", "Bring forward"],
      position: "first",
      rowIndex: 0,
    },
    {
      disabledNames: ["Send backward", "Send to back"],
      position: "last",
      rowIndex: 2,
    },
  ])(
    "$position row cannot move past its edge",
    async ({ disabledNames, rowIndex }) => {
      await renderWithOdysseyProvider(
        <DataTableRowActions
          row={{ id: "a" }}
          rowIndex={rowIndex}
          totalRows={3}
          updateRowOrder={vi.fn()}
        />,
      );

      await userEvent.click(page.getByRole("button", { name: "More actions" }));

      await Promise.all(
        disabledNames.map((name) =>
          expect
            .element(page.getByRole("menuitem", { name }))
            .toHaveAttribute("aria-disabled", "true"),
        ),
      );
    },
  );
});
