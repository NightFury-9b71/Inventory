"use client";

import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PageFooterProps {
  children?: ReactNode;
  hasPagination?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  totalCount?: number;
}

export default function PageFooter({
  children,
  hasPagination = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalCount
}: PageFooterProps) {
  if (!children && !hasPagination) return null;

  return (
    <div className="flex justify-between items-center mt-4">
      {totalCount !== undefined && (
        <div className="text-sm text-gray-600">
          Total: {totalCount} items
        </div>
      )}

      {hasPagination && totalPages > 1 && (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {children && <div>{children}</div>}
    </div>
  );
}