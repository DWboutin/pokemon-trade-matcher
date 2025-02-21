"use client";

import React, { Fragment, ReactNode, useCallback, useEffect, useState } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

interface VirtualizedGridProps {
  children: ReactNode[];
  className?: string;
  estimateSize?: number;
  overscan?: number;
}

export const VirtualizedGrid = ({
  children,
  className = "",
  estimateSize = 280,
  overscan = 5,
}: VirtualizedGridProps) => {
  const [columnCount, setColumnCount] = useState(2); // Default to 2 columns

  const getColumnCount = useCallback(() => {
    if (typeof window === "undefined") return 2; // Default for SSR
    const width = window.innerWidth;
    if (width >= 1024) return 6; // lg
    if (width >= 768) return 4; // md
    if (width >= 640) return 3; // sm
    return 2; // default
  }, []);

  useEffect(() => {
    const updateColumnCount = () => {
      setColumnCount(getColumnCount());
    };

    // Initial setup
    updateColumnCount();

    // Add resize listener
    window.addEventListener("resize", updateColumnCount);

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateColumnCount);
    };
  }, [getColumnCount]);

  const rowCount = Math.ceil(children.length / columnCount);

  const rowVirtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => estimateSize,
    overscan,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  return (
    <div className={className}>
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: "relative",
        }}
      >
        {virtualItems.map((virtualRow) => (
          <Fragment key={virtualRow.index}>
            {Array.from({ length: columnCount }).map((_, columnIndex) => {
              const itemIndex = virtualRow.index * columnCount + columnIndex;
              const child = children[itemIndex];

              if (!child) return null;

              return (
                <div
                  key={itemIndex}
                  ref={rowVirtualizer.measureElement}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: `${(columnIndex / columnCount) * 100}%`,
                    width: `${100 / columnCount}%`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {child}
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
