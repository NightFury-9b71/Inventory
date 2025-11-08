"use client";

import React from "react";
import { ItemCategory } from "@/types/item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

type Props = {
  category: ItemCategory;
};

export default function CategoryDetailsCard({ category }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Category Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Category ID */}
        <div>
          <label className="text-sm font-medium text-gray-500">Category ID</label>
          <p className="text-sm">{category.id}</p>
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-gray-500">Description</label>
          {category.description ? (
            <p className="text-sm text-gray-700 mt-2 whitespace-pre-line leading-relaxed">
              {category.description}
            </p>
          ) : (
            <p className="text-sm text-gray-400 italic mt-2">No description provided</p>
          )}
        </div>

        {/* Key Information */}
        <div>
          <label className="text-sm font-medium text-gray-500">Key Information</label>
          <div className="mt-2 space-y-2">
            <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
              <span className="text-sm text-gray-600">Category Name</span>
              <span className="text-sm font-medium">{category.name}</span>
            </div>
            <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
              <span className="text-sm text-gray-600">Code</span>
              <span className="text-sm font-medium font-mono">{category.code}</span>
            </div>
            <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
              <span className="text-sm text-gray-600">Status</span>
              <span className={`text-sm font-medium ${category.isActive ? 'text-green-600' : 'text-red-600'}`}>
                {category.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}