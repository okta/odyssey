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

import { bufferUntil } from "./bufferUntil";
import { createMessageBus } from "./createMessageBus";

describe("bufferUntil", () => {
  test("calls subscription after ready", async () => {
    const { publish: publish1, subscribe: subscribe1 } = createMessageBus();

    const { publish: publish2, subscribe: subscribe2 } = createMessageBus();

    const subscription = jest.fn();

    subscribe1(subscription);

    const bufferedPublish1 = bufferUntil({
      publish: publish1,
      subscribe: subscribe2,
    });

    publish2();
    bufferedPublish1();

    expect(subscription).toHaveBeenCalledTimes(1);
  });

  test("calls subscription before ready", async () => {
    const { publish: publish1, subscribe: subscribe1 } = createMessageBus();

    const { publish: publish2, subscribe: subscribe2 } = createMessageBus();

    const subscription = jest.fn();

    subscribe1(subscription);

    const bufferedPublish1 = bufferUntil({
      publish: publish1,
      subscribe: subscribe2,
    });

    bufferedPublish1();
    publish2();

    expect(subscription).toHaveBeenCalledTimes(1);
  });

  test("keeps only the last value passed when ready", async () => {
    const { publish: publish1, subscribe: subscribe1 } =
      createMessageBus<string>();

    const { publish: publish2, subscribe: subscribe2 } = createMessageBus();

    const subscription = jest.fn();

    subscribe1(subscription);

    const bufferedPublish1 = bufferUntil({
      publish: publish1,
      subscribe: subscribe2,
    });

    bufferedPublish1("a");
    bufferedPublish1("b");
    publish2();

    expect(subscription).toHaveBeenCalledWith("b");
    expect(subscription).toHaveBeenCalledTimes(1);
  });
});
