"use client";

import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  totalCount?: number;
  countLabel?: string;
}

export default function PageHeader({ 
  title, 
  subtitle, 
  description, 
  totalCount,
  countLabel = "Items"
}: PageHeaderProps) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">{title}</h1>
        {totalCount !== undefined && (
          <span className="px-3 py-1 text-sm font-semibold bg-blue-100 text-blue-800 rounded-full">
            {totalCount} {countLabel}
          </span>
        )}
      </div>
      {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
      {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
    </div>
  );
}
