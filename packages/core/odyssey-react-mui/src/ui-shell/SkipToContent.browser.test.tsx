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

import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import { useState } from "react";

import { translate as odysseyTranslate } from "../i18n.generated/i18n.js";
import { OdysseyProvider } from "../OdysseyProvider.js";
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

const renderSkipToContent = () => {
  render(
    <OdysseyProvider>
      <SkipToContentHarness />
    </OdysseyProvider>,
  );

  return { mainContentElement: screen.getByTestId("main-content") };
};

const renderSkipScenario = () => {
  render(
    <OdysseyProvider>
      <SkipScenarioHarness />
    </OdysseyProvider>,
  );

  return {
    interveningElement: screen.getByTestId("intervening"),
    mainContentElement: screen.getByTestId("main-content"),
  };
};

const renderResumeScenario = () => {
  render(
    <OdysseyProvider>
      <ResumeScenarioHarness />
    </OdysseyProvider>,
  );

  return {
    afterInterceptedElement: screen.getByTestId("after-intercepted"),
    interceptedFromElement: screen.getByTestId("intercepted-from"),
    mainContentElement: screen.getByTestId("main-content"),
  };
};

describe(SkipToContent.displayName!, () => {
  afterEach(() => {
    cleanup();
    document.body.innerHTML = "";
  });

  describe("Rendering", () => {
    test("skip to main content button rendered in the DOM and initially not visible", async () => {
      renderSkipToContent();

      await waitFor(() => {
        const skipButton = screen.getByRole("button", {
          name: skipToMainContentLabel,
        });
        expect(skipButton).toBeInTheDocument();
        // Container uses the sr-only clip pattern when not focused — it collapses
        // to 1×1px and clips its content, visually hiding the button.
        expect(getComputedStyle(skipButton.closest("div[class]")!).width).toBe(
          "1px",
        );
      });
    });
  });

  describe("Keyboard Interactions", () => {
    test("`[TAB]` interceptor focuses skip button and makes it visible when external element has focus", async () => {
      renderSkipToContent();

      const externalButton = document.createElement("button");
      document.body.append(externalButton);
      externalButton.focus();

      expect(document.activeElement).toBe(externalButton);

      await userEvent.keyboard("{Tab}");

      await waitFor(() => {
        const skipButton = screen.getByRole("button", {
          name: skipToMainContentLabel,
        });
        expect(document.activeElement).toBe(skipButton);
        // :focus-within removes the sr-only clip — button should now be visible.
        expect(skipButton).toBeVisible();
      });
    });

    test("`[TAB]` interceptor does not fire when body has focus", async () => {
      renderSkipToContent();

      (document.activeElement as HTMLElement | null)?.blur();

      await userEvent.keyboard("{Tab}");

      await waitFor(() => {
        expect(document.activeElement).not.toBe(document.body);
      });
    });

    test("`[TAB]` interceptor fires only once per mount", async () => {
      renderSkipToContent();

      const externalButton = document.createElement("button");
      document.body.append(externalButton);

      // First Tab from external: interceptor fires, skip button focused.
      externalButton.focus();
      await userEvent.keyboard("{Tab}");

      await waitFor(() => {
        expect(document.activeElement).toBe(
          screen.getByRole("button", { name: skipToMainContentLabel }),
        );
      });

      // Move focus back to external element.
      externalButton.focus();

      // Second Tab from external: interceptor must NOT fire again.
      await userEvent.keyboard("{Tab}");

      await waitFor(() => {
        // Focus moved naturally (to the next DOM element), not back to the
        // skip button via the JavaScript interceptor.
        expect(document.activeElement).not.toBe(
          screen.getByRole("button", { name: skipToMainContentLabel }),
        );
      });
    });
  });

  describe("Skip behavior", () => {
    test("clicking skip button bypasses intervening focusable element and focuses main content", async () => {
      const { interveningElement, mainContentElement } = renderSkipScenario();

      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: skipToMainContentLabel }),
        ).toBeInTheDocument();
      });

      const skipButton = screen.getByRole("button", {
        name: skipToMainContentLabel,
      });

      skipButton.focus();

      await waitFor(() => {
        expect(skipButton).toBeVisible();
      });

      // Click the button: should jump to main content, skipping the intervening
      // element that would normally be the next Tab stop.
      await userEvent.click(skipButton);

      expect(document.activeElement).toBe(mainContentElement);
      expect(document.activeElement).not.toBe(interveningElement);
    });

    test("without clicking skip button, Tab naturally focuses the intervening element first", async () => {
      const { interveningElement } = renderSkipScenario();

      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: skipToMainContentLabel }),
        ).toBeInTheDocument();
      });

      const skipButton = screen.getByRole("button", {
        name: skipToMainContentLabel,
      });

      // Focus the skip button, then Tab past it without clicking.
      skipButton.focus();
      await userEvent.keyboard("{Tab}");

      await waitFor(() => {
        // Focus moves naturally to the intervening element (next in DOM order),
        // not to main content.
        expect(document.activeElement).toBe(interveningElement);
      });
    });
  });

  describe("Resume from intercepted position", () => {
    test("Tab from skip button resumes Tab navigation from the intercepted position", async () => {
      const { afterInterceptedElement, interceptedFromElement } =
        renderResumeScenario();

      const skipButton = screen.getByRole("button", {
        name: skipToMainContentLabel,
      });

      // Focus the element that will be intercepted.
      interceptedFromElement.focus();

      // Tab: interceptor fires, skip button receives focus.
      await userEvent.keyboard("{Tab}");

      await waitFor(() => {
        expect(document.activeElement).toBe(skipButton);
        expect(skipButton).toBeVisible();
      });

      // Tab from skip button: resume handler fires, restoring focus to the
      // intercepted element so the browser continues Tab from there.
      await userEvent.keyboard("{Tab}");

      await waitFor(() => {
        expect(document.activeElement).toBe(afterInterceptedElement);
      });
    });
  });

  describe("Focus Navigation", () => {
    test("clicking button moves focus to main content element", async () => {
      const { mainContentElement } = renderSkipToContent();

      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: skipToMainContentLabel }),
        ).toBeInTheDocument();
      });

      const skipButton = screen.getByRole("button", {
        name: skipToMainContentLabel,
      });

      // The button is sr-only until focused — Playwright refuses to click
      // clipped elements, so focus it first to trigger :focus-within.
      skipButton.focus();
      await waitFor(() => expect(skipButton).toBeVisible());

      await userEvent.click(skipButton);

      expect(document.activeElement).toBe(mainContentElement);
    });

    test("skip button is not visible after focus moves away", async () => {
      const { mainContentElement } = renderSkipToContent();

      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: skipToMainContentLabel }),
        ).toBeInTheDocument();
      });

      const skipButton = screen.getByRole("button", {
        name: skipToMainContentLabel,
      });

      skipButton.focus();

      await waitFor(() => {
        expect(skipButton).toBeVisible();
      });

      await userEvent.click(skipButton);

      expect(document.activeElement).toBe(mainContentElement);

      await waitFor(() => {
        // After navigating away, container loses :focus-within → sr-only clip returns.
        expect(getComputedStyle(skipButton.closest("div[class]")!).width).toBe(
          "1px",
        );
      });
    });
  });
});
