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

import { renderHook } from "vitest-browser-react";
import { page } from "vitest/browser";

import { ROOMY_HEIGHT, ROOMY_WIDTH } from "../test-utils/viewportTestSizes.js";
import {
  COMPACT_MAX_HEIGHT,
  COMPACT_MAX_WIDTH,
  useCompactViewportMatches,
  useMediaQuery,
} from "./useMediaQuery.js";

const MINIMUM_SIZE = 1;

describe(useMediaQuery.name, () => {
  test("does not accept empty string as media query", async () => {
    await renderHook(() => {
      // @ts-expect-error ignore error for test case
      useMediaQuery("");
    });
  });

  test("responds to the given simple min-width media query", async () => {
    await page.viewport(MINIMUM_SIZE, MINIMUM_SIZE);

    const { result: hasMatchesRef } = await renderHook(() =>
      useMediaQuery(`(min-width: 800px)`),
    );

    await vi.waitFor(() => {
      expect(hasMatchesRef.current).toBe(false);
    });

    await page.viewport(800, MINIMUM_SIZE);

    await vi.waitFor(() => {
      expect(hasMatchesRef.current).toBe(true);
    });
  });

  test("responds to the given width range media query", async () => {
    await page.viewport(MINIMUM_SIZE, MINIMUM_SIZE);

    const { result: hasMatchesRef } = await renderHook(() =>
      useMediaQuery(`(min-width: 200px) and (max-width: 800px)`),
    );

    await vi.waitFor(() => {
      expect(hasMatchesRef.current).toBe(false);
    });

    await page.viewport(200, MINIMUM_SIZE);

    await vi.waitFor(() => {
      expect(hasMatchesRef.current).toBe(true);
    });

    await page.viewport(801, MINIMUM_SIZE);

    await vi.waitFor(() => {
      expect(hasMatchesRef.current).toBe(false);
    });
  });

  test("responds to the given simple max-height media query", async () => {
    await page.viewport(MINIMUM_SIZE, ROOMY_HEIGHT);

    const { result: hasMatchesRef } = await renderHook(() =>
      useMediaQuery(`(max-height: 400px)`),
    );

    await vi.waitFor(() => {
      expect(hasMatchesRef.current).toBe(false);
    });

    await page.viewport(MINIMUM_SIZE, 400);

    await vi.waitFor(() => {
      expect(hasMatchesRef.current).toBe(true);
    });
  });

  test("treats a query with a leading @media prefix the same as the bare condition", async () => {
    await page.viewport(MINIMUM_SIZE, MINIMUM_SIZE);

    const { result: hasMatchesRef } = await renderHook(() =>
      useMediaQuery(`@media (min-width: 800px)`),
    );

    await vi.waitFor(() => {
      expect(hasMatchesRef.current).toBe(false);
    });

    await page.viewport(800, MINIMUM_SIZE);

    await vi.waitFor(() => {
      expect(hasMatchesRef.current).toBe(true);
    });
  });

  test("returns false without throwing when matchMedia is unavailable", async () => {
    const originalMatchMedia = window.matchMedia;
    // Simulate an environment (SSR/jsdom) that does not implement matchMedia.
    // @ts-expect-error deleting an optional-at-runtime global for the test
    delete window.matchMedia;

    try {
      const { result: hasMatchesRef } = await renderHook(() =>
        useMediaQuery(`(min-width: 1px)`),
      );

      expect(hasMatchesRef.current).toBe(false);
    } finally {
      window.matchMedia = originalMatchMedia;
    }
  });
});

describe(useCompactViewportMatches.name, () => {
  test("no compact match when both dimensions are roomy", async () => {
    await page.viewport(ROOMY_WIDTH, ROOMY_HEIGHT);

    const { result: matchesRef } = await renderHook(() =>
      useCompactViewportMatches(),
    );

    await vi.waitFor(() => {
      expect(matchesRef.current).toEqual({
        isWithinCompactWidth: false,
        isWithinCompactHeight: false,
        isWithinCompactWidthOrHeight: false,
      });
    });
  });

  test("width compact and height roomy", async () => {
    await page.viewport(COMPACT_MAX_WIDTH, ROOMY_HEIGHT);

    const { result: matchesRef } = await renderHook(() =>
      useCompactViewportMatches(),
    );

    await vi.waitFor(() => {
      expect(matchesRef.current).toEqual({
        isWithinCompactWidth: true,
        isWithinCompactHeight: false,
        isWithinCompactWidthOrHeight: true,
      });
    });
  });

  test("height compact and width roomy", async () => {
    await page.viewport(ROOMY_WIDTH, COMPACT_MAX_HEIGHT);

    const { result: matchesRef } = await renderHook(() =>
      useCompactViewportMatches(),
    );

    await vi.waitFor(() => {
      expect(matchesRef.current).toEqual({
        isWithinCompactWidth: false,
        isWithinCompactHeight: true,
        isWithinCompactWidthOrHeight: true,
      });
    });
  });

  test("both dimensions compact", async () => {
    await page.viewport(COMPACT_MAX_WIDTH, COMPACT_MAX_HEIGHT);

    const { result: matchesRef } = await renderHook(() =>
      useCompactViewportMatches(),
    );

    await vi.waitFor(() => {
      expect(matchesRef.current).toEqual({
        isWithinCompactWidth: true,
        isWithinCompactHeight: true,
        isWithinCompactWidthOrHeight: true,
      });
    });
  });
});
