import { useState, useCallback, useEffect, useRef } from "react";

interface UseResizableOptions {
  minWidth?: number;
  maxWidth?: number;
  defaultWidth?: number;
  storageKey?: string;
}

interface UseResizableReturn {
  width: number;
  isResizing: boolean;
  startResize: (e: React.MouseEvent) => void;
  resetWidth: () => void;
}

/**
 * Hook for creating a resizable element with mouse drag
 */
export function useResizable({
  minWidth = 200,
  maxWidth = 500,
  defaultWidth = 288,
  storageKey,
}: UseResizableOptions = {}): UseResizableReturn {
  // Load initial width from localStorage if available
  const getInitialWidth = () => {
    if (storageKey && typeof window !== "undefined") {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = parseInt(stored, 10);
        if (!isNaN(parsed) && parsed >= minWidth && parsed <= maxWidth) {
          return parsed;
        }
      }
    }
    return defaultWidth;
  };

  const [width, setWidth] = useState(getInitialWidth);
  const [isResizing, setIsResizing] = useState(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  const startResize = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsResizing(true);
      startXRef.current = e.clientX;
      startWidthRef.current = width;
    },
    [width],
  );

  const resetWidth = useCallback(() => {
    setWidth(defaultWidth);
    if (storageKey) {
      localStorage.setItem(storageKey, String(defaultWidth));
    }
  }, [defaultWidth, storageKey]);

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const delta = e.clientX - startXRef.current;
      const newWidth = Math.min(
        maxWidth,
        Math.max(minWidth, startWidthRef.current + delta),
      );
      setWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      // Save to localStorage on mouse up
      if (storageKey) {
        localStorage.setItem(storageKey, String(width));
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    // Prevent text selection during resize
    document.body.style.userSelect = "none";
    document.body.style.cursor = "ew-resize";

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };
  }, [isResizing, minWidth, maxWidth, storageKey, width]);

  // Save width to localStorage when it changes (debounced via mouseup)
  useEffect(() => {
    if (storageKey && !isResizing) {
      localStorage.setItem(storageKey, String(width));
    }
  }, [width, storageKey, isResizing]);

  return {
    width,
    isResizing,
    startResize,
    resetWidth,
  };
}
