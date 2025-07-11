import { useState, useEffect, useMemo } from "react";

interface UseVirtualizationOptions {
  itemCount: number;
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}

interface VirtualItem {
  index: number;
  start: number;
  end: number;
}

/**
 * Hook for virtualizing large lists
 * @param options - Virtualization options
 * @returns Virtualization state and helpers
 */
export function useVirtualization({
  itemCount,
  itemHeight,
  containerHeight,
  overscan = 5,
}: UseVirtualizationOptions) {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleItems = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight),
      itemCount - 1
    );

    const items: VirtualItem[] = [];
    
    for (
      let i = Math.max(0, startIndex - overscan);
      i <= Math.min(itemCount - 1, endIndex + overscan);
      i++
    ) {
      items.push({
        index: i,
        start: i * itemHeight,
        end: (i + 1) * itemHeight,
      });
    }

    return items;
  }, [scrollTop, itemHeight, containerHeight, itemCount, overscan]);

  const totalHeight = itemCount * itemHeight;

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  };

  return {
    visibleItems,
    totalHeight,
    handleScroll,
    scrollTop,
  };
}
