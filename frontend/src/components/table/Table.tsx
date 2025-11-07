// components/table/Table.tsx
"use client";
import React from "react";
import { TableRowActions } from "./TableRowActions";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Table as UITable, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

type TableProps<T> = {
  data: T[];
  columns: { key: keyof T; label: string }[];
  page: string;
  actions: {
    showView: boolean;
    showEdit: boolean;
    showDelete: boolean;
    onView: (row: T) => void;
    onEdit: (row: T) => void;
    onDelete: (row: T) => void;
  };
  itemName?: string;
  confirmationText?: string;
  isDeleting?: boolean;
  showActions?: boolean;
  // Expansion props
  hasExpansion?: boolean;
  childrenKey?: string;
  expandedRows?: Set<string | number>;
  onToggleExpansion?: (rowId: string | number) => void;
};

export function Table<T extends { id: string | number }>({
  data,
  columns,
  page,
  actions,
  itemName = "item",
  confirmationText = "delete",
  isDeleting = false,
  showActions = true,
  hasExpansion = false,
  childrenKey = "subOffices",
  expandedRows = new Set(),
  onToggleExpansion,
}: TableProps<T>) {
  const renderFlatRows = (rows: T[]) => {
    return rows.map((row, i) => (
      <TableRow key={row.id || i} className="hover:bg-gray-50">
        {columns.map((col) => {
          const value = row[col.key];
          let displayValue: React.ReactNode;
          
          if (typeof value === 'boolean') {
            displayValue = (
              <span className={value ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                {value ? 'Active' : 'Inactive'}
              </span>
            );
          } else {
            displayValue = String(value);
          }
          
          return (
            <TableCell key={String(col.key)}>
              {displayValue}
            </TableCell>
          );
        })}
        {showActions && (
          <TableCell className="text-right">
            <TableRowActions
              row={row}
              page={page}
              actions={actions}
              itemName={itemName}
              confirmationText={confirmationText}
              isDeleting={isDeleting}
            />
          </TableCell>
        )}
      </TableRow>
    ));
  };

  const renderHierarchicalRows = (rows: T[], level: number = 0): React.ReactNode[] => {
    return rows.flatMap((row, i) => {
      const rowId = row.id || i;
      const isExpanded = expandedRows.has(rowId);
      const children = (row as any)[childrenKey] as T[] | undefined;
      const hasChildren = children && children.length > 0;

      const rowElement = (
        <TableRow key={rowId} className="hover:bg-gray-50">
          {columns.map((col, colIndex) => {
            const value = row[col.key];
            let displayValue: React.ReactNode;
            
            if (typeof value === 'boolean') {
              displayValue = (
                <span className={value ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                  {value ? 'Active' : 'Inactive'}
                </span>
              );
            } else {
              displayValue = String(value);
            }

            // First column gets the expansion button and indentation
            if (colIndex === 0) {
              return (
                <TableCell key={String(col.key)}>
                  <div className="flex items-center" style={{ paddingLeft: `${level * 24}px` }}>
                    {hasChildren ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleExpansion?.(rowId);
                        }}
                        className="mr-2 p-1 hover:bg-gray-100 rounded transition-colors"
                        aria-label={isExpanded ? "Collapse" : "Expand"}
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
                    <span className={level > 0 ? "text-gray-600" : ""}>
                      {displayValue}
                    </span>
                  </div>
                </TableCell>
              );
            }

            return (
              <TableCell key={String(col.key)} className={level > 0 ? "text-gray-600" : ""}>
                {displayValue}
              </TableCell>
            );
          })}
          {showActions && (
            <TableCell className="text-right">
              <TableRowActions
                row={row}
                page={page}
                actions={actions}
                itemName={itemName}
                confirmationText={confirmationText}
                isDeleting={isDeleting}
              />
            </TableCell>
          )}
        </TableRow>
      );

      // If expanded and has children, render children after this row
      if (isExpanded && hasChildren) {
        return [rowElement, ...renderHierarchicalRows(children, level + 1)];
      }

      return [rowElement];
    });
  };

  return (
    <UITable>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={String(col.key)}>
              {col.label}
            </TableHead>
          ))}
          {showActions && <TableHead className="text-right">Actions</TableHead>}
        </TableRow>
      </TableHeader>

      <TableBody>
        {hasExpansion ? renderHierarchicalRows(data, 0) : renderFlatRows(data)}
      </TableBody>
    </UITable>
  );
}
