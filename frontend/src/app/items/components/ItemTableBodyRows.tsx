"use client";

import React from "react";
import Link from "next/link";
import { Package, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useItemTableContext } from "../context/ItemTableContext";
import { useItems, useDeleteItem } from "@/hooks/queries/useItems";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import TableBodyContainer from "@/components/TableBodyContainer";

export default function ItemTableBodyRows() {
  const { searchTerm, categoryFilter, statusFilter } = useItemTableContext();
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter');

  const { data: items = [], isLoading, error } = useItems();
  const deleteItem = useDeleteItem();

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

  // Filter function
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

  const filteredItems = items.filter(filterFn);

  if (isLoading) {
    return (
      <tbody>
        <tr>
          <td colSpan={5} className="px-6 py-12 text-center">
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          </td>
        </tr>
      </tbody>
    );
  }

  if (error) {
    return (
      <tbody>
        <tr>
          <td colSpan={5} className="px-6 py-12 text-center text-red-600">
            Error loading items
          </td>
        </tr>
      </tbody>
    );
  }

  if (filteredItems.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={5} className="px-6 py-12 text-center">
            <div className="flex flex-col items-center justify-center">
              <Package className="h-12 w-12 text-slate-300 mb-4" />
              <p className="text-slate-500">No items found</p>
            </div>
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className="bg-white divide-y divide-slate-200">
      {filteredItems.map((item: any) => (
        <tr key={item.id} className="hover:bg-slate-50">
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
            {item.categoryName}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <Package className="h-5 w-5 text-slate-400 mr-2" />
              <span className="text-sm text-slate-900">{item.name}</span>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
            {item.code}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
            {item.units}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            {item.isActive ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                Inactive
              </span>
            )}
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
        </tr>
      ))}
    </tbody>
  );
}
