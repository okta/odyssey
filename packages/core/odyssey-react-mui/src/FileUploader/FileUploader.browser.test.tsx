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

import { FileUploader } from "./FileUploader.js";

const firstFile = new File(["one"], "first.txt", { type: "text/plain" });
const secondFile = new File(["two"], "second.txt", { type: "text/plain" });

describe(FileUploader.displayName!, () => {
  test("button variant with a single file", async () => {
    const onChange = vi.fn();
    const { container } = await renderWithOdysseyProvider(
      <FileUploader
        acceptedFileTypes={[".txt", ".md"]}
        label="Upload"
        onChange={onChange}
        variant="button"
      />,
    );

    await expect(container).toBeAccessible();
    await expect
      .element(page.getByLabelText("Upload"))
      .toHaveAttribute("accept", ".txt,.md");

    await userEvent.upload(page.getByLabelText("Upload"), [firstFile]);

    expect(onChange).toHaveBeenCalledWith([firstFile]);
    await expect.element(page.getByText("first.txt")).toBeVisible();

    await userEvent.upload(page.getByLabelText("Upload"), [secondFile]);

    expect(onChange).toHaveBeenLastCalledWith([secondFile]);
    await expect.element(page.getByText("first.txt")).not.toBeInTheDocument();
    await expect.element(page.getByText("second.txt")).toBeVisible();
  });

  test("multiple files are appended and one is removed", async () => {
    const onChange = vi.fn();
    await renderWithOdysseyProvider(
      <FileUploader
        defaultValue={[firstFile]}
        label="Upload"
        onChange={onChange}
        type="multiple"
        variant="button"
      />,
    );

    await userEvent.upload(page.getByLabelText("Upload"), [secondFile]);

    expect(onChange).toHaveBeenLastCalledWith([firstFile, secondFile]);
    await expect.element(page.getByText("first.txt")).toBeVisible();
    await expect.element(page.getByText("second.txt")).toBeVisible();

    // The remove button is scaled to zero until its row is hovered or focused.
    await userEvent.hover(page.getByText("first.txt"));
    await userEvent.click(
      page.getByRole("button", { name: "Remove file" }).first(),
    );

    expect(onChange).toHaveBeenLastCalledWith([secondFile]);
    await expect.element(page.getByText("first.txt")).not.toBeInTheDocument();
  });

  test("controlled value", async () => {
    const onChange = vi.fn();
    await renderWithOdysseyProvider(
      <FileUploader
        label="Controlled upload"
        onChange={onChange}
        value={[firstFile]}
        variant="button"
      />,
    );

    await userEvent.hover(page.getByText("first.txt"));
    await userEvent.click(page.getByRole("button", { name: "Remove file" }));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith([]);
    await expect.element(page.getByText("first.txt")).toBeVisible();
  });

  test("drag and drop variant opens the file picker from its button", async () => {
    const { container } = await renderWithOdysseyProvider(
      <FileUploader label="Upload" onChange={vi.fn()} variant="dragAndDrop" />,
    );

    await expect(container).toBeAccessible();
    await expect
      .element(page.getByText("Drag and drop files here or click to add files"))
      .toBeVisible();

    const input = page.getByLabelText("Upload").element() as HTMLInputElement;
    const click = vi.spyOn(input, "click").mockImplementation(() => undefined);
    onTestFinished(() => {
      click.mockRestore();
    });

    await userEvent.click(page.getByRole("button", { name: "Add files" }));

    expect(click).toHaveBeenCalledTimes(1);
  });

  test("disabled", async () => {
    const { container } = await renderWithOdysseyProvider(
      <FileUploader
        defaultValue={[firstFile]}
        isDisabled
        label="Upload"
        onChange={vi.fn()}
        variant="dragAndDrop"
      />,
    );

    // Disabled controls are exempt from color contrast requirements, but axe still flags the dashed disabled drop zone text.
    await expect(container).toBeAccessible({
      disabledRules: ["color-contrast"],
    });
    await expect.element(page.getByLabelText("Upload")).toBeDisabled();
    await expect.element(page.getByText("first.txt")).toBeVisible();
  });
});
