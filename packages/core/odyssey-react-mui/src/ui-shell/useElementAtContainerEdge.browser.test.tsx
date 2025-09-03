/*!
 * Copyright (c) 2025-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { renderHook, waitFor } from "@testing-library/react";

import { useElementAtContainerEdge } from "./useElementAtContainerEdge.js";

const setup = (dir = "ltr") => {
  document.documentElement.setAttribute("dir", dir);

  const monitoringElement = document.createElement("div");
  monitoringElement.style.display = "flex";
  monitoringElement.style.width = `${window.innerWidth}px`;
  monitoringElement.style.height = `${window.innerHeight}px`;

  const element = document.createElement("div");
  element.style.width = "100%";
  element.style.height = "100%";
  element.textContent = "target";

  monitoringElement.appendChild(element);
  document.body.appendChild(monitoringElement);

  return { element, monitoringElement };
};

const insertElement = ({
  element,
  monitoringElement,
  insertPosition,
}: {
  element: HTMLElement;
  insertPosition: "inlineStart" | "blockStart" | "inlineEnd" | "blockEnd";
  monitoringElement: HTMLElement;
}) => {
  const sibling = document.createElement("div");
  sibling.textContent = "insertedContent";
  // take up entire height when inserting inlineStart/inlineEnd
  sibling.style.height = ["inlineEnd", "inlineStart"].includes(insertPosition)
    ? `${window.innerHeight}px`
    : "50px";
  // take up entire width when inserting blockStart/blockEnd
  sibling.style.width = ["blockEnd", "blockStart"].includes(insertPosition)
    ? `${window.innerWidth}px`
    : "50px";

  // change the flex direction to have the sibling element inserted at the desired `insertPosition`
  if (insertPosition === "blockStart") {
    monitoringElement.style.flexDirection = "column";
  }
  if (insertPosition === "blockEnd") {
    monitoringElement.style.flexDirection = "column-reverse";
  }
  if (insertPosition === "inlineEnd") {
    monitoringElement.style.flexDirection = "row-reverse";
  }

  monitoringElement.insertBefore(sibling, element);
};

const defaultEdgeState = {
  isAtContainerInlineStart: null,
  isAtContainerBlockStart: null,
  isAtContainerInlineEnd: null,
  isAtContainerBlockEnd: null,
};

describe(useElementAtContainerEdge.name, () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("should return default edge state when no element is provided", () => {
    const { result } = renderHook(() => useElementAtContainerEdge({}));

    expect(result.current).toEqual(defaultEdgeState);
  });

  test("detects content added to the inlineStart", async () => {
    const { element, monitoringElement } = setup();

    const { result } = renderHook(() =>
      useElementAtContainerEdge({ element, monitoringElement }),
    );

    expect(result.current).toEqual(defaultEdgeState);

    insertElement({
      element,
      monitoringElement,
      insertPosition: "inlineStart",
    });

    await waitFor(() => {
      expect(result.current).not.toEqual(defaultEdgeState);
    });

    expect(result.current).toEqual({
      isAtContainerInlineStart: false, // isAtContainerInlineStart is false
      isAtContainerBlockStart: true,
      isAtContainerInlineEnd: true,
      isAtContainerBlockEnd: true,
    });
  });

  test("detects content added to the blockStart", async () => {
    const { element, monitoringElement } = setup();

    const { result } = renderHook(() =>
      useElementAtContainerEdge({ element, monitoringElement }),
    );

    expect(result.current).toEqual(defaultEdgeState);

    insertElement({ element, monitoringElement, insertPosition: "blockStart" });

    await waitFor(() => {
      expect(result.current).not.toEqual(defaultEdgeState);
    });

    expect(result.current).toEqual({
      isAtContainerInlineStart: true,
      isAtContainerBlockStart: false, // isAtContainerBlockStart is false
      isAtContainerInlineEnd: true,
      isAtContainerBlockEnd: true,
    });
  });

  test("detects content added to the inlineEnd", async () => {
    const { element, monitoringElement } = setup();

    const { result } = renderHook(() =>
      useElementAtContainerEdge({ element, monitoringElement }),
    );

    expect(result.current).toEqual(defaultEdgeState);

    insertElement({ element, monitoringElement, insertPosition: "inlineEnd" });

    await waitFor(() => {
      expect(result.current).not.toEqual(defaultEdgeState);
    });

    expect(result.current).toEqual({
      isAtContainerInlineStart: true,
      isAtContainerBlockStart: true,
      isAtContainerInlineEnd: false, // isAtContainerInlineEnd is false
      isAtContainerBlockEnd: true,
    });
  });

  test("detects content added to the blockEnd", async () => {
    const { element, monitoringElement } = setup();

    const { result } = renderHook(() =>
      useElementAtContainerEdge({ element, monitoringElement }),
    );

    expect(result.current).toEqual(defaultEdgeState);

    insertElement({ element, monitoringElement, insertPosition: "blockEnd" });

    await waitFor(() => {
      expect(result.current).not.toEqual(defaultEdgeState);
    });

    expect(result.current).toEqual({
      isAtContainerInlineStart: true,
      isAtContainerBlockStart: true,
      isAtContainerInlineEnd: true,
      isAtContainerBlockEnd: false, // isAtContainerBlockEnd is false
    });
  });

  test("detects container style changes", async () => {
    const { element, monitoringElement } = setup();

    const { result } = renderHook(() => useElementAtContainerEdge({ element }));

    expect(result.current).toEqual(defaultEdgeState);

    monitoringElement.style.width = "unset";
    monitoringElement.style.height = "unset";
    // Simulate a style change that would affect the element's position
    monitoringElement.style.padding = "20px";

    await waitFor(() => {
      expect(result.current).not.toEqual(defaultEdgeState);
    });

    // all values should be false now
    expect(result.current).toEqual({
      isAtContainerInlineStart: false,
      isAtContainerBlockStart: false,
      isAtContainerInlineEnd: false,
      isAtContainerBlockEnd: false,
    });
  });

  describe("RTL support", () => {
    test("detects content added to the inlineStart", async () => {
      const { element, monitoringElement } = setup("rtl");

      const { result } = renderHook(() =>
        useElementAtContainerEdge({ element, monitoringElement }),
      );

      expect(result.current).toEqual(defaultEdgeState);

      insertElement({
        element,
        monitoringElement,
        insertPosition: "inlineStart",
      });

      await waitFor(() => {
        expect(result.current).not.toEqual(defaultEdgeState);
      });

      expect(result.current).toEqual({
        isAtContainerInlineStart: false, // isAtContainerInlineStart is false
        isAtContainerInlineEnd: true,
        isAtContainerBlockStart: true,
        isAtContainerBlockEnd: true,
      });
    });

    test("detects content added to the inlineEnd", async () => {
      const { element, monitoringElement } = setup("rtl");

      const { result } = renderHook(() =>
        useElementAtContainerEdge({ element, monitoringElement }),
      );

      expect(result.current).toEqual(defaultEdgeState);

      insertElement({
        element,
        monitoringElement,
        insertPosition: "inlineEnd",
      });

      await waitFor(() => {
        expect(result.current).not.toEqual(defaultEdgeState);
      });

      expect(result.current).toEqual({
        isAtContainerInlineStart: true,
        isAtContainerInlineEnd: false, // isAtContainerInlineEnd is false
        isAtContainerBlockStart: true,
        isAtContainerBlockEnd: true,
      });
    });
  });
});
