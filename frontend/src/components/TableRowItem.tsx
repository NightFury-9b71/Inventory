"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Office } from "@/types/office";
import { TableRow, TableCell } from "@/components/ui/table";
import { ChevronDown, ChevronRight } from "lucide-react";

interface TableRowItemProps {
  office: Office;
  level?: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

/**
 * TableRowItem - Single office row
 * Shows office data with expand/collapse button for children
 */
export default function TableRowItem({
  office,
  level = 0,
  isExpanded,
  onToggleExpand,
}: TableRowItemProps) {
  const router = useRouter();
  const hasChildren = office.subOffices && office.subOffices.length > 0;
  const indentStyle = { paddingLeft: `${level * 20}px` };
  const isChild = level > 0;

  const handleRowClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }
    router.push(`/offices/${office.id}`);
  };

  return (
    <TableRow
      className="cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={handleRowClick}
    >
      <TableCell style={indentStyle} className={isChild ? "text-gray-500" : ""}>
        <div className="flex items-center gap-2">
          {hasChildren ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleExpand();
              }}
              className="p-1 hover:bg-gray-100 rounded"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          ) : (
            <div className="w-6" />
          )}
          <span className="font-medium">{office.name}</span>
        </div>
      </TableCell>
      <TableCell className={isChild ? "text-gray-500" : ""}>{office.nameBn}</TableCell>
      <TableCell className={isChild ? "text-gray-500" : ""}>{office.code}</TableCell>
      <TableCell className={isChild ? "text-gray-500" : ""}>{office.type}</TableCell>
      <TableCell className={isChild ? "text-gray-500" : ""}>
        {office.isActive ? "Active" : "Inactive"}
      </TableCell>
    </TableRow>
  );
}
