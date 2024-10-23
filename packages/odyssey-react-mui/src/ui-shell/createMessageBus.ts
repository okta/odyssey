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

export type MessageHandler<Message> = (message: Message) => void;

export type PublishMessage<Message> = MessageHandler<Message>;

export type UnsubscribeMessageSubscription = () => void;

export type MessageSubscription<Message> = (
  subscriber: MessageHandler<Message>,
) => UnsubscribeMessageSubscription;

export type MessageBus<Message> = {
  publish: PublishMessage<Message>;
  subscribe: MessageSubscription<Message>;
};

/**
 * Create a self-contained message bus that allows you to subscribe to events published by the publisher.
 */
export const createMessageBus = <Message = void>(): MessageBus<Message> => {
  const subscribers = new Map<symbol, MessageHandler<Message>>();

  const publish: PublishMessage<Message> = (message) => {
    Array.from(subscribers.values()).forEach((subscriber) => {
      subscriber(message);
    });
  };

  const subscribe: MessageSubscription<Message> = (subscriber) => {
    const subscriberId = Symbol();
    subscribers.set(subscriberId, subscriber);

    return () => {
      subscribers.delete(subscriberId);
    };
  };

  return {
    publish,
    subscribe,
  };
};
