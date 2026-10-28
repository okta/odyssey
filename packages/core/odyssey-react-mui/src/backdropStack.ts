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

import {
  createMessageBus,
  type UnsubscribeMessageSubscription,
} from "./tools/createMessageBus.js";
import { createStore } from "./tools/createStore.js";

export type CloseBackdrop = () => void;

export type OpenBackdropArgs = {
  backdropId: string;
  /**
   * The z-index the overlay renders at. A higher layer paints above a lower one no matter which opened first, so it decides the order before opening order does.
   */
  layer: number;
};

export type CloseBackdropArgs = Pick<OpenBackdropArgs, "backdropId">;

export type BackdropStack = {
  /**
   * The ids of every open backdrop, bottom first: by layer, then by opening order. The last one is on top. The array keeps its identity until the stack changes, so it is safe to return from a `useSyncExternalStore` snapshot.
   */
  getOpenBackdropIds: () => readonly string[];
  /**
   * Put a backdrop on top of every open backdrop in its layer. Returns the function that takes it back off.
   */
  openBackdrop: (args: OpenBackdropArgs) => CloseBackdrop;
  subscribeToOpenBackdropIds: (
    listener: () => void,
  ) => UnsubscribeMessageSubscription;
};

const noOpenBackdrops: readonly OpenBackdropArgs[] = [];
const noOpenBackdropIds: readonly string[] = [];

const getOpenBackdropsWithout = ({
  backdropId,
  openBackdrops,
}: CloseBackdropArgs & { openBackdrops: readonly OpenBackdropArgs[] }) =>
  openBackdrops.filter(
    (openBackdrop) => openBackdrop.backdropId !== backdropId,
  );

/**
 * Create a stack of open backdrops, so stacked overlays can agree on which one paints.
 */
export const createBackdropStack = (): BackdropStack => {
  const store = createStore<{
    openBackdropIds: readonly string[];
    openBackdrops: readonly OpenBackdropArgs[];
  }>({
    openBackdropIds: noOpenBackdropIds,
    openBackdrops: noOpenBackdrops,
  });

  const openBackdropIdsBus = createMessageBus();

  const getOpenBackdropIds = () =>
    store.getState("openBackdropIds") ?? noOpenBackdropIds;

  const getOpenBackdrops = () =>
    store.getState("openBackdrops") ?? noOpenBackdrops;

  const setOpenBackdrops = (openBackdrops: readonly OpenBackdropArgs[]) => {
    store.setState("openBackdrops", openBackdrops);
    // Derived once here rather than on read, so the snapshot keeps its identity between changes.
    store.setState(
      "openBackdropIds",
      openBackdrops.map((openBackdrop) => openBackdrop.backdropId),
    );
    openBackdropIdsBus.publish();
  };

  const closeBackdrop = ({ backdropId }: CloseBackdropArgs) => {
    if (getOpenBackdropIds().includes(backdropId)) {
      setOpenBackdrops(
        getOpenBackdropsWithout({
          backdropId,
          openBackdrops: getOpenBackdrops(),
        }),
      );
    }
  };

  return {
    getOpenBackdropIds,
    openBackdrop: ({ backdropId, layer }) => {
      const otherOpenBackdrops = getOpenBackdropsWithout({
        backdropId,
        openBackdrops: getOpenBackdrops(),
      });

      const higherLayerIndex = otherOpenBackdrops.findIndex(
        (openBackdrop) => openBackdrop.layer > layer,
      );

      const insertionIndex =
        higherLayerIndex === -1 ? otherOpenBackdrops.length : higherLayerIndex;

      setOpenBackdrops(
        otherOpenBackdrops
          .slice(0, insertionIndex)
          .concat({ backdropId, layer })
          .concat(otherOpenBackdrops.slice(insertionIndex)),
      );

      return () => closeBackdrop({ backdropId });
    },
    subscribeToOpenBackdropIds: openBackdropIdsBus.subscribe,
  };
};

/**
 * The one stack every Odyssey overlay in this bundle shares.
 */
export const defaultBackdropStack = createBackdropStack();
