/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
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
import { createRef } from "react";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import type { FocusHandle } from "./inputUtils.js";

import {
  Heading1,
  Heading2,
  Heading3,
  Heading6,
  Typography,
} from "./Typography.js";

describe("Typography", () => {
  test("renders Overline", async () => {
    const { container } = await renderWithOdysseyProvider(
      <Typography ariaLabel="overline" variant="overline">
        Overline test
      </Typography>,
    );

    await expect(container).toBeAccessible();

    await expect.element(page.getByLabelText("overline")).toBeVisible();
  });

  test("renders with role", async () => {
    await render(
      <Typography ariaLabel="heading" isPresentational variant="h1">
        Heading test
      </Typography>,
    );

    const element = page.getByLabelText("heading");
    await expect.element(element).toBeVisible();
    await expect.element(element).toHaveAttribute("role", "presentation");
  });

  test("does not render role attribute when undefined", async () => {
    await render(
      <Typography ariaLabel="heading" variant="h1">
        Heading test
      </Typography>,
    );

    const element = page.getByLabelText("heading");
    await expect.element(element).toBeVisible();
    await expect.element(element).not.toHaveAttribute("role");
  });

  describe("Heading1", () => {
    test("renders correctly with isPresentional prop", async () => {
      await render(
        <Heading1 ariaLabel="heading" isPresentational variant="h1">
          Heading test
        </Heading1>,
      );

      const element = page.getByLabelText("heading");
      await expect.element(element).toBeVisible();
      await expect.element(element).toHaveAttribute("role", "presentation");
    });

    test("renders correctly with isPresentional prop", async () => {
      await render(
        <Heading1 ariaLabel="heading" variant="h1">
          Heading test
        </Heading1>,
      );

      const element = page.getByLabelText("heading");
      await expect.element(element).toBeVisible();
      await expect.element(element).not.toHaveAttribute("role");
    });
  });

  describe("typography components", () => {
    test("each heading level", async () => {
      await render(
        <>
          <Heading2>Heading two</Heading2>
          <Heading3>Heading three</Heading3>
          <Heading6>Heading six</Heading6>
        </>,
      );

      await expect
        .element(page.getByRole("heading", { name: "Heading two", level: 2 }))
        .toBeVisible();
      await expect
        .element(page.getByRole("heading", { name: "Heading three", level: 3 }))
        .toBeVisible();
      await expect
        .element(page.getByRole("heading", { name: "Heading six", level: 6 }))
        .toBeVisible();
    });

    test("focus handle", async () => {
      const typographyRef = createRef<FocusHandle>();
      await render(
        <Typography typographyRef={typographyRef}>Focus me</Typography>,
      );

      typographyRef.current?.focus();

      await expect.element(page.getByText("Focus me")).toHaveFocus();
    });
  });
});
