"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface OfficeTableContextType {
  searchTerm: string;
  typeFilter: string;
  statusFilter: string;
  expandedOffices: Set<number>;
  filteredOfficeCount: number;
  setSearchTerm: (term: string) => void;
  setTypeFilter: (filter: string) => void;
  setStatusFilter: (filter: string) => void;
  toggleExpand: (officeId: number) => void;
  clearFilters: () => void;
  setFilteredOfficeCount: (count: number) => void;
}

const OfficeTableContext = createContext<OfficeTableContextType | undefined>(undefined);

export function OfficeTableProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedOffices, setExpandedOffices] = useState<Set<number>>(new Set());
  const [filteredOfficeCount, setFilteredOfficeCount] = useState(0);

  const toggleExpand = (officeId: number) => {
    setExpandedOffices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(officeId)) {
        newSet.delete(officeId);
      } else {
        newSet.add(officeId);
      }
      return newSet;
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setTypeFilter("all");
    setStatusFilter("all");
  };

  const value = {
    searchTerm,
    typeFilter,
    statusFilter,
    expandedOffices,
    filteredOfficeCount,
    setSearchTerm,
    setTypeFilter,
    setStatusFilter,
    toggleExpand,
    clearFilters,
    setFilteredOfficeCount,
  };

  return (
    <OfficeTableContext.Provider value={value}>
      {children}
    </OfficeTableContext.Provider>
  );
}

export function useOfficeTableContext() {
  const context = useContext(OfficeTableContext);
  if (!context) {
    throw new Error("useOfficeTableContext must be used within OfficeTableProvider");
  }
  return context;
}
