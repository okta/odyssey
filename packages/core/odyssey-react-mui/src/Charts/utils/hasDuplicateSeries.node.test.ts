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

import { hasDuplicateSeries } from "./hasDuplicateSeries.js";

describe(hasDuplicateSeries.name, () => {
  test("two series that share a name", () => {
    expect(
      hasDuplicateSeries({
        series: [
          { name: "Events", data: [4.2] },
          { name: "Events", data: [1.4] },
        ],
      }),
    ).toBe(true);
  });

  test("every series has a different name", () => {
    expect(
      hasDuplicateSeries({
        series: [
          { name: "Events", data: [4.2] },
          { name: "Retries", data: [1.4] },
        ],
      }),
    ).toBe(false);
  });

  test("an empty series array", () => {
    expect(hasDuplicateSeries({ series: [] })).toBe(false);
  });

  test("one series", () => {
    expect(
      hasDuplicateSeries({ series: [{ name: "Events", data: [4.2] }] }),
    ).toBe(false);
  });

  test("three series where the second and third share a name", () => {
    expect(
      hasDuplicateSeries({
        series: [
          { name: "Attempts", data: [4.2] },
          { name: "Events", data: [1.4] },
          { name: "Events", data: [0.8] },
        ],
      }),
    ).toBe(true);
  });

  test("two series that share the empty string name", () => {
    // An empty string is a legal series name, and two series that both use it
    // collide on the React key in the same way as any other repeated name.
    expect(
      hasDuplicateSeries({
        series: [
          { name: "", data: [4.2] },
          { name: "", data: [1.4] },
        ],
      }),
    ).toBe(true);
  });
});
