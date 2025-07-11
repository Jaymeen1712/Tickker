import React from "react";
import { useVirtualization } from "../hooks/useVirtualization";

interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  height: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  overscan?: number;
}

/**
 * Virtual list component for rendering large lists efficiently
 */
export function VirtualList<T>({
  items,
  itemHeight,
  height,
  renderItem,
  className = "",
  overscan = 5,
}: VirtualListProps<T>) {
  const { visibleItems, totalHeight, handleScroll } = useVirtualization({
    itemCount: items.length,
    itemHeight,
    containerHeight: height,
    overscan,
  });

  return (
    <div
      className={`virtual-list ${className}`}
      style={{ height, overflow: "auto" }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        {visibleItems.map((virtualItem) => (
          <div
            key={virtualItem.index}
            style={{
              position: "absolute",
              top: virtualItem.start,
              left: 0,
              right: 0,
              height: itemHeight,
            }}
          >
            {virtualItem.index < items.length &&
              renderItem(items[virtualItem.index]!, virtualItem.index)}
          </div>
        ))}
      </div>
    </div>
  );
}
