"use client";

import React, { ReactNode } from "react";
import { Table } from "@/components/ui/table";

/**
 * TableComponent - Table layout wrapper
 * Just provides the table structure, children provide the content
 */
export default function TableComponent({ children }: { children: ReactNode }) {
  return <Table>{children}</Table>;
}