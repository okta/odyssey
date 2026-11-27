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

import { Banner } from "./Banner.js";
import { TranslationProvider } from "./i18n.generated/i18n.js";

// Marker strings no English default contains, so an English label means the component skipped the translation provider. Each test turns off the provider's own `TranslationProvider`, because its effect runs after this one and resets the language to the browser default.
const translationOverrides = {
  ar: {
    "close.text": "ar close",
  },
};

const LONG_BANNER_TEXT =
  "Your current trial period for Okta is coming to an end and you will need to upgrade your subscription plan.";
const SHORT_BANNER_TEXT = "Your trial expires in 5 days.";

// Widths are in rem so they mean the same layout at any root font size. The
// test browser's root is 16px, while an Odyssey app's is 14px.
const WIDE_BANNER_WIDTH = "80rem";
// Wide enough that long text keeps its 20rem minimum beside "Click here", but
// not beside "View billing report", so the two links land on opposite sides of
// the wrap.
const WRAP_TEST_WIDTH = "35rem";
const BANNER_TEXT_MIN_WIDTH_IN_REM = 20;
// Comfortably more than the 16px item gap, and far less than the space a text
// that fills the banner would leave.
const NEARBY_DISTANCE_IN_REM = 2;

const renderBanner = ({
  linkText,
  text,
  width,
}: {
  linkText: string;
  text: string;
  width: string;
}) =>
  renderWithOdysseyProvider(
    <div style={{ width }}>
      <Banner
        linkText={linkText}
        linkUrl="#anchor"
        onClose={vi.fn()}
        severity="info"
        text={text}
      />
    </div>,
  );

const getBannerLayout = ({
  linkText,
  text,
}: {
  linkText: string;
  text: string;
}) => {
  const remInPixels = Number.parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("font-size"),
  );
  const textRectangle = page.getByText(text).element().getBoundingClientRect();
  const linkRectangle = page
    .getByRole("link", { name: linkText })
    .element()
    .getBoundingClientRect();
  const closeButtonRectangle = page
    .getByTitle("Close")
    .element()
    .getBoundingClientRect();
  const isLinkBelowText = linkRectangle.top >= textRectangle.bottom;
  const nearbyDistance = NEARBY_DISTANCE_IN_REM * remInPixels;

  return {
    hasTextMinimumWidth:
      Math.round(textRectangle.width) >=
      Math.round(BANNER_TEXT_MIN_WIDTH_IN_REM * remInPixels),
    isCloseButtonAlignedWithText:
      Math.round(closeButtonRectangle.top) === Math.round(textRectangle.top),
    isCloseButtonNextToLink:
      closeButtonRectangle.left - linkRectangle.right < nearbyDistance,
    isLinkBelowText,
    isLinkNextToText:
      !isLinkBelowText &&
      linkRectangle.left - textRectangle.right < nearbyDistance,
  };
};

describe(Banner.displayName!, () => {
  test("linked banner with anchor href", async () => {
    const { container } = await renderWithOdysseyProvider(
      <Banner
        linkText="View report"
        linkUrl="#anchor"
        severity="error"
        text="Banner text."
      />,
    );

    await expect(container).toBeAccessible();

    const link = page.getByText("View report");
    await expect.element(link).toHaveAttribute("href", "#anchor");
  });

  test("dismissible banner with close button", async () => {
    const onClose = vi.fn();

    const { container } = await renderWithOdysseyProvider(
      <Banner onClose={onClose} severity="info" text="Banner text." />,
    );

    await userEvent.tab();
    await expect(container).toBeAccessible();

    const closeButton = page.getByTitle("Close");
    await userEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });

  test("wide banner with short text and a link", async () => {
    const linkText = "View billing report";
    const { container } = await renderBanner({
      linkText,
      text: SHORT_BANNER_TEXT,
      width: WIDE_BANNER_WIDTH,
    });

    await expect(container).toBeAccessible();
    expect(
      getBannerLayout({ linkText, text: SHORT_BANNER_TEXT }),
    ).toStrictEqual({
      hasTextMinimumWidth: false,
      isCloseButtonAlignedWithText: true,
      isCloseButtonNextToLink: false,
      isLinkBelowText: false,
      isLinkNextToText: true,
    });
  });

  test("wide banner with long text and a link", async () => {
    const linkText = "Click here";
    const { container } = await renderBanner({
      linkText,
      text: LONG_BANNER_TEXT,
      width: WIDE_BANNER_WIDTH,
    });

    await expect(container).toBeAccessible();
    expect(getBannerLayout({ linkText, text: LONG_BANNER_TEXT })).toStrictEqual(
      {
        hasTextMinimumWidth: true,
        isCloseButtonAlignedWithText: true,
        isCloseButtonNextToLink: false,
        isLinkBelowText: false,
        isLinkNextToText: true,
      },
    );
  });

  test("narrow banner with long text and a short link", async () => {
    const linkText = "Click here";
    const { container } = await renderBanner({
      linkText,
      text: LONG_BANNER_TEXT,
      width: WRAP_TEST_WIDTH,
    });

    await expect(container).toBeAccessible();
    expect(getBannerLayout({ linkText, text: LONG_BANNER_TEXT })).toStrictEqual(
      {
        hasTextMinimumWidth: true,
        isCloseButtonAlignedWithText: true,
        isCloseButtonNextToLink: true,
        isLinkBelowText: false,
        isLinkNextToText: true,
      },
    );
  });

  test("narrow banner with long text and a 3-word link", async () => {
    const linkText = "View billing report";
    const { container } = await renderBanner({
      linkText,
      text: LONG_BANNER_TEXT,
      width: WRAP_TEST_WIDTH,
    });

    await expect(container).toBeAccessible();
    expect(getBannerLayout({ linkText, text: LONG_BANNER_TEXT })).toStrictEqual(
      {
        hasTextMinimumWidth: true,
        isCloseButtonAlignedWithText: true,
        isCloseButtonNextToLink: false,
        isLinkBelowText: true,
        isLinkNextToText: false,
      },
    );
  });

  test("linked banner without a url", async () => {
    const onLinkClick = vi.fn();

    await renderWithOdysseyProvider(
      <Banner
        linkText="View report"
        onLinkClick={onLinkClick}
        severity="warning"
        text="Banner text."
      />,
    );

    await userEvent.click(page.getByRole("link", { name: "View report" }));

    expect(onLinkClick).toHaveBeenCalledTimes(1);
  });

  test("close button label in a non-English language", async () => {
    await renderWithOdysseyProvider(
      <TranslationProvider<"ar">
        languageCode="ar"
        translationOverrides={translationOverrides}
      >
        <Banner onClose={vi.fn()} severity="info" text="Banner text." />
      </TranslationProvider>,
      { providerProps: { hasTranslationProvider: false } },
    );

    await expect
      .element(page.getByRole("button", { name: "ar close" }))
      .toBeVisible();
    await expect.element(page.getByTitle("ar close")).toBeVisible();
  });
});
