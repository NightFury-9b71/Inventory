"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, AlertCircle } from "lucide-react";
import UnitSelect from "@/components/ui/unit-select";
import { Item, ItemFormData, ItemCategory } from "@/types/item";
import { getCategories } from "@/services/category_service";
import Can from "@/components/auth/Can";

type Props = {
  item: Item;
  saving: boolean;
  error?: string | null;
  onInputChange: (field: keyof Item, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
};

export default function EditItemForm({ item, saving, error, onInputChange, onSubmit, onCancel }: Props) {
  const [categories, setCategories] = useState<ItemCategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const cats = await getCategories();
        setCategories(cats);
      } catch (err) {
        // ignore here, show available empty list
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Item</CardTitle>
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
            <div>
              <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
              <Input id="name" value={item.name} onChange={(e) => onInputChange('name', e.target.value)} required />
            </div>

            <div>
              <Label htmlFor="nameBn">Name (Bengali)</Label>
              <Input id="nameBn" value={item.nameBn || ''} onChange={(e) => onInputChange('nameBn', e.target.value)} />
            </div>

            <div>
              <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
              <Select value={(item.categoryId || 0).toString()} onValueChange={(v) => onInputChange('categoryId', Number(v))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.filter(c => c.isActive).map(cat => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="code">Code <span className="text-red-500">*</span></Label>
              <Input id="code" value={item.code} onChange={(e) => onInputChange('code', e.target.value)} disabled required />
              <p className="text-xs text-slate-500 mt-1">Code cannot be changed</p>
            </div>

            <UnitSelect value={item.unitId} onChange={(v) => onInputChange('unitId', v)} placeholder="Select a unit" />

            <div>
              <Label htmlFor="quantity">Quantity <span className="text-red-500">*</span></Label>
              <Input id="quantity" type="number" min={0} value={item.quantity as any} onChange={(e) => onInputChange('quantity', Number(e.target.value))} disabled required/>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="isActive" checked={!!item.isActive} onCheckedChange={(v) => onInputChange('isActive', v)} />
              <Label htmlFor="isActive" className="cursor-pointer">Active</Label>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={item.description || ''} onChange={(e) => onInputChange('description', e.target.value)} rows={4} className="resize-none" />
          </div>

          <div className="flex gap-2 pt-4 border-t">
            <Can page="/items" action="edit">
              <Button type="submit" disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </Can>
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
