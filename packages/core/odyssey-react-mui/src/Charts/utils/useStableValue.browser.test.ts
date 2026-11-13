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

import { useStableValue } from "./useStableValue.js";

describe(useStableValue.name, () => {
  test("rerender with equal contents keeps the first object", async () => {
    const { result, rerender } = await renderHook(
      (value?: { points: number[] }) => useStableValue(value),
      { initialProps: { points: [1, 2] } },
    );
    const firstResult = result.current;

    await rerender({ points: [1, 2] });

    expect(result.current).toBe(firstResult);
  });

  test("rerender with different contents returns the new object", async () => {
    const { result, rerender } = await renderHook(
      (value?: { points: number[] }) => useStableValue(value),
      { initialProps: { points: [1, 2] } },
    );
    const nextValue = { points: [3] };

    await rerender(nextValue);

    expect(result.current).toBe(nextValue);
  });
});
