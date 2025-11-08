"use client";

import React from "react";
import { Item } from "@/types/item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Hash, CheckCircle, XCircle, Tag } from "lucide-react";

type Props = {
  item: Item;
};

export default function ItemInfoCard({ item }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Item Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Name and Name (Bengali) side by side */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Name</label>
            <p className="text-lg font-semibold">{item.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Name (Bengali)</label>
            <p className="text-lg">{item.nameBn || "N/A"}</p>
          </div>
        </div>

        {/* Code and Category side by side */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Code</label>
            <p className="flex items-center gap-2">
              <Hash className="h-4 w-4" />
              {item.code}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Category</label>
            <p className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              {item.categoryName}
            </p>
          </div>
        </div>

        {/* Quantity and Status side by side */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Current Quantity</label>
            <p className="text-lg font-semibold">
              {item.quantity} {item.unitSymbol && <span className="text-sm text-gray-600">({item.unitSymbol})</span>}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Status</label>
            <p className="flex items-center gap-2">
              {item.isActive ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-green-600">Active</span>
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 text-red-500" />
                  <span className="text-red-600">Inactive</span>
                </>
              )}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
