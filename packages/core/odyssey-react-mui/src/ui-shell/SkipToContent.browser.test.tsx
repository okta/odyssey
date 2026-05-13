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

import { translate as odysseyTranslate } from "../i18n.generated/i18n.js";
import { appendToSandbox } from "../test-utils/appendToSandbox.js";
import { renderWithOdysseyProvider } from "../test-utils/renderWithOdysseyProvider.js";
import { SkipToContent } from "./SkipToContent.js";

const skipToMainContentLabel = odysseyTranslate("skiplinks.main");

const SkipToContentHarness = () => {
  const [appElement, setAppElement] = useState<HTMLDivElement | null>(null);

  return (
    <>
      <SkipToContent appElement={appElement} />
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <div data-testid="main-content" ref={setAppElement} tabIndex={0} />
    </>
  );
};

const SkipScenarioHarness = () => {
  const [appElement, setAppElement] = useState<HTMLDivElement | null>(null);

  return (
    <>
      <SkipToContent appElement={appElement} />
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <div data-testid="intervening" tabIndex={0} />
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <div data-testid="main-content" ref={setAppElement} tabIndex={0} />
    </>
  );
};

const ResumeScenarioHarness = () => {
  const [appElement, setAppElement] = useState<HTMLDivElement | null>(null);

  return (
    <>
      <SkipToContent appElement={appElement} />
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <div data-testid="intercepted-from" tabIndex={0} />
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <div data-testid="after-intercepted" tabIndex={0} />
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <div data-testid="main-content" ref={setAppElement} tabIndex={0} />
    </>
  );
};

const renderSkipToContent = async () => {
  const { container } = await renderWithOdysseyProvider(
    <SkipToContentHarness />,
  );

  return {
    container,
    mainContentElement: page.getByTestId("main-content").element(),
  };
};

const renderSkipScenario = async () => {
  await renderWithOdysseyProvider(<SkipScenarioHarness />);

  return {
    interveningElement: page.getByTestId("intervening").element(),
    mainContentElement: page.getByTestId("main-content").element(),
  };
};

const renderResumeScenario = async () => {
  await renderWithOdysseyProvider(<ResumeScenarioHarness />);

  return {
    afterInterceptedElement: page.getByTestId("after-intercepted").element(),
    interceptedFromElement: page.getByTestId("intercepted-from").element(),
    mainContentElement: page.getByTestId("main-content").element(),
  };
};

