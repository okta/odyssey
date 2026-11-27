/*!
 * Copyright (c) 2025-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * `useLayoutEffect` prints a warning when it runs on the server, because the server has no layout to read.
 */
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Returns a callback with a permanent identity that always invokes the most recent version of `callback`.
 *
 * Use this for any consumer-supplied callback a component notifies from a `useEffect`. Consumers routinely pass an inline arrow function, which has a new identity on every render. Listing that identity in an effect's dependency array makes the effect run on renders where nothing it reports actually changed, and it then reports values captured before the latest commit. When the consumer feeds a reported value back in as a prop, the prop and the component's internal state can swap values on every commit and never settle.
 *
 * The returned callback is safe to omit from dependency arrays, so the effect can depend only on the state it reports:
 *
 * ```tsx
 * const stableOnPaginationChange = useStableCallback(onPaginationChange);
 *
 * useEffect(() => {
 *   stableOnPaginationChange(pagination);
 * }, [pagination, stableOnPaginationChange]);
 * ```
 *
 * The latest `callback` is captured in a layout effect, so the returned callback must not be invoked during render. Invoke it from an effect or an event handler.
 *
 * Passing `undefined` is supported and yields a callback that does nothing, which removes the need for optional-call syntax at every call site.
 *
 * @param callback The callback to stabilize, typically a component prop.
 */
export const useStableCallback = <
  CallbackArguments extends unknown[],
  CallbackReturn,
>(
  callback?: (...callbackArguments: CallbackArguments) => CallbackReturn,
) => {
  const latestCallbackReference = useRef(callback);

  useIsomorphicLayoutEffect(() => {
    latestCallbackReference.current = callback;
  });

  return useRef(
    (...callbackArguments: CallbackArguments): CallbackReturn | undefined => {
      // Read the callback into a variable first, so the call does not bind `this` to the ref.
      const latestCallback = latestCallbackReference.current;

      return latestCallback?.(...callbackArguments);
    },
  ).current;
};
