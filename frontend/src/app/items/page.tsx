"use client";

import React from "react";
import {  PageHeader, PageSearch, PageFilter, PageTable } from "@/components/page";
import { useItems } from "@/hooks/queries/useItems";
import { useTableData } from "@/hooks/useTableData";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Item } from "@/types/inventory";
import { Eye, Edit, Trash2 } from "lucide-react";

export default function ItemsPage() {
  const { data: items = [], isLoading, error } = useItems();
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter');

  const {
    searchTerm,
    filters,
    filteredData,
    filterOptions,
    setSearchTerm,
    setFilter,
    clearFilters,
  } = useTableData({
    data: items,
    searchKeys: ['name', 'code'],
    filters: [
      { key: 'category', value: 'all' },
      { key: 'status', value: 'all' }
    ],
    customFilterFn: (item: Item, filters, searchTerm) => {
      // Search filter
      const matchesSearch =
        searchTerm === "" ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory = 
        filters.category === "all" || 
        item.categoryName === filters.category;
      
      // Status filter
      const matchesStatus =
        filters.status === "all" ||
        (filters.status === "active" && item.isActive) ||
        (filters.status === "inactive" && !item.isActive);

      // Low stock filter from URL params
      const matchesLowStock = 
        !filter || 
        filter !== 'low-stock' || 
        item.quantity < 10;

      return matchesSearch && matchesCategory && matchesStatus && matchesLowStock;
    }
  });

  // Generate category options from items data
  const categoryOptions = React.useMemo(() => [
    { value: "all", label: "All" },
    ...Array.from(new Set(items.map(i => i.categoryName)))
      .sort()
      .map(cat => ({ value: cat, label: cat }))
  ], [items]);

  // Define table columns
  const columns = [
    {
      key: "name",
      header: "Name",
    },
    {
      key: "code",
      header: "Code",
    },
    {
      key: "categoryName",
      header: "Category",
    },
    {
      key: "units",
      header: "Unit",
      render: (item: Item) => <span>{item.units || "-"}</span>,
    },
    {
      key: "quantity",
      header: "Quantity",
      render: (item: Item) => (
        <span className={item.quantity < 10 ? "text-red-600 font-semibold" : ""}>
          {item.quantity}
        </span>
      ),
    },
    {
      key: "isActive",
      header: "Status",
      render: (item: Item) => (
        <span className={item.isActive ? "text-green-600" : "text-red-600"}>
          {item.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (item: Item) => (
        <div className="flex gap-2">
          <Link href={`/items/${item.id}`}>
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
          <Link href={`/items/${item.id}/edit`}>
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="ghost" size="sm">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <p className="text-red-600 font-semibold">An error occurred while fetching data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Toolbar: Header + Search + Filters + Add Button */}
      <PageToolbar>
        <PageHeader 
          title={filter === 'low-stock' ? 'Low Stock Items' : 'Items'}
          subtitle="Manage your inventory items"
          totalCount={filteredData.length}
          countLabel={filteredData.length === 1 ? 'Item' : 'Items'}
        />
        <div className="flex gap-2">
          <PageSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <PageFilter
            label="Category"
            value={filters.category}
            options={categoryOptions}
            onChange={(value) => setFilter('category', value)}
          />
          <PageFilter
            label="Status"
            value={filters.status}
            options={filterOptions.status}
            onChange={(value) => setFilter('status', value)}
          />
          <Button onClick={clearFilters} variant="outline">
            Clear Filters
          </Button>
          <Link href="/items/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </Link>
        </div>
      </PageToolbar>

      {/* Simple Table: Just pass data and columns */}
      <PageTable data={filteredData} columns={columns} isLoading={isLoading} />
    </div>
  );
}
