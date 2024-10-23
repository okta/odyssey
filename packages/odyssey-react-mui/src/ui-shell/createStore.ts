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

/**
 * Creates an internal state and gives access to those values via functions.
 *
 * It can be optionally given an initial state.
 */
export const createStore = <State extends object>(initialState?: State) => {
  const state = initialState || ({} as Partial<State>);

  const hasState = <Name extends keyof State>(name: Name) => name in state;

  const getState = <Name extends keyof State>(name: Name) => state[name];

  const setState = <Name extends keyof State>(
    name: Name,
    value: Required<State>[Name],
  ) => {
    state[name] = value;
  };

  return {
    getState,
    hasState,
    setState,
  };
};
