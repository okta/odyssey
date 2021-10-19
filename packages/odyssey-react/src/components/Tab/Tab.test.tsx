/*!
 * Copyright (c) 2021-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { render, waitFor, fireEvent } from "@testing-library/react";
import { Tabs } from ".";

const roleTabList = "tablist";
const roleTabPanel = "tabpanel";
const ariaLabel = "Describes the tab instance to assistive technology.";
const id = "sb-tabs-example";

describe("Tabs", () => {
  it("renders into the document with the first tab/tabpanel selected", () => {
    const { getByRole, getByText } = render(
      <Tabs id={id} ariaLabel={ariaLabel}>
        <Tabs.Panel id="sb-tabs-example-1" label="Tab 1">
          TabPanel 1
        </Tabs.Panel>
        <Tabs.Panel id="sb-tabs-example-2" label="Tab 2">
          TabPanel 2
        </Tabs.Panel>
        <Tabs.Panel id="sb-tabs-example-3" label="Tab 3">
          TabPanel 3
        </Tabs.Panel>
      </Tabs>
    );

    expect(getByText("TabPanel 1")).toBeVisible();
    expect(getByText("Tab 1")).toHaveAttribute("aria-selected", "true");
    expect(getByRole(roleTabList)).toBeInTheDocument();
    expect(getByRole(roleTabPanel)).toBeInTheDocument();
  });

  it("shows the pre-selected tabpanel on mount", () => {
    const { getByText } = render(
      <Tabs id={id} selectedId="sb-tabs-example-2" ariaLabel={ariaLabel}>
        <Tabs.Panel id="sb-tabs-example-1" label="Tab 1">
          TabPanel 1
        </Tabs.Panel>
        <Tabs.Panel id="sb-tabs-example-2" label="Tab 2">
          TabPanel 2
        </Tabs.Panel>
        <Tabs.Panel id="sb-tabs-example-3" label="Tab 3">
          TabPanel 3
        </Tabs.Panel>
      </Tabs>
    );

    expect(getByText("TabPanel 2")).toBeVisible();
    expect(getByText("Tab 2")).toHaveAttribute("aria-selected", "true");
  });

  it("changes the selected tabpanel when a tab is clicked", () => {
    const { getByText } = render(
      <Tabs id={id} ariaLabel={ariaLabel}>
        <Tabs.Panel id="sb-tabs-example-1" label="Tab 1">
          TabPanel 1
        </Tabs.Panel>
        <Tabs.Panel id="sb-tabs-example-2" label="Tab 2">
          TabPanel 2
        </Tabs.Panel>
        <Tabs.Panel id="sb-tabs-example-3" label="Tab 3">
          TabPanel 3
        </Tabs.Panel>
      </Tabs>
    );

    fireEvent.click(getByText("Tab 3"));

    expect(getByText("TabPanel 3")).toBeVisible();
    expect(getByText("Tab 3")).toHaveAttribute("aria-selected", "true");
    expect(getByText("Tab 1")).toHaveAttribute("aria-selected", "false");
  });

  it("should invoke the onTabChange callback when a different tab is selected", () => {
    const handleTabChange = jest.fn();

    const { getByText } = render(
      <Tabs id={id} ariaLabel={ariaLabel} onTabChange={handleTabChange}>
        <Tabs.Panel id="sb-tabs-example-1" label="Tab 1">
          TabPanel 1
        </Tabs.Panel>
        <Tabs.Panel id="sb-tabs-example-2" label="Tab 2">
          TabPanel 2
        </Tabs.Panel>
        <Tabs.Panel id="sb-tabs-example-3" label="Tab 3">
          TabPanel 3
        </Tabs.Panel>
      </Tabs>
    );

    fireEvent.click(getByText("Tab 2"));

    expect(handleTabChange).toHaveBeenCalledTimes(1);
  });

  it("should focus the last element when the end key is pressed", async () => {
    const { getByText, getByRole } = render(
      <Tabs id={id} selectedId="sb-tabs-example-2" ariaLabel={ariaLabel}>
        <Tabs.Panel id="sb-tabs-example-1" label="Tab 1">
          TabPanel 1
        </Tabs.Panel>
        <Tabs.Panel id="sb-tabs-example-2" label="Tab 2">
          TabPanel 2
        </Tabs.Panel>
        <Tabs.Panel id="sb-tabs-example-3" label="Tab 3">
          TabPanel 3
        </Tabs.Panel>
      </Tabs>
    );

    fireEvent.keyUp(getByRole(roleTabList), { key: "Tab", code: "Tab" });
    fireEvent.keyUp(getByRole(roleTabList), { key: "End", code: "End" });

    await waitFor(() => {
      expect(getByText("Tab 3")).toHaveFocus();
    });
  });

  it("should focus the first element when the home key is pressed", async () => {
    const { getByText, getByRole } = render(
      <Tabs id={id} selectedId="sb-tabs-example-2" ariaLabel={ariaLabel}>
        <Tabs.Panel id="sb-tabs-example-1" label="Tab 1">
          TabPanel 1
        </Tabs.Panel>
        <Tabs.Panel id="sb-tabs-example-2" label="Tab 2">
          TabPanel 2
        </Tabs.Panel>
        <Tabs.Panel id="sb-tabs-example-3" label="Tab 3">
          TabPanel 3
        </Tabs.Panel>
      </Tabs>
    );

    fireEvent.keyUp(getByRole(roleTabList), { key: "Tab", code: "Tab" });
    fireEvent.keyUp(getByRole(roleTabList), { key: "Home", code: "Home" });

    await waitFor(() => {
      expect(getByText("Tab 1")).toHaveFocus();
    });
  });

  it("should focus the first element when the focus is on the last tab and the right arrow key is pressed", async () => {
    const { getByText, getByRole } = render(
      <Tabs id={id} selectedId="sb-tabs-example-2" ariaLabel={ariaLabel}>
        <Tabs.Panel id="sb-tabs-example-1" label="Tab 1">
          TabPanel 1
        </Tabs.Panel>
        <Tabs.Panel id="sb-tabs-example-2" label="Tab 2">
          TabPanel 2
        </Tabs.Panel>
        <Tabs.Panel id="sb-tabs-example-3" label="Tab 3">
          TabPanel 3
        </Tabs.Panel>
      </Tabs>
    );

    fireEvent.keyUp(getByRole(roleTabList), { key: "Tab", code: "Tab" });
    fireEvent.keyUp(getByRole(roleTabList), { key: "End", code: "End" });
    fireEvent.keyUp(getByRole(roleTabList), {
      key: "ArrowRight",
      code: "ArrowRight",
    });

    await waitFor(() => {
      expect(getByText("Tab 1")).toHaveFocus();
    });
  });

  it("should focus the last element when the focus is on the first tab and the left arrow key is pressed", async () => {
    const { getByText, getByRole } = render(
      <Tabs id={id} selectedId="sb-tabs-example-2" ariaLabel={ariaLabel}>
        <Tabs.Panel id="sb-tabs-example-1" label="Tab 1">
          TabPanel 1
        </Tabs.Panel>
        <Tabs.Panel id="sb-tabs-example-2" label="Tab 2">
          TabPanel 2
        </Tabs.Panel>
        <Tabs.Panel id="sb-tabs-example-3" label="Tab 3">
          TabPanel 3
        </Tabs.Panel>
      </Tabs>
    );

    fireEvent.keyUp(getByRole(roleTabList), { key: "Tab" });
    fireEvent.keyUp(getByRole(roleTabList), { key: "Home" });
    fireEvent.keyUp(getByRole(roleTabList), {
      key: "ArrowLeft",
      code: "ArrowLeft",
    });

    await waitFor(() => {
      expect(getByText("Tab 3")).toHaveFocus();
    });
  });

  a11yCheck(() =>
    render(
      <Tabs id={id} ariaLabel={ariaLabel}>
        <Tabs.Panel id="sb-tabs-example-1" label="Tab 1">
          TabPanel 1
        </Tabs.Panel>
        <Tabs.Panel id="sb-tabs-example-2" label="Tab 2">
          TabPanel 2
        </Tabs.Panel>
        <Tabs.Panel id="sb-tabs-example-3" label="Tab 3">
          TabPanel 3
        </Tabs.Panel>
      </Tabs>
    )
  );
});
