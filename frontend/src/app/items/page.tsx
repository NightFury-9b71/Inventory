"use client";

import React from "react";
import { ItemTableProvider } from "./context/ItemTableContext";
import { useItemTableContext } from "./context/ItemTableContext";
import { PageToolbar, PageHeader, PageSearch, PageFilter, PageBodyContainer, PageTable } from "@/components/page";
import TableComponent from "@/components/TableComponent";
import TableHeaderRow from "@/components/TableHeaderRow";
import TableHeaderCell from "@/components/TableHeaderCell";
import ItemTableBodyRows from "./components/ItemTableBodyRows";
import { useItems } from "@/hooks/queries/useItems";
import { useCategories } from "@/hooks/queries/useCategories";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function ItemTableContent() {
  const { 
    filteredItemCount, 
    searchTerm, 
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
    clearFilters
  } = useItemTableContext();

  const { data: categories = [] } = useCategories();
  const uniqueCategories = Array.from(new Set(categories.map((cat) => cat.name))).sort();

  const searchParams = useSearchParams();
  const filter = searchParams.get('filter');

  return (
    <div className="p-6">
      {/* Toolbar: Header + Search + Filters + Add Button */}
      <PageToolbar>
        <PageHeader 
          title={filter === 'low-stock' ? 'Low Stock Items' : 'Items'}
          subtitle="Manage your inventory items"
          totalCount={filteredItemCount}
          countLabel={filteredItemCount === 1 ? 'Item' : 'Items'}
        />
        <div className="flex gap-2">
          <PageSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <PageFilter
            typeFilter={categoryFilter}
            setTypeFilter={setCategoryFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            uniqueTypes={uniqueCategories}
            clearFilters={clearFilters}
          />
          <Link href="/items/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </Link>
        </div>
      </PageToolbar>

      {/* Body: Data fetching + table rendering */}
      <ItemBodyContainer>
        <PageTable>
          <TableComponent>
            <TableHeaderRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Code</TableHeaderCell>
              <TableHeaderCell>Category</TableHeaderCell>
              <TableHeaderCell>Unit</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableHeaderRow>
            <ItemTableBodyRows />
          </TableComponent>
        </PageTable>
      </ItemBodyContainer>
    </div>
  );
}

// Custom body container for items that uses the item-specific context
function ItemBodyContainer({ children }: { children: React.ReactNode }) {
  const { searchTerm, categoryFilter, statusFilter, setFilteredItemCount } = useItemTableContext();
  const { data: items = [], isLoading, error } = useItems();
  
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter');

  const filterFn = (item: any) => {
    const matchesSearch =
      searchTerm === "" ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === "all" || item.categoryName === categoryFilter;
    
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && item.isActive) ||
      (statusFilter === "inactive" && !item.isActive);

    const matchesFilter = !filter || filter !== 'low-stock' || item.quantity < 10;

    return matchesSearch && matchesCategory && matchesStatus && matchesFilter;
  };

  return (
    <PageBodyContainer
      data={items}
      isLoading={isLoading}
      error={error}
      filterFn={filterFn}
      onFilteredCountChange={setFilteredItemCount}
    >
      {children}
    </PageBodyContainer>
  );
}

export default function ItemsPage() {
  return (
    <ItemTableProvider>
      <ItemTableContent />
    </ItemTableProvider>
  );
}
