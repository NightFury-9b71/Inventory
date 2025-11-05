"use client";

import React from "react";
import { Office } from "@/types/office";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Save, AlertCircle } from "lucide-react";

type Props = {
  office: Office;
  saving: boolean;
  error?: string | null;
  onInputChange: (field: keyof Office, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
};

export default function EditOfficeForm({
  office,
  saving,
  error,
  onInputChange,
  onSubmit,
  onCancel,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Office</CardTitle>
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
            {/* Office Name */}
            <div>
              <Label htmlFor="name">
                Office Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={office.name}
                onChange={(e) => onInputChange("name", e.target.value)}
                placeholder="Enter office name"
                required
              />
            </div>

            {/* Office Name (Bangla) */}
            <div>
              <Label htmlFor="nameBn">
                Office Name (Bangla) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="nameBn"
                value={office.nameBn}
                onChange={(e) => onInputChange("nameBn", e.target.value)}
                placeholder="অফিস নাম"
                required
              />
            </div>

            {/* Office Code */}
            <div>
              <Label htmlFor="code">
                Office Code <span className="text-red-500">*</span>
              </Label>
              <Input
                id="code"
                value={office.code}
                onChange={(e) => onInputChange("code", e.target.value)}
                placeholder="e.g., OFF-001"
                disabled
                required
              />
              <p className="text-xs text-slate-500 mt-1">Code cannot be changed</p>
            </div>

            {/* Office Type */}
            <div>
              <Label htmlFor="type">
                Office Type <span className="text-red-500">*</span>
              </Label>
              <Input
                id="type"
                value={office.type}
                onChange={(e) => onInputChange("type", e.target.value)}
                disabled
                required
              />
              <p className="text-xs text-slate-500 mt-1">Type cannot be changed</p>
            </div>

            {/* Order Index */}
            <div>
              <Label htmlFor="orderIndex">Order Index</Label>
              <Input
                id="orderIndex"
                type="number"
                value={office.orderIndex || ""}
                onChange={(e) =>
                  onInputChange(
                    "orderIndex",
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                placeholder="Display order"
              />
            </div>

            {/* Active Status */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isActive"
                checked={office.isActive}
                onCheckedChange={(checked) => onInputChange("isActive", checked)}
              />
              <Label htmlFor="isActive" className="cursor-pointer">
                Active
              </Label>
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={office.description || ""}
              onChange={(e) => onInputChange("description", e.target.value)}
              placeholder="Enter office description (optional)"
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-2 pt-4 border-t">
            <Button type="submit" disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Saving..." : "Save Changes"}
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
