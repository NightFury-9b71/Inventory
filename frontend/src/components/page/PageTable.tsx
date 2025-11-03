"use client";

import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Office } from "@/types/office";

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface PageTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  renderRow?: (item: T, index: number) => React.ReactNode;
  // For hierarchical office rendering
  expandedOffices?: Set<number>;
  onToggleExpand?: (officeId: number) => void;
  onRowClick?: (item: T) => void;
}

/**
 * PageTable - Simple table that takes data and displays it
 * No complex state management, no prop drilling, just data in -> table out
 * 
 * For simple tables: Pass columns
 * For custom rendering (hierarchical, expandable, etc): Pass renderRow function
 * For hierarchical offices: Pass expandedOffices and onToggleExpand
 */
export default function PageTable<T extends Record<string, any>>({ 
  data, 
  columns,
  isLoading = false,
  renderRow,
  expandedOffices,
  onToggleExpand,
  onRowClick
}: PageTableProps<T>) {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  // Hierarchical Office Row Renderer
  const renderOfficeRow = (office: Office, level: number = 0): React.ReactNode => {
    const isExpanded = expandedOffices?.has(office.id) || false;
    const hasChildren = office.subOffices && office.subOffices.length > 0;

    return (
      <React.Fragment key={office.id}>
        <TableRow 
          className="cursor-pointer hover:bg-gray-50"
          onClick={(e) => {
            // Don't navigate if clicking on the expand/collapse button
            const target = e.target as HTMLElement;
            if (!target.closest('button')) {
              onRowClick?.(office as any);
            }
          }}
        >
          <TableCell>
            <div className="flex items-center" style={{ paddingLeft: `${level * 24}px` }}>
              {hasChildren ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleExpand?.(office.id);
                  }}
                  className="mr-2 p-1 hover:bg-gray-100 rounded"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              ) : (
                <span className="w-6 mr-2" />
              )}
              {office.name}
            </div>
          </TableCell>
          <TableCell>{office.nameBn}</TableCell>
          <TableCell>{office.code}</TableCell>
          <TableCell>{office.type}</TableCell>
          <TableCell>
            <span className={office.isActive ? "text-green-600" : "text-red-600"}>
              {office.isActive ? "Active" : "Inactive"}
            </span>
          </TableCell>
        </TableRow>
        {isExpanded && hasChildren && (
          <>
            {office.subOffices!.map((subOffice) => renderOfficeRow(subOffice, level + 1))}
          </>
        )}
      </React.Fragment>
    );
  };

  // Determine if we're rendering hierarchical offices
  const isHierarchicalOffice = expandedOffices !== undefined && onToggleExpand !== undefined;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column, index) => (
            <TableHead key={index}>{column.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {isHierarchicalOffice ? (
          // Hierarchical office rendering
          (data as unknown as Office[]).map((office) => renderOfficeRow(office))
        ) : renderRow ? (
          // Custom row rendering (for other complex tables)
          data.map((item, index) => renderRow(item, index))
        ) : (
          // Simple flat table rendering
          data.map((item, rowIndex) => (
            <TableRow 
              key={rowIndex}
              className={onRowClick ? "cursor-pointer hover:bg-gray-50" : ""}
              onClick={() => onRowClick?.(item)}
            >
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex}>
                  {column.render 
                    ? column.render(item) 
                    : item[column.key as keyof T]
                  }
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

