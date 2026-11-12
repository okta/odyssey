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

import { createBackdropStack } from "./backdropStack.js";

const LAYER = 1300;

describe(createBackdropStack.name, () => {
  test("no backdrops open", () => {
    const backdropStack = createBackdropStack();

    expect(backdropStack.getOpenBackdropIds()).toStrictEqual([]);
  });

  test("second backdrop opened on top of the first", () => {
    const backdropStack = createBackdropStack();

    backdropStack.openBackdrop({ backdropId: "drawer", layer: LAYER });
    backdropStack.openBackdrop({ backdropId: "dialog", layer: LAYER });

    expect(backdropStack.getOpenBackdropIds()).toStrictEqual([
      "drawer",
      "dialog",
    ]);
  });

  test("top backdrop closed", () => {
    const backdropStack = createBackdropStack();

    backdropStack.openBackdrop({ backdropId: "drawer", layer: LAYER });
    const closeDialogBackdrop = backdropStack.openBackdrop({
      backdropId: "dialog",
      layer: LAYER,
    });
    closeDialogBackdrop();

    expect(backdropStack.getOpenBackdropIds()).toStrictEqual(["drawer"]);
  });

  test("bottom backdrop closed while another stays open", () => {
    const backdropStack = createBackdropStack();

    const closeDrawerBackdrop = backdropStack.openBackdrop({
      backdropId: "drawer",
      layer: LAYER,
    });
    backdropStack.openBackdrop({ backdropId: "dialog", layer: LAYER });
    closeDrawerBackdrop();

    expect(backdropStack.getOpenBackdropIds()).toStrictEqual(["dialog"]);
  });

  test("open backdrop opened again", () => {
    const backdropStack = createBackdropStack();

    backdropStack.openBackdrop({ backdropId: "drawer", layer: LAYER });
    backdropStack.openBackdrop({ backdropId: "dialog", layer: LAYER });
    backdropStack.openBackdrop({ backdropId: "drawer", layer: LAYER });

    expect(backdropStack.getOpenBackdropIds()).toStrictEqual([
      "dialog",
      "drawer",
    ]);
  });

  test("backdrop closed twice", () => {
    const backdropStack = createBackdropStack();
    const listener = vi.fn();

    const closeDrawerBackdrop = backdropStack.openBackdrop({
      backdropId: "drawer",
      layer: LAYER,
    });
    backdropStack.subscribeToOpenBackdropIds(listener);
    closeDrawerBackdrop();
    closeDrawerBackdrop();

    expect(backdropStack.getOpenBackdropIds()).toStrictEqual([]);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  test("stack read twice without a change", () => {
    const backdropStack = createBackdropStack();

    backdropStack.openBackdrop({ backdropId: "drawer", layer: LAYER });

    expect(backdropStack.getOpenBackdropIds()).toBe(
      backdropStack.getOpenBackdropIds(),
    );
  });

  test("listener unsubscribed before a change", () => {
    const backdropStack = createBackdropStack();
    const listener = vi.fn();

    const unsubscribe = backdropStack.subscribeToOpenBackdropIds(listener);
    unsubscribe();
    backdropStack.openBackdrop({ backdropId: "drawer", layer: LAYER });

    expect(listener).toHaveBeenCalledTimes(0);
  });

  test("backdrop opened in a lower layer than an open one", () => {
    const backdropStack = createBackdropStack();

    backdropStack.openBackdrop({ backdropId: "dialog", layer: 1300 });
    backdropStack.openBackdrop({ backdropId: "drawer", layer: 1200 });

    expect(backdropStack.getOpenBackdropIds()).toStrictEqual([
      "drawer",
      "dialog",
    ]);
  });

  test("backdrop opened between two layers", () => {
    const backdropStack = createBackdropStack();

    backdropStack.openBackdrop({ backdropId: "drawer", layer: 1200 });
    backdropStack.openBackdrop({ backdropId: "dialog", layer: 1300 });
    backdropStack.openBackdrop({ backdropId: "nestedDrawer", layer: 1200 });

    expect(backdropStack.getOpenBackdropIds()).toStrictEqual([
      "drawer",
      "nestedDrawer",
      "dialog",
    ]);
  });
});
