"use client";

import React from "react";
import { Office } from "@/types/office";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  office: Office;
};

export default function AdditionalDetailsCard({ office }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-500">ID</label>
          <p>{office.id}</p>
        </div>
        {office.description && (
          <div>
            <label className="text-sm font-medium text-gray-500">Description</label>
            <p>{office.description}</p>
          </div>
        )}
        {office.orderIndex !== undefined && (
          <div>
            <label className="text-sm font-medium text-gray-500">Order Index</label>
            <p>{office.orderIndex}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
