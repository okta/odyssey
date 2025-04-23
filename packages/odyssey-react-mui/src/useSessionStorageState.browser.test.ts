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

import {
  getSessionStorageValue,
  useSessionStorageState,
} from "./useSessionStorageState.js";

describe(getSessionStorageValue.name, () => {
  afterEach(() => {
    window.sessionStorage.clear();
  });

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
  afterEach(() => {
    window.sessionStorage.clear();
  });

  describe("key", () => {
    test("throws error when no key passed", () => {
      expect(() => {
        useSessionStorageState({
          initialState: null,
          key: "",
        });
      }).toThrowError();
    });

    test("state is `null` with an unused key", () => {
      const { result } = renderHook(() =>
        useSessionStorageState({
          initialState: null,
          key: "testKey",
        }),
      );

      expect(result.current.sessionState).toBe(null);
    });

    test("gets session state if already set", () => {
      const expectedSessionStorageValue = {
        a: "Test A",
        b: "Test B",
      } as const;

      window.sessionStorage.setItem(
        "testKey",
        JSON.stringify(expectedSessionStorageValue),
      );

      const { result } = renderHook(() =>
        useSessionStorageState({
          initialState: {},
          key: "testKey",
        }),
      );

      expect(result.current.sessionState).toEqual(expectedSessionStorageValue);
    });

    test("updates session storage with value", () => {
      const expectedSessionStorageValue = {
        a: "Test A",
        b: "Test B",
      } as const;

      const initialState = {};

      const { result } = renderHook(() =>
        useSessionStorageState({
          initialState,
          key: "testKey",
        }),
      );

      act(() => {
        result.current.setSessionState(expectedSessionStorageValue);
      });

      expect(result.current.sessionState).toEqual(expectedSessionStorageValue);
    });

    test("updates session storage after local state update", () => {
      const expectedSessionStorageValue = {
        a: "Test A",
        b: "Test B",
      } as const;

      const initialState = {};

      const { result } = renderHook(() =>
        useSessionStorageState({
          initialState,
          key: "testKey",
        }),
      );

      act(() => {
        result.current.setSessionState(expectedSessionStorageValue);
      });

      expect(window.sessionStorage.getItem("testKey")).toBe(
        JSON.stringify(expectedSessionStorageValue),
      );
    });

    test("updates state after 2 updates", () => {
      const expectedSessionStorageValue = "This is the expected value.";

      const { result } = renderHook(() =>
        useSessionStorageState({
          initialState: "",
          key: "testKey",
        }),
      );

      act(() => {
        result.current.setSessionState("This is a test.");
      });

      act(() => {
        result.current.setSessionState(expectedSessionStorageValue);
      });

      expect(result.current.sessionState).toEqual(expectedSessionStorageValue);
    });

    test("gets correct session storage value after updating `key`", () => {
      const expectedSessionStorageValueA = "Test A";
      const expectedSessionStorageValueB = "Test B";

      const { result, rerender } = renderHook(
        (key: string) =>
          useSessionStorageState({
            initialState: "",
            key,
          }),
        {
          initialProps: "testKey",
        },
      );

      act(() => {
        result.current.setSessionState(expectedSessionStorageValueA);
      });

      act(() => {
        rerender("newTestKey");
      });

      act(() => {
        result.current.setSessionState(expectedSessionStorageValueB);
      });

      expect(result.current.sessionState).toBe(expectedSessionStorageValueB);

      act(() => {
        rerender("testKey");
      });

      expect(result.current.sessionState).toBe(expectedSessionStorageValueA);
    });
  });

  describe("initial state", () => {
    test("is null when null", () => {
      const { result } = renderHook(() =>
        useSessionStorageState({
          initialState: null,
          key: "testKey",
        }),
      );

      expect(result.current.sessionState).toBe(null);
    });

    test("is string when string", () => {
      const expectedValue = "This is a test.";

      const { result } = renderHook(() =>
        useSessionStorageState({
          initialState: expectedValue,
          key: "testKey",
        }),
      );

      expect(result.current.sessionState).toBe(expectedValue);
    });

    test("is object when object", () => {
      const expectedValue = {
        a: "Test A",
        b: "Test B",
      };

      const { result } = renderHook(() =>
        useSessionStorageState({
          initialState: expectedValue,
          key: "testKey",
        }),
      );

      expect(result.current.sessionState).toBe(expectedValue);
    });

    test("retains state after update", () => {
      const expectedValue = {
        a: "Test A",
        b: "Test B",
      };

      const initialState = {};

      const { result } = renderHook(() =>
        useSessionStorageState({
          initialState,
          key: "testKey",
        }),
      );

      act(() => {
        result.current.setSessionState(expectedValue);
      });

      expect(result.current.sessionState).toBe(expectedValue);
    });

    test("changes session storage state after updating `initialState`", () => {
      const expectedSessionStorageValueA = "Test A";
      const expectedSessionStorageValueB = "Test B";

      const { result, rerender } = renderHook(
        (initialState: string) =>
          useSessionStorageState({
            initialState,
            key: "testKey",
          }),
        {
          initialProps: expectedSessionStorageValueA,
        },
      );

      expect(result.current.sessionState).toBe(expectedSessionStorageValueA);

      act(() => {
        rerender("Test B");
      });

      expect(result.current.sessionState).toBe(expectedSessionStorageValueB);
    });
  });
});
