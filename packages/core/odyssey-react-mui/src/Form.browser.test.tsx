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

import type { FormEvent } from "react";

import { renderWithOdysseyProvider } from "@okta/odyssey-test-tooling/browser";
import { page, userEvent } from "vitest/browser";

import { Button } from "./Buttons/Button.js";
import { Form } from "./Form.js";
import { TextField } from "./TextField.js";

describe(Form.displayName!, () => {
  test("title and submit action", async () => {
    const onSubmit = vi.fn((event: FormEvent) => event.preventDefault());
    const { container } = await renderWithOdysseyProvider(
      <Form
        formActions={<Button label="Save" type="submit" variant="primary" />}
        name="profile"
        noValidate
        onSubmit={onSubmit}
        title="Profile"
      >
        <TextField label="Name" />
      </Form>,
    );

    await expect(container).toBeAccessible();
    await expect
      .element(page.getByRole("heading", { name: "Profile" }))
      .toBeVisible();

    await userEvent.click(page.getByRole("button", { name: "Save" }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  test("without title, description or actions", async () => {
    await renderWithOdysseyProvider(
      <Form name="bare" noValidate>
        <TextField label="Name" />
      </Form>,
    );

    await expect
      .element(page.getByRole("textbox", { name: "Name" }))
      .toBeVisible();
    await expect.element(page.getByRole("heading")).not.toBeInTheDocument();
    await expect.element(page.getByRole("button")).not.toBeInTheDocument();
  });
});
