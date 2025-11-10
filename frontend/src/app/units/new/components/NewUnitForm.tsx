"use client";

import React from "react";
import { UnitFormData } from "@/types/unit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, AlertCircle } from "lucide-react";

type Props = {
  unit: UnitFormData;
  saving: boolean;
  error?: string | null;
  onInputChange: (field: string, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
};

export default function NewUnitForm({
  unit,
  saving,
  error,
  onInputChange,
  onSubmit,
  onCancel,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Unit</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-800">Error</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Unit Name */}
            <div>
              <Label htmlFor="name">
                Unit Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={unit.name}
                onChange={(e) => onInputChange("name", e.target.value)}
                placeholder="Enter unit name"
                required
              />
            </div>

            {/* Unit Name (Bangla) */}
            <div>
              <Label htmlFor="nameBn">Unit Name (Bangla)</Label>
              <Input
                id="nameBn"
                value={unit.nameBn || ""}
                onChange={(e) => onInputChange("nameBn", e.target.value)}
                placeholder="ইউনিট নাম"
              />
            </div>

            {/* Unit Symbol */}
            <div>
              <Label htmlFor="symbol">
                Unit Symbol <span className="text-red-500">*</span>
              </Label>
              <Input
                id="symbol"
                value={unit.symbol}
                onChange={(e) => onInputChange("symbol", e.target.value)}
                placeholder="e.g., kg, m, L"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={unit.description || ""}
              onChange={(e) => onInputChange("description", e.target.value)}
              placeholder="Enter unit description (optional)"
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-2 pt-4 border-t">
            <Button type="submit" disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Adding..." : "Add Unit"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}