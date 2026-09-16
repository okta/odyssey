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

import { useRef } from "react";
import { renderHook } from "vitest-browser-react";

import { useContainerQuery } from "./useContainerQuery.js";

const createTargetElement = ({
  height,
  width,
}: {
  height: number;
  width: number;
}) => {
  const targetElement = document.createElement("div");

  targetElement.style.setProperty("box-sizing", "border-box");
  targetElement.style.setProperty("width", `${width}px`);
  targetElement.style.setProperty("height", `${height}px`);

  document.body.append(targetElement);

  return targetElement;
};

describe(useContainerQuery.name, () => {
  test("target smaller than minWidth then grown past it", async () => {
    const targetElement = createTargetElement({ height: 100, width: 300 });

    const { result } = await renderHook(() =>
      useContainerQuery({ target: targetElement, minWidth: 400 }),
    );

    await vi.waitFor(() => {
      expect(result.current).toBe(false);
    });

    targetElement.style.setProperty("width", "500px");

    await vi.waitFor(() => {
      expect(result.current).toBe(true);
    });

    targetElement.remove();
  });

  test("target wider than maxWidth then shrunk below it", async () => {
    const targetElement = createTargetElement({ height: 100, width: 500 });

    const { result } = await renderHook(() =>
      useContainerQuery({ target: targetElement, maxWidth: 400 }),
    );

    await vi.waitFor(() => {
      expect(result.current).toBe(false);
    });

    targetElement.style.setProperty("width", "300px");

    await vi.waitFor(() => {
      expect(result.current).toBe(true);
    });

    targetElement.remove();
  });

  test("target width inside then outside a min/max range", async () => {
    const targetElement = createTargetElement({ height: 100, width: 300 });

    const { result } = await renderHook(() =>
      useContainerQuery({
        target: targetElement,
        minWidth: 200,
        maxWidth: 400,
      }),
    );

    await vi.waitFor(() => {
      expect(result.current).toBe(true);
    });

    targetElement.style.setProperty("width", "500px");

    await vi.waitFor(() => {
      expect(result.current).toBe(false);
    });

    targetElement.remove();
  });

  test("target shorter than minHeight then grown past it", async () => {
    const targetElement = createTargetElement({ height: 100, width: 300 });

    const { result } = await renderHook(() =>
      useContainerQuery({ target: targetElement, minHeight: 200 }),
    );

    await vi.waitFor(() => {
      expect(result.current).toBe(false);
    });

    targetElement.style.setProperty("height", "300px");

    await vi.waitFor(() => {
      expect(result.current).toBe(true);
    });

    targetElement.remove();
  });

  test("combined width and height bounds require both to match", async () => {
    const targetElement = createTargetElement({ height: 100, width: 500 });

    const { result } = await renderHook(() =>
      useContainerQuery({
        target: targetElement,
        minWidth: 400,
        minHeight: 200,
      }),
    );

    await vi.waitFor(() => {
      expect(result.current).toBe(false);
    });

    targetElement.style.setProperty("height", "300px");

    await vi.waitFor(() => {
      expect(result.current).toBe(true);
    });

    targetElement.remove();
  });

  test("null target", async () => {
    const { result } = await renderHook(() =>
      useContainerQuery({ target: null, minWidth: 100 }),
    );

    await vi.waitFor(() => {
      expect(result.current).toBe(false);
    });
  });

  test("target attached after initial render", async () => {
    const targetElement = createTargetElement({ height: 100, width: 500 });

    const { result, rerender } = await renderHook(
      (
        props: { minWidth: number; target: HTMLElement | null } = {
          minWidth: 400,
          target: null,
        },
      ) => useContainerQuery(props),
      { initialProps: { minWidth: 400, target: null as HTMLElement | null } },
    );

    await vi.waitFor(() => {
      expect(result.current).toBe(false);
    });

    rerender({ target: targetElement, minWidth: 400 });

    await vi.waitFor(() => {
      expect(result.current).toBe(true);
    });

    targetElement.remove();
  });

  test("ref target whose element is only populated after commit", async () => {
    const targetElement = createTargetElement({ height: 100, width: 500 });

    const { result } = await renderHook(() => {
      const targetElementRef = useRef<HTMLElement | null>(null);

      targetElementRef.current = targetElement;

      return useContainerQuery({ target: targetElementRef, minWidth: 400 });
    });

    await vi.waitFor(() => {
      expect(result.current).toBe(true);
    });

    targetElement.style.setProperty("width", "300px");

    await vi.waitFor(() => {
      expect(result.current).toBe(false);
    });

    targetElement.remove();
  });
});
