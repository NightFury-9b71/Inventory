"use client";

import React, { ReactNode } from "react";

interface PageTableProps {
  children: ReactNode;
  filteredData?: any[];
  isLoading?: boolean;
  expandedItems?: Set<number>;
  toggleExpand?: (id: number) => void;
}

/**
 * PageTable - Generic table wrapper
 * Injects data into table body rows
 */
export default function PageTable({ 
  children, 
  filteredData = [], 
  isLoading = false,
  expandedItems,
  toggleExpand
}: PageTableProps) {
  // Clone children and inject props into GenericTableBodyRows or TableBodyRows
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const childProps = child.props as any;
      return React.cloneElement(child as React.ReactElement<any>, {
        ...childProps,
        children: React.Children.map(childProps.children, (grandChild) => {
          if (React.isValidElement(grandChild) && grandChild.type && 
              typeof grandChild.type !== 'string') {
            const componentName = (grandChild.type as any).name;
            if (componentName === 'TableBodyRows' || componentName === 'GenericTableBodyRows') {
              return React.cloneElement(grandChild as React.ReactElement<any>, {
                filteredData,
                filteredOffices: filteredData, // For backward compatibility with offices
                isLoading,
                expandedItems,
                expandedOffices: expandedItems, // For backward compatibility with offices
                toggleExpand,
              });
            }
          }
          return grandChild;
        }),
      });
    }
    return child;
  });

  return <>{enhancedChildren}</>;
}

