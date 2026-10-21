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

import { useCallback, useMemo } from "react";
import { useSyncExternalStoreWithSelector } from "use-sync-external-store/shim/with-selector";

import {
  createFullscreenModeMessageBus,
  emptyFullscreenState,
  type FullscreenModeMessageBus,
  type FullscreenState,
  getFullscreenStackIndex,
  getHasActiveFullscreen,
  getIsFullscreen,
  getIsInFullscreenStack,
} from "../message-bus/index.js";
import { createStore } from "../tools/createStore.js";

export type UseFullscreenArgs = {
  /**
   * The id from `useFullscreenId`, shared by the `FullscreenRegion` and every `FullscreenButton` that controls it.
   */
  fullscreenId: string;
};

export type UseFullscreenResult = {
  /**
   * Put this id on top of the page's fullscreen stack, so its region is the one shown.
   */
  enterFullscreen: () => void;
  /**
   * Take this id out of the stack, wherever it is. The region under it, if any, is shown again.
   */
  exitFullscreen: () => void;
  /**
   * Where this id sits in the stack, from `0` at the bottom, or `-1` when it isn't in fullscreen. A region uses it to stack above the regions under it.
   */
  fullscreenStackIndex: number;
  /**
   * `true` when **anything** on the page is in fullscreen, in any app. UI Shell reads this to hide its navigation and banners.
   */
  hasActiveFullscreen: boolean;
  /**
   * `true` when this id is on **top** of the stack, so its region is the one the user sees and works in. Read this for focus, `inert`, and announcements.
   */
  isFullscreen: boolean;
  /**
   * `true` when this id is **anywhere** in the stack, even covered by a region above it. Read this for what lasts until the id exits: the region staying fixed over the page, and its button reading as pressed.
   */
  isInFullscreenStack: boolean;
  /**
   * Exit if this id is in the stack, otherwise enter.
   */
  toggleFullscreen: () => void;
};

type FullscreenSelection = Pick<
  UseFullscreenResult,
  | "fullscreenStackIndex"
  | "hasActiveFullscreen"
  | "isFullscreen"
  | "isInFullscreenStack"
>;

type SharedConnectionStore = {
  connection: { fullscreenModeMessageBus?: FullscreenModeMessageBus };
  subscriberCount: number;
};

/**
 * One connection per bundle, opened by the first subscriber and closed by the last. Every hook in the bundle reads the same stack, and the page keeps one `message` listener per bundle no matter how many regions render.
 */
const createSharedFullscreenModeMessageBus = () => {
  const store = createStore<SharedConnectionStore>({
    connection: {},
    subscriberCount: 0,
  });

  const getFullscreenModeMessageBus = () =>
    store.getState("connection")?.fullscreenModeMessageBus;

  const getSubscriberCount = () => store.getState("subscriberCount") ?? 0;

  const subscribe = (onStoreChange: () => void) => {
    const fullscreenModeMessageBus =
      getFullscreenModeMessageBus() ?? createFullscreenModeMessageBus();
    const isFirstSubscriber = getSubscriberCount() === 0;

    store.setState("connection", { fullscreenModeMessageBus });
    store.setState("subscriberCount", getSubscriberCount() + 1);

    const unsubscribeFromFullscreenState =
      fullscreenModeMessageBus.subscribeToFullscreenState(onStoreChange);

    if (isFirstSubscriber) {
      fullscreenModeMessageBus.requestFullscreenState();
    }

    return () => {
      unsubscribeFromFullscreenState();
      store.setState("subscriberCount", getSubscriberCount() - 1);

      if (getSubscriberCount() === 0) {
        fullscreenModeMessageBus.destroy();
        store.setState("connection", {});
      }
    };
  };

  const getFullscreenState = (): FullscreenState =>
    getFullscreenModeMessageBus()?.getFullscreenState() ?? emptyFullscreenState;

  // A region's unmount cleanup runs after its own subscription closes, so its exit can arrive with no connection open. Sending needs no subscription, so a request never waits on one.
  const publishFullscreenRequest = (
    sendRequest: (fullscreenModeMessageBus: FullscreenModeMessageBus) => void,
  ) => {
    const openFullscreenModeMessageBus = getFullscreenModeMessageBus();

    if (openFullscreenModeMessageBus) {
      sendRequest(openFullscreenModeMessageBus);

      return;
    }

    const requestFullscreenModeMessageBus = createFullscreenModeMessageBus();

    sendRequest(requestFullscreenModeMessageBus);
    requestFullscreenModeMessageBus.destroy();
  };

  return { getFullscreenState, publishFullscreenRequest, subscribe };
};

