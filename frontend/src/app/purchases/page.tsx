'use client';

import React from 'react';
import { usePurchases } from '@/hooks/queries/usePurchases';
import { PageTableProvider, usePageTableContext } from '@/contexts/PageTableContext';
import { PageToolbar, PageHeader, PageSearch, PageBodyContainer, PageTable } from '@/components/page';
import TableComponent from '@/components/TableComponent';
import TableHeaderRow from '@/components/TableHeaderRow';
import TableHeaderCell from '@/components/TableHeaderCell';
import GenericTableBodyRows from '@/components/GenericTableBodyRows';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus, Package } from 'lucide-react';
import Link from 'next/link';

function PurchasesPageContent() {
  const { 
    searchTerm, 
    setSearchTerm, 
    filteredCount,
    setFilteredCount 
  } = usePageTableContext();

  const { data: purchases = [], isLoading, error } = usePurchases();

  const filterFn = (purchase: any) => {
    const matchesSearch =
      searchTerm === "" ||
      purchase.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.vendorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.invoiceNumber?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  };

  return (
    <div className="p-6">
      {/* Toolbar: Header + Search + Add Button */}
      <PageToolbar>
        <PageHeader 
          title="Purchases"
          subtitle="Track all purchase records"
          totalCount={filteredCount}
          countLabel={filteredCount === 1 ? 'Purchase' : 'Purchases'}
        />
        <div className="flex gap-2">
          <PageSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Link href="/purchases/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Record Purchase
            </Button>
          </Link>
        </div>
      </PageToolbar>

      {/* Body: Data fetching + table rendering */}
      <PageBodyContainer
        data={purchases}
        isLoading={isLoading}
        error={error}
        filterFn={filterFn}
        onFilteredCountChange={setFilteredCount}
      >
        <PageTable>
          <TableComponent>
            <TableHeaderRow>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Item</TableHeaderCell>
              <TableHeaderCell>Vendor</TableHeaderCell>
              <TableHeaderCell>Quantity</TableHeaderCell>
              <TableHeaderCell>Unit Price</TableHeaderCell>
              <TableHeaderCell>Total</TableHeaderCell>
              <TableHeaderCell>Invoice</TableHeaderCell>
            </TableHeaderRow>
            <GenericTableBodyRows 
              renderRow={(purchase: any) => (
                <>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {new Date(purchase.purchaseDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Package className="h-5 w-5 text-slate-400 mr-2" />
                      <span className="text-sm text-slate-900">{purchase.itemName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {purchase.vendorName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                    {purchase.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    ${purchase.unitPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                    ${purchase.totalPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {purchase.invoiceNumber || '-'}
                  </td>
                </>
              )}
              emptyMessage="No purchases recorded yet"
              emptyIcon={<ShoppingCart className="h-12 w-12 text-slate-300 mx-auto" />}
            />
          </TableComponent>
        </PageTable>
      </PageBodyContainer>
    </div>
  );
}

export default function PurchasesPage() {
  return (
    <PageTableProvider>
      <PurchasesPageContent />
    </PageTableProvider>
  );
}
