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

import {
  defaultUiShellBreakpointConfig,
  useUiShellBreakpoints,
} from "./useUiShellBreakpoints.js";

const VIEWPORT_HEIGHT = 2;

describe(useUiShellBreakpoints.name, () => {
  test("breakpoint changes when page width changes", async () => {
    await page.viewport(0, VIEWPORT_HEIGHT);

    const { result: breakpointNameRef } = renderHook(() =>
      useUiShellBreakpoints(),
    );

    expect(breakpointNameRef.current).toBe("narrow");

    await act(
      async () =>
        await page.viewport(
          defaultUiShellBreakpointConfig.medium,
          VIEWPORT_HEIGHT,
        ),
    );

    await waitFor(() => {
      expect(breakpointNameRef.current).toBe("medium");
    });

    await act(
      async () =>
        await page.viewport(
          defaultUiShellBreakpointConfig.wide,
          VIEWPORT_HEIGHT,
        ),
    );

    await waitFor(() => {
      expect(breakpointNameRef.current).toBe("wide");
    });
  });

  test("breakpoints are pixel-accurate", async () => {
    await page.viewport(0, VIEWPORT_HEIGHT);

    const { result: breakpointNameRef } = renderHook(() =>
      useUiShellBreakpoints(),
    );

    await waitFor(() => {
      expect(breakpointNameRef.current).toBe("narrow");
    });

    await act(
      async () =>
        await page.viewport(
          defaultUiShellBreakpointConfig.medium,
          VIEWPORT_HEIGHT,
        ),
    );

    await waitFor(() => {
      expect(breakpointNameRef.current).toBe("medium");
    });

    await act(
      async () =>
        await page.viewport(
          defaultUiShellBreakpointConfig.wide - 1,
          VIEWPORT_HEIGHT,
        ),
    );

    await waitFor(() => {
      expect(breakpointNameRef.current).toBe("medium");
    });
  });

  test("works when passed a custom breakpoints config", async () => {
    await page.viewport(0, VIEWPORT_HEIGHT);

    const customBreakpoints = {
      narrow: 320,
      medium: 768,
      wide: 1280,
    } as const;

    const { result: breakpointNameRef } = renderHook(() =>
      useUiShellBreakpoints(customBreakpoints),
    );

    await waitFor(() => {
      expect(breakpointNameRef.current).toBe("none");
    });

    await act(
      async () =>
        await page.viewport(customBreakpoints.narrow, VIEWPORT_HEIGHT),
    );

    await waitFor(() => {
      expect(breakpointNameRef.current).toBe("narrow");
    });

    await act(
      async () =>
        await page.viewport(customBreakpoints.medium, VIEWPORT_HEIGHT),
    );

    await waitFor(() => {
      expect(breakpointNameRef.current).toBe("medium");
    });

    await act(
      async () => await page.viewport(customBreakpoints.wide, VIEWPORT_HEIGHT),
    );

    await waitFor(() => {
      expect(breakpointNameRef.current).toBe("wide");
    });
  });
});
