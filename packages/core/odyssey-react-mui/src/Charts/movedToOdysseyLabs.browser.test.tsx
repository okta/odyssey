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
import { page } from "vitest/browser";

import { BarChart, LineChart } from "./movedToOdysseyLabs.js";

describe("movedToOdysseyLabs", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("BarChart import from core", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    await renderWithOdysseyProvider(
      <div data-testid="chart-slot">
        <BarChart />
      </div>,
    );

    await expect.element(page.getByTestId("chart-slot")).toBeEmptyDOMElement();
    expect(consoleError).toHaveBeenCalledWith(
      'BarChart moved to @okta/odyssey-labs. Import it from "@okta/odyssey-labs" instead of "@okta/odyssey-react-mui/charts", which renders nothing.',
    );
  });

  test("LineChart import from core", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    await renderWithOdysseyProvider(
      <div data-testid="chart-slot">
        <LineChart />
      </div>,
    );

    await expect.element(page.getByTestId("chart-slot")).toBeEmptyDOMElement();
    expect(consoleError).toHaveBeenCalledWith(
      'LineChart moved to @okta/odyssey-labs. Import it from "@okta/odyssey-labs" instead of "@okta/odyssey-react-mui/charts", which renders nothing.',
    );
  });
});
