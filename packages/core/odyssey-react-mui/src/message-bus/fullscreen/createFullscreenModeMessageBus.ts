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
  type MessageBus,
  type MessageSubscription,
} from "../../tools/createMessageBus.js";
import { createStore } from "../../tools/createStore.js";
import { createBrowserMessageBus } from "../createBrowserMessageBus.js";
import {
  type FullscreenMessage,
  fullscreenMessageChannel,
} from "./fullscreenMessageChannel.js";
import {
  emptyFullscreenState,
  type FullscreenIdArgs,
  type FullscreenState,
  getIsSameFullscreenStack,
} from "./fullscreenState.js";

const { messageCreators } = fullscreenMessageChannel;

export type FullscreenModeMessageBus = {
  /**
   * Stop listening for messages. Ids this message bus asked for stay in the stack; exit them first when they should go.
   */
  destroy: () => void;
  /**
   * Ask the host to put an id on top of the stack, so it's the one shown. An id already in the stack moves to the top.
   */
  enterFullscreen: (args: FullscreenIdArgs) => void;
  /**
   * Ask the host to clear the whole stack, returning the page to how it was before anything entered fullscreen.
   */
  exitAllFullscreen: () => void;
  /**
   * Ask the host to take one id out of the stack, wherever it is. The id under it is shown again. Nothing happens if the id isn't in the stack.
   */
  exitFullscreen: (args: FullscreenIdArgs) => void;
  /**
   * The last stack the host sent.
   */
  getFullscreenState: () => FullscreenState;
  /**
   * Ask the host for the current stack. Call it after subscribing, since ids may have entered fullscreen before this message bus existed.
   */
  requestFullscreenState: () => void;
  subscribeToFullscreenState: MessageSubscription<FullscreenState>;
};

export type CreateFullscreenModeMessageBusArgs = {
  /**
   * Carries fullscreen messages between every app on the page.
   * @default a `createBrowserMessageBus` on `fullscreenMessageChannel`
   */
  fullscreenMessageBus?: MessageBus<FullscreenMessage>;
};

/**
 * Create an app's connection to the page's fullscreen state.
 *
 * It only asks the fullscreen mode host to change the stack, and only reports what the host sends back, so every app on the page reads the same stack. Unified UI Shell runs the host. Without one on the page, requests do nothing and the stack stays empty.
 */
export const createFullscreenModeMessageBus = ({
  fullscreenMessageBus = createBrowserMessageBus({
    messageChannel: fullscreenMessageChannel,
  }),
}: CreateFullscreenModeMessageBusArgs = {}): FullscreenModeMessageBus => {
  const store = createStore<{ fullscreenState: FullscreenState }>({
    fullscreenState: emptyFullscreenState,
  });

  const fullscreenStateBus = createMessageBus<FullscreenState>();

  const getFullscreenState = () =>
    store.getState("fullscreenState") ?? emptyFullscreenState;

  const destroy = fullscreenMessageBus.subscribe((fullscreenMessage) => {
    if (
      fullscreenMessage.type === "fullscreen/stateChanged" &&
      !getIsSameFullscreenStack({
        currentFullscreenStack: getFullscreenState().fullscreenStack,
        nextFullscreenStack: fullscreenMessage.payload.fullscreenStack,
      })
    ) {
      const nextFullscreenState = {
        fullscreenStack: fullscreenMessage.payload.fullscreenStack,
      };

      store.setState("fullscreenState", nextFullscreenState);
      fullscreenStateBus.publish(nextFullscreenState);
    }
  });

  return {
    destroy,
    enterFullscreen: ({ fullscreenId }) => {
      fullscreenMessageBus.publish(
        messageCreators.enterRequested({ fullscreenId }),
      );
    },
    exitAllFullscreen: () => {
      fullscreenMessageBus.publish(messageCreators.exitAllRequested({}));
    },
    exitFullscreen: ({ fullscreenId }) => {
      fullscreenMessageBus.publish(
        messageCreators.exitRequested({ fullscreenId }),
      );
    },
    getFullscreenState,
    requestFullscreenState: () => {
      fullscreenMessageBus.publish(messageCreators.stateRequested({}));
    },
    subscribeToFullscreenState: fullscreenStateBus.subscribe,
  };
};
