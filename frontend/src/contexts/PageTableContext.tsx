"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface PageTableContextType {
  searchTerm: string;
  typeFilter: string;
  statusFilter: string;
  categoryFilter: string;
  expandedItems: Set<number>;
  filteredCount: number;
  setSearchTerm: (term: string) => void;
  setTypeFilter: (filter: string) => void;
  setStatusFilter: (filter: string) => void;
  setCategoryFilter: (filter: string) => void;
  toggleExpand: (id: number) => void;
  clearFilters: () => void;
  setFilteredCount: (count: number) => void;
}

const PageTableContext = createContext<PageTableContextType | undefined>(undefined);

export function PageTableProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [filteredCount, setFilteredCount] = useState(0);

  const toggleExpand = (id: number) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setTypeFilter("all");
    setStatusFilter("all");
    setCategoryFilter("all");
  };

  const value = {
    searchTerm,
    typeFilter,
    statusFilter,
    categoryFilter,
    expandedItems,
    filteredCount,
    setSearchTerm,
    setTypeFilter,
    setStatusFilter,
    setCategoryFilter,
    toggleExpand,
    clearFilters,
    setFilteredCount,
  };

  return (
    <PageTableContext.Provider value={value}>
      {children}
    </PageTableContext.Provider>
  );
}

export function usePageTableContext() {
  const context = useContext(PageTableContext);
  if (!context) {
    throw new Error("usePageTableContext must be used within PageTableProvider");
  }
  return context;
}
