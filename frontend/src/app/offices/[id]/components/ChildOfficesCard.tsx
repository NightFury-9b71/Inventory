"use client";

import React from "react";
import { Office } from "@/types/office";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  subOffices?: Office[];
  onNavigateToChild?: (id: number) => void;
};

export default function ChildOfficesCard({ subOffices = [], onNavigateToChild }: Props) {
  if (!subOffices || subOffices.length === 0) return null;

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Child Offices</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {subOffices.map((childOffice) => (
            <div
              key={childOffice.id}
              className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onNavigateToChild && onNavigateToChild(childOffice.id)}
            >
              <h3 className="font-semibold">{childOffice.name}</h3>
              <p className="text-sm text-gray-600">{childOffice.code}</p>
              <p className="text-xs text-gray-500">{childOffice.type}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
