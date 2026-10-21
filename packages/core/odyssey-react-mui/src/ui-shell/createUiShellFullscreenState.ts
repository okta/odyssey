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
  createFullscreenId,
  createFullscreenModeMessageBus as defaultCreateFullscreenModeMessageBus,
  emptyFullscreenState,
  type FullscreenModeMessageBus,
  type FullscreenState,
  getHasActiveFullscreen,
} from "../message-bus/index.js";
import { createMessageBus } from "../tools/createMessageBus.js";
import { createStore } from "../tools/createStore.js";

export type DisconnectUiShellFullscreenState = () => void;

export type UiShellFullscreenState = {
  /**
   * Start listening for the page's fullscreen stack. UI Shell calls this when it mounts, and the function it returns when it unmounts, so the shell never leaves a listener on the page after it's gone.
   *
   * Disconnecting takes the app area out of fullscreen and reports an empty stack, since nothing is listening anymore.
   */
  connect: () => DisconnectUiShellFullscreenState;
  /**
   * Put the whole app area in fullscreen. UI Shell hides its top nav, side nav, and banners so the app fills the page. Does nothing while disconnected.
   */
  enterAppFullscreen: () => void;
  /**
   * Take the app area out of fullscreen. A `FullscreenRegion` that entered on top of it stays in fullscreen.
   */
  exitAppFullscreen: () => void;
  getFullscreenState: FullscreenModeMessageBus["getFullscreenState"];
  /**
   * Listen for fullscreen changes. Listeners stay subscribed while UI Shell is removed and added back.
   */
  subscribeToFullscreenState: FullscreenModeMessageBus["subscribeToFullscreenState"];
};

export type CreateUiShellFullscreenStateArgs = {
  /**
   * Creates the message bus that reads and changes the page's fullscreen stack.
   * @default createFullscreenModeMessageBus
   */
  createFullscreenModeMessageBus?: () => FullscreenModeMessageBus;
};

/**
 * Create the fullscreen mode instance `renderUiShell` hands to apps not built with Odyssey's React components, so a non-React app can put its whole app area in fullscreen.
 *
 * The app area is one more id in the page's fullscreen stack, so a `FullscreenRegion` can still enter on top of it and Escape goes back one step at a time.
 *
 * It only listens to the page while connected. `renderUiShell` has no dispose call, so the shell's own mount and unmount are the only reliable signal that it's gone.
 */
export const createUiShellFullscreenState = ({
  createFullscreenModeMessageBus = defaultCreateFullscreenModeMessageBus,
}: CreateUiShellFullscreenStateArgs = {}): UiShellFullscreenState => {
  const appFullscreenId = createFullscreenId();

  const store = createStore<{
    connection: { fullscreenModeMessageBus?: FullscreenModeMessageBus };
  }>({ connection: {} });

  // Listeners subscribe here rather than on the connection, so they outlive a shell removed and added back.
  const fullscreenStateBus = createMessageBus<FullscreenState>();

  const getFullscreenModeMessageBus = () =>
    store.getState("connection")?.fullscreenModeMessageBus;

  const getFullscreenState = (): FullscreenState =>
    getFullscreenModeMessageBus()?.getFullscreenState() ?? emptyFullscreenState;

  const exitAppFullscreen = () => {
    getFullscreenModeMessageBus()?.exitFullscreen({
      fullscreenId: appFullscreenId,
    });
  };

  const connect = () => {
    const fullscreenModeMessageBus = createFullscreenModeMessageBus();

    const unsubscribeFromFullscreenState =
      fullscreenModeMessageBus.subscribeToFullscreenState(
        fullscreenStateBus.publish,
      );

    store.setState("connection", { fullscreenModeMessageBus });
    fullscreenModeMessageBus.requestFullscreenState();

    return () => {
      exitAppFullscreen();
      unsubscribeFromFullscreenState();

      const hasUnreportedFullscreen = getHasActiveFullscreen(
        fullscreenModeMessageBus.getFullscreenState(),
      );

      fullscreenModeMessageBus.destroy();
      store.setState("connection", {});

      // The host's next snapshot can't reach a bus that's already closed, so listeners hear the empty stack from here.
      if (hasUnreportedFullscreen) {
        fullscreenStateBus.publish(emptyFullscreenState);
      }
    };
  };

  return {
    connect,
    enterAppFullscreen: () => {
      getFullscreenModeMessageBus()?.enterFullscreen({
        fullscreenId: appFullscreenId,
      });
    },
    exitAppFullscreen,
    getFullscreenState,
    subscribeToFullscreenState: fullscreenStateBus.subscribe,
  };
};
