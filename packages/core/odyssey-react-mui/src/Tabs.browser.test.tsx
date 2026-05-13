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

import { useState } from "react";
import { page, userEvent } from "vitest/browser";

import { Button } from "./Buttons/Button.js";
import { Tabs } from "./Tabs.js";
import { renderWithOdysseyProvider } from "./test-utils/renderWithOdysseyProvider.js";

describe(Tabs.displayName!, () => {
  const tabItems = [
    {
      label: "Tab 1",
      value: "tab-1",
      children: "Tab 1 content",
    },
    {
      label: "Tab 2",
      value: "tab-2",
      children: "Tab 2 content",
    },
    {
      label: "Tab 3",
      value: "tab-3",
      children: "Tab 3 content",
    },
  ];

  test("controlled value prop switches active tab", async () => {
    const ControlledTabs = () => {
      const [value, setValue] = useState("tab-1");
      return (
        <>
          <Button
            label="Go to Tab 2"
            onClick={() => setValue("tab-2")}
            variant="secondary"
          />
          <Tabs ariaLabel="Tab group" tabs={tabItems} value={value} />
        </>
      );
    };

    const { container } = await renderWithOdysseyProvider(<ControlledTabs />);

    await expect(container).toBeAccessible();

    await userEvent.click(page.getByRole("button", { name: "Go to Tab 2" }));

    await expect.element(page.getByText("Tab 2 content")).toBeVisible();
  });

  test("multiple tabs selected sequentially", async () => {
    const { container } = await renderWithOdysseyProvider(
      <Tabs ariaLabel="Tab group" tabs={tabItems} />,
    );
    await expect(container).toBeAccessible();

    const tab2 = page.getByText("Tab 2");
    await userEvent.click(tab2);
    await userEvent.tab();
    await expect.element(page.getByText("Tab 2 content")).toBeVisible();
    await expect(container).toBeAccessible();

    const tab3 = page.getByText("Tab 3");
    await userEvent.click(tab3);
    await userEvent.tab();
    await expect.element(page.getByText("Tab 3 content")).toBeVisible();
  });
});
