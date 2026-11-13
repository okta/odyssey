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

import { Callout } from "./Callout.js";
import { Fieldset } from "./Fieldset.js";
import { TextField } from "./TextField.js";

describe(Fieldset.displayName!, () => {
  test("legend names the group", async () => {
    const { container } = await renderWithOdysseyProvider(
      <Fieldset
        alert={<Callout severity="error" text="Something failed" />}
        description="Tell us about you"
        legend="Profile"
      >
        <TextField label="Name" />
      </Fieldset>,
    );

    await expect(container).toBeAccessible();
    await expect
      .element(page.getByRole("group", { name: "Profile" }))
      .toBeVisible();
  });

  test("disabled fieldset disables its fields", async () => {
    await renderWithOdysseyProvider(
      <Fieldset isDisabled legend="Profile">
        <TextField label="Name" />
      </Fieldset>,
    );

    await expect
      .element(page.getByRole("textbox", { name: "Name" }))
      .toBeDisabled();
  });
});
