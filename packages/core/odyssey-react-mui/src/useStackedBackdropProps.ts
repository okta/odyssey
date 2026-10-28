/*!
 * Copyright (c) 2026-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { useLayoutEffect, useMemo } from "react";
// React's `useSyncExternalStore` does not exist before React 18. The shim delegates to the native hook on React 18.
import { useSyncExternalStore } from "use-sync-external-store/shim";

import { type BackdropStack, defaultBackdropStack } from "./backdropStack.js";
import { useUniqueId } from "./useUniqueId.js";

export type UseStackedBackdropPropsArgs = {
  /**
   * The stack this backdrop joins.
   * @default defaultBackdropStack
   */
  backdropStack?: BackdropStack;
  /**
   * If `true`, the overlay is open and its backdrop joins the stack.
   */
  isOpen: boolean;
  /**
   * The z-index the overlay renders at, such as `theme.zIndex.modal`.
   */
  layer: number;
};

export type StackedBackdropProps = {
  invisible: boolean;
  transitionDuration?: number;
};

/**
 * Get the backdrop props that keep stacked overlays from darkening the page more than once. Only the top-most open backdrop paints.
 */
export const useStackedBackdropProps = ({
  backdropStack = defaultBackdropStack,
  isOpen,
  layer,
}: UseStackedBackdropPropsArgs): StackedBackdropProps => {
  const backdropId = useUniqueId();

  const openBackdropIds = useSyncExternalStore(
    backdropStack.subscribeToOpenBackdropIds,
    backdropStack.getOpenBackdropIds,
    backdropStack.getOpenBackdropIds,
  );

  // A layout effect, so the backdrop underneath hides in the same frame the new one appears, not one paint later.
  useLayoutEffect(
    () =>
      isOpen ? backdropStack.openBackdrop({ backdropId, layer }) : undefined,
    [backdropId, backdropStack, isOpen, layer],
  );

  return useMemo(
    () => ({
      // A closing backdrop has already left the stack but stays mounted while it fades out, so membership alone would leave it painted under an overlay that opens during that fade.
      invisible:
        openBackdropIds.length > 0 && openBackdropIds.at(-1) !== backdropId,
      // A backdrop fading in or out over another one would briefly show both, so the gray changes in one step. The last backdrop to close still fades out.
      ...(openBackdropIds.some(
        (openBackdropId) => openBackdropId !== backdropId,
      ) && { transitionDuration: 0 }),
    }),
    [backdropId, openBackdropIds],
  );
};
