"use client";

import React from "react";
import { Unit } from "@/types/unit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ruler, Hash, CheckCircle, XCircle } from "lucide-react";

type Props = {
  unit: Unit;
};

export default function UnitInfoCard({ unit }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Ruler className="h-5 w-5" />
          Unit Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Name and Name (Bengali) side by side */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Name</label>
            <p className="text-lg font-semibold">{unit.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Name (Bengali)</label>
            <p className="text-lg">{unit.nameBn || "N/A"}</p>
          </div>
        </div>

        {/* Symbol */}
        <div>
          <label className="text-sm font-medium text-gray-500">Symbol</label>
          <p className="flex items-center gap-2">
            <Hash className="h-4 w-4" />
            <span className="font-mono text-lg">{unit.symbol}</span>
          </p>
        </div>

        {/* Status */}
        <div>
          <label className="text-sm font-medium text-gray-500">Status</label>
          <p className="flex items-center gap-2">
            {unit.isActive ? (
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
