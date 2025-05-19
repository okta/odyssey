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

import { act, renderHook, waitFor } from "@testing-library/react";

import {
  getIsYAxisScrollContainer,
  getIsScrollHeightElement,
  getNestedScrollContainers,
  getIsYAxisScrolling,
  useScrollState,
} from "./useScrollState.js";

/** There's no way to do a `waitFor` when we already aren't scrolled, so this hack has been added. */
const waitFor100ms = async () =>
  await new Promise((resolve) => setTimeout(resolve, 100));

const renderElements = ({
  containerElementHeight,
  isNested,
  scrollableElementHeight,
}: {
  containerElementHeight: CSSStyleDeclaration["height"];
  isNested?: boolean;
  scrollableElementHeight: CSSStyleDeclaration["height"];
}) => {
  const containerElement = document.createElement("div");
  const childElement = document.createElement("div");

  containerElement.setAttribute("data-container", "");
  childElement.setAttribute("data-child", "");

  if (isNested) {
    containerElement.setAttribute("data-nested", "");
    childElement.setAttribute("data-nested", "");
  }

  containerElement.style.setProperty("height", containerElementHeight);
  childElement.style.setProperty("height", scrollableElementHeight);

  // For these Elements to have height, they need to be appended to the DOM.
  document.body.append(containerElement);
  containerElement.append(childElement);

  return {
    containerElement,
    scrollableElement: childElement,
  };
};

