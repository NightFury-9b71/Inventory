"use client";

import React, { ReactNode } from "react";

interface PageBodyProps {
  children: ReactNode;
}

export default function PageBody({ children }: PageBodyProps) {
  return (
    <div className="mb-4">
      {children}
    </div>
  );
}