/*!
 * Copyright (c) 2021-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { omit } from "./omit";

describe("omit", () => {
  it(`returns an object with default keys omitted`, () => {
    const obj = Object.freeze({
      className: 'foo bar baz',
      children: 'Hello World',
      style: { color: 'plum' }
    });
    expect(omit(obj)).toEqual({});
  });

  it(`returns an object with specified keys omitted`, () => {
    const obj = Object.freeze({ foo: true });
    expect(omit(obj, 'foo')).toEqual({});
  });

  it(`returns an object with no specified keys included`, () => {
    const obj = Object.freeze({ foo: true });
    expect(omit(obj)).toEqual(obj);
  });
});
