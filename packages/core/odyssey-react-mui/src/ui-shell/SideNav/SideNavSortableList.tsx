/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { UniqueIdentifier } from "@dnd-kit/core";
import { memo, useCallback, useMemo } from "react";

import type { SideNavItem } from "./types.js";

import { BaseItem, SortableList } from "./SortableList/SortableList.js";

export type SideNavSortableListProps = {
  /**
   * The depth level for nested items
   */
  depth?: number;
  /**
   * The nav items to render as sortable list
   */
  items: SideNavItem[];
  /**
   * Callback when items are reordered
   */
  onChange: (
    parentId: string,
    activeId: UniqueIdentifier,
    activeIndex: number,
    overIndex: number,
  ) => void;
  /**
   * The parent ID for the sortable list
   */
  parentId: string;
  /**
   * Function to process nav items into sortable items
   */
  processSideNavItems: (
    items: SideNavItem[],
    depth?: number,
  ) => (SideNavItem & { sortableItem: BaseItem })[];
};

const SideNavSortableList = ({
  items,
  onChange,
  parentId,
  processSideNavItems,
  depth = 1,
}: SideNavSortableListProps) => {
  const processedItems = useMemo(
    () => processSideNavItems(items, depth),
    [processSideNavItems, items, depth],
  );

  const sortableItems = useMemo(
    () => processedItems.map((item) => item.sortableItem),
    [processedItems],
  );

  const renderItem = useCallback(
    (sortableItem: BaseItem) => (
      <SortableList.Item
        id={sortableItem.id}
        isDisabled={sortableItem.isDisabled}
        isSelected={sortableItem.isSelected}
        isSortable={sortableItem.isSortable}
      >
        {sortableItem.navItem}
      </SortableList.Item>
    ),
    [],
  );

  return (
    <SortableList
      items={sortableItems}
      onChange={onChange}
      parentId={parentId}
      renderItem={renderItem}
    />
  );
};

const MemoizedSideNavSortableList = memo(SideNavSortableList);
MemoizedSideNavSortableList.displayName = "SideNavSortableList";

export { MemoizedSideNavSortableList as SideNavSortableList };
