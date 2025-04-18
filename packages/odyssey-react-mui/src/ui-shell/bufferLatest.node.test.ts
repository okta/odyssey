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

import { bufferLatest } from "./bufferLatest.js";
import { createMessageBus } from "./createMessageBus.js";

describe(bufferLatest.name, () => {
  test("calls subscriber after ready", () => {
    const { publish: publish1, subscribe: subscribe1 } = createMessageBus();

    const { publish: publish2, subscribe: subscribe2 } = createMessageBus();

    const subscriber = vi.fn();

    subscribe1(subscriber);

    const bufferedPublish1 = bufferLatest({
      publish: publish1,
      subscribe: subscribe2,
    });

    publish2();
    bufferedPublish1();

    expect(subscriber).toHaveBeenCalledTimes(1);
  });

  test("calls subscriber before ready", () => {
    const { publish: publish1, subscribe: subscribe1 } = createMessageBus();

    const { publish: publish2, subscribe: subscribe2 } = createMessageBus();

    const subscriber = vi.fn();

    subscribe1(subscriber);

    const bufferedPublish1 = bufferLatest({
      publish: publish1,
      subscribe: subscribe2,
    });

    bufferedPublish1();
    publish2();

    expect(subscriber).toHaveBeenCalledTimes(1);
  });

  test("keeps only the last value passed when ready", () => {
    const { publish: publish1, subscribe: subscribe1 } =
      createMessageBus<string>();

    const { publish: publish2, subscribe: subscribe2 } = createMessageBus();

    const subscriber = vi.fn();

    subscribe1(subscriber);

    const bufferedPublish1 = bufferLatest({
      publish: publish1,
      subscribe: subscribe2,
    });

    bufferedPublish1("a");
    bufferedPublish1("b");
    publish2();

    expect(subscriber).toHaveBeenCalledWith("b");
    expect(subscriber).toHaveBeenCalledTimes(1);
  });
});
