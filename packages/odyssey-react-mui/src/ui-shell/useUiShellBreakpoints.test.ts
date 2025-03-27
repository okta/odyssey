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

import { act, renderHook } from "@testing-library/react";

import {
  adminAppUiShellBreakpoints,
  defaultUiShellBreakpointConfig,
  useUiShellBreakpoints,
} from "./useUiShellBreakpoints.js";

describe(useUiShellBreakpoints.name, () => {
  test('breakpoint is "none" when no matched breakpoint', async () => {
    vi.resetModules();

    vi.doMock("../theme/useMediaQuery", () => ({
      useMediaQuery: vi.fn(() => false),
    }));

    // `vi.doMock` requires dynamic imports, but it also means it doesn't pollute the global `import` scope and affect other tests.
    const { useUiShellBreakpoints: useUiShellBreakpointsForTest } =
      await import("./useUiShellBreakpoints.js");

    const { result } = renderHook(() => useUiShellBreakpointsForTest());

    expect(result.current).toBe("none");
  });

  test("all breakpoints function as expected", () => {
    window.happyDOM.setViewport({
      width: 0,
    });

    const { result: breakpointNameRef } = renderHook(() =>
      useUiShellBreakpoints(),
    );

    expect(breakpointNameRef.current).toBe("narrow");

    act(() => {
      window.happyDOM.setViewport({
        width: defaultUiShellBreakpointConfig.medium,
      });
    });

    expect(breakpointNameRef.current).toBe("medium");

    act(() => {
      window.happyDOM.setViewport({
        width: defaultUiShellBreakpointConfig.wide,
      });
    });

    expect(breakpointNameRef.current).toBe("wide");
  });

  test("breakpoints are pixel-accurate", () => {
    window.happyDOM.setViewport({
      width: 0,
    });

    const { result: breakpointNameRef } = renderHook(() =>
      useUiShellBreakpoints(),
    );

    expect(breakpointNameRef.current).toBe("narrow");

    act(() => {
      window.happyDOM.setViewport({
        width: defaultUiShellBreakpointConfig.medium - 1,
      });
    });

    expect(breakpointNameRef.current).toBe("narrow");

    act(() => {
      window.happyDOM.setViewport({
        width: defaultUiShellBreakpointConfig.wide - 1,
      });
    });

    expect(breakpointNameRef.current).toBe("medium");
  });

  test("works when passed a custom breakpoints config", () => {
    window.happyDOM.setViewport({
      width: 0,
    });

    const { result: breakpointNameRef } = renderHook(() =>
      useUiShellBreakpoints(adminAppUiShellBreakpoints),
    );

    expect(breakpointNameRef.current).toBe("narrow");

    act(() => {
      window.happyDOM.setViewport({
        width: adminAppUiShellBreakpoints.medium,
      });
    });

    expect(breakpointNameRef.current).toBe("medium");

    act(() => {
      window.happyDOM.setViewport({
        width: adminAppUiShellBreakpoints.wide,
      });
    });

    expect(breakpointNameRef.current).toBe("wide");
  });
});
