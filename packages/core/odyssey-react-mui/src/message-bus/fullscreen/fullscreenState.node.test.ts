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
  emptyFullscreenState,
  getActiveFullscreenId,
  getFullscreenStackIndex,
  getHasActiveFullscreen,
  getIsFullscreen,
  getIsInFullscreenStack,
  getStackWithEnteredId,
  getStackWithExitedId,
} from "./fullscreenState.js";

describe(getStackWithEnteredId.name, () => {
  test("entering with nothing in fullscreen", () => {
    expect(
      getStackWithEnteredId({ fullscreenId: "app", fullscreenStack: [] }),
    ).toStrictEqual(["app"]);
  });

  test("entering on top of another id", () => {
    expect(
      getStackWithEnteredId({
        fullscreenId: "chart",
        fullscreenStack: ["app"],
      }),
    ).toStrictEqual(["app", "chart"]);
  });

  test("entering an id that's already in the stack", () => {
    expect(
      getStackWithEnteredId({
        fullscreenId: "app",
        fullscreenStack: ["app", "chart"],
      }),
    ).toStrictEqual(["chart", "app"]);
  });
});

describe(getStackWithExitedId.name, () => {
  test("exiting the top id", () => {
    expect(
      getStackWithExitedId({
        fullscreenId: "chart",
        fullscreenStack: ["app", "chart"],
      }),
    ).toStrictEqual(["app"]);
  });

  test("exiting an id in the middle of the stack", () => {
    expect(
      getStackWithExitedId({
        fullscreenId: "chart",
        fullscreenStack: ["app", "chart", "table"],
      }),
    ).toStrictEqual(["app", "table"]);
  });

  test("exiting an id that isn't in the stack", () => {
    expect(
      getStackWithExitedId({ fullscreenId: "table", fullscreenStack: ["app"] }),
    ).toStrictEqual(["app"]);
  });
});

describe(getIsFullscreen.name, () => {
  test("the id on top of the stack", () => {
    expect(
      getIsFullscreen({
        fullscreenId: "chart",
        fullscreenStack: ["app", "chart"],
      }),
    ).toBe(true);
  });

  test("an id covered by the one above it", () => {
    expect(
      getIsFullscreen({
        fullscreenId: "app",
        fullscreenStack: ["app", "chart"],
      }),
    ).toBe(false);
  });
});

describe(getIsInFullscreenStack.name, () => {
  test("an id covered by the one above it", () => {
    expect(
      getIsInFullscreenStack({
        fullscreenId: "app",
        fullscreenStack: ["app", "chart"],
      }),
    ).toBe(true);
  });

  test("an id that isn't in the stack", () => {
    expect(
      getIsInFullscreenStack({
        fullscreenId: "table",
        fullscreenStack: ["app"],
      }),
    ).toBe(false);
  });
});

describe(getHasActiveFullscreen.name, () => {
  test("an id in the stack", () => {
    expect(getHasActiveFullscreen({ fullscreenStack: ["app"] })).toBe(true);
  });

  test("nothing in fullscreen", () => {
    expect(getHasActiveFullscreen(emptyFullscreenState)).toBe(false);
  });
});

describe(getActiveFullscreenId.name, () => {
  test("several ids in the stack", () => {
    expect(getActiveFullscreenId({ fullscreenStack: ["app", "chart"] })).toBe(
      "chart",
    );
  });

  test("nothing in fullscreen", () => {
    expect(getActiveFullscreenId(emptyFullscreenState)).toBe(undefined);
  });
});

describe(getFullscreenStackIndex.name, () => {
  test("ids at each position", () => {
    expect(
      ["app", "chart", "table"].map((fullscreenId) =>
        getFullscreenStackIndex({
          fullscreenId,
          fullscreenStack: ["app", "chart"],
        }),
      ),
    ).toStrictEqual([0, 1, -1]);
  });
});
