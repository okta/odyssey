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

import { watchElementDisconnection } from "./watchElementDisconnection.js";

/**
 * Resolves after the browser has delivered every pending `MutationObserver` report, since they run after the current task.
 */
const waitForMutationReports = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 0);
  });

describe(watchElementDisconnection.name, () => {
  test("the element's container is removed without unmounting it", async () => {
    const containerElement = document.createElement("div");
    const watchedElement = document.createElement("section");

    containerElement.append(watchedElement);
    document.body.append(containerElement);

    const onDisconnected = vi.fn();

    const stopWatching = watchElementDisconnection({
      element: watchedElement,
      onDisconnected,
    });

    containerElement.remove();

    await expect.poll(() => onDisconnected.mock.calls).toStrictEqual([[]]);

    stopWatching();
  });

  test("the element is moved in the same task", async () => {
    const firstContainerElement = document.createElement("div");
    const secondContainerElement = document.createElement("div");
    const watchedElement = document.createElement("section");

    firstContainerElement.append(watchedElement);
    document.body.append(firstContainerElement, secondContainerElement);

    const onDisconnected = vi.fn();

    const stopWatching = watchElementDisconnection({
      element: watchedElement,
      onDisconnected,
    });

    secondContainerElement.append(watchedElement);

    await waitForMutationReports();

    expect(onDisconnected).toHaveBeenCalledTimes(0);

    watchedElement.remove();

    await expect.poll(() => onDisconnected.mock.calls).toStrictEqual([[]]);

    stopWatching();
    firstContainerElement.remove();
    secondContainerElement.remove();
  });

  test("the element is inside a shadow root", async () => {
    const hostElement = document.createElement("div");
    const shadowRoot = hostElement.attachShadow({ mode: "open" });
    const watchedElement = document.createElement("section");
    const shadowContainerElement = document.createElement("div");

    shadowContainerElement.append(watchedElement);
    shadowRoot.append(shadowContainerElement);
    document.body.append(hostElement);

    const onDisconnected = vi.fn();

    const stopWatching = watchElementDisconnection({
      element: watchedElement,
      onDisconnected,
    });

    shadowContainerElement.remove();

    await expect.poll(() => onDisconnected.mock.calls).toStrictEqual([[]]);

    stopWatching();
    hostElement.remove();
  });

  test("the shadow host is removed", async () => {
    const hostElement = document.createElement("div");
    const shadowRoot = hostElement.attachShadow({ mode: "open" });
    const watchedElement = document.createElement("section");

    shadowRoot.append(watchedElement);
    document.body.append(hostElement);

    const onDisconnected = vi.fn();

    const stopWatching = watchElementDisconnection({
      element: watchedElement,
      onDisconnected,
    });

    hostElement.remove();

    await expect.poll(() => onDisconnected.mock.calls).toStrictEqual([[]]);

    stopWatching();
  });

  test("an element that's already detached", () => {
    const onDisconnected = vi.fn();

    watchElementDisconnection({
      element: document.createElement("section"),
      onDisconnected,
    });

    expect(onDisconnected).toHaveBeenCalledTimes(1);
  });

  test("a stopped watcher", async () => {
    const watchedElement = document.createElement("section");

    document.body.append(watchedElement);

    const onDisconnected = vi.fn();

    watchElementDisconnection({
      element: watchedElement,
      onDisconnected,
    })();

    watchedElement.remove();

    await waitForMutationReports();

    expect(onDisconnected).toHaveBeenCalledTimes(0);
  });
});
