"use client";

import React, { useState, useEffect } from "react";
import { PurchaseFormData } from "@/types/purchase";
import { Item } from "@/types/item";
import { getItems } from "@/services/item_service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, AlertCircle } from "lucide-react";

type Props = {
  purchase: PurchaseFormData;
  saving: boolean;
  error?: string | null;
  onInputChange: (field: string, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
};

export default function NewPurchaseForm({
  purchase,
  saving,
  error,
  onInputChange,
  onSubmit,
  onCancel,
}: Props) {
  const [items, setItems] = useState<Item[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const fetchedItems = await getItems();
        setItems(fetchedItems.filter(item => item.isActive));
      } catch (error) {
        console.error("Failed to fetch items:", error);
      } finally {
        setLoadingItems(false);
      }
    };

    fetchItems();
  }, []);

  const calculateTotalPrice = () => {
    const total = (purchase.quantity || 0) * (purchase.unitPrice || 0);
    return total.toFixed(2);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Purchase</CardTitle>
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
            {/* Item Selection */}
            <div>
              <Label htmlFor="itemId">
                Item <span className="text-red-500">*</span>
              </Label>
              <Select
                value={purchase.itemId.toString()}
                onValueChange={(value) => onInputChange("itemId", parseInt(value))}
                disabled={loadingItems}
              >
                <SelectTrigger>
                  <SelectValue placeholder={loadingItems ? "Loading items..." : "Select an item"} />
                </SelectTrigger>
                <SelectContent>
                  {items.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.name} ({item.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity */}
            <div>
              <Label htmlFor="quantity">
                Quantity <span className="text-red-500">*</span>
              </Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={purchase.quantity || ""}
                onChange={(e) => onInputChange("quantity", parseInt(e.target.value) || 0)}
                placeholder="Enter quantity"
                required
              />
            </div>

            {/* Unit Price */}
            <div>
              <Label htmlFor="unitPrice">
                Unit Price <span className="text-red-500">*</span>
              </Label>
              <Input
                id="unitPrice"
                type="number"
                min="0"
                step="0.01"
                value={purchase.unitPrice || ""}
                onChange={(e) => onInputChange("unitPrice", parseFloat(e.target.value) || 0)}
                placeholder="Enter unit price"
                required
              />
            </div>

            {/* Total Price (Calculated) */}
            <div>
              <Label htmlFor="totalPrice">Total Price</Label>
              <Input
                id="totalPrice"
                value={calculateTotalPrice()}
                readOnly
                className="bg-gray-50"
              />
            </div>

            {/* Vendor Name */}
            <div>
              <Label htmlFor="vendorName">
                Vendor Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="vendorName"
                value={purchase.vendorName}
                onChange={(e) => onInputChange("vendorName", e.target.value)}
                placeholder="Enter vendor name"
                required
              />
            </div>

            {/* Vendor Contact */}
            <div>
              <Label htmlFor="vendorContact">Vendor Contact</Label>
              <Input
                id="vendorContact"
                value={purchase.vendorContact || ""}
                onChange={(e) => onInputChange("vendorContact", e.target.value)}
                placeholder="Enter vendor contact (optional)"
              />
            </div>

            {/* Purchase Date */}
            <div>
              <Label htmlFor="purchaseDate">
                Purchase Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="purchaseDate"
                type="date"
                value={purchase.purchaseDate}
                onChange={(e) => onInputChange("purchaseDate", e.target.value)}
                required
              />
            </div>

            {/* Invoice Number */}
            <div>
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input
                id="invoiceNumber"
                value={purchase.invoiceNumber || ""}
                onChange={(e) => onInputChange("invoiceNumber", e.target.value)}
                placeholder="Enter invoice number (optional)"
              />
            </div>
          </div>

          {/* Remarks */}
          <div>
            <Label htmlFor="remarks">Remarks</Label>
            <Textarea
              id="remarks"
              value={purchase.remarks || ""}
              onChange={(e) => onInputChange("remarks", e.target.value)}
              placeholder="Enter any remarks (optional)"
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-2 pt-4 border-t">
            <Button type="submit" disabled={saving || purchase.itemId === 0}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Adding..." : "Add Purchase"}
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