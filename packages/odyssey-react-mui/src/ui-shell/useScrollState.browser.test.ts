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

import { waitFor } from "@testing-library/react";

import {
  getIsYAxisScrollContainer,
  getIsScrollHeightElement,
  getNestedScrollContainers,
  getIsYAxisScrolling,
} from "./useScrollState.js";

const renderElements = ({
  contentElementHeight,
  scrollableElementHeight,
}: {
  contentElementHeight: CSSStyleDeclaration["height"];
  scrollableElementHeight: CSSStyleDeclaration["height"];
}) => {
  const containerElement = document.createElement("div");
  const childElement = document.createElement("div");

  containerElement.setAttribute("data-container", "");
  childElement.setAttribute("data-child", "");

  containerElement.style.setProperty("height", contentElementHeight);
  childElement.style.setProperty("height", scrollableElementHeight);

  // For these Elements to have height, they need to be appended to the DOM.
  window.document.body.append(containerElement);
  containerElement.append(childElement);

  return {
    containerElement,
    scrollableElement: childElement,
  };
};

describe(getIsScrollHeightElement.name, () => {
  test("is scroll height when equal height", async () => {
    const { containerElement, scrollableElement } = renderElements({
      contentElementHeight: "100px",
      scrollableElementHeight: "100px",
    });

    await waitFor(() => {
      expect(
        getIsScrollHeightElement({
          containerElement,
          scrollableElement,
        }),
      ).toBe(true);
    });
  });

  test("is scroll height when taller", async () => {
    const { containerElement, scrollableElement } = renderElements({
      contentElementHeight: "100px",
      scrollableElementHeight: "101px",
    });

    await waitFor(() => {
      expect(
        getIsScrollHeightElement({
          containerElement,
          scrollableElement,
        }),
      ).toBe(true);
    });
  });

  test("is not scroll height when shorter", async () => {
    const { containerElement, scrollableElement } = renderElements({
      contentElementHeight: "100px",
      scrollableElementHeight: "99px",
    });

    await waitFor(() => {
      expect(
        getIsScrollHeightElement({
          containerElement,
          scrollableElement,
        }),
      ).toBe(false);
    });
  });
});

describe(getIsYAxisScrollContainer.name, () => {
  describe("is not y-axis scroll container", () => {
    test("when overflow visible", async () => {
      const { containerElement } = renderElements({
        contentElementHeight: "100px",
        scrollableElementHeight: "100px",
      });

      containerElement.style.setProperty("overflow", "visible");

      await waitFor(() => {
        expect(getIsYAxisScrollContainer(containerElement)).toBe(false);
      });
    });

    test("when overflow-y visible", async () => {
      const { containerElement } = renderElements({
        contentElementHeight: "100px",
        scrollableElementHeight: "100px",
      });

      containerElement.style.setProperty("overflow-y", "visible");

      await waitFor(() => {
        expect(getIsYAxisScrollContainer(containerElement)).toBe(false);
      });
    });

    test("when overflow hidden", async () => {
      const { containerElement } = renderElements({
        contentElementHeight: "100px",
        scrollableElementHeight: "100px",
      });

      containerElement.style.setProperty("overflow", "hidden");

      await waitFor(() => {
        expect(getIsYAxisScrollContainer(containerElement)).toBe(false);
      });
    });

    test("when overflow-y hidden", async () => {
      const { containerElement } = renderElements({
        contentElementHeight: "100px",
        scrollableElementHeight: "100px",
      });

      containerElement.style.setProperty("overflow-y", "hidden");

      await waitFor(() => {
        expect(getIsYAxisScrollContainer(containerElement)).toBe(false);
      });
    });
  });

  describe("is y-axis scroll container", () => {
    test("when overflow auto", async () => {
      const { containerElement } = renderElements({
        contentElementHeight: "100px",
        scrollableElementHeight: "100px",
      });

      containerElement.style.setProperty("overflow", "auto");

      await waitFor(() => {
        expect(getIsYAxisScrollContainer(containerElement)).toBe(true);
      });
    });

    test("when overflow-y auto", async () => {
      const { containerElement } = renderElements({
        contentElementHeight: "100px",
        scrollableElementHeight: "100px",
      });

      containerElement.style.setProperty("overflow-y", "auto");

      await waitFor(() => {
        expect(getIsYAxisScrollContainer(containerElement)).toBe(true);
      });
    });

    test("when overflow scroll", async () => {
      const { containerElement } = renderElements({
        contentElementHeight: "100px",
        scrollableElementHeight: "100px",
      });

      containerElement.style.setProperty("overflow", "scroll");

      await waitFor(() => {
        expect(getIsYAxisScrollContainer(containerElement)).toBe(true);
      });
    });

    test("when overflow-y scroll", async () => {
      const { containerElement } = renderElements({
        contentElementHeight: "100px",
        scrollableElementHeight: "100px",
      });

      containerElement.style.setProperty("overflow-y", "scroll");

      await waitFor(() => {
        expect(getIsYAxisScrollContainer(containerElement)).toBe(true);
      });
    });
  });
});

