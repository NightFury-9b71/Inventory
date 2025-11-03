"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface CategoryTableContextType {
  searchTerm: string;
  statusFilter: string;
  filteredCategoryCount: number;
  setSearchTerm: (term: string) => void;
  setStatusFilter: (filter: string) => void;
  clearFilters: () => void;
  setFilteredCategoryCount: (count: number) => void;
}

const CategoryTableContext = createContext<CategoryTableContextType | undefined>(undefined);

export function CategoryTableProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filteredCategoryCount, setFilteredCategoryCount] = useState(0);

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  const value = {
    searchTerm,
    statusFilter,
    filteredCategoryCount,
    setSearchTerm,
    setStatusFilter,
    clearFilters,
    setFilteredCategoryCount,
  };

  return (
    <CategoryTableContext.Provider value={value}>
      {children}
    </CategoryTableContext.Provider>
  );
}

export function useCategoryTableContext() {
  const context = useContext(CategoryTableContext);
  if (!context) {
    throw new Error("useCategoryTableContext must be used within CategoryTableProvider");
  }
  return context;
}
