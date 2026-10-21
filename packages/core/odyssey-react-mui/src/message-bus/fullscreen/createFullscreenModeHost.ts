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

import { type MessageBus } from "../../tools/createMessageBus.js";
import { createStore } from "../../tools/createStore.js";
import { createBrowserMessageBus } from "../createBrowserMessageBus.js";
import {
  type FullscreenMessage,
  fullscreenMessageChannel,
} from "./fullscreenMessageChannel.js";
import {
  getActiveFullscreenId,
  getIsSameFullscreenStack,
  getStackWithEnteredId,
  getStackWithExitedId,
} from "./fullscreenState.js";

const { messageCreators } = fullscreenMessageChannel;

export type FullscreenModeHost = {
  /**
   * Stop listening, and clear the stack, so fullscreen never outlives the page part that owned it. UI Shell calls this when it unmounts.
   */
  destroy: () => void;
};

export type CreateFullscreenModeHostArgs = {
  /**
   * Carries fullscreen messages between every app on the page.
   * @default a `createBrowserMessageBus` on `fullscreenMessageChannel`
   */
  fullscreenMessageBus?: MessageBus<FullscreenMessage>;
  /**
   * The window to listen on for Escape.
   * @default window
   */
  keyWindow?: Window;
};

/**
 * Create the fullscreen mode host: the one place on the page that owns the stack of fullscreen ids and answers every app's requests.
 *
 * Unified UI Shell runs one for you, because only one shell renders on a page while any number of apps can. Call this yourself only in an app that renders without UI Shell. Rendering the shell's parts without `renderUiShell` loses more than fullscreen, so prefer the shell.
 *
 * Escape removes the top id, so each press goes back one step. A dialog, menu, or popover that handles Escape first wins, because it stops the keypress or marks it handled before it reaches `window`. Screen reader users in browse mode don't send Escape to the page, so fullscreen never exits under them by surprise; the fullscreen button is how they leave.
 *
 * Two hosts on one page, such as two shells on a Storybook docs page, stay in step: each one adopts every stack the other sends. A host with nothing in fullscreen doesn't answer `stateRequested`, so a host that starts late can never send an empty stack over a real one.
 *
 * @experimental The fullscreen API is in alpha and may change in a future release.
 */
export const createFullscreenModeHost = ({
  fullscreenMessageBus = createBrowserMessageBus({
    messageChannel: fullscreenMessageChannel,
  }),
  keyWindow = window,
}: CreateFullscreenModeHostArgs = {}): FullscreenModeHost => {
  const store = createStore<{ fullscreenStack: string[] }>({
    fullscreenStack: [],
  });

  const getFullscreenStack = () => store.getState("fullscreenStack") ?? [];

  const publishFullscreenStack = (fullscreenStack: string[]) => {
    fullscreenMessageBus.publish(
      messageCreators.stateChanged({ fullscreenStack }),
    );
  };

  const updateFullscreenStack = (nextFullscreenStack: string[]) => {
    if (
      !getIsSameFullscreenStack({
        currentFullscreenStack: getFullscreenStack(),
        nextFullscreenStack,
      })
    ) {
      store.setState("fullscreenStack", nextFullscreenStack);
      publishFullscreenStack(nextFullscreenStack);
    }
  };

  const unsubscribeFromFullscreenMessages = fullscreenMessageBus.subscribe(
    (fullscreenMessage) => {
      if (fullscreenMessage.type === "fullscreen/enterRequested") {
        updateFullscreenStack(
          getStackWithEnteredId({
            fullscreenId: fullscreenMessage.payload.fullscreenId,
            fullscreenStack: getFullscreenStack(),
          }),
        );
      }

      if (fullscreenMessage.type === "fullscreen/exitRequested") {
        updateFullscreenStack(
          getStackWithExitedId({
            fullscreenId: fullscreenMessage.payload.fullscreenId,
            fullscreenStack: getFullscreenStack(),
          }),
        );
      }

      if (fullscreenMessage.type === "fullscreen/exitAllRequested") {
        updateFullscreenStack([]);
      }

      if (
        fullscreenMessage.type === "fullscreen/stateRequested" &&
        getFullscreenStack().length > 0
      ) {
        publishFullscreenStack(getFullscreenStack());
      }

      // Adopting without publishing is what keeps two hosts from answering each other forever. A host's own message arrives here too and changes nothing.
      if (fullscreenMessage.type === "fullscreen/stateChanged") {
        store.setState(
          "fullscreenStack",
          fullscreenMessage.payload.fullscreenStack,
        );
      }
    },
  );

  const handleKeyDown = (keyboardEvent: KeyboardEvent) => {
    const activeFullscreenId = getActiveFullscreenId({
      fullscreenStack: getFullscreenStack(),
    });

    if (
      keyboardEvent.key === "Escape" &&
      !keyboardEvent.defaultPrevented &&
      !keyboardEvent.isComposing &&
      activeFullscreenId !== undefined
    ) {
      keyboardEvent.preventDefault();

      // Marking the keypress handled is what keeps a second host on the page from also acting on it and removing the id under this one. Sent as a request rather than applied here, so both hosts remove the same id.
      fullscreenMessageBus.publish(
        messageCreators.exitRequested({ fullscreenId: activeFullscreenId }),
      );
    }
  };

  keyWindow.addEventListener("keydown", handleKeyDown);

  fullscreenMessageBus.publish(messageCreators.stateRequested({}));

  const destroy = () => {
    keyWindow.removeEventListener("keydown", handleKeyDown);
    unsubscribeFromFullscreenMessages();

    if (getFullscreenStack().length > 0) {
      store.setState("fullscreenStack", []);
      publishFullscreenStack([]);
    }
  };

  return { destroy };
};
