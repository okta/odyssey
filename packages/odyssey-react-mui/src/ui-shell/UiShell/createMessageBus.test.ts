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

import { createMessageBus } from "./createMessageBus";

describe("createEventBus", () => {
  test("messages are not sent once unsubscribed", async () => {
    const { publish, subscribe } = createMessageBus<null>();

    const subscriber = jest.fn();

    const unsubscribe = subscribe(subscriber);

    unsubscribe();
    publish(null);

    expect(subscriber).toHaveBeenCalledTimes(0);
  });

  test("messages are not sent once unsubscribed from multiple subscribers", async () => {
    const { publish, subscribe } = createMessageBus<null>();

    const subscriber1 = jest.fn();
    const subscriber2 = jest.fn();
    const subscriber3 = jest.fn();

    const unsubscribe1 = subscribe(subscriber1);
    const unsubscribe2 = subscribe(subscriber2);
    const unsubscribe3 = subscribe(subscriber3);

    unsubscribe1();
    unsubscribe2();
    unsubscribe3();
    publish(null);
    publish(null);

    expect(subscriber1).toHaveBeenCalledTimes(0);
    expect(subscriber2).toHaveBeenCalledTimes(0);
    expect(subscriber3).toHaveBeenCalledTimes(0);
  });

  test("when publishing message, receives message in a subscriber", async () => {
    const message = Symbol();

    const { publish, subscribe } = createMessageBus<typeof message>();

    const subscriber = jest.fn();

    const unsubscribe = subscribe(subscriber);

    publish(message);
    unsubscribe();

    expect(subscriber).toHaveBeenCalledWith(message);
    expect(subscriber).toHaveBeenCalledTimes(1);
  });

  test("when publishing 2 messages, receives both messages in a subscriber", async () => {
    const message1 = Symbol();
    const message2 = Symbol();

    const { publish, subscribe } = createMessageBus<
      typeof message1 | typeof message2
    >();

    const subscriber = jest.fn();

    const unsubscribe = subscribe(subscriber);

    publish(message1);
    publish(message2);
    unsubscribe();

    expect(subscriber).toHaveBeenNthCalledWith(1, message1);
    expect(subscriber).toHaveBeenNthCalledWith(2, message2);
    expect(subscriber).toHaveBeenCalledTimes(2);
  });

  test("when subscribing twice, both subscribers receive multiple messages", async () => {
    const message1 = Symbol();
    const message2 = Symbol();

    const { publish, subscribe } = createMessageBus<
      typeof message1 | typeof message2
    >();

    const subscriber1 = jest.fn();
    const subscriber2 = jest.fn();

    const unsubscribe1 = subscribe(subscriber1);
    const unsubscribe2 = subscribe(subscriber2);

    publish(message1);
    publish(message2);
    unsubscribe1();
    unsubscribe2();

    expect(subscriber1).toHaveBeenNthCalledWith(1, message1);
    expect(subscriber1).toHaveBeenNthCalledWith(2, message2);
    expect(subscriber1).toHaveBeenCalledTimes(2);

    expect(subscriber2).toHaveBeenNthCalledWith(1, message1);
    expect(subscriber2).toHaveBeenNthCalledWith(2, message2);
    expect(subscriber2).toHaveBeenCalledTimes(2);
  });
});
