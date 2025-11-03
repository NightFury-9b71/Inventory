'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useItemById } from '@/hooks/queries/useItems';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Package, Tag, DollarSign, Hash, FileText, Layers } from 'lucide-react';
import Link from 'next/link';

export default function ItemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const itemId = Number(params.id);

  const { data: item, isLoading, error } = useItemById(itemId);

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading item details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="p-6">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-red-600 font-semibold">Error loading item</p>
              <p className="text-red-500 text-sm mt-2">
                {error instanceof Error ? error.message : 'Item not found'}
              </p>
              <Button onClick={() => router.push('/items')} className="mt-4">
                Back to Items
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.push('/items')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{item.name}</h1>
            {item.nameBn && (
              <p className="text-slate-600 text-sm">{item.nameBn}</p>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/items/${item.id}/edit`}>
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </Link>
        </div>
      </div>

      {/* Status Badge */}
      <div className="mb-6">
        <Badge
          variant={item.quantity < 10 ? 'destructive' : 'default'}
          className="text-sm"
        >
          {item.quantity < 10 ? 'Low Stock' : 'In Stock'}
        </Badge>
        {item.isActive ? (
          <Badge variant="default" className="ml-2">Active</Badge>
        ) : (
          <Badge variant="secondary" className="ml-2">Inactive</Badge>
        )}
      </div>

      {/* Main Information Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Item Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Code */}
            <div>
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                <Hash className="h-4 w-4" />
                <span className="font-medium">Item Code</span>
              </div>
              <p className="text-slate-900 font-semibold">{item.code}</p>
            </div>

            {/* Category */}
            <div>
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                <Layers className="h-4 w-4" />
                <span className="font-medium">Category</span>
              </div>
              <p className="text-slate-900">{item.categoryName}</p>
            </div>

            {/* Quantity */}
            <div>
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                <Package className="h-4 w-4" />
                <span className="font-medium">Current Stock</span>
              </div>
              <p className={`font-bold text-lg ${
                item.quantity < 10 ? 'text-orange-600' : 'text-green-600'
              }`}>
                {item.quantity} {item.units || 'units'}
              </p>
            </div>

            {/* Unit Price */}
            <div>
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                <DollarSign className="h-4 w-4" />
                <span className="font-medium">Unit Price (Tk)</span>
              </div>
              <p className="text-slate-900 font-semibold">
                ৳{item.unitPrice?.toFixed(2) || '0.00'}
              </p>
            </div>

            {/* Units */}
            {item.units && (
              <div>
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                  <Tag className="h-4 w-4" />
                  <span className="font-medium">Unit Type</span>
                </div>
                <p className="text-slate-900">{item.units}</p>
              </div>
            )}

            {/* Total Value */}
            <div>
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                <DollarSign className="h-4 w-4" />
                <span className="font-medium">Total Value (Tk)</span>
              </div>
              <p className="text-slate-900 font-bold text-lg">
                ৳{((item.unitPrice || 0) * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Description */}
          {item.description && (
            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                <FileText className="h-4 w-4" />
                <span className="font-medium">Description</span>
              </div>
              <p className="text-slate-700 leading-relaxed">{item.description}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stock Status Card */}
      <Card>
        <CardHeader>
          <CardTitle>Stock Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Current Inventory Level</p>
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-slate-900">
                  {item.quantity}
                </div>
                <div className="text-sm text-slate-500">
                  {item.units || 'units'}
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-600 mb-1">Status</p>
              <div className={`text-lg font-semibold ${
                item.quantity === 0
                  ? 'text-red-600'
                  : item.quantity < 10
                  ? 'text-orange-600'
                  : 'text-green-600'
              }`}>
                {item.quantity === 0
                  ? 'Out of Stock'
                  : item.quantity < 10
                  ? 'Low Stock'
                  : 'In Stock'}
              </div>
            </div>
          </div>

          {/* Stock Level Bar */}
          <div className="mt-4">
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  item.quantity === 0
                    ? 'bg-red-600'
                    : item.quantity < 10
                    ? 'bg-orange-500'
                    : 'bg-green-500'
                }`}
                style={{
                  width: `${Math.min((item.quantity / 100) * 100, 100)}%`,
                }}
              />
            </div>
          </div>

          {item.quantity < 10 && item.quantity > 0 && (
            <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm text-orange-800">
                <strong>Warning:</strong> Stock level is low. Consider reordering soon.
              </p>
            </div>
          )}

          {item.quantity === 0 && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">
                <strong>Alert:</strong> This item is out of stock. Please reorder immediately.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