describe(getIsYAxisScrolling.name, () => {
  describe("is not y-axis scrolling", () => {
    test("when content shorter", async () => {
      const { containerElement } = renderElements({
        contentElementHeight: "100px",
        scrollableElementHeight: "99px",
      });

      containerElement.style.setProperty("overflow", "auto");

      await waitFor(() => {
        expect(getIsYAxisScrolling(containerElement)).toBe(false);
      });
    });

    test("when content equal height", async () => {
      const { containerElement } = renderElements({
        contentElementHeight: "100px",
        scrollableElementHeight: "100px",
      });

      containerElement.style.setProperty("overflow", "auto");

      await waitFor(() => {
        expect(getIsYAxisScrolling(containerElement)).toBe(false);
      });
    });

    test("when content taller but no overflow", async () => {
      const { containerElement } = renderElements({
        contentElementHeight: "100px",
        scrollableElementHeight: "101px",
      });

      await waitFor(() => {
        expect(getIsYAxisScrolling(containerElement)).toBe(false);
      });
    });

    test("when content taller but overflow visible", async () => {
      const { containerElement } = renderElements({
        contentElementHeight: "100px",
        scrollableElementHeight: "101px",
      });

      containerElement.style.setProperty("overflow", "visible");

      await waitFor(() => {
        expect(getIsYAxisScrolling(containerElement)).toBe(false);
      });
    });

    test("when content taller but overflow hidden", async () => {
      const { containerElement } = renderElements({
        contentElementHeight: "100px",
        scrollableElementHeight: "101px",
      });

      containerElement.style.setProperty("overflow", "hidden");

      await waitFor(() => {
        expect(getIsYAxisScrolling(containerElement)).toBe(false);
      });
    });
  });

  describe("is y-axis scrolling when content taller", () => {
    test("with overflow auto", async () => {
      const { containerElement } = renderElements({
        contentElementHeight: "100px",
        scrollableElementHeight: "101px",
      });

      containerElement.style.setProperty("overflow", "auto");

      await waitFor(() => {
        expect(getIsYAxisScrolling(containerElement)).toBe(true);
      });
    });

    test("with overflow-y auto", async () => {
      const { containerElement } = renderElements({
        contentElementHeight: "100px",
        scrollableElementHeight: "101px",
      });

      containerElement.style.setProperty("overflow-y", "auto");

      await waitFor(() => {
        expect(getIsYAxisScrolling(containerElement)).toBe(true);
      });
    });

    test("with overflow scroll", async () => {
      const { containerElement } = renderElements({
        contentElementHeight: "100px",
        scrollableElementHeight: "101px",
      });

      containerElement.style.setProperty("overflow", "scroll");

      await waitFor(() => {
        expect(getIsYAxisScrolling(containerElement)).toBe(true);
      });
    });

    test("with overflow-y scroll", async () => {
      const { containerElement } = renderElements({
        contentElementHeight: "100px",
        scrollableElementHeight: "101px",
      });

      containerElement.style.setProperty("overflow-y", "scroll");

      await waitFor(() => {
        expect(getIsYAxisScrolling(containerElement)).toBe(true);
      });
    });
  });
});

describe(getNestedScrollContainers.name, () => {
  test("finds scroll container when content has overflow", async () => {
    const { containerElement, scrollableElement } = renderElements({
      contentElementHeight: "100x",
      scrollableElementHeight: "100px",
    });

    // Added extra overflows to verify it only grabs the correct ones.
    containerElement.style.setProperty("overflow-y", "auto");
    scrollableElement.style.setProperty("overflow-y", "auto");

    await waitFor(() => {
      expect(getNestedScrollContainers(containerElement)).toEqual([
        scrollableElement,
      ]);
    });
  });

  describe("finds deeply nested scroll containers", () => {
    test("one element is a scroll container", async () => {
      const { containerElement, scrollableElement } = renderElements({
        contentElementHeight: "100x",
        scrollableElementHeight: "101px",
      });

      const {
        containerElement: nestedContainerElement,
        scrollableElement: nestedScrollableElement,
      } = renderElements({
        contentElementHeight: "102x",
        scrollableElementHeight: "101px",
      });

      scrollableElement.append(nestedContainerElement);

      nestedContainerElement.setAttribute("data-nested", "");
      nestedScrollableElement.setAttribute("data-nested", "");

      // Added parent overflow to verify it only grabs the deeply-nested child.
      containerElement.style.setProperty("overflow-y", "auto");
      nestedScrollableElement.style.setProperty("overflow-y", "auto");

      await waitFor(() => {
        expect(getNestedScrollContainers(containerElement)).toEqual([
          nestedScrollableElement,
        ]);
      });
    });

    test("all elements are scroll containers", async () => {
      const { containerElement, scrollableElement } = renderElements({
        contentElementHeight: "100x",
        scrollableElementHeight: "101px",
      });

      const {
        containerElement: nestedContainerElement,
        scrollableElement: nestedScrollableElement,
      } = renderElements({
        contentElementHeight: "102x",
        scrollableElementHeight: "101px",
      });

      scrollableElement.append(nestedContainerElement);

      nestedContainerElement.setAttribute("data-nested", "");
      nestedScrollableElement.setAttribute("data-nested", "");

      // Added extra overflows to verify it only grabs the correct ones.
      containerElement.style.setProperty("overflow-y", "auto");
      scrollableElement.style.setProperty("overflow-y", "auto");
      nestedContainerElement.style.setProperty("overflow-y", "auto");
      nestedScrollableElement.style.setProperty("overflow-y", "auto");

      await waitFor(() => {
        expect(getNestedScrollContainers(containerElement)).toEqual([
          scrollableElement,
          nestedContainerElement,
          nestedScrollableElement,
        ]);
      });
    });
  });

  test("finds no scroll container when content has no overflow", async () => {
    const { containerElement } = renderElements({
      contentElementHeight: "100x",
      scrollableElementHeight: "100px",
    });

    await waitFor(() => {
      expect(getNestedScrollContainers(containerElement)).toEqual([]);
    });
  });
});
