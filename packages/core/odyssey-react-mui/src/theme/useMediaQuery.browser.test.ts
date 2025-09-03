/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { act, renderHook, waitFor } from "@testing-library/react";
import { page } from "@vitest/browser/context";

import { useMediaQuery } from "./useMediaQuery.js";

const MINIMUM_SIZE = 1;

describe(useMediaQuery.name, () => {
  test("responds to the given simple min-width media query", async () => {
    await page.viewport(MINIMUM_SIZE, MINIMUM_SIZE);

    const { result: hasMatchesRef } = renderHook(() =>
      useMediaQuery(`(min-width: 800px)`),
    );

    await waitFor(() => {
      expect(hasMatchesRef.current).toBe(false);
    });

    await act(async () => {
      await page.viewport(800, MINIMUM_SIZE);
    });

    await waitFor(() => {
      expect(hasMatchesRef.current).toBe(true);
    });
  });

  // This test fails, and it might be due to Happy-DOM. Our `min-width` use case is working fine.
  test("responds to the given width range media query", async () => {
    await page.viewport(MINIMUM_SIZE, MINIMUM_SIZE);

    const { result: hasMatchesRef } = await act(() =>
      renderHook(() =>
        useMediaQuery(`(min-width: 200px) and (max-width: 800px)`),
      ),
    );

    await waitFor(() => {
      expect(hasMatchesRef.current).toBe(false);
    });

    await act(async () => {
      await page.viewport(200, MINIMUM_SIZE);
    });

    await waitFor(() => {
      expect(hasMatchesRef.current).toBe(true);
    });

    await act(async () => {
      await page.viewport(801, MINIMUM_SIZE);
    });

    await waitFor(() => {
      expect(hasMatchesRef.current).toBe(false);
    });
  });
});
