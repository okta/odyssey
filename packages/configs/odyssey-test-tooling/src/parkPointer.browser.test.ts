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

import { commands, userEvent } from "vitest/browser";

type RenderFullPageTargetArgs = {
  label: string;
};

// Covers the whole viewport, so wherever the pointer sits on the page, it is
// over this element.
const renderFullPageTarget = ({ label }: RenderFullPageTargetArgs) => {
  const target = document.createElement("button");
  target.textContent = label;
  target.setAttribute(
    "style",
    "position: fixed; inset: 0; width: 100vw; height: 100vh;",
  );
  document.body.append(target);
  return target;
};

describe("parkPointer", () => {
  afterEach(() => {
    document.body.replaceChildren();
  });

  test("a hovered element when the pointer is parked", async () => {
    const target = renderFullPageTarget({ label: "Hover target" });
    const { promise: mouseLeft, resolve: notifyMouseLeft } =
      Promise.withResolvers<string>();
    target.addEventListener("mouseleave", () => notifyMouseLeft("left"));

    await userEvent.hover(target);
    expect(target.matches(":hover")).toBe(true);

    await commands.parkPointer();

    expect(await mouseLeft).toBe("left");
    expect(target.matches(":hover")).toBe(false);
  });
});
