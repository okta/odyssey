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

describe("createStore", () => {
  test("starts with no initial state", () => {
    const store = createStore<{
      value: null;
    }>();

    expect(store.hasState("value")).toBe(false);
    expect(store.getState("value")).toBe(undefined);
  });

  test("changes state when set", () => {
    const store = createStore<{
      value: null;
    }>();

    store.setState("value", null);

    expect(store.hasState("value")).toBe(true);
    expect(store.getState("value")).toBe(null);
  });

  test("reads initial state value", () => {
    const store = createStore({
      value: null,
    });

    expect(store.hasState("value")).toBe(true);
    expect(store.getState("value")).toBe(null);
  });

  test("changes initial state when set", () => {
    const store = createStore<{
      value: boolean;
    }>({
      value: false,
    });

    store.setState("value", true);

    expect(store.hasState("value")).toBe(true);
    expect(store.getState("value")).toBe(true);
  });

  test("changes initial state when set", () => {
    const store = createStore<{
      value: boolean;
    }>({
      value: false,
    });

    store.setState("value", true);

    expect(store.hasState("value")).toBe(true);
    expect(store.getState("value")).toBe(true);
  });

  test("allows for multiple different states", () => {
    const store = createStore<{
      value1: boolean;
      value2: number;
    }>({
      value1: false,
      value2: 0,
    });

    expect(store.hasState("value1")).toBe(true);
    expect(store.hasState("value2")).toBe(true);
    expect(store.getState("value1")).toBe(false);
    expect(store.getState("value2")).toBe(0);
  });

  test("allows setting multiple states", () => {
    const store = createStore<{
      value1: boolean;
      value2: number;
    }>({
      value1: false,
      value2: 0,
    });

    store.setState("value1", true);
    store.setState("value2", 1);

    expect(store.hasState("value1")).toBe(true);
    expect(store.hasState("value2")).toBe(true);
    expect(store.getState("value1")).toBe(true);
    expect(store.getState("value2")).toBe(1);
  });
});
