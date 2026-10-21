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

export type WatchElementDisconnectionArgs = {
  element: Element;
  /**
   * Called once, the first time `element` is no longer in the document.
   */
  onDisconnected: () => void;
};

/**
 * Stops watching. Safe to call more than once.
 */
export type StopWatchingElementDisconnection = () => void;

/**
 * Every root `node` sits under, innermost first: its shadow root, that shadow root's host's root, and so on up to the document. A removal inside a shadow root is never reported to an observer on the document, so each root needs its own observer.
 */
const getRootNodes = (node: Node): Node[] => {
  const rootNode = node.getRootNode();

  return rootNode instanceof ShadowRoot
    ? Array.of<Node>(rootNode).concat(getRootNodes(rootNode.host))
    : [rootNode];
};

/**
 * Calls `onDisconnected` once `element` leaves the document, even when nothing unmounts it.
 *
 * A host page can remove the container a React app renders into without calling `root.unmount()`, such as a Backbone view's `.remove()` or a router that caches a route's DOM. The app's cleanup then never runs, so watching the element is the only way to notice.
 *
 * Moving an element is not leaving: removing and re-adding it in the same task reads as still connected, because observers report after the task ends. The roots are read again on every report, so an element moved into a different shadow root is still watched.
 */
export const watchElementDisconnection = ({
  element,
  onDisconnected,
}: WatchElementDisconnectionArgs): StopWatchingElementDisconnection => {
  if (!element.isConnected) {
    onDisconnected();

    return () => {};
  }

  const observeRootNodes = () => {
    getRootNodes(element).forEach((rootNode) => {
      mutationObserver.observe(rootNode, { childList: true, subtree: true });
    });
  };

  // Only runs while something is in fullscreen, and each report is one `isConnected` read, so watching the whole document stays cheap.
  const mutationObserver = new MutationObserver(() => {
    mutationObserver.disconnect();

    if (element.isConnected) {
      observeRootNodes();
    } else {
      onDisconnected();
    }
  });

  observeRootNodes();

  return () => {
    mutationObserver.disconnect();
  };
};
