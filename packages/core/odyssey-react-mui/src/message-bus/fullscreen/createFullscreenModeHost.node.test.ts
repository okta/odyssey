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

import { createMessageBus } from "../../tools/createMessageBus.js";
import { createFullscreenModeHost } from "./createFullscreenModeHost.js";
import { createFullscreenModeMessageBus } from "./createFullscreenModeMessageBus.js";
import { type FullscreenMessage } from "./fullscreenMessageChannel.js";

/**
 * Stands in for `window` so a node test can press Escape. Only `keydown` is ever registered.
 */
const createFakeKeyWindow = () => {
  const keyEventTarget = new EventTarget();

  return {
    keyWindow: keyEventTarget as unknown as Window,
    pressKey: ({
      isDefaultPrevented = false,
      key,
    }: {
      isDefaultPrevented?: boolean;
      key: string;
    }) => {
      const keyboardEvent = new Event("keydown", { cancelable: true });

      Object.defineProperties(keyboardEvent, {
        isComposing: { value: false },
        key: { value: key },
      });

      if (isDefaultPrevented) {
        keyboardEvent.preventDefault();
      }

      keyEventTarget.dispatchEvent(keyboardEvent);
    },
  };
};

const renderPage = () => {
  const fullscreenMessageBus = createMessageBus<FullscreenMessage>();
  const fakeKeyWindow = createFakeKeyWindow();

  const host = createFullscreenModeHost({
    fullscreenMessageBus,
    keyWindow: fakeKeyWindow.keyWindow,
  });
  const appMessageBus = createFullscreenModeMessageBus({
    fullscreenMessageBus,
  });

  return { appMessageBus, fakeKeyWindow, fullscreenMessageBus, host };
};

