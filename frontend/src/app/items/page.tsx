'use client';

import React from 'react';
import { useItems, useDeleteItem } from '@/hooks/queries/useItems';
import { useCategories } from '@/hooks/queries/useCategories';
import { PageTableProvider, usePageTableContext } from '@/contexts/PageTableContext';
import { PageToolbar, PageHeader, PageSearch, PageFilter, PageBodyContainer, PageTable } from '@/components/page';
import TableComponent from '@/components/TableComponent';
import TableHeaderRow from '@/components/TableHeaderRow';
import TableHeaderCell from '@/components/TableHeaderCell';
import GenericTableBodyRows from '@/components/GenericTableBodyRows';
import { Button } from '@/components/ui/button';
import { Package, Plus, Edit, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

function ItemsPageContent() {
  const { 
    searchTerm, 
    setSearchTerm, 
    categoryFilter, 
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
    clearFilters,
    filteredCount,
    setFilteredCount 
  } = usePageTableContext();

  const searchParams = useSearchParams();
  const filter = searchParams.get('filter');
  
  const { data: items = [], isLoading, error } = useItems();
  const { data: categories = [] } = useCategories();
  const deleteItem = useDeleteItem();

  const uniqueCategories = Array.from(new Set(categories.map((cat) => cat.name))).sort();

  const handleDelete = async (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteItem.mutateAsync(id);
        toast.success('Item deleted successfully');
      } catch (error) {
        toast.error('Failed to delete item');
      }
    }
  };

  const filterFn = (item: any) => {
    const matchesSearch =
      searchTerm === "" ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === "all" || item.categoryName === categoryFilter;
    
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && item.quantity >= 10) ||
      (statusFilter === "inactive" && item.quantity < 10);

    const matchesFilter = !filter || filter !== 'low-stock' || item.quantity < 10;

    return matchesSearch && matchesCategory && matchesStatus && matchesFilter;
  };

  return (
    <div className="p-6">
      {/* Toolbar: Header + Search + Filters + Add Button */}
      <PageToolbar>
        <PageHeader 
          title={filter === 'low-stock' ? 'Low Stock Items' : 'Items'}
          subtitle="Manage your inventory items"
          totalCount={filteredCount}
          countLabel={filteredCount === 1 ? 'Item' : 'Items'}
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
      <PageBodyContainer
        data={items}
        isLoading={isLoading}
        error={error}
        filterFn={filterFn}
        onFilteredCountChange={setFilteredCount}
      >
        <PageTable>
          <TableComponent>
            <TableHeaderRow>
              <TableHeaderCell>Code</TableHeaderCell>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Category</TableHeaderCell>
              <TableHeaderCell>Quantity</TableHeaderCell>
              <TableHeaderCell>Unit Price</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableHeaderRow>
            <GenericTableBodyRows 
              renderRow={(item: any) => (
                <>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    {item.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Package className="h-5 w-5 text-slate-400 mr-2" />
                      <span className="text-sm text-slate-900">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {item.categoryName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-semibold ${
                      item.quantity < 10 ? 'text-orange-600' : 'text-slate-900'
                    }`}>
                      {item.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    ${item.unitPrice?.toFixed(2) || '0.00'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
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
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDelete(item.id, item.name)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </td>
                </>
              )}
              emptyMessage="No items found"
              emptyIcon={<Package className="h-12 w-12 text-slate-300 mx-auto" />}
            />
          </TableComponent>
        </PageTable>
      </PageBodyContainer>
    </div>
  );
}

export default function ItemsPage() {
  return (
    <PageTableProvider>
      <ItemsPageContent />
    </PageTableProvider>
  );
}
