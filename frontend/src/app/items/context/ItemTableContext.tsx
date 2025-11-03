"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ItemTableContextType {
  searchTerm: string;
  categoryFilter: string;
  statusFilter: string;
  filteredItemCount: number;
  setSearchTerm: (term: string) => void;
  setCategoryFilter: (filter: string) => void;
  setStatusFilter: (filter: string) => void;
  clearFilters: () => void;
  setFilteredItemCount: (count: number) => void;
}

const ItemTableContext = createContext<ItemTableContextType | undefined>(undefined);

export function ItemTableProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filteredItemCount, setFilteredItemCount] = useState(0);

  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
    setStatusFilter("all");
  };

  const value = {
    searchTerm,
    categoryFilter,
    statusFilter,
    filteredItemCount,
    setSearchTerm,
    setCategoryFilter,
    setStatusFilter,
    clearFilters,
    setFilteredItemCount,
  };

  return (
    <ItemTableContext.Provider value={value}>
      {children}
    </ItemTableContext.Provider>
  );
}

export function useItemTableContext() {
  const context = useContext(ItemTableContext);
  if (!context) {
    throw new Error("useItemTableContext must be used within ItemTableProvider");
  }
  return context;
}
