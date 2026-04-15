export const UI_COMPONENT_IDENTIFIER_STORAGE_KEY =
  "ui-component-identifier-state";
const CURRENT_VERSION = 1;

export type MenuPosition =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left";

export type PersistedState = {
  groupExpanded: Record<string, boolean>;
  isMenuMinimized: boolean;
  isMenuOpen: boolean;
  menuPosition: MenuPosition;
  scannerStates: Record<string, boolean>;
  version: number;
};

const DEFAULT_STATE: PersistedState = {
  version: CURRENT_VERSION,
  isMenuMinimized: false,
  isMenuOpen: false,
  menuPosition: "bottom-right",
  scannerStates: {},
  groupExpanded: {},
};

const hasMatchingVersion = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" &&
  value !== null &&
  "version" in value &&
  (value as Record<string, unknown>).version === CURRENT_VERSION;

/**
 * Reads the persisted state from localStorage. Returns `null` if
 * nothing is stored, the stored JSON is unparseable, or the schema version
 * does not match the current version. Partial objects are normalized
 * against defaults so the returned state is always fully populated.
 */
export const readState = (): PersistedState | null => {
  try {
    const raw = localStorage.getItem(UI_COMPONENT_IDENTIFIER_STORAGE_KEY);
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (hasMatchingVersion(parsed)) {
        return { ...DEFAULT_STATE, ...parsed };
      }
    }

    return null;
  } catch (error) {
    console.error("There was an error reading from local storage", error);
    return null;
  }
};

/**
 * Merges a partial update into the persisted state. Missing fields
 * fall back to the current stored value, then to sensible defaults, so
 * callers only need to provide the fields they want to change.
 */
export const writeState = (
  update: Partial<Omit<PersistedState, "version">>,
): void => {
  try {
    const current = readState() ?? DEFAULT_STATE;
    const next: PersistedState = {
      ...current,
      ...update,
      version: CURRENT_VERSION,
      scannerStates: { ...current.scannerStates, ...update.scannerStates },
      groupExpanded: { ...current.groupExpanded, ...update.groupExpanded },
    };
    localStorage.setItem(
      UI_COMPONENT_IDENTIFIER_STORAGE_KEY,
      JSON.stringify(next),
    );
  } catch (error) {
    console.error("There was an error writing to local storage", error);
  }
};

/**
 * Subscribes to cross-tab state changes by listening for `storage` events
 * on the state key. The callback is invoked with the latest valid state
 * whenever another tab writes to localStorage. Returns an unsubscribe
 * function.
 */
export const subscribeToChanges = (
  callback: (state: PersistedState) => void,
): (() => void) => {
  const handler = (event: StorageEvent) => {
    if (event.key !== UI_COMPONENT_IDENTIFIER_STORAGE_KEY) return;
    const state = readState();
    if (state) callback(state);
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
};
