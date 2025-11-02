"use client";

import React, { ReactNode } from "react";

/**
 * PageToolbar - Layout wrapper for header and controls
 * Arranges children in a flex row with space between
 */
export default function PageToolbar({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-between items-center mb-4">
      {children}
    </div>
  );
}
