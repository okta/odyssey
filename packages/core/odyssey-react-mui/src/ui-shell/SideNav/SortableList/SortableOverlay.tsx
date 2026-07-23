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

import type { PropsWithChildren } from "react";

import {
  defaultDropAnimationSideEffects,
  DragOverlay,
  DropAnimation,
} from "@dnd-kit/core";
import { createContext, useContext } from "react";

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.4",
      },
    },
  }),
};

type DragOverlayContextValue = {
  isGrabbed: boolean;
};

// @dnd-kit renders two copies of the dragged row: the source item that stays in
// the list (flagged by `useSortable().isDragging`) and this floating overlay
// copy that follows the pointer. The overlay renders outside SortableContext,
// so it has no `isDragging` flag of its own. This context lets nested components
// tell they are inside the overlay (the "grabbed" copy) vs. the source ghost.
const DragOverlayContext = createContext<DragOverlayContextValue>({
  isGrabbed: false,
});

export const useDragOverlayContext = () => useContext(DragOverlayContext);

// Stable reference so the provider doesn't re-render every consumer each render.
const dragOverlayContextValue: DragOverlayContextValue = { isGrabbed: true };

export function SortableOverlay({ children }: PropsWithChildren<object>) {
  return (
    <DragOverlay dropAnimation={dropAnimationConfig}>
      <DragOverlayContext.Provider value={dragOverlayContextValue}>
        {children}
      </DragOverlayContext.Provider>
    </DragOverlay>
  );
}