describe(SkipToContent.displayName!, () => {
  describe("Rendering", () => {
    test("skip to main content button rendered in the DOM and initially not visible", async () => {
      const { container } = await renderSkipToContent();

      await expect(container).toBeAccessible();

      const skipButtonLocator = page.getByRole("button", {
        name: skipToMainContentLabel,
      });

      await expect.element(skipButtonLocator).toBeInTheDocument();
      // Container uses the sr-only clip pattern when not focused — it collapses
      // to 1×1px and clips its content, visually hiding the button.
      expect(
        getComputedStyle(skipButtonLocator.element().closest("div[class]")!)
          .width,
      ).toBe("1px");
    });
  });

  describe("Keyboard Interactions", () => {
    test("`[TAB]` interceptor focuses skip button and makes it visible when external element has focus", async () => {
      await renderSkipToContent();

      // Tagged via `appendToSandbox` so the global afterEach removes it.
      const externalButton = appendToSandbox(document.createElement("button"));
      externalButton.focus();

      expect(document.activeElement).toBe(externalButton);

      await userEvent.keyboard("{Tab}");

      const skipButtonLocator = page.getByRole("button", {
        name: skipToMainContentLabel,
      });
      // :focus-within removes the sr-only clip — button should now be visible.
      await expect.element(skipButtonLocator).toBeVisible();
      expect(document.activeElement).toBe(skipButtonLocator.element());
    });

    test("`[TAB]` interceptor does not fire when body has focus", async () => {
      await renderSkipToContent();

      (document.activeElement as HTMLElement | null)?.blur();

      await userEvent.keyboard("{Tab}");

      expect(document.activeElement).not.toBe(document.body);
    });

    test("`[TAB]` interceptor fires only once per mount", async () => {
      await renderSkipToContent();

      // Tagged via `appendToSandbox` so the global afterEach removes it.
      const externalButton = appendToSandbox(document.createElement("button"));

      // First Tab from external: interceptor fires, skip button focused.
      externalButton.focus();
      await userEvent.keyboard("{Tab}");

      const skipButtonLocator = page.getByRole("button", {
        name: skipToMainContentLabel,
      });
      await expect.element(skipButtonLocator).toHaveFocus();

      // Move focus back to external element.
      externalButton.focus();

      // Second Tab from external: interceptor must NOT fire again.
      await userEvent.keyboard("{Tab}");

      // Focus moved naturally (to the next DOM element), not back to the
      // skip button via the JavaScript interceptor.
      expect(document.activeElement).not.toBe(skipButtonLocator.element());
    });
  });

  describe("Skip behavior", () => {
    test("clicking skip button bypasses intervening focusable element and focuses main content", async () => {
      const { interveningElement, mainContentElement } =
        await renderSkipScenario();

      const skipButtonLocator = page.getByRole("button", {
        name: skipToMainContentLabel,
      });
      await expect.element(skipButtonLocator).toBeInTheDocument();

      // The button is sr-only until focused — focus it to trigger :focus-within.
      skipButtonLocator.element().focus();
      await expect.element(skipButtonLocator).toBeVisible();

      // Click the button: should jump to main content, skipping the intervening
      // element that would normally be the next Tab stop.
      await userEvent.click(skipButtonLocator);

      expect(document.activeElement).toBe(mainContentElement);
      expect(document.activeElement).not.toBe(interveningElement);
    });

    test("without clicking skip button, Tab naturally focuses the intervening element first", async () => {
      const { interveningElement } = await renderSkipScenario();

      const skipButtonLocator = page.getByRole("button", {
        name: skipToMainContentLabel,
      });
      await expect.element(skipButtonLocator).toBeInTheDocument();

      // Focus the skip button, then Tab past it without clicking.
      skipButtonLocator.element().focus();
      await userEvent.keyboard("{Tab}");

      // Focus moves naturally to the intervening element (next in DOM order),
      // not to main content.
      expect(document.activeElement).toBe(interveningElement);
    });
  });

  describe("Resume from intercepted position", () => {
    test("Tab from skip button resumes Tab navigation from the intercepted position", async () => {
      const { afterInterceptedElement, interceptedFromElement } =
        await renderResumeScenario();

      const skipButtonLocator = page.getByRole("button", {
        name: skipToMainContentLabel,
      });

      // Focus the element that will be intercepted.
      interceptedFromElement.focus();

      // Tab: interceptor fires, skip button receives focus.
      await userEvent.keyboard("{Tab}");

      await expect.element(skipButtonLocator).toHaveFocus();
      await expect.element(skipButtonLocator).toBeVisible();

      // Tab from skip button: resume handler fires, restoring focus to the
      // intercepted element so the browser continues Tab from there.
      await userEvent.keyboard("{Tab}");

      expect(document.activeElement).toBe(afterInterceptedElement);
    });
  });

  describe("Focus Navigation", () => {
    test("clicking button moves focus to main content element", async () => {
      const { mainContentElement } = await renderSkipToContent();

      const skipButtonLocator = page.getByRole("button", {
        name: skipToMainContentLabel,
      });
      await expect.element(skipButtonLocator).toBeInTheDocument();

      // The button is sr-only until focused — Playwright refuses to click
      // clipped elements, so focus it first to trigger :focus-within.
      skipButtonLocator.element().focus();
      await expect.element(skipButtonLocator).toBeVisible();

      await userEvent.click(skipButtonLocator);

      expect(document.activeElement).toBe(mainContentElement);
    });

    test("skip button is not visible after focus moves away", async () => {
      const { mainContentElement } = await renderSkipToContent();

      const skipButtonLocator = page.getByRole("button", {
        name: skipToMainContentLabel,
      });
      await expect.element(skipButtonLocator).toBeInTheDocument();

      skipButtonLocator.element().focus();
      await expect.element(skipButtonLocator).toBeVisible();

      await userEvent.click(skipButtonLocator);

      expect(document.activeElement).toBe(mainContentElement);

      // After navigating away, container loses :focus-within → sr-only clip returns.
      await expect
        .poll(
          () =>
            getComputedStyle(skipButtonLocator.element().closest("div[class]")!)
              .width,
        )
        .toBe("1px");
    });
  });
});
