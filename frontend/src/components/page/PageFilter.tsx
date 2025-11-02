"use client";

import React from "react";
import FilterComponent from "@/components/FilterComponent";

interface PageFilterProps {
  typeFilter: string;
  setTypeFilter: (filter: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  uniqueTypes: string[];
  clearFilters: () => void;
}

/**
 * PageFilter - Generic filter component
 * Can be used with any context that provides filter state
 */
export default function PageFilter({
  typeFilter,
  setTypeFilter,
  statusFilter,
  setStatusFilter,
  uniqueTypes,
  clearFilters,
}: PageFilterProps) {
  return (
    <FilterComponent
      typeFilter={typeFilter}
      setTypeFilter={setTypeFilter}
      statusFilter={statusFilter}
      setStatusFilter={setStatusFilter}
      uniqueTypes={uniqueTypes}
      clearFilters={clearFilters}
    />
  );
}
