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

import { page, server } from "vitest/browser";

import "./browserSetup.js";

type RenderButtonArgs = {
  label: string;
};

const renderButton = ({ label }: RenderButtonArgs) => {
  const button = document.createElement("button");
  button.setAttribute("type", "button");
  button.textContent = label;
  document.body.append(button);
  return button;
};

describe("toBeAccessible", () => {
  afterEach(() => {
    document.body.replaceChildren();
  });

  test("element without violations", async () => {
    await expect(renderButton({ label: "Save" })).toBeAccessible();
  });

  test("element with a violation", async () => {
    await expect(
      expect(renderButton({ label: "" })).toBeAccessible(),
    ).rejects.toThrow("[a11y - button-name]");
  });

  test("violation whose rule is disabled", async () => {
    await expect(renderButton({ label: "" })).toBeAccessible({
      disabledRules: ["button-name"],
    });
  });
});

// The second test checks what the first one left behind, so the two must stay in this order and run in the same file, with nothing between them.
describe("shared hooks", () => {
  test("setup: session storage and viewport changed", async () => {
    window.sessionStorage.setItem("leak", "value");
    await page.viewport(400, 300);

    expect(window.sessionStorage.getItem("leak")).toBe("value");
    expect([window.innerWidth, window.innerHeight]).toStrictEqual([400, 300]);
  });

  test("session storage and viewport reset after the previous test", () => {
    expect(window.sessionStorage.getItem("leak")).toBeNull();
    expect([window.innerWidth, window.innerHeight]).toStrictEqual([
      server.config.browser.viewport.width,
      server.config.browser.viewport.height,
    ]);
  });
});
