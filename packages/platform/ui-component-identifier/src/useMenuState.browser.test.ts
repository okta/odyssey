import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";

import {
  type PersistedState,
  UI_COMPONENT_IDENTIFIER_STORAGE_KEY,
  writeState,
} from "./stateStorage.js";
import { POSITION_STYLES, useMenuState } from "./useMenuState.js";

describe("useMenuState", () => {
  afterEach(() => {
    localStorage.clear();
  });

  test("initializes to 'bottom-right' when no stored state", () => {
    const { result } = renderHook(() => useMenuState());

    expect(result.current.menuPosition).toBe("bottom-right");
  });

  test("initializes from localStorage when state exists", () => {
    writeState({ menuPosition: "top-left" });

    const { result } = renderHook(() => useMenuState());

    expect(result.current.menuPosition).toBe("top-left");
  });

  test("handleCornerChange updates position and writes to storage", () => {
    const { result } = renderHook(() => useMenuState());

    act(() => {
      result.current.handleCornerChange("top-right");
    });

    expect(result.current.menuPosition).toBe("top-right");

    const raw = localStorage.getItem(UI_COMPONENT_IDENTIFIER_STORAGE_KEY);
    const stored = JSON.parse(raw!) as PersistedState;
    expect(stored.menuPosition).toBe("top-right");
  });

  test("cross-tab sync updates position when storage changes externally", () => {
    const { result } = renderHook(() => useMenuState());

    expect(result.current.menuPosition).toBe("bottom-right");

    // Simulate another tab writing to storage
    writeState({ menuPosition: "bottom-left" });

    act(() => {
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: UI_COMPONENT_IDENTIFIER_STORAGE_KEY,
        }),
      );
    });

    expect(result.current.menuPosition).toBe("bottom-left");
  });

  describe("isMinimized", () => {
    test("defaults to false when no stored state", () => {
      const { result } = renderHook(() => useMenuState());

      expect(result.current.isMinimized).toBe(false);
    });

    test("initializes from localStorage when state exists", () => {
      writeState({ isMenuMinimized: true });

      const { result } = renderHook(() => useMenuState());

      expect(result.current.isMinimized).toBe(true);
    });

    test("toggleMinimized flips value and writes to storage", () => {
      const { result } = renderHook(() => useMenuState());

      expect(result.current.isMinimized).toBe(false);

      act(() => {
        result.current.toggleMinimized();
      });

      expect(result.current.isMinimized).toBe(true);

      const raw = localStorage.getItem(UI_COMPONENT_IDENTIFIER_STORAGE_KEY);
      const stored = JSON.parse(raw!) as PersistedState;
      expect(stored.isMenuMinimized).toBe(true);

      act(() => {
        result.current.toggleMinimized();
      });

      expect(result.current.isMinimized).toBe(false);
    });

    test("cross-tab sync updates isMinimized when storage changes externally", () => {
      const { result } = renderHook(() => useMenuState());

      expect(result.current.isMinimized).toBe(false);

      writeState({ isMenuMinimized: true });

      act(() => {
        window.dispatchEvent(
          new StorageEvent("storage", {
            key: UI_COMPONENT_IDENTIFIER_STORAGE_KEY,
          }),
        );
      });

      expect(result.current.isMinimized).toBe(true);
    });
  });

  describe("positionStyles", () => {
    test.each([
      "bottom-right",
      "bottom-left",
      "top-right",
      "top-left",
    ] as const)("returns correct styles for %s", (corner) => {
      writeState({ menuPosition: corner });

      const { result } = renderHook(() => useMenuState());

      expect(result.current.positionStyles).toEqual(POSITION_STYLES[corner]);
    });
  });
});