describe(getIsScrollHeightElement.name, () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("is scroll height when equal height", async () => {
    const { containerElement, scrollableElement } = renderElements({
      containerElementHeight: "100px",
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
      containerElementHeight: "100px",
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
      containerElementHeight: "100px",
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
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("is not y-axis scroll container", () => {
    test("when overflow visible", async () => {
      const { containerElement } = renderElements({
        containerElementHeight: "100px",
        scrollableElementHeight: "100px",
      });

      containerElement.style.setProperty("overflow", "visible");

      await waitFor(() => {
        expect(getIsYAxisScrollContainer(containerElement)).toBe(false);
      });
    });

    test("when overflow-y visible", async () => {
      const { containerElement } = renderElements({
        containerElementHeight: "100px",
        scrollableElementHeight: "100px",
      });

      containerElement.style.setProperty("overflow-y", "visible");

      await waitFor(() => {
        expect(getIsYAxisScrollContainer(containerElement)).toBe(false);
      });
    });

    test("when overflow hidden", async () => {
      const { containerElement } = renderElements({
        containerElementHeight: "100px",
        scrollableElementHeight: "100px",
      });

      containerElement.style.setProperty("overflow", "hidden");

      await waitFor(() => {
        expect(getIsYAxisScrollContainer(containerElement)).toBe(false);
      });
    });

    test("when overflow-y hidden", async () => {
      const { containerElement } = renderElements({
        containerElementHeight: "100px",
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
        containerElementHeight: "100px",
        scrollableElementHeight: "100px",
      });

      containerElement.style.setProperty("overflow", "auto");

      await waitFor(() => {
        expect(getIsYAxisScrollContainer(containerElement)).toBe(true);
      });
    });

    test("when overflow-y auto", async () => {
      const { containerElement } = renderElements({
        containerElementHeight: "100px",
        scrollableElementHeight: "100px",
      });

      containerElement.style.setProperty("overflow-y", "auto");

      await waitFor(() => {
        expect(getIsYAxisScrollContainer(containerElement)).toBe(true);
      });
    });

    test("when overflow scroll", async () => {
      const { containerElement } = renderElements({
        containerElementHeight: "100px",
        scrollableElementHeight: "100px",
      });

      containerElement.style.setProperty("overflow", "scroll");

      await waitFor(() => {
        expect(getIsYAxisScrollContainer(containerElement)).toBe(true);
      });
    });

    test("when overflow-y scroll", async () => {
      const { containerElement } = renderElements({
        containerElementHeight: "100px",
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
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("is not y-axis scrolling", () => {
    test("when content shorter", async () => {
      const { containerElement } = renderElements({
        containerElementHeight: "100px",
        scrollableElementHeight: "99px",
      });

      containerElement.style.setProperty("overflow", "auto");

      await waitFor(() => {
        expect(getIsYAxisScrolling(containerElement)).toBe(false);
      });
    });

    test("when content equal height", async () => {
      const { containerElement } = renderElements({
        containerElementHeight: "100px",
        scrollableElementHeight: "100px",
      });

      containerElement.style.setProperty("overflow", "auto");

      await waitFor(() => {
        expect(getIsYAxisScrolling(containerElement)).toBe(false);
      });
    });

    test("when content taller but no overflow", async () => {
      const { containerElement } = renderElements({
        containerElementHeight: "100px",
        scrollableElementHeight: "101px",
      });

      await waitFor(() => {
        expect(getIsYAxisScrolling(containerElement)).toBe(false);
      });
    });

    test("when content taller but overflow visible", async () => {
      const { containerElement } = renderElements({
        containerElementHeight: "100px",
        scrollableElementHeight: "101px",
      });

      containerElement.style.setProperty("overflow", "visible");

      await waitFor(() => {
        expect(getIsYAxisScrolling(containerElement)).toBe(false);
      });
    });

    test("when content taller but overflow hidden", async () => {
      const { containerElement } = renderElements({
        containerElementHeight: "100px",
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
        containerElementHeight: "100px",
        scrollableElementHeight: "101px",
      });

      containerElement.style.setProperty("overflow", "auto");

      await waitFor(() => {
        expect(getIsYAxisScrolling(containerElement)).toBe(true);
      });
    });

    test("with overflow-y auto", async () => {
      const { containerElement } = renderElements({
        containerElementHeight: "100px",
        scrollableElementHeight: "101px",
      });

      containerElement.style.setProperty("overflow-y", "auto");

      await waitFor(() => {
        expect(getIsYAxisScrolling(containerElement)).toBe(true);
      });
    });

    test("with overflow scroll", async () => {
      const { containerElement } = renderElements({
        containerElementHeight: "100px",
        scrollableElementHeight: "101px",
      });

      containerElement.style.setProperty("overflow", "scroll");

      await waitFor(() => {
        expect(getIsYAxisScrolling(containerElement)).toBe(true);
      });
    });

    test("with overflow-y scroll", async () => {
      const { containerElement } = renderElements({
        containerElementHeight: "100px",
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
  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("finds scroll container when content has overflow", async () => {
    const { containerElement, scrollableElement } = renderElements({
      containerElementHeight: "100px",
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
        containerElementHeight: "100px",
        scrollableElementHeight: "101px",
      });

      const {
        containerElement: nestedContainerElement,
        scrollableElement: nestedScrollableElement,
      } = renderElements({
        containerElementHeight: "102px",
        isNested: true,
        scrollableElementHeight: "101px",
      });

      scrollableElement.append(nestedContainerElement);

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
        containerElementHeight: "100px",
        scrollableElementHeight: "101px",
      });

      const {
        containerElement: nestedContainerElement,
        scrollableElement: nestedScrollableElement,
      } = renderElements({
        containerElementHeight: "102px",
        isNested: true,
        scrollableElementHeight: "101px",
      });

      scrollableElement.append(nestedContainerElement);

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
      containerElementHeight: "100px",
      scrollableElementHeight: "100px",
    });

    await waitFor(() => {
      expect(getNestedScrollContainers(containerElement)).toEqual([]);
    });
  });
});

describe(useScrollState.name, () => {
  afterEach(async () => {
    // This needs to be wrapped in `act` because the web component unmounts the React app, and React events have to be wrapped in `act`.
    await act(async () => {
      // Remove any appended elements because of this hacky process of rendering to the global DOM.
      document.body.innerHTML = "";
      return Promise.resolve();
    });
  });

  describe("is scrolling", () => {
    test("when container scrolled", async () => {
      const { containerElement } = renderElements({
        containerElementHeight: "100px",
        scrollableElementHeight: "101px",
      });

      containerElement.style.setProperty("overflow-y", "auto");

      const { result } = renderHook(() => useScrollState(containerElement));

      expect(result.current.isContentScrolled).toBe(false);

      containerElement.scrollTo(0, 1);

      await waitFor(() => {
        expect(result.current.isContentScrolled).toBe(true);
      });
    });

    test("when nested scroll container scrolled", async () => {
      const { containerElement, scrollableElement } = renderElements({
        containerElementHeight: "100px",
        scrollableElementHeight: "100px",
      });

      const { containerElement: nestedContainerElement } = renderElements({
        containerElementHeight: "102px",
        isNested: true,
        scrollableElementHeight: "0px",
      });

      scrollableElement.append(nestedContainerElement);
      scrollableElement.style.setProperty("overflow-y", "auto");

      const { result } = renderHook(() => useScrollState(containerElement));

      expect(result.current.isContentScrolled).toBe(false);

      scrollableElement.scrollTo(0, 1);

      await waitFor(() => {
        expect(result.current.isContentScrolled).toBe(true);
      });
    });

    test("when nested scroll container in nested container scrolled", async () => {
      const { containerElement, scrollableElement } = renderElements({
        containerElementHeight: "100px",
        scrollableElementHeight: "100px",
      });

      const { containerElement: nestedContainerElement } = renderElements({
        containerElementHeight: "100px",
        isNested: true,
        scrollableElementHeight: "101px",
      });

      scrollableElement.style.setProperty("overflow-y", "auto");
      nestedContainerElement.style.setProperty("overflow-y", "auto");

      scrollableElement.append(nestedContainerElement);

      const { result } = renderHook(() => useScrollState(containerElement));

      expect(result.current.isContentScrolled).toBe(false);

      scrollableElement.scrollTo(0, 1);

      await waitFor100ms();

      expect(result.current.isContentScrolled).toBe(false);

      nestedContainerElement.scrollTo(0, 1);

      await waitFor(() => {
        expect(result.current.isContentScrolled).toBe(true);
      });
    });

    test("when two adjacent scroll containers scrolled", async () => {
      const { containerElement, scrollableElement } = renderElements({
        containerElementHeight: "100px",
        scrollableElementHeight: "100px",
      });

      const { containerElement: nestedContainerElement } = renderElements({
        containerElementHeight: "102px",
        isNested: true,
        scrollableElementHeight: "0px",
      });

      scrollableElement.style.setProperty("overflow-y", "auto");
      scrollableElement.append(nestedContainerElement);

      const { containerElement: adjacentContainerElement } = renderElements({
        containerElementHeight: "101px",
        isNested: true,
        scrollableElementHeight: "102px",
      });

      adjacentContainerElement.style.setProperty("overflow-y", "auto");
      containerElement.append(adjacentContainerElement);

      const { result } = renderHook(() => useScrollState(containerElement));

      expect(result.current.isContentScrolled).toBe(false);

      scrollableElement.scrollTo(0, 1);

      await waitFor(() => {
        expect(result.current.isContentScrolled).toBe(true);
      });

      scrollableElement.scrollTo(0, 0);

      await waitFor(() => {
        expect(result.current.isContentScrolled).toBe(false);
      });

      adjacentContainerElement.scrollTo(0, 1);

      await waitFor(() => {
        expect(result.current.isContentScrolled).toBe(true);
      });
    });

    test("when nested scroll container inside nested scroll container scrolled", async () => {
      const { containerElement, scrollableElement } = renderElements({
        containerElementHeight: "100px",
        scrollableElementHeight: "100px",
      });

      const { containerElement: nestedContainerElement } = renderElements({
        containerElementHeight: "101px",
        isNested: true,
        scrollableElementHeight: "102px",
      });

      scrollableElement.style.setProperty("overflow-y", "auto");
      nestedContainerElement.style.setProperty("overflow-y", "auto");

      scrollableElement.append(nestedContainerElement);

      const { result } = renderHook(() => useScrollState(containerElement));

      expect(result.current.isContentScrolled).toBe(false);

      scrollableElement.scrollTo(0, 1);

      await waitFor(() => {
        expect(result.current.isContentScrolled).toBe(true);
      });

      scrollableElement.scrollTo(0, 0);

      await waitFor(() => {
        expect(result.current.isContentScrolled).toBe(false);
      });

      nestedContainerElement.scrollTo(0, 1);

      await waitFor(() => {
        expect(result.current.isContentScrolled).toBe(true);
      });
    });
  });

  describe("is scrolling after DOM update", () => {
    test("when overflow added after render then scrolled", async () => {
      const { containerElement, scrollableElement } = renderElements({
        containerElementHeight: "100px",
        scrollableElementHeight: "100px",
      });

      const { containerElement: nestedContainerElement } = renderElements({
        containerElementHeight: "101px",
        isNested: true,
        scrollableElementHeight: "0px",
      });

      const { result } = renderHook(() => useScrollState(containerElement));

      expect(result.current.isContentScrolled).toBe(false);

      scrollableElement.style.setProperty("overflow-y", "auto");
      scrollableElement.scrollTo(0, 1);

      await waitFor100ms();

      expect(result.current.isContentScrolled).toBe(false);

      scrollableElement.append(nestedContainerElement);
      scrollableElement.scrollTo(0, 1);

      await waitFor(() => {
        expect(result.current.isContentScrolled).toBe(true);
      });
    });

    test("when nested container added after render then scrolled", async () => {
      const { containerElement, scrollableElement } = renderElements({
        containerElementHeight: "100px",
        scrollableElementHeight: "100px",
      });

      const { containerElement: nestedContainerElement } = renderElements({
        containerElementHeight: "101px",
        isNested: true,
        scrollableElementHeight: "0px",
      });

      const { result } = renderHook(() => useScrollState(containerElement));

      expect(result.current.isContentScrolled).toBe(false);

      scrollableElement.scrollTo(0, 1);

      await waitFor100ms();

      expect(result.current.isContentScrolled).toBe(false);

      scrollableElement.append(nestedContainerElement);
      scrollableElement.style.setProperty("overflow-y", "auto");
      scrollableElement.scrollTo(0, 1);

      await waitFor(() => {
        expect(result.current.isContentScrolled).toBe(true);
      });
    });
  });

  describe("is not scrolling", () => {
    test("when scroll container is container's height", async () => {
      const { containerElement } = renderElements({
        containerElementHeight: "100px",
        scrollableElementHeight: "100px",
      });

      containerElement.style.setProperty("overflow-y", "auto");

      const { result } = renderHook(() => useScrollState(containerElement));

      expect(result.current.isContentScrolled).toBe(false);

      containerElement.scrollTo(0, 1);

      await waitFor100ms();

      expect(result.current.isContentScrolled).toBe(false);
    });

    test("when scroll container less than container's height and scrolled", async () => {
      const { containerElement, scrollableElement } = renderElements({
        containerElementHeight: "100px",
        scrollableElementHeight: "99px",
      });

      const { containerElement: nestedContainerElement } = renderElements({
        containerElementHeight: "100px",
        isNested: true,
        scrollableElementHeight: "0px",
      });

      scrollableElement.append(nestedContainerElement);
      scrollableElement.style.setProperty("overflow-y", "auto");

      const { result } = renderHook(() => useScrollState(containerElement));

      expect(result.current.isContentScrolled).toBe(false);

      scrollableElement.scrollTo(0, 1);

      await waitFor100ms();

      expect(result.current.isContentScrolled).toBe(false);
    });

    test("when element outside of container scrolled", async () => {
      const { containerElement } = renderElements({
        containerElementHeight: "100px",
        scrollableElementHeight: "100px",
      });

      const { containerElement: adjacentContainerElement } = renderElements({
        containerElementHeight: "100px",
        isNested: true,
        scrollableElementHeight: "101px",
      });

      adjacentContainerElement.style.setProperty("overflow-y", "auto");

      const { result } = renderHook(() => useScrollState(containerElement));

      expect(result.current.isContentScrolled).toBe(false);

      await waitFor100ms();

      expect(result.current.isContentScrolled).toBe(false);
    });
  });
});
