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

import type { Locator } from "vitest/browser";

import { renderWithOdysseyProvider } from "@okta/odyssey-test-tooling/browser";
import { page } from "vitest/browser";

import { getControlledElement } from "./linkedHtmlSelectors.js";
import { ElementError } from "./sanityChecks.js";

const silenceConsoleError = () => {
  const consoleError = vi
    .spyOn(console, "error")
    .mockImplementation(() => undefined);
  onTestFinished(() => {
    consoleError.mockRestore();
  });
};

const getHtmlElement = (locator: Locator) => {
  const element = locator.element();
  if (!(element instanceof HTMLElement)) {
    throw new Error("Expected the locator to match an HTML element.");
  }
  return element;
};

describe(getControlledElement.name, () => {
  test("input with a datalist", async () => {
    await renderWithOdysseyProvider(
      <>
        <input aria-label="Source" list="options" />
        <datalist id="options" />
      </>,
    );

    expect(
      getControlledElement({
        element: getHtmlElement(page.getByRole("combobox", { name: "Source" })),
      }),
    ).toBe(document.getElementById("options"));
  });

  test("aria-controls with a role filter", async () => {
    await renderWithOdysseyProvider(
      <>
        <button aria-controls="missing first-item second-item" type="button">
          Trigger
        </button>
        <div id="first-item" role="menu" />
        <div id="second-item" role="listbox" />
      </>,
    );

    const button = getHtmlElement(
      page.getByRole("button", { name: "Trigger" }),
    );

    expect(getControlledElement({ element: button, role: "listbox" })).toBe(
      document.getElementById("second-item"),
    );
    expect(getControlledElement({ element: button })).toBe(
      document.getElementById("first-item"),
    );
  });

  test("aria-owns fallback", async () => {
    await renderWithOdysseyProvider(
      <>
        <button aria-owns="owned" type="button">
          Trigger
        </button>
        <div id="owned" />
      </>,
    );

    expect(
      getControlledElement({
        element: getHtmlElement(page.getByRole("button", { name: "Trigger" })),
      }),
    ).toBe(document.getElementById("owned"));
  });

  test("collapsed popup", async () => {
    silenceConsoleError();
    await renderWithOdysseyProvider(
      <button aria-controls="popup" aria-expanded="false" type="button">
        Trigger
      </button>,
    );

    const button = getHtmlElement(
      page.getByRole("button", { name: "Trigger" }),
    );

    expect(() => getControlledElement({ element: button })).toThrow(
      new ElementError(
        "Popup isn't open in ARIA; therefore, it cannot be captured.",
        button,
      ),
    );
  });

  test("element without aria-controls or aria-owns", async () => {
    silenceConsoleError();
    await renderWithOdysseyProvider(<button type="button">Trigger</button>);

    const button = getHtmlElement(
      page.getByRole("button", { name: "Trigger" }),
    );

    expect(() => getControlledElement({ element: button })).toThrow(
      new ElementError(
        "Popup isn't linked; therefore, it cannot be captured.",
        button,
      ),
    );
  });

  test("linked id that matches no element", async () => {
    silenceConsoleError();
    await renderWithOdysseyProvider(
      <button aria-controls="nowhere" type="button">
        Trigger
      </button>,
    );

    const button = getHtmlElement(
      page.getByRole("button", { name: "Trigger" }),
    );

    expect(() => getControlledElement({ element: button })).toThrow(
      new ElementError(
        "Controlled element isn't available; therefore, it cannot be captured.",
        button,
      ),
    );
  });
});
