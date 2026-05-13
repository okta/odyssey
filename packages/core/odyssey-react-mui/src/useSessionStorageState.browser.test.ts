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

import {
  getSessionStorageValue,
  useSessionStorageState,
} from "./useSessionStorageState.js";

describe(getSessionStorageValue.name, () => {
  test("Gets `null` with null string key", () => {
    const sessionStorageValue = getSessionStorageValue("");

    expect(sessionStorageValue).toBe(null);
  });

  test("Gets `null` with an unused key", () => {
    const sessionStorageValue = getSessionStorageValue("testKey");

    expect(sessionStorageValue).toBe(null);
  });

  test('Gets `""` with a stored null string value', () => {
    window.sessionStorage.setItem("testKey", "");

    const sessionStorageValue = getSessionStorageValue("testKey");

    expect(sessionStorageValue).toBe("");
  });

  test("Gets string text with stored string text", () => {
    const expectedSessionStorageValue = "This is a test.";

    window.sessionStorage.setItem("testKey", expectedSessionStorageValue);

    const sessionStorageValue = getSessionStorageValue("testKey");

    expect(sessionStorageValue).toBe(expectedSessionStorageValue);
  });

  test("Gets object when storing an object", () => {
    const expectedSessionStorageValue = {
      a: "Test A",
      b: "Test B",
    } as const;

    window.sessionStorage.setItem(
      "testKey",
      JSON.stringify(expectedSessionStorageValue),
    );

    const sessionStorageValue = getSessionStorageValue("testKey");

    expect(sessionStorageValue).toEqual(expectedSessionStorageValue);
  });
});

describe(useSessionStorageState.name, () => {
  describe("key", () => {
    test("throws error when no key passed", () => {
      expect(() => {
        useSessionStorageState({
          initialState: null,
          key: "",
        });
      }).toThrow();
    });

    test("state is `null` with an unused key", async () => {
      const { result } = await renderHook(() =>
        useSessionStorageState({
          initialState: null,
          key: "testKey",
        }),
      );

      expect(result.current.sessionState).toBe(null);
    });

    test("gets session state if already set", async () => {
      const expectedSessionStorageValue = {
        a: "Test A",
        b: "Test B",
      } as const;

      window.sessionStorage.setItem(
        "testKey",
        JSON.stringify(expectedSessionStorageValue),
      );

      const { result } = await renderHook(() =>
        useSessionStorageState({
          initialState: {},
          key: "testKey",
        }),
      );

      expect(result.current.sessionState).toEqual(expectedSessionStorageValue);
    });

    test("updates session storage with value", async () => {
      const expectedSessionStorageValue = {
        a: "Test A",
        b: "Test B",
      } as const;

      const initialState = {};

      const { result } = await renderHook(() =>
        useSessionStorageState({
          initialState,
          key: "testKey",
        }),
      );

      result.current.setSessionState(expectedSessionStorageValue);

      await vi.waitFor(() => {
        expect(result.current.sessionState).toEqual(
          expectedSessionStorageValue,
        );
      });
    });

    test("updates session storage after local state update", async () => {
      const expectedSessionStorageValue = {
        a: "Test A",
        b: "Test B",
      } as const;

      const initialState = {};

      const { result } = await renderHook(() =>
        useSessionStorageState({
          initialState,
          key: "testKey",
        }),
      );

      result.current.setSessionState(expectedSessionStorageValue);

      await vi.waitFor(() => {
        expect(window.sessionStorage.getItem("testKey")).toBe(
          JSON.stringify(expectedSessionStorageValue),
        );
      });
    });

    test("updates state after 2 updates", async () => {
      const expectedSessionStorageValue = "This is the expected value.";

      const { result } = await renderHook(() =>
        useSessionStorageState({
          initialState: "",
          key: "testKey",
        }),
      );

      result.current.setSessionState("This is a test.");

      await vi.waitFor(() => {
        expect(result.current.sessionState).toBe("This is a test.");
      });

      result.current.setSessionState(expectedSessionStorageValue);

      await vi.waitFor(() => {
        expect(result.current.sessionState).toEqual(
          expectedSessionStorageValue,
        );
      });
    });

    test("gets correct session storage value after updating `key`", async () => {
      const expectedSessionStorageValueA = "Test A";
      const expectedSessionStorageValueB = "Test B";

      const { result, rerender } = await renderHook(
        (key = "testKey") =>
          useSessionStorageState({
            initialState: "",
            key,
          }),
        {
          initialProps: "testKey",
        },
      );

      result.current.setSessionState(expectedSessionStorageValueA);

      await vi.waitFor(() => {
        expect(result.current.sessionState).toBe(expectedSessionStorageValueA);
      });

      await rerender("newTestKey");

      result.current.setSessionState(expectedSessionStorageValueB);

      await vi.waitFor(() => {
        expect(result.current.sessionState).toBe(expectedSessionStorageValueB);
      });

      await rerender("testKey");

      await vi.waitFor(() => {
        expect(result.current.sessionState).toBe(expectedSessionStorageValueA);
      });
    });
  });

  describe("initial state", () => {
    test("is null when null", async () => {
      const { result } = await renderHook(() =>
        useSessionStorageState({
          initialState: null,
          key: "testKey",
        }),
      );

      expect(result.current.sessionState).toBe(null);
    });

    test("is string when string", async () => {
      const expectedValue = "This is a test.";

      const { result } = await renderHook(() =>
        useSessionStorageState({
          initialState: expectedValue,
          key: "testKey",
        }),
      );

      expect(result.current.sessionState).toBe(expectedValue);
    });

    test("is object when object", async () => {
      const expectedValue = {
        a: "Test A",
        b: "Test B",
      };

      const { result } = await renderHook(() =>
        useSessionStorageState({
          initialState: expectedValue,
          key: "testKey",
        }),
      );

      expect(result.current.sessionState).toBe(expectedValue);
    });

    test("retains state after update", async () => {
      const expectedValue = {
        a: "Test A",
        b: "Test B",
      };

      const initialState = {};

      const { result } = await renderHook(() =>
        useSessionStorageState({
          initialState,
          key: "testKey",
        }),
      );

      result.current.setSessionState(expectedValue);

      await vi.waitFor(() => {
        expect(result.current.sessionState).toBe(expectedValue);
      });
    });

    test("changes session storage state after updating `initialState`", async () => {
      const expectedSessionStorageValueA = "Test A";
      const expectedSessionStorageValueB = "Test B";

      const { result, rerender } = await renderHook(
        (initialState = expectedSessionStorageValueA) =>
          useSessionStorageState({
            initialState,
            key: "testKey",
          }),
        {
          initialProps: expectedSessionStorageValueA,
        },
      );

      expect(result.current.sessionState).toBe(expectedSessionStorageValueA);

      await rerender("Test B");

      await vi.waitFor(() => {
        expect(result.current.sessionState).toBe(expectedSessionStorageValueB);
      });
    });
  });
});
