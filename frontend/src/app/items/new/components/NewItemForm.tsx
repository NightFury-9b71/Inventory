"use client";

import React from "react";
import { ItemFormData } from "@/types/inventory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, AlertCircle } from "lucide-react";
import { useCategories } from "@/hooks/queries/useCategories";

type Props = {
  item: ItemFormData;
  saving: boolean;
  error?: string | null;
  onInputChange: (field: string, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
};

export default function NewItemForm({
  item,
  saving,
  error,
  onInputChange,
  onSubmit,
  onCancel,
}: Props) {
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Item</CardTitle>
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
            {/* Item Name */}
            <div>
              <Label htmlFor="name">
                Item Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={item.name}
                onChange={(e) => onInputChange("name", e.target.value)}
                placeholder="Enter item name"
                required
              />
            </div>

            {/* Item Name (Bangla) */}
            <div>
              <Label htmlFor="nameBn">Item Name (Bangla)</Label>
              <Input
                id="nameBn"
                value={item.nameBn || ""}
                onChange={(e) => onInputChange("nameBn", e.target.value)}
                placeholder="আইটেম নাম"
              />
            </div>

            {/* Item Code */}
            <div>
              <Label htmlFor="code">
                Item Code <span className="text-red-500">*</span>
              </Label>
              <Input
                id="code"
                value={item.code}
                onChange={(e) => onInputChange("code", e.target.value)}
                placeholder="e.g., ITM-001"
                required
              />
            </div>

            {/* Category */}
            <div>
              <Label htmlFor="categoryId">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select
                value={item.categoryId > 0 ? item.categoryId.toString() : ""}
                onValueChange={(value) => onInputChange("categoryId", Number(value))}
                disabled={categoriesLoading}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={
                    categoriesLoading 
                      ? "Loading categories..." 
                      : categories.filter((cat) => cat.isActive).length === 0
                      ? "No active categories available"
                      : "Select a category"
                  } />
                </SelectTrigger>
                <SelectContent>
                  {categories
                    .filter((cat) => cat.isActive)
                    .map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {!categoriesLoading && categories.filter((cat) => cat.isActive).length === 0 && (
                <p className="text-xs text-amber-600 mt-1">
                  Please create a category first before adding items.
                </p>
              )}
            </div>

            {/* Units */}
            <div>
              <Label htmlFor="units">Unit Type</Label>
              <Input
                id="units"
                value={item.units || ""}
                onChange={(e) => onInputChange("units", e.target.value)}
                placeholder="e.g., pieces, kg, liters"
              />
            </div>

            {/* Unit Price */}
            <div>
              <Label htmlFor="unitPrice">Unit Price (Tk)</Label>
              <Input
                id="unitPrice"
                type="number"
                step="0.01"
                min="0"
                value={item.unitPrice || 0}
                onChange={(e) => onInputChange("unitPrice", parseFloat(e.target.value) || 0)}
                placeholder="0.00"
              />
            </div>

            {/* Initial Quantity */}
            <div>
              <Label htmlFor="quantity">
                Initial Quantity <span className="text-red-500">*</span>
              </Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                value={item.quantity}
                onChange={(e) => onInputChange("quantity", parseInt(e.target.value) || 0)}
                placeholder="0"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={item.description || ""}
              onChange={(e) => onInputChange("description", e.target.value)}
              placeholder="Enter item description (optional)"
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-2 pt-4 border-t">
            <Button type="submit" disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Adding..." : "Add Item"}
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
