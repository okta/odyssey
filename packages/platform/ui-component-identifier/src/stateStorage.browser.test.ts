import { afterEach, describe, expect, test, vi } from "vitest";

import {
  type PersistedState,
  readState,
  subscribeToChanges,
  UI_COMPONENT_IDENTIFIER_STORAGE_KEY,
  writeState,
} from "./stateStorage.js";

const validState: PersistedState = {
  version: 1,
  isMenuMinimized: false,
  isMenuOpen: true,
  menuPosition: "bottom-right",
  scannerStates: { "scanner-a": true, "scanner-b": false },
  groupExpanded: { GroupA: true, GroupB: false },
};

describe("stateStorage", () => {
  afterEach(() => {
    localStorage.clear();
  });

  describe(readState.name, () => {
    test("returns null when nothing is stored", () => {
      expect(readState()).toBeNull();
    });

    test("returns parsed state when valid", () => {
      localStorage.setItem(
        UI_COMPONENT_IDENTIFIER_STORAGE_KEY,
        JSON.stringify(validState),
      );

      expect(readState()).toEqual(validState);
    });

    test("returns null when version does not match", () => {
      localStorage.setItem(
        UI_COMPONENT_IDENTIFIER_STORAGE_KEY,
        JSON.stringify({ ...validState, version: 999 }),
      );

      expect(readState()).toBeNull();
    });

    test("returns null when stored value is invalid JSON", () => {
      localStorage.setItem(UI_COMPONENT_IDENTIFIER_STORAGE_KEY, "not-json");

      expect(readState()).toBeNull();
    });

    test("normalizes partial state with defaults when version matches", () => {
      const partial = { version: 1, isMenuOpen: true };
      localStorage.setItem(
        UI_COMPONENT_IDENTIFIER_STORAGE_KEY,
        JSON.stringify(partial),
      );

      expect(readState()).toEqual({
        version: 1,
        isMenuMinimized: false,
        isMenuOpen: true,
        menuPosition: "bottom-right",
        scannerStates: {},
        groupExpanded: {},
      });
    });
  });

  describe(writeState.name, () => {
    test("writes a full state when nothing exists", () => {
      writeState({ isMenuOpen: true });

      expect(readState()).toEqual({
        version: 1,
        isMenuMinimized: false,
        isMenuOpen: true,
        menuPosition: "bottom-right",
        scannerStates: {},
        groupExpanded: {},
      });
    });

    test("merges partial updates with existing state", () => {
      writeState({ isMenuOpen: true, scannerStates: { a: true } });
      writeState({ scannerStates: { b: false } });

      const state = readState();
      expect(state?.isMenuOpen).toBe(true);
      expect(state?.scannerStates).toEqual({ a: true, b: false });
    });

    test("overwrites existing fields in a partial update", () => {
      writeState({ isMenuOpen: true });
      writeState({ isMenuOpen: false });

      expect(readState()?.isMenuOpen).toBe(false);
    });

    test("merges groupExpanded with existing values", () => {
      writeState({ groupExpanded: { Odyssey: true } });
      writeState({ groupExpanded: { Contributions: false } });

      expect(readState()?.groupExpanded).toEqual({
        Odyssey: true,
        Contributions: false,
      });
    });
  });

  describe(subscribeToChanges.name, () => {
    test("calls callback when storage event fires for state key", () => {
      localStorage.setItem(
        UI_COMPONENT_IDENTIFIER_STORAGE_KEY,
        JSON.stringify(validState),
      );

      const callback = vi.fn();
      const unsubscribe = subscribeToChanges(callback);

      window.dispatchEvent(
        new StorageEvent("storage", {
          key: UI_COMPONENT_IDENTIFIER_STORAGE_KEY,
        }),
      );

      expect(callback).toHaveBeenCalledWith(validState);

      unsubscribe();
    });

    test("ignores storage events for other keys", () => {
      const callback = vi.fn();
      const unsubscribe = subscribeToChanges(callback);

      window.dispatchEvent(new StorageEvent("storage", { key: "other-key" }));

      expect(callback).not.toHaveBeenCalled();

      unsubscribe();
    });

    test("does not call callback after unsubscribe", () => {
      localStorage.setItem(
        UI_COMPONENT_IDENTIFIER_STORAGE_KEY,
        JSON.stringify(validState),
      );

      const callback = vi.fn();
      const unsubscribe = subscribeToChanges(callback);
      unsubscribe();

      window.dispatchEvent(
        new StorageEvent("storage", {
          key: UI_COMPONENT_IDENTIFIER_STORAGE_KEY,
        }),
      );

      expect(callback).not.toHaveBeenCalled();
    });

    test("does not call callback when stored state is invalid", () => {
      localStorage.setItem(UI_COMPONENT_IDENTIFIER_STORAGE_KEY, "invalid");

      const callback = vi.fn();
      const unsubscribe = subscribeToChanges(callback);

      window.dispatchEvent(
        new StorageEvent("storage", {
          key: UI_COMPONENT_IDENTIFIER_STORAGE_KEY,
        }),
      );

      expect(callback).not.toHaveBeenCalled();

      unsubscribe();
    });
  });
});
