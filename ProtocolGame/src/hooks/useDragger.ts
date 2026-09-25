import { useEffect, useRef } from "react";

function useDragger(id: string): void {
  const isClicked = useRef(false);

  const coords = useRef({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0
  });

  useEffect(() => {
    const target = document.getElementById(id);
    if (!target) throw new Error("Element with given id doesn't exist");

    const container = target.parentElement;
    if (!container) throw new Error("Target element must have a parent");

    const onMouseDown = (e: MouseEvent) => {
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
    };

    const onMouseUp = () => {
      isClicked.current = false;
      coords.current.lastX = target.offsetLeft;
      coords.current.lastY = target.offsetTop;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;

      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      let nextX = e.clientX - coords.current.startX + coords.current.lastX;
      let nextY = e.clientY - coords.current.startY + coords.current.lastY;

      // Clamp inside parent
      const maxX = containerRect.width - targetRect.width;
      const maxY = containerRect.height - targetRect.height;

      nextX = Math.max(0, Math.min(nextX, maxX));
      nextY = Math.max(0, Math.min(nextY, maxY));

      target.style.left = `${nextX}px`;
      target.style.top = `${nextY}px`;
    };

    target.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseUp);

    const cleanup = () => {
      target.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseUp);
    };

    return cleanup;
  }, [id]);
}

export default useDragger;
