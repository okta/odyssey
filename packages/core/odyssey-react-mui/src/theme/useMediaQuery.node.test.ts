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
  ABSOLUTE_MINIMUM_HEIGHT,
  ABSOLUTE_MINIMUM_WIDTH,
  COMPACT_MAX_HEIGHT,
  COMPACT_MAX_WIDTH,
  toCompactMediaQuery,
} from "./useMediaQuery.js";

// Each test compares against a written-out string, not against a string that is
// built from the same constants. A test that builds its expected value from the
// constants is always true, and it lets a change to an activation buffer pass
// without notice.
describe("compact viewport thresholds", () => {
  test("thresholds stay above the absolute minimum floors", () => {
    expect(COMPACT_MAX_WIDTH).toBeGreaterThan(ABSOLUTE_MINIMUM_WIDTH);
    expect(COMPACT_MAX_HEIGHT).toBeGreaterThan(ABSOLUTE_MINIMUM_HEIGHT);
  });
});

describe(toCompactMediaQuery.name, () => {
  test("width only, as the Drawer override uses it", () => {
    expect(toCompactMediaQuery("width")).toBe("@media (max-width: 400px)");
  });

  test("height only", () => {
    expect(toCompactMediaQuery("height")).toBe("@media (max-height: 500px)");
  });

  test("both axes, as the Dialog override uses it", () => {
    expect(toCompactMediaQuery("width", "height")).toBe(
      "@media (max-width: 400px),(max-height: 500px)",
    );
  });

  test("both axes in the other order", () => {
    expect(toCompactMediaQuery("height", "width")).toBe(
      "@media (max-height: 500px),(max-width: 400px)",
    );
  });
});
