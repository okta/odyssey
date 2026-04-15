import { type PointerEvent, useCallback, useRef } from "react";

export type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

/** Returns the viewport corner quadrant that contains the given coordinates. */
const getCornerFromCoordinates = (x: number, y: number): Corner => {
  const midX = window.innerWidth / 2;
  const midY = window.innerHeight / 2;
  if (y < midY) {
    return x < midX ? "top-left" : "top-right";
  }
  return x < midX ? "bottom-left" : "bottom-right";
};

/**
 * Makes a fixed-position element draggable between the four corners of the
 * viewport. Attach `containerRef` to the positioned element and spread
 * `dragHandleProps` onto the handle the user grabs.
 */
export const useCornerDrag = (
  currentCorner: Corner,
  onCornerChange: (nextCorner: Corner) => void,
) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{
    height: number;
    left: number;
    top: number;
    width: number;
    x: number;
    y: number;
  } | null>(null);

  const finishDrag = useCallback(
    (clientX?: number, clientY?: number) => {
      if (dragStartRef.current) {
        if (containerRef.current) {
          containerRef.current.style.setProperty("transform", "");
        }
        dragStartRef.current = null;

        if (clientX !== undefined && clientY !== undefined) {
          const targetCorner = getCornerFromCoordinates(clientX, clientY);
          if (targetCorner !== currentCorner) {
            onCornerChange(targetCorner);
          }
        }
      }
    },
    [currentCorner, onCornerChange],
  );

  const handlePointerDown = useCallback((event: PointerEvent) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      dragStartRef.current = {
        x: event.clientX,
        y: event.clientY,
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      };
    }
  }, []);

  const handlePointerMove = useCallback((event: PointerEvent) => {
    if (dragStartRef.current && containerRef.current) {
      const { x, y, left, top, width, height } = dragStartRef.current;

      const dragOffsetX = event.clientX - x;
      const dragOffsetY = event.clientY - y;

      // Clamp the offset so the element stays within the viewport.
      // min: offset that would push the left/top edge to 0
      // max: offset that would push the right/bottom edge to the viewport boundary
      const clampedDragOffsetX = Math.max(
        -left,
        Math.min(dragOffsetX, window.innerWidth - left - width),
      );
      const clampedDragOffsetY = Math.max(
        -top,
        Math.min(dragOffsetY, window.innerHeight - top - height),
      );

      containerRef.current.style.setProperty(
        "transform",
        `translate(${clampedDragOffsetX}px, ${clampedDragOffsetY}px)`,
      );
    }
  }, []);

  const handlePointerUp = useCallback(
    (event: PointerEvent) => {
      finishDrag(event.clientX, event.clientY);
    },
    [finishDrag],
  );

  const handleDragEnd = useCallback(() => {
    finishDrag();
  }, [finishDrag]);

  return {
    containerRef,
    dragHandleProps: {
      onLostPointerCapture: handleDragEnd,
      onPointerCancel: handleDragEnd,
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
    },
  } as const;
};
