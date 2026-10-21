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
  createMessageChannel,
  type MessageOf,
} from "../createMessageChannel.js";
import { isRecord } from "../messageGuards.js";

const isFullscreenIdPayload = (
  payload: unknown,
): payload is { fullscreenId: string } =>
  isRecord(payload) && typeof payload.fullscreenId === "string";

const isEmptyPayload = (payload: unknown): payload is Record<string, never> =>
  isRecord(payload);

/**
 * The messages every Odyssey app on the page and the fullscreen mode host send each other.
 *
 * Apps only ask. The host, which Unified UI Shell runs, owns the stack and is the only sender of `stateChanged`. Every change, and every reply to `stateRequested`, is the same full snapshot, so an app that starts late never replays an enter that already happened.
 *
 * **This is a cross-version contract.** Apps and UI Shell can each be on a different Odyssey version, so a message type or payload field can be added but never renamed, removed, or given a new meaning without raising `protocolVersion`.
 */
export const fullscreenMessageChannel = createMessageChannel({
  channelName: "odyssey-fullscreen",
  messageDomain: "fullscreen",
  payloadGuards: {
    /**
     * An app asks for an id to go on top of the stack. An id already in the stack moves to the top.
     */
    enterRequested: isFullscreenIdPayload,
    /**
     * An app asks for every id to leave the stack, returning the page to how it was before anything entered fullscreen.
     */
    exitAllRequested: isEmptyPayload,
    /**
     * An app, or the host on Escape, asks for an id to leave the stack, wherever it is. The id under it is shown again.
     */
    exitRequested: isFullscreenIdPayload,
    /**
     * The host's stack, bottom first. Sent after every change and in reply to `stateRequested`.
     */
    stateChanged: (
      payload: unknown,
    ): payload is { fullscreenStack: string[] } =>
      isRecord(payload) &&
      Array.isArray(payload.fullscreenStack) &&
      payload.fullscreenStack.every(
        (fullscreenId) => typeof fullscreenId === "string",
      ),
    /**
     * An app that just started asks the host for the current stack.
     */
    stateRequested: isEmptyPayload,
  },
  protocolVersion: 1,
});

export type FullscreenMessage = MessageOf<typeof fullscreenMessageChannel>;
