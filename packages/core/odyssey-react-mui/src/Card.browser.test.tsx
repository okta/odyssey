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

import { Button } from "./Buttons/Button.js";
import { MenuItem } from "./Buttons/MenuItem.js";
import { Card } from "./Card.js";

describe(Card.displayName!, () => {
  test("tile with all content slots", async () => {
    const { container } = await renderWithOdysseyProvider(
      <Card
        accessory={<span>Accessory</span>}
        button={<Button label="Open" variant="secondary" />}
        description="Card description"
        detailPanel={<div>Detail panel</div>}
        image={<img alt="Preview" height="64" src="" width="64" />}
        menuButtonChildren={<MenuItem>Edit</MenuItem>}
        overline="Overline"
        title="Card title"
      >
        <div>Card body</div>
      </Card>,
    );

    await expect(container).toBeAccessible();

    await userEvent.click(page.getByRole("button", { name: "More actions" }));
    await expect
      .element(page.getByRole("menuitem", { name: "Edit" }))
      .toBeVisible();
  });

  test("clickable card", async () => {
    const onClick = vi.fn();
    const { container } = await renderWithOdysseyProvider(
      <Card onClick={onClick} title="Clickable title" />,
    );

    await expect(container).toBeAccessible();
    await userEvent.click(
      page.getByRole("button", { name: "Clickable title" }),
    );
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("loading state replaces content with placeholders", async () => {
    await renderWithOdysseyProvider(
      <Card
        accessory={<span>Accessory</span>}
        button={<Button label="Open" variant="secondary" />}
        description="Card description"
        image={<img alt="Preview" height="64" src="" width="64" />}
        isLoading
        menuButtonChildren={<MenuItem>Edit</MenuItem>}
        overline="Overline"
        title="Card title"
        variant="tile"
      >
        <div>Card body</div>
      </Card>,
    );

    await expect.element(page.getByText("Card title")).not.toBeInTheDocument();
    await expect.element(page.getByText("Accessory")).not.toBeInTheDocument();
    await expect.element(page.getByRole("button")).not.toBeInTheDocument();
  });
});
