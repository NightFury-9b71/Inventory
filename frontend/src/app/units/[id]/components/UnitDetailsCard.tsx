"use client";

import React from "react";
import { Unit } from "@/types/unit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

type Props = {
  unit: Unit;
};

export default function UnitDetailsCard({ unit }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Unit Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Unit ID */}
        <div>
          <label className="text-sm font-medium text-gray-500">Unit ID</label>
          <p className="text-sm">{unit.id}</p>
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-gray-500">Description</label>
          {unit.description ? (
            <p className="text-sm text-gray-700 mt-2 whitespace-pre-line leading-relaxed">
              {unit.description}
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
              <span className="text-sm text-gray-600">Unit Name</span>
              <span className="text-sm font-medium">{unit.name}</span>
            </div>
            <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
              <span className="text-sm text-gray-600">Symbol</span>
              <span className="text-sm font-medium font-mono">{unit.symbol}</span>
            </div>
            <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
              <span className="text-sm text-gray-600">Status</span>
              <span className={`text-sm font-medium ${unit.isActive ? 'text-green-600' : 'text-red-600'}`}>
                {unit.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>

        {/* Timestamps */}
        {(unit.createdAt || unit.updatedAt) && (
          <div className="border-t pt-4 mt-4">
            {unit.createdAt && (
              <div className="text-xs text-gray-500">
                Created: {new Date(unit.createdAt).toLocaleString()}
              </div>
            )}
            {unit.updatedAt && (
              <div className="text-xs text-gray-500 mt-1">
                Last Updated: {new Date(unit.updatedAt).toLocaleString()}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
