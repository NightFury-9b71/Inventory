"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FilterComponentProps {
  typeFilter: string;
  setTypeFilter: (type: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  uniqueTypes: string[];
  clearFilters: () => void;
}

export default function FilterComponent({
  typeFilter,
  setTypeFilter,
  statusFilter,
  setStatusFilter,
  uniqueTypes,
  clearFilters,
}: FilterComponentProps) {
  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Type: {typeFilter === "all" ? "All" : typeFilter}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setTypeFilter("all")}>
            All Types
          </DropdownMenuItem>
          {uniqueTypes.map(type => (
            <DropdownMenuItem key={type} onClick={() => setTypeFilter(type)}>
              {type}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            Status: {statusFilter === "all" ? "All" : statusFilter}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setStatusFilter("all")}>
            All Status
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setStatusFilter("active")}>
            Active
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>
            Inactive
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        onClick={clearFilters}
        variant="outline"
        className="flex items-center gap-2"
      >
        Clear Filters
      </Button>
    </div>
  );
}