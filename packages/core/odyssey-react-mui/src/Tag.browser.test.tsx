/*!
 * Copyright (c) 2025-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { createTheme } from "@mui/material/styles";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import { ReactNode } from "react";

import { OdysseyProvider } from "./OdysseyProvider.js";
import { Tag } from "./Tag.js";

// Needed to prevent act() warnings caused by MUI's ripple effect when
// mocked onRemove/onClick don't cause visual changes to await.
const noTransitionsTheme = createTheme({
  transitions: {
    create: () => "none",
  },
});

describe(Tag.displayName!, () => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <OdysseyProvider themeOverride={noTransitionsTheme}>
      {children}
    </OdysseyProvider>
  );

  test("calls onRemove when delete icon is clicked", async () => {
    const user = userEvent.setup();

    const onRemove = vi.fn();
    render(<Tag label="Label" onRemove={onRemove} />, { wrapper: Wrapper });

    const tag = screen.getByRole("button", { name: /^Label/ });
    expect(tag).toHaveAttribute("aria-keyshortcuts", "Backspace");
    expect(tag).toHaveAttribute("tabindex", "0");

    const deleteButton = await screen.findByRole("button", {
      name: "Remove tag",
    });

    await user.click(deleteButton);

    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  test("calls onClick when Tag is clicked", async () => {
    const user = userEvent.setup();

    const onClick = vi.fn();
    render(<Tag label="Label" onClick={onClick} />, { wrapper: Wrapper });

    const tag = screen.getByRole("button", { name: "Label" });
    expect(tag).not.toHaveAttribute("aria-keyshortcuts");
    expect(tag).toHaveAttribute("tabindex", "0");

    await user.click(tag);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("tag is not reachable via Tab when onClick/onRemove are not provided", () => {
    render(<Tag label="Label" />, { wrapper: Wrapper });

    expect(screen.getByText("Label").closest("div")).not.toHaveAttribute(
      "tabindex",
      "0",
    );
  });
});
