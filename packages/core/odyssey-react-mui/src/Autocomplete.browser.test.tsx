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

import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { Autocomplete } from "./Autocomplete.js";
import { OdysseyProvider } from "./OdysseyProvider.js";

type Option = { label: string };
const options: Option[] = [
  { label: "Option 1" },
  { label: "Option 2" },
  { label: "Option 3" },
];

describe(Autocomplete.name, () => {
  test("does not crash when hasMultipleChoices changes from undefined to true", async () => {
    const { rerender } = render(
      <OdysseyProvider>
        <Autocomplete label="Test" options={options} />
      </OdysseyProvider>,
    );

    // without the key fix, MUI's internal null value causes a null.length crash here
    rerender(
      <OdysseyProvider>
        <Autocomplete hasMultipleChoices label="Test" options={options} />
      </OdysseyProvider>,
    );

    expect(await screen.findByRole("combobox")).toBeInTheDocument();
  });
});
