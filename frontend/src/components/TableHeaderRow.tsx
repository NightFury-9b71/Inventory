"use client";

import React from "react";
import { TableHeader, TableRow } from "@/components/ui/table";

interface TableHeaderRowProps {
  children?: React.ReactNode;
}

export default function TableHeaderRow({ children }: TableHeaderRowProps) {
  return (
    <TableHeader>
      <TableRow>
        {children}
      </TableRow>
    </TableHeader>
  );
}
