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

import { render, screen } from "@testing-library/react";
import { describe, test } from "vitest";

import { Button } from "../Buttons/Button.js";
import { OdysseyProvider } from "../OdysseyProvider.js";
import { DataFilters } from "./DataFilters.js";

describe("DataFilters", () => {
  test("renders searchbox only", () => {
    render(
      <OdysseyProvider>
        <DataFilters onChangeSearch={vi.fn()} />
      </OdysseyProvider>,
    );

    expect(screen.getByRole("searchbox")).toBeVisible();
    expect(
      screen.queryByRole("button", { name: "Search" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Filters")).not.toBeInTheDocument();
  });

  test("renders filters only", () => {
    render(
      <OdysseyProvider>
        <DataFilters
          filters={[
            {
              id: "text-filter",
              label: "Text filter",
              variant: "text",
            },
          ]}
          onChangeFilters={vi.fn()}
        />
      </OdysseyProvider>,
    );
    expect(screen.getByLabelText("Filters")).toBeVisible();
    expect(screen.queryByRole("searchbox")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Search" }),
    ).not.toBeInTheDocument();
  });

  test("renders all options", () => {
    render(
      <OdysseyProvider>
        <DataFilters
          additionalActions={
            <Button label="Another button" variant="secondary" />
          }
          filters={[
            {
              id: "text-filter",
              label: "Text filter",
              variant: "text",
            },
          ]}
          hasSearchSubmitButton
          onChangeFilters={vi.fn()}
          onChangeSearch={vi.fn()}
        />
      </OdysseyProvider>,
    );

    expect(screen.getByRole("searchbox")).toBeVisible();
    expect(screen.getByRole("button", { name: "Search" })).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Another button" }),
    ).toBeVisible();
    expect(screen.getByLabelText("Filters")).toBeVisible();
  });

  test("renders disabled state", () => {
    render(
      <OdysseyProvider>
        <DataFilters
          filters={[
            {
              id: "text-filter",
              label: "Text filter",
              variant: "text",
            },
          ]}
          hasSearchSubmitButton
          isDisabled
          onChangeFilters={vi.fn()}
          onChangeSearch={vi.fn()}
        />
      </OdysseyProvider>,
    );

    expect(screen.getByRole("searchbox")).toBeDisabled();
    expect(screen.getByRole("button", { name: "Search" })).toBeDisabled();
    expect(screen.getByLabelText("Filters")).toBeDisabled();
  });
});
