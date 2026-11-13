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

import { AppTile } from "./AppTile.js";

const imageSource =
  "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAACAkQBADs=";

describe(AppTile.displayName!, () => {
  test("comfortable tile with content and an action", async () => {
    const onClick = vi.fn();
    const onActionClick = vi.fn();

    const { container } = await renderWithOdysseyProvider(
      <AppTile
        actionIcon={<svg aria-hidden="true" />}
        actionLabel="Tile actions"
        auxiliaryText="Beta"
        description="Tile description"
        image={<img alt="App logo" src={imageSource} />}
        onActionClick={onActionClick}
        onClick={onClick}
        title="Tile title"
      >
        Tile children
      </AppTile>,
    );

    await expect(container).toBeAccessible();

    await userEvent.click(page.getByRole("button", { name: "Tile actions" }));
    expect(onActionClick).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();

    await userEvent.click(page.getByText("Tile title"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("loading tile ignores clicks", async () => {
    const onClick = vi.fn();

    const { container } = await renderWithOdysseyProvider(
      <AppTile
        actionIcon={<svg aria-hidden="true" />}
        actionLabel="Tile actions"
        description="Tile description"
        image={<img alt="App logo" src={imageSource} />}
        isLoading
        onActionClick={vi.fn()}
        onClick={onClick}
        title="Tile title"
      >
        Tile children
      </AppTile>,
    );

    await expect.element(page.getByText("Tile title")).not.toBeInTheDocument();
    await expect.element(page.getByRole("button")).not.toBeInTheDocument();

    await userEvent.click(page.elementLocator(container));
    expect(onClick).not.toHaveBeenCalled();
  });
});