describe(createFullscreenModeHost.name, () => {
  test("entering fullscreen", () => {
    const { appMessageBus } = renderPage();

    const subscriber = vi.fn();
    appMessageBus.subscribeToFullscreenState(subscriber);

    appMessageBus.enterFullscreen({ fullscreenId: "region" });

    expect(appMessageBus.getFullscreenState()).toStrictEqual({
      fullscreenStack: ["region"],
    });
    expect(subscriber.mock.calls).toStrictEqual([
      [{ fullscreenStack: ["region"] }],
    ]);
  });

  test("entering a region on top of another", () => {
    const { appMessageBus } = renderPage();

    appMessageBus.enterFullscreen({ fullscreenId: "outer" });
    appMessageBus.enterFullscreen({ fullscreenId: "inner" });

    expect(appMessageBus.getFullscreenState()).toStrictEqual({
      fullscreenStack: ["outer", "inner"],
    });
  });

  test("pressing Escape with two ids in the stack", () => {
    const { appMessageBus, fakeKeyWindow } = renderPage();

    appMessageBus.enterFullscreen({ fullscreenId: "outer" });
    appMessageBus.enterFullscreen({ fullscreenId: "inner" });

    fakeKeyWindow.pressKey({ key: "Escape" });

    expect(appMessageBus.getFullscreenState()).toStrictEqual({
      fullscreenStack: ["outer"],
    });

    fakeKeyWindow.pressKey({ key: "Escape" });

    expect(appMessageBus.getFullscreenState()).toStrictEqual({
      fullscreenStack: [],
    });
  });

  test("a dialog handles Escape first", () => {
    const { appMessageBus, fakeKeyWindow } = renderPage();

    appMessageBus.enterFullscreen({ fullscreenId: "region" });

    fakeKeyWindow.pressKey({ isDefaultPrevented: true, key: "Escape" });

    expect(appMessageBus.getFullscreenState()).toStrictEqual({
      fullscreenStack: ["region"],
    });
  });

  test("a key other than Escape", () => {
    const { appMessageBus, fakeKeyWindow } = renderPage();

    appMessageBus.enterFullscreen({ fullscreenId: "region" });

    fakeKeyWindow.pressKey({ key: "Enter" });

    expect(appMessageBus.getFullscreenState()).toStrictEqual({
      fullscreenStack: ["region"],
    });
  });

  test("exiting everything at once", () => {
    const { appMessageBus } = renderPage();

    appMessageBus.enterFullscreen({ fullscreenId: "outer" });
    appMessageBus.enterFullscreen({ fullscreenId: "inner" });
    appMessageBus.exitAllFullscreen();

    expect(appMessageBus.getFullscreenState()).toStrictEqual({
      fullscreenStack: [],
    });
  });

  test("entering the same id twice", () => {
    const { appMessageBus, fullscreenMessageBus } = renderPage();

    const messageSubscriber =
      vi.fn<(fullscreenMessage: FullscreenMessage) => void>();
    fullscreenMessageBus.subscribe(messageSubscriber);

    appMessageBus.enterFullscreen({ fullscreenId: "region" });
    appMessageBus.enterFullscreen({ fullscreenId: "region" });

    expect(
      messageSubscriber.mock.calls
        .map(([{ type }]) => type)
        .filter((type) => type === "fullscreen/stateChanged"),
    ).toStrictEqual(["fullscreen/stateChanged"]);
  });

  test("an app that starts after a region entered fullscreen", () => {
    const { appMessageBus, fullscreenMessageBus } = renderPage();

    appMessageBus.enterFullscreen({ fullscreenId: "outer" });
    appMessageBus.enterFullscreen({ fullscreenId: "inner" });

    const lateAppMessageBus = createFullscreenModeMessageBus({
      fullscreenMessageBus,
    });

    const messageSubscriber =
      vi.fn<(fullscreenMessage: FullscreenMessage) => void>();
    fullscreenMessageBus.subscribe(messageSubscriber);

    lateAppMessageBus.requestFullscreenState();

    expect(lateAppMessageBus.getFullscreenState()).toStrictEqual({
      fullscreenStack: ["outer", "inner"],
    });
    // The in-memory bus delivers the reply before the request finishes reaching every subscriber, so only which messages went out is checked, not their order.
    expect(
      messageSubscriber.mock.calls
        .map(([fullscreenMessage]) => fullscreenMessage)
        .toSorted((first, second) => first.type.localeCompare(second.type)),
    ).toStrictEqual([
      {
        payload: { fullscreenStack: ["outer", "inner"] },
        type: "fullscreen/stateChanged",
      },
      { payload: {}, type: "fullscreen/stateRequested" },
    ]);
  });

  test("a late app's reply doesn't reach subscribers already in step", () => {
    const { appMessageBus, fullscreenMessageBus } = renderPage();

    appMessageBus.enterFullscreen({ fullscreenId: "region" });

    const subscriber = vi.fn();
    appMessageBus.subscribeToFullscreenState(subscriber);

    createFullscreenModeMessageBus({
      fullscreenMessageBus,
    }).requestFullscreenState();

    expect(subscriber).toHaveBeenCalledTimes(0);
  });

  test("two hosts on one page", () => {
    const fullscreenMessageBus = createMessageBus<FullscreenMessage>();
    // One window for both hosts, as on a real page, so both hear the same keypress.
    const sharedKeyWindow = createFakeKeyWindow();

    createFullscreenModeHost({
      fullscreenMessageBus,
      keyWindow: sharedKeyWindow.keyWindow,
    });

    const appMessageBus = createFullscreenModeMessageBus({
      fullscreenMessageBus,
    });

    appMessageBus.enterFullscreen({ fullscreenId: "outer" });

    createFullscreenModeHost({
      fullscreenMessageBus,
      keyWindow: sharedKeyWindow.keyWindow,
    });

    appMessageBus.enterFullscreen({ fullscreenId: "inner" });

    sharedKeyWindow.pressKey({ key: "Escape" });

    expect(appMessageBus.getFullscreenState()).toStrictEqual({
      fullscreenStack: ["outer"],
    });
  });

  test("a host that starts with nothing in fullscreen", () => {
    const fullscreenMessageBus = createMessageBus<FullscreenMessage>();

    const messageSubscriber =
      vi.fn<(fullscreenMessage: FullscreenMessage) => void>();
    fullscreenMessageBus.subscribe(messageSubscriber);

    createFullscreenModeHost({
      fullscreenMessageBus,
      keyWindow: createFakeKeyWindow().keyWindow,
    });

    expect(
      messageSubscriber.mock.calls.map(
        ([fullscreenMessage]) => fullscreenMessage,
      ),
    ).toStrictEqual([{ payload: {}, type: "fullscreen/stateRequested" }]);
  });

  test("destroying the host with ids in the stack", () => {
    const { appMessageBus, fakeKeyWindow, host } = renderPage();

    appMessageBus.enterFullscreen({ fullscreenId: "region" });

    host.destroy();

    expect(appMessageBus.getFullscreenState()).toStrictEqual({
      fullscreenStack: [],
    });

    appMessageBus.enterFullscreen({ fullscreenId: "region" });
    fakeKeyWindow.pressKey({ key: "Escape" });

    expect(appMessageBus.getFullscreenState()).toStrictEqual({
      fullscreenStack: [],
    });
  });

  test("an app with no host on the page", () => {
    const appMessageBus = createFullscreenModeMessageBus({
      fullscreenMessageBus: createMessageBus<FullscreenMessage>(),
    });

    appMessageBus.enterFullscreen({ fullscreenId: "region" });

    expect(appMessageBus.getFullscreenState()).toStrictEqual({
      fullscreenStack: [],
    });
  });

  test("a destroyed app message bus", () => {
    const { appMessageBus, fullscreenMessageBus } = renderPage();

    const destroyedAppMessageBus = createFullscreenModeMessageBus({
      fullscreenMessageBus,
    });

    destroyedAppMessageBus.destroy();

    appMessageBus.enterFullscreen({ fullscreenId: "region" });

    expect(destroyedAppMessageBus.getFullscreenState()).toStrictEqual({
      fullscreenStack: [],
    });
  });
});
