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

import { createMessageChannel } from "./createMessageChannel.js";
import { isRecord } from "./messageGuards.js";

const testMessageChannel = createMessageChannel({
  channelName: "test-channel",
  messageDomain: "test",
  payloadGuards: {
    cleared: (payload: unknown): payload is Record<string, never> =>
      isRecord(payload),
    sent: (payload: unknown): payload is { messageText: string } =>
      isRecord(payload) && typeof payload.messageText === "string",
  },
  protocolVersion: 3,
});

describe(createMessageChannel.name, () => {
  test("the channel's name and version", () => {
    expect(testMessageChannel.channelName).toBe("test-channel");
    expect(testMessageChannel.protocolVersion).toBe(3);
  });

  test("creating a message", () => {
    expect(
      testMessageChannel.messageCreators.sent({ messageText: "hello" }),
    ).toStrictEqual({ payload: { messageText: "hello" }, type: "test/sent" });

    expect(testMessageChannel.messageCreators.cleared({})).toStrictEqual({
      payload: {},
      type: "test/cleared",
    });
  });

  test("a message the channel defines", () => {
    expect(
      testMessageChannel.isMessage({
        payload: { messageText: "hello" },
        type: "test/sent",
      }),
    ).toBe(true);
  });

  test("a message with a payload of the wrong shape", () => {
    expect(
      testMessageChannel.isMessage({
        payload: { messageText: 1 },
        type: "test/sent",
      }),
    ).toBe(false);

    expect(testMessageChannel.isMessage({ type: "test/sent" })).toBe(false);
  });

  test("a message type the channel doesn't define", () => {
    expect(
      testMessageChannel.isMessage({ payload: {}, type: "test/unknown" }),
    ).toBe(false);

    expect(
      testMessageChannel.isMessage({ payload: {}, type: "test/toString" }),
    ).toBe(false);
  });

  test("a message from another domain", () => {
    expect(
      testMessageChannel.isMessage({
        payload: { messageText: "hello" },
        type: "other/sent",
      }),
    ).toBe(false);

    expect(
      testMessageChannel.isMessage({
        payload: { messageText: "hello" },
        type: "sent",
      }),
    ).toBe(false);
  });

  test("values that aren't messages", () => {
    expect(testMessageChannel.isMessage(null)).toBe(false);
    expect(testMessageChannel.isMessage("test/sent")).toBe(false);
    expect(testMessageChannel.isMessage([])).toBe(false);
    expect(testMessageChannel.isMessage({ type: 1 })).toBe(false);
  });

  test("a message with fields this version doesn't know", () => {
    expect(
      testMessageChannel.isMessage({
        addedLater: true,
        payload: { addedLater: true, messageText: "hello" },
        type: "test/sent",
      }),
    ).toBe(true);
  });
});
