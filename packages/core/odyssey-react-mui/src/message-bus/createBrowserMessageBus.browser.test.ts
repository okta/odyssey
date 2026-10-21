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
  createBrowserMessageBus,
  getTopMessageWindow,
} from "./createBrowserMessageBus.js";
import { createMessageChannel } from "./createMessageChannel.js";
import { isRecord } from "./messageGuards.js";

const testMessageChannel = createMessageChannel({
  channelName: "test-channel",
  messageDomain: "test",
  payloadGuards: {
    sent: (payload: unknown): payload is { messageText: string } =>
      isRecord(payload) && typeof payload.messageText === "string",
  },
  protocolVersion: 1,
});

const { messageCreators } = testMessageChannel;

// Vitest runs each test file in an iframe whose top window is same-origin, so every bus here listens on that top window.
const topWindow = getTopMessageWindow();

/**
 * A mock's calls, copied into this window. Messages delivered on the top window are built in its JavaScript realm, so their objects fail `toStrictEqual`'s prototype check against literals written here even when every field matches.
 */
const getLocalCalls = (mockFunction: { mock: { calls: unknown[][] } }) =>
  structuredClone(mockFunction.mock.calls);

describe(createBrowserMessageBus.name, () => {
  test("publishing a message", async () => {
    const { publish, subscribe } = createBrowserMessageBus({
      messageChannel: testMessageChannel,
    });

    const subscriber = vi.fn();
    const unsubscribe = subscribe(subscriber);

    publish(messageCreators.sent({ messageText: "hello" }));

    await expect
      .poll(() => getLocalCalls(subscriber))
      .toStrictEqual([
        [{ payload: { messageText: "hello" }, type: "test/sent" }],
      ]);

    unsubscribe();
  });

  test("the envelope on the wire", async () => {
    const { publish } = createBrowserMessageBus({
      messageChannel: testMessageChannel,
    });

    const windowMessageListener =
      vi.fn<(messageEvent: MessageEvent<unknown>) => void>();

    topWindow.addEventListener("message", windowMessageListener);

    publish(messageCreators.sent({ messageText: "hello" }));

    await expect
      .poll(() =>
        structuredClone(
          windowMessageListener.mock.calls.map(
            ([messageEvent]) => messageEvent.data,
          ),
        ),
      )
      .toStrictEqual([
        {
          channelName: "test-channel",
          message: { payload: { messageText: "hello" }, type: "test/sent" },
          protocolVersion: 1,
        },
      ]);

    topWindow.removeEventListener("message", windowMessageListener);
  });

  test("two buses on the same channel", async () => {
    const publishingBus = createBrowserMessageBus({
      messageChannel: testMessageChannel,
    });

    const subscribingBus = createBrowserMessageBus({
      messageChannel: testMessageChannel,
    });

    const subscriber = vi.fn();
    const unsubscribe = subscribingBus.subscribe(subscriber);

    publishingBus.publish(messageCreators.sent({ messageText: "first" }));
    publishingBus.publish(messageCreators.sent({ messageText: "second" }));

    await expect
      .poll(() => getLocalCalls(subscriber))
      .toStrictEqual([
        [{ payload: { messageText: "first" }, type: "test/sent" }],
        [{ payload: { messageText: "second" }, type: "test/sent" }],
      ]);

    unsubscribe();
  });

  test("a message on another channel", async () => {
    const otherChannelBus = createBrowserMessageBus({
      messageChannel: { ...testMessageChannel, channelName: "other-channel" },
    });

    const { publish, subscribe } = createBrowserMessageBus({
      messageChannel: testMessageChannel,
    });

    const subscriber = vi.fn();
    const unsubscribe = subscribe(subscriber);

    otherChannelBus.publish(messageCreators.sent({ messageText: "ignored" }));
    // `postMessage` delivers in order, so once this one arrives, the ignored one would have arrived first.
    publish(messageCreators.sent({ messageText: "delivered" }));

    await expect
      .poll(() => getLocalCalls(subscriber))
      .toStrictEqual([
        [{ payload: { messageText: "delivered" }, type: "test/sent" }],
      ]);

    unsubscribe();
  });

  test("a message from another protocol version", async () => {
    const nextVersionBus = createBrowserMessageBus({
      messageChannel: { ...testMessageChannel, protocolVersion: 2 },
    });

    const { publish, subscribe } = createBrowserMessageBus({
      messageChannel: testMessageChannel,
    });

    const subscriber = vi.fn();
    const unsubscribe = subscribe(subscriber);

    nextVersionBus.publish(messageCreators.sent({ messageText: "ignored" }));
    publish(messageCreators.sent({ messageText: "delivered" }));

    await expect
      .poll(() => getLocalCalls(subscriber))
      .toStrictEqual([
        [{ payload: { messageText: "delivered" }, type: "test/sent" }],
      ]);

    unsubscribe();
  });

  test("a message with an unexpected shape", async () => {
    const { publish, subscribe } = createBrowserMessageBus({
      messageChannel: testMessageChannel,
    });

    const subscriber = vi.fn();
    const unsubscribe = subscribe(subscriber);

    topWindow.postMessage(
      {
        channelName: "test-channel",
        message: { payload: { unexpected: true }, type: "test/sent" },
        protocolVersion: 1,
      },
      topWindow.origin,
    );
    topWindow.postMessage(
      {
        channelName: "test-channel",
        message: { payload: { messageText: "no version" }, type: "test/sent" },
      },
      topWindow.origin,
    );
    topWindow.postMessage({ unexpected: true }, topWindow.origin);
    publish(messageCreators.sent({ messageText: "delivered" }));

    await expect
      .poll(() => getLocalCalls(subscriber))
      .toStrictEqual([
        [{ payload: { messageText: "delivered" }, type: "test/sent" }],
      ]);

    unsubscribe();
  });

  test("a message from another origin", async () => {
    const { publish, subscribe } = createBrowserMessageBus({
      messageChannel: testMessageChannel,
    });

    const subscriber = vi.fn();
    const unsubscribe = subscribe(subscriber);

    const windowMessageListener = vi.fn<(messageEvent: MessageEvent) => void>();

    topWindow.addEventListener("message", windowMessageListener);

    const iframeElement = document.createElement("iframe");

    // Without `allow-same-origin`, the iframe gets an opaque origin, so the browser reports its messages as coming from `"null"`.
    iframeElement.setAttribute("sandbox", "allow-scripts");
    iframeElement.setAttribute(
      "srcdoc",
      `<script>top.postMessage({ channelName: "test-channel", message: { payload: { messageText: "cross-origin" }, type: "test/sent" }, protocolVersion: 1 }, "*");</script>`,
    );

    document.body.append(iframeElement);

    await expect
      .poll(() =>
        windowMessageListener.mock.calls.map(
          ([messageEvent]) => messageEvent.origin,
        ),
      )
      .toStrictEqual(["null"]);

    publish(messageCreators.sent({ messageText: "same-origin" }));

    await expect
      .poll(() => getLocalCalls(subscriber))
      .toStrictEqual([
        [{ payload: { messageText: "same-origin" }, type: "test/sent" }],
      ]);

    topWindow.removeEventListener("message", windowMessageListener);
    iframeElement.remove();
    unsubscribe();
  });

  test("an unsubscribed subscriber", async () => {
    const { publish, subscribe } = createBrowserMessageBus({
      messageChannel: testMessageChannel,
    });

    const unsubscribedSubscriber = vi.fn();
    const subscriber = vi.fn();

    subscribe(unsubscribedSubscriber)();
    const unsubscribe = subscribe(subscriber);

    publish(messageCreators.sent({ messageText: "delivered" }));

    await expect
      .poll(() => getLocalCalls(subscriber))
      .toStrictEqual([
        [{ payload: { messageText: "delivered" }, type: "test/sent" }],
      ]);

    expect(unsubscribedSubscriber).toHaveBeenCalledTimes(0);

    unsubscribe();
  });
});

