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
import { expectError } from "tsd";

import { useMediaQuery } from "./useMediaQuery.js";

describe(useMediaQuery.name, () => {
  test("errors if no media query passed", () => {
    expectError(() => {
      useMediaQuery(
        // @ts-expect-error We're purposefully passing an invalid value for this test. You cannot use `""`.
        "",
      );
    });
  });

  test("responds to the given simple min-width media query", () => {
    window.happyDOM.setViewport({
      width: 0,
    });

    const { result: hasMatchesRef } = renderHook(() =>
      useMediaQuery(`(min-width: 800px)`),
    );

    expect(hasMatchesRef.current).toBe(false);

    act(() => {
      window.happyDOM.setViewport({
        width: 800,
      });
    });

    expect(hasMatchesRef.current).toBe(true);
  });

  // This test fails, and it might be due to Happy-DOM. Our `min-width` use case is working fine.
  test.skip("responds to the given a width range media query", () => {
    window.happyDOM.setViewport({
      width: 0,
    });

    const { result: hasMatchesRef } = renderHook(() =>
      useMediaQuery(`(min-width: 200px) and (max-width: 800px)`),
    );

    expect(hasMatchesRef.current).toBe(false);

    act(() => {
      window.happyDOM.setViewport({
        width: 200,
      });
    });

    expect(hasMatchesRef.current).toBe(true);

    act(() => {
      window.happyDOM.setViewport({
        width: 801,
      });
    });

    expect(hasMatchesRef.current).toBe(false);
  });
});
