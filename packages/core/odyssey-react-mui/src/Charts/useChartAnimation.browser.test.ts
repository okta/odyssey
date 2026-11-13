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

import { renderHookWithOdysseyProvider } from "@okta/odyssey-test-tooling/browser";

import { useChartAnimation } from "./useChartAnimation.js";
import { chartTokens } from "./utils/chartTokens.js";

describe(useChartAnimation.name, () => {
  test("animations on, rerendered", async () => {
    const { result, rerender } = await renderHookWithOdysseyProvider(
      () => useChartAnimation(),
      { providerProps: { hasAnimations: true } },
    );
    const firstAnimation = result.current;

    await rerender();

    expect(firstAnimation).toStrictEqual({
      duration: chartTokens.ChartAnimationDuration,
    });
    expect(result.current).toBe(firstAnimation);
  });

  test("animations off", async () => {
    const { result } = await renderHookWithOdysseyProvider(
      () => useChartAnimation(),
      { providerProps: { hasAnimations: false } },
    );

    expect(result.current).toBe(false);
  });
});