describe(getTopMessageWindow.name, () => {
  test("a same-origin iframe", () => {
    const iframeElement = document.createElement("iframe");

    document.body.append(iframeElement);

    const iframeWindow = iframeElement.contentWindow;

    expect(iframeWindow).not.toBe(null);
    expect(
      iframeWindow &&
        getTopMessageWindow({ ownerWindow: iframeWindow }) === topWindow,
    ).toBe(true);

    iframeElement.remove();
  });

  test("a top window", () => {
    expect(getTopMessageWindow({ ownerWindow: topWindow }) === topWindow).toBe(
      true,
    );
  });
});

describe("createBrowserMessageBus across frames", () => {
  test("an app in a same-origin iframe", async () => {
    const iframeElement = document.createElement("iframe");

    document.body.append(iframeElement);

    const iframeWindow = iframeElement.contentWindow ?? window;

    const pageBus = createBrowserMessageBus({
      messageChannel: testMessageChannel,
    });
    const iframeBus = createBrowserMessageBus({
      messageChannel: testMessageChannel,
      ownerWindow: iframeWindow,
    });

    const pageSubscriber = vi.fn();
    const unsubscribe = pageBus.subscribe(pageSubscriber);

    iframeBus.publish(messageCreators.sent({ messageText: "from the iframe" }));

    await expect
      .poll(() => getLocalCalls(pageSubscriber))
      .toStrictEqual([
        [{ payload: { messageText: "from the iframe" }, type: "test/sent" }],
      ]);

    unsubscribe();
    iframeElement.remove();
  });

  test("a message received in an iframe", async () => {
    const iframeElement = document.createElement("iframe");

    document.body.append(iframeElement);

    const iframeWindow = iframeElement.contentWindow ?? window;

    const iframeBus = createBrowserMessageBus({
      messageChannel: testMessageChannel,
      ownerWindow: iframeWindow,
    });

    const subscriber = vi.fn<(message: unknown) => void>();
    const unsubscribe = iframeBus.subscribe(subscriber);

    iframeBus.publish(messageCreators.sent({ messageText: "hello" }));

    await expect.poll(() => subscriber.mock.calls.length).toBe(1);

    // A value built in the top window fails this window's `Array.isArray` when its payload holds an array, which is what the copy prevents.
    expect(
      subscriber.mock.calls.map(
        ([message]) =>
          message instanceof (iframeWindow as typeof window).Object,
      ),
    ).toStrictEqual([true]);

    unsubscribe();
    iframeElement.remove();
  });

  test("an iframe restored from the back/forward cache", async () => {
    const iframeElement = document.createElement("iframe");

    document.body.append(iframeElement);

    const iframeWindow = iframeElement.contentWindow ?? window;

    const iframeBus = createBrowserMessageBus({
      messageChannel: testMessageChannel,
      ownerWindow: iframeWindow,
    });
    const pageBus = createBrowserMessageBus({
      messageChannel: testMessageChannel,
    });

    const iframeSubscriber = vi.fn();
    const unsubscribe = iframeBus.subscribe(iframeSubscriber);

    // What the browser sends when the page goes into the back/forward cache and comes back out. Nothing in the app runs again, so nothing would subscribe again.
    iframeWindow.dispatchEvent(
      new PageTransitionEvent("pagehide", { persisted: true }),
    );
    iframeWindow.dispatchEvent(
      new PageTransitionEvent("pageshow", { persisted: true }),
    );

    pageBus.publish(messageCreators.sent({ messageText: "after restore" }));

    await expect
      .poll(() => getLocalCalls(iframeSubscriber))
      .toStrictEqual([
        [{ payload: { messageText: "after restore" }, type: "test/sent" }],
      ]);

    unsubscribe();
    iframeElement.remove();
  });

  test("an iframe that unloads while subscribed", async () => {
    const iframeElement = document.createElement("iframe");

    document.body.append(iframeElement);

    const iframeWindow = iframeElement.contentWindow ?? window;

    const iframeBus = createBrowserMessageBus({
      messageChannel: testMessageChannel,
      ownerWindow: iframeWindow,
    });
    const pageBus = createBrowserMessageBus({
      messageChannel: testMessageChannel,
    });

    const iframeSubscriber = vi.fn();
    const pageSubscriber = vi.fn();

    iframeBus.subscribe(iframeSubscriber);
    const unsubscribe = pageBus.subscribe(pageSubscriber);

    iframeWindow.dispatchEvent(new Event("pagehide"));

    pageBus.publish(messageCreators.sent({ messageText: "after unload" }));

    await expect.poll(() => pageSubscriber.mock.calls.length).toBe(1);

    expect(iframeSubscriber).toHaveBeenCalledTimes(0);

    unsubscribe();
    iframeElement.remove();
  });
});
