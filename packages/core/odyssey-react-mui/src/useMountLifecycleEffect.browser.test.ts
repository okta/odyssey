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

import { act, renderHook } from "@testing-library/react";

import { useMountLifecycleEffect } from "./useMountLifecycleEffect.js";

describe(useMountLifecycleEffect.name, () => {
  test("calls `onMount` when rendered", () => {
    const onMount = vi.fn();

    renderHook(() =>
      useMountLifecycleEffect({
        onMount,
      }),
    );

    expect(onMount).toHaveBeenCalledTimes(1);
    expect(onMount).toHaveBeenCalledWith();
  });

  test("only calls `onMount` on first render", () => {
    const onMount = vi.fn();

    const { rerender } = renderHook(
      (onUpdate) =>
        useMountLifecycleEffect({
          onMount,
          onUpdate,
        }),
      {
        initialProps: () => {},
      },
    );

    act(() => {
      rerender(() => {});
    });

    expect(onMount).toHaveBeenCalledTimes(1);
    expect(onMount).toHaveBeenCalledWith();
  });

  test("doesn't call `onMount` on change", () => {
    const onMount2 = vi.fn();

    const { rerender } = renderHook(
      (onMount) =>
        useMountLifecycleEffect({
          onMount,
        }),
      {
        initialProps: () => {},
      },
    );

    act(() => {
      rerender(onMount2);
    });

    expect(onMount2).toHaveBeenCalledTimes(0);
  });

  test("`onUpdate` not called on first render", () => {
    const onUpdate = vi.fn();

    renderHook(() =>
      useMountLifecycleEffect({
        onUpdate,
      }),
    );

    expect(onUpdate).toHaveBeenCalledTimes(0);
  });

  test("only calls `onUpdate` when updated", () => {
    const onUpdate1 = vi.fn();
    const onUpdate2 = vi.fn();

    const { rerender } = renderHook(
      (onUpdate) =>
        useMountLifecycleEffect({
          onUpdate,
        }),
      {
        initialProps: onUpdate1,
      },
    );

    act(() => {
      rerender(onUpdate2);
    });

    expect(onUpdate2).toHaveBeenCalledTimes(1);
    expect(onUpdate2).toHaveBeenCalledWith();

    expect(onUpdate1).toHaveBeenCalledTimes(0);
  });
});
