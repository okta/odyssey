/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { createStore } from "./createStore";

export const bufferUntil = <Value>({
  publish,
  subscribe,
}: {
  publish: (value: Value) => void;
  subscribe: (subscriber: () => void) => () => void;
}) => {
  const store = createStore<{
    bufferedValue?: Value;
    isReactAppReadyForProps: boolean;
  }>({
    isReactAppReadyForProps: false,
  });

  const unsubscribe = subscribe(() => {
    unsubscribe();

    store.setState("isReactAppReadyForProps", true);
    store.getState("bufferedValue");
    if (store.hasState("bufferedValue")) {
      // If we have a state, then the value in here is what we want. TypeScript expects this to possibly be `undefined` because the type we sent to `createStore` listed `bufferedValue` as optional. TypeScript doesn't seem to have any way of knowing we passed in the value at some point.
      publish(store.getState("bufferedValue")!);
    }
  });

  const publishWhenReady: typeof publish = (value) => {
    if (store.getState("isReactAppReadyForProps")) {
      publish(value);
    } else {
      store.setState("bufferedValue", value);
    }
  };

  return publishWhenReady;
};
