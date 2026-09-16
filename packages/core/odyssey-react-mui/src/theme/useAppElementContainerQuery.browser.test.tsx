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

import { renderHook } from "vitest-browser-react";
import { page } from "vitest/browser";

import { OdysseyProvider } from "../OdysseyProvider.js";
import { renderWithOdysseyProvider } from "../test-utils/renderWithOdysseyProvider.js";
import { useAppElementContainerQuery } from "./useAppElementContainerQuery.js";

const AppElementWidthProbe = ({ minWidth }: { minWidth: number }) => (
  <div data-testid="probe">
    {String(useAppElementContainerQuery({ minWidth }))}
  </div>
);

describe("useAppElementContainerQuery", () => {
  test("app wrapper narrower than minWidth then grown past it", async () => {
    const { container } = await renderWithOdysseyProvider(
      <AppElementWidthProbe minWidth={400} />,
    );

    // The provider's outermost element is the wrapper the hook observes.
    const appElement = container.firstElementChild as HTMLElement;

    appElement.style.setProperty("box-sizing", "border-box");
    appElement.style.setProperty("width", "300px");

    await expect.element(page.getByTestId("probe")).toHaveTextContent("false");

    appElement.style.setProperty("width", "500px");

    await expect.element(page.getByTestId("probe")).toHaveTextContent("true");
  });

  test("provider rendered without a wrapper element", async () => {
    await renderWithOdysseyProvider(
      <OdysseyProvider hasWrapperElement={false}>
        <AppElementWidthProbe minWidth={0} />
      </OdysseyProvider>,
    );

    await expect.element(page.getByTestId("probe")).toHaveTextContent("false");
  });

  test("called outside a provider", async () => {
    const { result } = await renderHook(() =>
      useAppElementContainerQuery({ minWidth: 0 }),
    );

    await vi.waitFor(() => {
      expect(result.current).toBe(false);
    });
  });
});
