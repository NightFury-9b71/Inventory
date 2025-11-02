"use client";

import React from "react";
import { TableHead } from "@/components/ui/table";

interface TableHeaderCellProps {
  children: React.ReactNode;
}

export default function TableHeaderCell({ children }: TableHeaderCellProps) {
  return <TableHead>{children}</TableHead>;
}
