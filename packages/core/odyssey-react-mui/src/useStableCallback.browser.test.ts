/*!
 * Copyright (c) 2025-present, Okta, Inc. and/or its affiliates. All rights reserved.
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

import { useStableCallback } from "./useStableCallback.js";

describe(useStableCallback.name, () => {
  test("rerender with a new callback identity", async () => {
    const { result, rerender } = await renderHook(
      (callback?: () => void) => useStableCallback(callback),
      {
        initialProps: () => {},
      },
    );

    const stableCallbackFromFirstRender = result.current;

    await rerender(() => {});

    expect(result.current).toBe(stableCallbackFromFirstRender);
  });

  test("invoking the stable callback after the callback prop changed", async () => {
    const firstCallback = vi.fn();
    const secondCallback = vi.fn();

    const { result, rerender } = await renderHook(
      (callback?: () => void) => useStableCallback(callback),
      {
        initialProps: firstCallback,
      },
    );

    await rerender(secondCallback);

    result.current();

    expect(firstCallback).toHaveBeenCalledTimes(0);
    expect(secondCallback).toHaveBeenCalledTimes(1);
    expect(secondCallback).toHaveBeenCalledWith();
  });

  test("invoking the stable callback with arguments", async () => {
    const { result } = await renderHook(() =>
      useStableCallback((pageIndex: number, pageSize: number) => ({
        pageIndex,
        pageSize,
      })),
    );

    expect(result.current(2, 20)).toEqual({ pageIndex: 2, pageSize: 20 });
  });

  test("invoking the stable callback when no callback was passed", async () => {
    const { result } = await renderHook(() => useStableCallback());

    expect(result.current()).toBeUndefined();
  });
});
