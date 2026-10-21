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

import { isRecord } from "./messageGuards.js";

/**
 * Checks that a received payload has the shape one message type expects.
 */
export type PayloadGuard<Payload> = (payload: unknown) => payload is Payload;

export type PayloadGuards = Record<string, PayloadGuard<unknown>>;

export type PayloadOf<Guard> =
  Guard extends PayloadGuard<infer Payload> ? Payload : never;

/**
 * Every message a channel defines, as a union of `{ type, payload }` objects. `type` is `"<messageDomain>/<eventName>"`, the same shape Redux uses for action types.
 */
export type ChannelMessage<
  MessageDomain extends string,
  ChannelPayloadGuards extends PayloadGuards,
> = {
  [EventName in keyof ChannelPayloadGuards & string]: {
    payload: PayloadOf<ChannelPayloadGuards[EventName]>;
    type: `${MessageDomain}/${EventName}`;
  };
}[keyof ChannelPayloadGuards & string];

/**
 * One function per message type. Each takes the payload and returns the whole message, so a sender can't misspell a `type` or send a payload of the wrong shape.
 */
export type MessageCreators<
  MessageDomain extends string,
  ChannelPayloadGuards extends PayloadGuards,
> = {
  [EventName in keyof ChannelPayloadGuards & string]: (
    payload: PayloadOf<ChannelPayloadGuards[EventName]>,
  ) => {
    payload: PayloadOf<ChannelPayloadGuards[EventName]>;
    type: `${MessageDomain}/${EventName}`;
  };
};

/**
 * What a message bus needs to know about a channel to send and receive on it.
 */
export type MessageChannel<Message> = {
  /**
   * Name shared by every publisher and subscriber of the channel. Other code on the page also sends `message` events, so this is how a subscriber knows a message was meant for it.
   */
  channelName: string;
  /**
   * Checks that a received message is one this channel defines. Any script on the same origin can post a message, so a received one is never trusted without checking it.
   */
  isMessage: (message: unknown) => message is Message;
  /**
   * Which version of the channel's messages a sender speaks. A receiver drops messages from any other version.
   */
  protocolVersion: number;
};

/**
 * The union of every message a channel carries.
 */
export type MessageOf<Channel> =
  Channel extends MessageChannel<infer Message> ? Message : never;

export type DefinedMessageChannel<
  MessageDomain extends string,
  ChannelPayloadGuards extends PayloadGuards,
> = {
  messageCreators: MessageCreators<MessageDomain, ChannelPayloadGuards>;
} & MessageChannel<ChannelMessage<MessageDomain, ChannelPayloadGuards>>;

export type CreateMessageChannelArgs<
  MessageDomain extends string,
  ChannelPayloadGuards extends PayloadGuards,
> = {
  channelName: string;
  /**
   * The first half of every message `type` on this channel, such as `"fullscreen"` in `"fullscreen/enterRequested"`.
   */
  messageDomain: MessageDomain;
  /**
   * One check per message type, keyed by the second half of its `type`. The message types and their payload types all come from these checks, so the TypeScript types and the runtime check can't disagree.
   */
  payloadGuards: ChannelPayloadGuards;
  /**
   * Starts at `1`. Raise it only for a breaking change: a message type or field renamed, removed, or given a new meaning. Adding a message type or an optional field isn't breaking, because receivers ignore what they don't know.
   */
  protocolVersion: number;
};

/**
 * Define the messages a channel carries, once, and get both the TypeScript types and the runtime check from that one definition.
 *
 * Each app and Unified UI Shell can bundle a different version of Odyssey, and an auto-updater moves each repository to a new version on its own schedule. Compile-time types only help code built against the same version, so every received message is also checked at runtime.
 */
export const createMessageChannel = <
  MessageDomain extends string,
  ChannelPayloadGuards extends PayloadGuards,
>({
  channelName,
  messageDomain,
  payloadGuards,
  protocolVersion,
}: CreateMessageChannelArgs<
  MessageDomain,
  ChannelPayloadGuards
>): DefinedMessageChannel<MessageDomain, ChannelPayloadGuards> => {
  const typePrefix = `${messageDomain}/`;

  const isMessage = (
    message: unknown,
  ): message is ChannelMessage<MessageDomain, ChannelPayloadGuards> =>
    isRecord(message) &&
    typeof message.type === "string" &&
    message.type.startsWith(typePrefix) &&
    Object.hasOwn(payloadGuards, message.type.slice(typePrefix.length)) &&
    payloadGuards[message.type.slice(typePrefix.length)](message.payload);

  // `Object.fromEntries` can't carry a separate type per key, so the mapped type is restored here. Every key and payload type still comes from `payloadGuards`.
  const messageCreators = Object.fromEntries(
    Object.keys(payloadGuards).map((eventName) => [
      eventName,
      (payload: unknown) => ({ payload, type: `${typePrefix}${eventName}` }),
    ]),
  ) as MessageCreators<MessageDomain, ChannelPayloadGuards>;

  return {
    channelName,
    isMessage,
    messageCreators,
    protocolVersion,
  };
};
