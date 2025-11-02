"use client";

import React from "react";
import SearchComponent from "@/components/SearchComponent";

interface PageSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder?: string;
}

/**
 * PageSearch - Generic search component
 * Can be used with any context that provides search state
 */
export default function PageSearch({ 
  searchTerm, 
  setSearchTerm,
  placeholder = "Search..."
}: PageSearchProps) {
  return <SearchComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />;
}
