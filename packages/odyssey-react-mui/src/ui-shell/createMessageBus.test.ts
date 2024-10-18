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

    const subscription = jest.fn();

    const unsubscribe = subscribe(subscription);

    unsubscribe();
    publish(null);

    expect(subscription).toHaveBeenCalledTimes(0);
  });

  test("messages are not sent once unsubscribed from multiple subscribers", async () => {
    const { publish, subscribe } = createMessageBus<null>();

    const subscription1 = jest.fn();
    const subscription2 = jest.fn();
    const subscription3 = jest.fn();

    const unsubscribe1 = subscribe(subscription1);
    const unsubscribe2 = subscribe(subscription2);
    const unsubscribe3 = subscribe(subscription3);

    unsubscribe1();
    unsubscribe2();
    unsubscribe3();
    publish(null);
    publish(null);

    expect(subscription1).toHaveBeenCalledTimes(0);
    expect(subscription2).toHaveBeenCalledTimes(0);
    expect(subscription3).toHaveBeenCalledTimes(0);
  });

  test("when publishing message, receives message in subscription", async () => {
    const message = Symbol();

    const { publish, subscribe } = createMessageBus<typeof message>();

    const subscription = jest.fn();

    const unsubscribe = subscribe(subscription);

    publish(message);
    unsubscribe();

    expect(subscription).toHaveBeenCalledWith(message);
    expect(subscription).toHaveBeenCalledTimes(1);
  });

  test("when publishing 2 messages, receives both messages in subscription", async () => {
    const message1 = Symbol();
    const message2 = Symbol();

    const { publish, subscribe } = createMessageBus<
      typeof message1 | typeof message2
    >();

    const subscription = jest.fn();

    const unsubscribe = subscribe(subscription);

    publish(message1);
    publish(message2);
    unsubscribe();

    expect(subscription).toHaveBeenNthCalledWith(1, message1);
    expect(subscription).toHaveBeenNthCalledWith(2, message2);
    expect(subscription).toHaveBeenCalledTimes(2);
  });

  test("when subscribing twice, both subscriptions receive multiple messages", async () => {
    const message1 = Symbol();
    const message2 = Symbol();

    const { publish, subscribe } = createMessageBus<
      typeof message1 | typeof message2
    >();

    const subscription1 = jest.fn();
    const subscription2 = jest.fn();

    const unsubscribe1 = subscribe(subscription1);
    const unsubscribe2 = subscribe(subscription2);

    publish(message1);
    publish(message2);
    unsubscribe1();
    unsubscribe2();

    expect(subscription1).toHaveBeenNthCalledWith(1, message1);
    expect(subscription1).toHaveBeenNthCalledWith(2, message2);
    expect(subscription1).toHaveBeenCalledTimes(2);

    expect(subscription2).toHaveBeenNthCalledWith(1, message1);
    expect(subscription2).toHaveBeenNthCalledWith(2, message2);
    expect(subscription2).toHaveBeenCalledTimes(2);
  });
});
