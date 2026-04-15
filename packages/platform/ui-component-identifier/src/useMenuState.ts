import { useCallback, useEffect, useState } from "react";

import {
  type MenuPosition,
  readState,
  subscribeToChanges,
  writeState,
} from "./stateStorage.js";

export const MENU_EDGE_OFFSET = 20;

export const POSITION_STYLES: Record<
  MenuPosition,
  Record<string, typeof MENU_EDGE_OFFSET | "unset">
> = {
  "bottom-right": {
    bottom: MENU_EDGE_OFFSET,
    right: MENU_EDGE_OFFSET,
    top: "unset",
    left: "unset",
  },
  "bottom-left": {
    bottom: MENU_EDGE_OFFSET,
    left: MENU_EDGE_OFFSET,
    top: "unset",
    right: "unset",
  },
  "top-right": {
    top: MENU_EDGE_OFFSET,
    right: MENU_EDGE_OFFSET,
    bottom: "unset",
    left: "unset",
  },
  "top-left": {
    top: MENU_EDGE_OFFSET,
    left: MENU_EDGE_OFFSET,
    bottom: "unset",
    right: "unset",
  },
};

// See conversation regarding combining isMinimized/isOpen state:
// https://github.com/atko-eng/odyssey-design-system/pull/227#discussion_r3012128292
export const useMenuState = () => {
  const [menuPosition, setMenuPosition] = useState<MenuPosition>(
    () => readState()?.menuPosition ?? "bottom-right",
  );
  const [isMinimized, setIsMinimized] = useState<boolean>(
    () => readState()?.isMenuMinimized ?? false,
  );

  const handleCornerChange = useCallback((next: MenuPosition) => {
    setMenuPosition(next);
    writeState({ menuPosition: next });
  }, []);

  const toggleMinimized = useCallback(() => {
    setIsMinimized((prev) => {
      const next = !prev;
      writeState({ isMenuMinimized: next });
      return next;
    });
  }, []);

  useEffect(() => {
    return subscribeToChanges((state) => {
      setMenuPosition(state.menuPosition);
      setIsMinimized(state.isMenuMinimized);
    });
  }, []);

  return {
    menuPosition,
    positionStyles: POSITION_STYLES[menuPosition],
    handleCornerChange,
    isMinimized,
    toggleMinimized,
  };
};
