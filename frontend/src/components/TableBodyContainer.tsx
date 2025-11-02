"use client";

import React, { ReactNode } from "react";
import { TableBody } from "@/components/ui/table";

/**
 * TableBodyContainer - Table body wrapper
 * Contains all table rows
 */
export default function TableBodyContainer({ children }: { children: ReactNode }) {
  return <TableBody>{children}</TableBody>;
}
