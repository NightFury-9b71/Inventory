"use client";

import React, { ReactNode } from "react";

interface PageFooterProps {
  children?: ReactNode;
}

export default function PageFooter({ children }: PageFooterProps) {
  if (!children) return null;
  return (
    <div className="flex justify-center mt-4">
      {children}
    </div>
  );
}