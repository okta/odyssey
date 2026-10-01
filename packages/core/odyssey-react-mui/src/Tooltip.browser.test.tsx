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

import { memo } from "react";
import { page, userEvent } from "vitest/browser";

// useMuiProps comes through the __internal barrel, not MuiPropsContext.js, so
// this test fails if that re-export is dropped. Out-of-package callers have no
// other way in, and nothing else covers the barrel's contents.
import { useMuiProps } from "./__internal.js";
import { Button } from "./Buttons/Button.js";
import { createOdysseyStyledComponent } from "./createOdysseyStyledComponent.js";
import { renderWithOdysseyProvider } from "./test-utils/renderWithOdysseyProvider.js";
import { Tooltip } from "./Tooltip.js";

const StyledTrigger = createOdysseyStyledComponent({ tag: "button" })(
  ({ odysseyDesignTokens }) => ({
    padding: odysseyDesignTokens.Spacing2,
  }),
);

// Stands in for a trigger defined outside odyssey-react-mui, which reaches the
// injected hover/focus props and ref through useMuiProps rather than receiving
// them as cloned props.
const CustomTrigger = memo(() => {
  const muiProps = useMuiProps();

  return (
    <StyledTrigger type="button" {...muiProps}>
      Custom trigger
    </StyledTrigger>
  );
});
CustomTrigger.displayName = "CustomTrigger";

describe(Tooltip.displayName!, () => {
  test("description tooltip on button hover", async () => {
    const { container } = await renderWithOdysseyProvider(
      <Tooltip ariaType="description" placement="top" text="Tooltip text">
        <Button label="Button label" variant="primary" />
      </Tooltip>,
    );
    await expect(container).toBeAccessible();

    const button = page.getByText("Button label");
    await userEvent.tab();
    await userEvent.hover(button);
    await expect.element(page.getByRole("tooltip")).toBeAccessible();
  });

  test("label tooltip on icon button hover", async () => {
    await renderWithOdysseyProvider(
      <Tooltip ariaType="label" placement="top" text="Icon button label">
        <Button ariaLabel="Icon button label" label="" variant="secondary" />
      </Tooltip>,
    );

    const button = page.getByRole("button");
    await userEvent.hover(button);
    await expect.element(page.getByRole("tooltip")).toBeAccessible();
  });

  test("description tooltip on a useMuiProps trigger hover", async () => {
    const { container } = await renderWithOdysseyProvider(
      <Tooltip
        ariaType="description"
        placement="top"
        text="Custom tooltip text"
      >
        <CustomTrigger />
      </Tooltip>,
    );
    await expect(container).toBeAccessible();

    await userEvent.hover(page.getByRole("button", { name: "Custom trigger" }));

    await expect.element(page.getByRole("tooltip")).toBeAccessible();
    await expect.element(page.getByText("Custom tooltip text")).toBeVisible();
  });
});
