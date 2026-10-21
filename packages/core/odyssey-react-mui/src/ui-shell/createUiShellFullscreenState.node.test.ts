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
  createFullscreenModeHost,
  createFullscreenModeMessageBus,
  type FullscreenMessage,
} from "../message-bus/index.js";
import { createMessageBus } from "../tools/createMessageBus.js";
import { createUiShellFullscreenState } from "./createUiShellFullscreenState.js";

const renderPage = () => {
  const fullscreenMessageBus = createMessageBus<FullscreenMessage>();

  const host = createFullscreenModeHost({
    fullscreenMessageBus,
    keyWindow: new EventTarget() as unknown as Window,
  });
  const pageMessageBus = createFullscreenModeMessageBus({
    fullscreenMessageBus,
  });
  const uiShellFullscreenState = createUiShellFullscreenState({
    createFullscreenModeMessageBus: () =>
      createFullscreenModeMessageBus({ fullscreenMessageBus }),
  });

  return { host, pageMessageBus, uiShellFullscreenState };
};

describe(createUiShellFullscreenState.name, () => {
  test("app area entered while connected", () => {
    const { pageMessageBus, uiShellFullscreenState } = renderPage();
    const fullscreenStateListener = vi.fn();

    uiShellFullscreenState.subscribeToFullscreenState(fullscreenStateListener);
    uiShellFullscreenState.connect();
    uiShellFullscreenState.enterAppFullscreen();

    const [appFullscreenId] =
      pageMessageBus.getFullscreenState().fullscreenStack;

    expect(uiShellFullscreenState.getFullscreenState()).toStrictEqual({
      fullscreenStack: [appFullscreenId],
    });
    expect(fullscreenStateListener.mock.calls).toStrictEqual([
      [{ fullscreenStack: [appFullscreenId] }],
    ]);
  });

  test("disconnected while the app area is in fullscreen", () => {
    const { pageMessageBus, uiShellFullscreenState } = renderPage();
    const fullscreenStateListener = vi.fn();

    uiShellFullscreenState.subscribeToFullscreenState(fullscreenStateListener);

    const disconnect = uiShellFullscreenState.connect();

    uiShellFullscreenState.enterAppFullscreen();

    const [appFullscreenId] =
      pageMessageBus.getFullscreenState().fullscreenStack;

    disconnect();

    expect(pageMessageBus.getFullscreenState()).toStrictEqual({
      fullscreenStack: [],
    });
    expect(uiShellFullscreenState.getFullscreenState()).toStrictEqual({
      fullscreenStack: [],
    });
    expect(fullscreenStateListener.mock.calls).toStrictEqual([
      [{ fullscreenStack: [appFullscreenId] }],
      [{ fullscreenStack: [] }],
    ]);
  });

  test("page changes after disconnecting", () => {
    const { pageMessageBus, uiShellFullscreenState } = renderPage();
    const fullscreenStateListener = vi.fn();

    uiShellFullscreenState.subscribeToFullscreenState(fullscreenStateListener);
    uiShellFullscreenState.connect()();

    pageMessageBus.enterFullscreen({ fullscreenId: "region" });

    expect(pageMessageBus.getFullscreenState()).toStrictEqual({
      fullscreenStack: ["region"],
    });
    expect(uiShellFullscreenState.getFullscreenState()).toStrictEqual({
      fullscreenStack: [],
    });
    expect(fullscreenStateListener).not.toHaveBeenCalled();
  });

  test("app area entered before connecting", () => {
    const { pageMessageBus, uiShellFullscreenState } = renderPage();

    uiShellFullscreenState.enterAppFullscreen();
    uiShellFullscreenState.connect();

    expect(pageMessageBus.getFullscreenState()).toStrictEqual({
      fullscreenStack: [],
    });
  });

  test("connected again after disconnecting", () => {
    const { pageMessageBus, uiShellFullscreenState } = renderPage();
    const fullscreenStateListener = vi.fn();

    uiShellFullscreenState.subscribeToFullscreenState(fullscreenStateListener);
    uiShellFullscreenState.connect()();
    uiShellFullscreenState.connect();
    uiShellFullscreenState.enterAppFullscreen();

    const [appFullscreenId] =
      pageMessageBus.getFullscreenState().fullscreenStack;

    expect(uiShellFullscreenState.getFullscreenState()).toStrictEqual({
      fullscreenStack: [appFullscreenId],
    });
    expect(fullscreenStateListener.mock.calls).toStrictEqual([
      [{ fullscreenStack: [appFullscreenId] }],
    ]);
  });
});
