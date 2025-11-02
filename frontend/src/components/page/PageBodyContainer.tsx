"use client";

import React, { ReactNode, useEffect } from "react";

interface PageBodyContainerProps<T> {
  children: ReactNode;
  data: T[];
  isLoading: boolean;
  error: any;
  filterFn: (item: T) => boolean;
  onFilteredCountChange?: (count: number) => void;
}

/**
 * PageBodyContainer - Generic body container
 * Handles data fetching, filtering, and rendering states
 */
export default function PageBodyContainer<T>({
  children,
  data,
  isLoading,
  error,
  filterFn,
  onFilteredCountChange,
}: PageBodyContainerProps<T>) {
  // Handle errors
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 font-semibold">An error occurred while fetching data.</p>
      </div>
    );
  }

  // Apply filters
  const filteredData = data.filter(filterFn);

  // Update filtered count
  useEffect(() => {
    if (onFilteredCountChange) {
      onFilteredCountChange(filteredData.length);
    }
  }, [filteredData.length, onFilteredCountChange]);

  // Clone children and inject data props
  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            filteredData,
            isLoading,
          });
        }
        return child;
      })}
    </>
  );
}
