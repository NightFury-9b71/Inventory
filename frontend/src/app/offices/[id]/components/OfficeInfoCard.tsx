"use client";

import React from "react";
import { Office } from "@/types/office";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Hash, CheckCircle, XCircle } from "lucide-react";

type Props = {
  office: Office;
};

export default function OfficeInfoCard({ office }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5" />
          Office Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Name and Name (Bengali) side by side */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Name</label>
            <p className="text-lg font-semibold">{office.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Name (Bengali)</label>
            <p className="text-lg">{office.nameBn}</p>
          </div>
        </div>

        {/* Code and Type side by side */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Code</label>
            <p className="flex items-center gap-2">
              <Hash className="h-4 w-4" />
              {office.code}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Type</label>
            <p>{office.type}</p>
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="text-sm font-medium text-gray-500">Status</label>
          <p className="flex items-center gap-2">
            {office.isActive ? (
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
