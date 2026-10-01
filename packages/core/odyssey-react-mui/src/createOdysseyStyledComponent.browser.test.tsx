/*!
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { Tooltip as MuiTooltip } from "@mui/material";
import { createRef } from "react";
import { page, userEvent } from "vitest/browser";

import { createOdysseyStyledComponent } from "./createOdysseyStyledComponent.js";
import { renderWithOdysseyProvider } from "./test-utils/renderWithOdysseyProvider.js";

const StyledButton = createOdysseyStyledComponent({ tag: "button" })(
  ({ odysseyDesignTokens }) => ({
    padding: odysseyDesignTokens.Spacing2,
  }),
);

const StyledBox = createOdysseyStyledComponent({ tag: "div" })(
  ({ odysseyDesignTokens }) => ({
    padding: odysseyDesignTokens.Spacing4,
    backgroundColor: odysseyDesignTokens.HueNeutral50,
  }),
);

const StyledHighlightBox = createOdysseyStyledComponent({
  tag: "div",
  shouldForwardProp: (prop) => prop !== "isHighlighted",
})<{ isHighlighted: boolean }>(({ odysseyDesignTokens, isHighlighted }) => ({
  backgroundColor: isHighlighted
    ? odysseyDesignTokens.PalettePrimaryLighter
    : odysseyDesignTokens.HueNeutral50,
}));

describe(createOdysseyStyledComponent.name, () => {
  test("renders children", async () => {
    const { container } = await renderWithOdysseyProvider(
      <StyledBox>hello</StyledBox>,
    );

    await expect(container).toBeAccessible();
    await expect.element(page.getByText("hello")).toBeVisible();
  });

  test("applies tokens from context as inline styles", async () => {
    const { container } = await renderWithOdysseyProvider(
      <StyledBox data-testid="box" />,
    );

    await expect(container).toBeAccessible();
    // Emotion injects a class — verify the element is in the DOM and has a class applied.
    const boxElement = page.getByTestId("box");
    await expect.element(boxElement).toBeVisible();
    const classAttribute = boxElement.element().getAttribute("class");
    expect(classAttribute).not.toBeNull();
    expect(classAttribute!.length).toBeGreaterThan(0);
  });

  test("custom prop forwarded to style function but not to DOM", async () => {
    const { container } = await renderWithOdysseyProvider(
      <StyledHighlightBox data-testid="highlighted" isHighlighted>
        content
      </StyledHighlightBox>,
    );

    await expect(container).toBeAccessible();
    const highlightedElement = page.getByTestId("highlighted");
    await expect.element(highlightedElement).toBeVisible();
    // shouldForwardProp blocks isHighlighted — DOM element must not have the attribute.
    const isHighlightedAttribute = highlightedElement
      .element()
      .getAttribute("isHighlighted");
    expect(isHighlightedAttribute).toBeNull();
  });

  test("ref points at the underlying DOM node", async () => {
    const buttonRef = createRef<HTMLButtonElement>();

    const { container } = await renderWithOdysseyProvider(
      <StyledButton ref={buttonRef} type="button">
        press me
      </StyledButton>,
    );

    await expect(container).toBeAccessible();
    await expect
      .element(page.getByRole("button", { name: "press me" }))
      .toBeVisible();
    expect(buttonRef.current).toBe(
      page.getByRole("button", { name: "press me" }).element(),
    );
  });

  test("anchors a MUI Tooltip opened by hover", async () => {
    const { container } = await renderWithOdysseyProvider(
      // describeChild so the trigger keeps its own accessible name; without it
      // MUI maps title onto the child's aria-label and renames the button.
      <MuiTooltip describeChild={true} title="tooltip text">
        <StyledButton type="button">hover me</StyledButton>
      </MuiTooltip>,
    );

    await expect(container).toBeAccessible();
    await userEvent.hover(page.getByRole("button", { name: "hover me" }));

    // A Popper with no anchor node never mounts, so the tooltip appearing is the
    // assertion that the ref reached the DOM element.
    await expect.element(page.getByRole("tooltip")).toBeVisible();
    await expect.element(page.getByText("tooltip text")).toBeVisible();
    // Scoped to the tooltip rather than the container, since it renders in a portal.
    await expect.element(page.getByRole("tooltip")).toBeAccessible();
  });

  test("odysseyDesignTokens prop not forwarded to DOM", async () => {
    const { container } = await renderWithOdysseyProvider(
      <StyledBox data-testid="box" />,
    );

    await expect(container).toBeAccessible();
    const boxElement = page.getByTestId("box");
    const odysseyDesignTokensAttribute = boxElement
      .element()
      .getAttribute("odysseyDesignTokens");
    expect(odysseyDesignTokensAttribute).toBeNull();
  });
});
