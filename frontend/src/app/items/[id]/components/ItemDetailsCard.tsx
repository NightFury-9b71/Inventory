"use client";

import React from "react";
import { Item } from "@/types/item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Info } from "lucide-react";

type Props = {
  item: Item;
};

export default function ItemDetailsCard({ item }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Item Details & Features
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Item ID */}
        <div>
          <label className="text-sm font-medium text-gray-500">Item ID</label>
          <p className="text-sm">{item.id}</p>
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
            <Info className="h-4 w-4" />
            Description
          </label>
          {item.description ? (
            <p className="text-sm text-gray-700 mt-2 whitespace-pre-line leading-relaxed">
              {item.description}
            </p>
          ) : (
            <p className="text-sm text-gray-400 italic mt-2">No description provided</p>
          )}
        </div>

        {/* Features Section */}
        <div>
          <label className="text-sm font-medium text-gray-500">Key Features</label>
          <div className="mt-2 space-y-2">
            <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
              <span className="text-sm text-gray-600">Category</span>
              <span className="text-sm font-medium">{item.categoryName}</span>
            </div>
            <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
              <span className="text-sm text-gray-600">Item Code</span>
              <span className="text-sm font-medium font-mono">{item.code}</span>
            </div>
            <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
              <span className="text-sm text-gray-600">Unit Type</span>
              <span className="text-sm font-medium">{item.unitName ? `${item.unitName}` : 'Not specified'}</span>
            </div>
            <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
              <span className="text-sm text-gray-600">Current Stock</span>
              <span className="text-sm font-medium">{item.quantity} {item.unitSymbol || 'units'}</span>
            </div>
            <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
              <span className="text-sm text-gray-600">Status</span>
              <span className={`text-sm font-medium ${item.isActive ? 'text-green-600' : 'text-red-600'}`}>
                {item.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>

        {/* Timestamps */}
        {(item.createdAt || item.updatedAt) && (
          <div className="border-t pt-4 mt-4">
            {item.createdAt && (
              <div className="text-xs text-gray-500">
                Created: {new Date(item.createdAt).toLocaleString()}
              </div>
            )}
            {item.updatedAt && (
              <div className="text-xs text-gray-500 mt-1">
                Last Updated: {new Date(item.updatedAt).toLocaleString()}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
