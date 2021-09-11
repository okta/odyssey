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

import { cx } from "./cx";

describe("cx", () => {
  it("returns a string with variadic arguments joined", () => {
    expect(cx("foo", "bar", "baz")).toEqual("foo bar baz");
  });

  it("returns a string with falsy and non string variadic arguments excluded", () => {
    expect(cx(false && "foo", true && "bar", "", false, undefined)).toEqual(
      "bar"
    );
  });

  it("returns a string with object variadic arguments evaluated correctly", () => {
    expect(
      cx("foo", { bar: true, baz: false }, { qux: true, quux: undefined })
    ).toEqual("foo bar qux");
  });
});
