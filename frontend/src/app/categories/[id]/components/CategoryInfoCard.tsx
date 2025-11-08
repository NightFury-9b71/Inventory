"use client";

import React from "react";
import { ItemCategory } from "@/types/item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag, Hash, CheckCircle, XCircle } from "lucide-react";

type Props = {
  category: ItemCategory;
};

export default function CategoryInfoCard({ category }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-5 w-5" />
          Category Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Name and Name (Bengali) side by side */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Name</label>
            <p className="text-lg font-semibold">{category.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Name (Bengali)</label>
            <p className="text-lg">{category.nameBn || "N/A"}</p>
          </div>
        </div>

        {/* Code */}
        <div>
          <label className="text-sm font-medium text-gray-500">Code</label>
          <p className="flex items-center gap-2">
            <Hash className="h-4 w-4" />
            <span className="font-mono text-lg">{category.code}</span>
          </p>
        </div>

        {/* Status */}
        <div>
          <label className="text-sm font-medium text-gray-500">Status</label>
          <p className="flex items-center gap-2">
            {category.isActive ? (
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
      </CardContent>
    </Card>
  );
}