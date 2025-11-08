"use client";

import React from "react";
import { Item } from "@/types/item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  subItems?: Item[];
  onNavigateToChild?: (id: number) => void;
};

export default function ChildItemsCard({ subItems = [], onNavigateToChild }: Props) {
  if (!subItems || subItems.length === 0) return null;

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Child Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {subItems.map((childItem) => (
            <div
              key={childItem.id}
              className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onNavigateToChild && onNavigateToChild(childItem.id)}
            >
              <h3 className="font-semibold">{childItem.name}</h3>
              <p className="text-sm text-gray-600">{childItem.code}</p>
              <p className="text-xs text-gray-500">{childItem.categoryId}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}