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
  type MessageBus,
  type MessageSubscription,
  type PublishMessage,
} from "../tools/createMessageBus.js";
import { type MessageChannel } from "./createMessageChannel.js";
import { isRecord } from "./messageGuards.js";

/**
 * What actually crosses `window.postMessage`. The message is wrapped so a subscriber can tell which channel and which protocol version it belongs to before trusting its shape.
 */
export type BrowserMessageEnvelope<Message> = {
  channelName: string;
  message: Message;
  protocolVersion: number;
};

export type CreateBrowserMessageBusArgs<Message> = {
  /**
   * The channel to publish and subscribe on, from `createMessageChannel`.
   */
  messageChannel: MessageChannel<Message>;
  /**
   * The window to publish on and listen to.
   * @default the top window from `getTopMessageWindow`
   */
  messageWindow?: Window;
  /**
   * The window this code runs in. When it unloads, its listeners on `messageWindow` are removed, so an iframe that reloads never leaves a listener behind on the top window.
   * @default window
   */
  ownerWindow?: Window;
};

const isBrowserMessageEnvelope = (
  envelope: unknown,
): envelope is BrowserMessageEnvelope<unknown> =>
  isRecord(envelope) &&
  typeof envelope.channelName === "string" &&
  typeof envelope.protocolVersion === "number" &&
  "message" in envelope;

/**
 * The window every bundle on the page publishes and listens on: the top window when it's on the same origin, otherwise this window.
 *
 * An app rendered in a same-origin iframe then reaches Unified UI Shell in the page around it. A cross-origin top window can't be listened on, so an app in a cross-origin iframe stays on its own window.
 */
export const getTopMessageWindow = ({
  ownerWindow = window,
}: {
  ownerWindow?: Window;
} = {}): Window => {
  const topWindow = ownerWindow.top;

  if (!topWindow || topWindow === ownerWindow) {
    return ownerWindow;
  }

  // Reading `origin` on a cross-origin window throws, which is the browser's only way of saying it can't be reached. `window.origin` rather than `location.origin`, because an `about:blank` iframe inherits its parent's origin while its URL's origin reads `"null"`.
  try {
    return topWindow.origin === ownerWindow.origin ? topWindow : ownerWindow;
  } catch {
    return ownerWindow;
  }
};

/**
 * Create a message bus that sends messages through the browser's `window.postMessage`.
 *
 * Use it instead of `createMessageBus` when the publisher and subscriber may come from separate bundles, such as an app and Unified UI Shell each loading their own copy of Odyssey. A bus from `createMessageBus` only reaches subscribers that share the same JavaScript object, but every bundle on the page shares the same top window.
 *
 * Messages arrive asynchronously, and a publisher receives its own messages. Only messages from the page's own origin, on the same channel, at the same protocol version, and passing the channel's check are delivered.
 *
 * `postMessage` copies each message with the structured clone algorithm, so a message can't contain functions, symbols, or DOM elements. Each subscriber receives a copy made in its own window.
 */
export const createBrowserMessageBus = <Message>({
  messageChannel: { channelName, isMessage, protocolVersion },
  ownerWindow = window,
  messageWindow = getTopMessageWindow({ ownerWindow }),
}: CreateBrowserMessageBusArgs<Message>): MessageBus<Message> => {
  const publish: PublishMessage<Message> = (message) => {
    messageWindow.postMessage(
      {
        channelName,
        message,
        protocolVersion,
      } satisfies BrowserMessageEnvelope<Message>,
      messageWindow.origin,
    );
  };

  const subscribe: MessageSubscription<Message> = (subscriber) => {
    const handleMessageEvent = (messageEvent: MessageEvent<unknown>) => {
      if (
        messageEvent.origin === messageWindow.origin &&
        isBrowserMessageEnvelope(messageEvent.data) &&
        messageEvent.data.channelName === channelName &&
        messageEvent.data.protocolVersion === protocolVersion &&
        isMessage(messageEvent.data.message)
      ) {
        // The top window builds the message, so its objects and arrays belong to that window. Copying it with this window's `structuredClone` hands subscribers values that pass `Array.isArray`, `instanceof`, and strict equality here.
        subscriber(ownerWindow.structuredClone(messageEvent.data.message));
      }
    };

    const unsubscribe = () => {
      messageWindow.removeEventListener("message", handleMessageEvent);
      ownerWindow.removeEventListener("pagehide", handlePageHide);
    };

    // A page going into the back/forward cache takes the window around it along, and comes back with no code running again to subscribe. Only a page that is really unloading leaves a listener behind.
    const handlePageHide = (pageTransitionEvent: PageTransitionEvent) => {
      if (!pageTransitionEvent.persisted) {
        unsubscribe();
      }
    };

    messageWindow.addEventListener("message", handleMessageEvent);

    if (messageWindow !== ownerWindow) {
      ownerWindow.addEventListener("pagehide", handlePageHide);
    }

    return unsubscribe;
  };

  return {
    publish,
    subscribe,
  };
};
