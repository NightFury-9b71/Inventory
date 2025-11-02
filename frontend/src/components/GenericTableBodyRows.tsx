"use client";

import React from "react";
import TableBodyContainer from "@/components/TableBodyContainer";

interface GenericTableBodyRowsProps<T = any> {
  filteredData?: T[];
  isLoading?: boolean;
  renderRow: (item: T, index: number) => React.ReactNode;
  emptyMessage?: string;
  emptyIcon?: React.ReactNode;
}

export default function GenericTableBodyRows<T = any>({
  filteredData = [],
  isLoading = false,
  renderRow,
  emptyMessage = "No data found",
  emptyIcon,
}: GenericTableBodyRowsProps<T>) {
  if (isLoading) {
    return (
      <TableBodyContainer>
        <tr>
          <td colSpan={100} className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading...</p>
          </td>
        </tr>
      </TableBodyContainer>
    );
  }

  if (filteredData.length === 0) {
    return (
      <TableBodyContainer>
        <tr>
          <td colSpan={100} className="text-center py-12">
            {emptyIcon && <div className="mb-4">{emptyIcon}</div>}
            <p className="text-slate-600">{emptyMessage}</p>
          </td>
        </tr>
      </TableBodyContainer>
    );
  }

  return (
    <TableBodyContainer>
      {filteredData.map((item, index) => (
        <tr key={index} className="hover:bg-slate-50">
          {renderRow(item, index)}
        </tr>
      ))}
    </TableBodyContainer>
  );
}
