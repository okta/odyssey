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

import React, { useMemo, useState } from "react";
import type { ReactNode } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { Active, Announcements, UniqueIdentifier } from "@dnd-kit/core";
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import { SortableItem } from "./SortableItem";
import { SortableOverlay } from "./SortableOverlay";
import { useTranslation } from "react-i18next";

export interface BaseItem {
  id: UniqueIdentifier;
  isDisabled: boolean | undefined;
  isSelected: boolean | undefined;
  isSortable: boolean | undefined;
  navItem: ReactNode;
}

interface ListProps<T extends BaseItem> {
  parentId: string;
  items: T[];
  onChange(parentId: string, activeIndex: number, overIndex: number): void;
  renderItem(item: T): ReactNode;
}

export const SortableList = <T extends BaseItem>({
  parentId,
  items,
  onChange,
  renderItem,
}: ListProps<T>) => {
  const [active, setActive] = useState<Active | null>(null);
  const activeItem = useMemo(
    () => items.find((item) => item.id === active?.id),
    [active, items],
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const { t } = useTranslation();
  const announcements: Announcements = useMemo(
    () => ({
      onDragStart: ({ active }) => {
        return `${t("sortable.list.drag.start", { activeId: active.id })}`;
      },
      onDragOver: ({ active, over }) => {
        if (over) {
          return `${t("sortable.list.drag.moved.over", { activeId: active.id, overId: over.id })}`;
        }
        return `${t("sortable.list.drag.nolonger.over", { activeId: active.id })}`;
      },
      onDragEnd: ({ active, over }) => {
        if (over) {
          return `${t("sortable.list.drag.end.dropped.over", { activeId: active.id, overId: over.id })}`;
        }
        return `${t("sortable.list.drag.end.dropped", { activeId: active.id })}`;
      },
      onDragCancel: ({ active }) => {
        return `${t("sortable.list.drag.cancel", { activeId: active.id })}`;
      },
    }),
    [t],
  );

  return (
    <DndContext
      accessibility={{ announcements: announcements }}
      sensors={sensors}
      onDragStart={({ active }) => {
        setActive(active);
      }}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over?.id) {
          const activeIndex = items.findIndex(({ id }) => id === active.id);
          const overIndex = items.findIndex(({ id }) => id === over.id);
          if (items[overIndex].isSortable) {
            onChange(parentId, activeIndex, overIndex);
          }
        }
        setActive(null);
      }}
      onDragCancel={() => {
        setActive(null);
      }}
    >
      <SortableContext items={items}>
        {items.map((item) => (
          <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
        ))}
      </SortableContext>
      <SortableOverlay>
        {activeItem ? renderItem(activeItem) : null}
      </SortableOverlay>
    </DndContext>
  );
};

SortableList.Item = SortableItem;