const sharedFullscreenModeMessageBus = createSharedFullscreenModeMessageBus();

const getIsSameFullscreenSelection = (
  currentSelection: FullscreenSelection,
  nextSelection: FullscreenSelection,
) =>
  currentSelection.fullscreenStackIndex ===
    nextSelection.fullscreenStackIndex &&
  currentSelection.hasActiveFullscreen === nextSelection.hasActiveFullscreen &&
  currentSelection.isFullscreen === nextSelection.isFullscreen &&
  currentSelection.isInFullscreenStack === nextSelection.isInFullscreenStack;

/**
 * Read and change one fullscreen id's place on the page.
 *
 * The page's stack lives in the fullscreen mode host, which Unified UI Shell runs. Every hook opens its own subscription to it, so a change re-renders only the components whose values changed. Without a host on the page, the stack stays empty and entering does nothing.
 *
 * | Value | `true` when | Use it for |
 * | --- | --- | --- |
 * | `isFullscreen` | this id is on top of the stack | focus, `inert`, announcements |
 * | `isInFullscreenStack` | this id is anywhere in the stack | staying fixed, a pressed button |
 * | `hasActiveFullscreen` | anything on the page is in fullscreen | hiding the shell's chrome |
 *
 * @experimental The fullscreen API is in alpha and may change in a future release.
 */
export const useFullscreen = ({
  fullscreenId,
}: UseFullscreenArgs): UseFullscreenResult => {
  const fullscreenSelection = useSyncExternalStoreWithSelector(
    sharedFullscreenModeMessageBus.subscribe,
    sharedFullscreenModeMessageBus.getFullscreenState,
    sharedFullscreenModeMessageBus.getFullscreenState,
    ({ fullscreenStack }): FullscreenSelection => ({
      fullscreenStackIndex: getFullscreenStackIndex({
        fullscreenId,
        fullscreenStack,
      }),
      hasActiveFullscreen: getHasActiveFullscreen({ fullscreenStack }),
      isFullscreen: getIsFullscreen({ fullscreenId, fullscreenStack }),
      isInFullscreenStack: getIsInFullscreenStack({
        fullscreenId,
        fullscreenStack,
      }),
    }),
    getIsSameFullscreenSelection,
  );

  const enterFullscreen = useCallback(() => {
    sharedFullscreenModeMessageBus.publishFullscreenRequest(
      (fullscreenModeMessageBus) =>
        fullscreenModeMessageBus.enterFullscreen({ fullscreenId }),
    );
  }, [fullscreenId]);

  const exitFullscreen = useCallback(() => {
    sharedFullscreenModeMessageBus.publishFullscreenRequest(
      (fullscreenModeMessageBus) =>
        fullscreenModeMessageBus.exitFullscreen({ fullscreenId }),
    );
  }, [fullscreenId]);

  const toggleFullscreen = useCallback(() => {
    if (fullscreenSelection.isInFullscreenStack) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  }, [
    enterFullscreen,
    exitFullscreen,
    fullscreenSelection.isInFullscreenStack,
  ]);

  return useMemo(
    () => ({
      ...fullscreenSelection,
      enterFullscreen,
      exitFullscreen,
      toggleFullscreen,
    }),
    [enterFullscreen, exitFullscreen, fullscreenSelection, toggleFullscreen],
  );
};

/**
 * `true` when anything on the page is in fullscreen, in any app. For page chrome, such as UI Shell's navigation, that hides while a region fills the screen. It re-renders only when that answer changes.
 *
 * @experimental The fullscreen API is in alpha and may change in a future release.
 */
export const useHasActiveFullscreen = () =>
  useSyncExternalStoreWithSelector(
    sharedFullscreenModeMessageBus.subscribe,
    sharedFullscreenModeMessageBus.getFullscreenState,
    sharedFullscreenModeMessageBus.getFullscreenState,
    getHasActiveFullscreen,
  );
