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
import { page } from "vitest/browser";

import { translate as odysseyTranslate } from "../../i18n.generated/i18n.js";
import { AppSwitcher } from "./AppSwitcher.js";

const navigationLabel = odysseyTranslate("appswitcher.navigation.label");
const loadingText = odysseyTranslate("appswitcher.loading.text");

const pixelUrl = "data:image/gif;base64,R0lGODlhAQABAAAAACw=";

const appIcons = [
  {
    appIconDefaultUrl: pixelUrl,
    appIconSelectedUrl: pixelUrl,
    appName: "admin",
    label: "Admin",
    linkUrl: "#admin",
  },
  {
    appIconDefaultUrl: pixelUrl,
    appIconSelectedUrl: pixelUrl,
    appName: "workflows",
    label: "Workflows",
    linkUrl: "#workflows",
  },
];

describe(AppSwitcher.displayName!, () => {
  test("loading state", async () => {
    const { container } = await renderWithOdysseyProvider(
      <AppSwitcher appIcons={[]} isLoading selectedAppName="" />,
    );

    const navigation = page.getByRole("navigation", { name: navigationLabel });

    await expect.element(navigation).toBeVisible();
    await expect
      .element(navigation.getByRole("list"))
      .toHaveAttribute("aria-busy", "true");
    // Visually hidden on purpose, so presence is the concern rather than visibility.
    await expect.element(navigation.getByText(loadingText)).toBeInTheDocument();
    await expect(container).toBeAccessible();
  });

  test("loaded state with apps", async () => {
    const { container } = await renderWithOdysseyProvider(
      <AppSwitcher
        appIcons={[
          {
            appIconDefaultUrl: "/admin-app-default.svg",
            appIconSelectedUrl: "/admin-app-selected.svg",
            appName: "saasure",
            label: "Okta Admin Console",
            linkUrl: "https://example.okta.com/admin/dashboard",
          },
        ]}
        isLoading={false}
        selectedAppName="saasure"
      />,
    );

    const navigation = page.getByRole("navigation", { name: navigationLabel });

    await expect.element(navigation).toBeVisible();
    await expect
      .element(navigation.getByRole("list"))
      .toHaveAttribute("aria-busy", "false");
    await expect
      .element(navigation.getByRole("link", { name: "Okta Admin Console" }))
      .toBeVisible();
    await expect.element(page.getByText(loadingText)).not.toBeInTheDocument();
    await expect(container).toBeAccessible();
  });

  test("app icons with one selected", async () => {
    await renderWithOdysseyProvider(
      <AppSwitcher
        appIcons={appIcons}
        isLoading={false}
        selectedAppName="admin"
      />,
    );

    await expect
      .element(page.getByRole("link", { name: "Admin" }))
      .toHaveAttribute("aria-current", "page");
    await expect
      .element(page.getByRole("link", { name: "Workflows" }))
      .not.toHaveAttribute("aria-current");
  });
});
