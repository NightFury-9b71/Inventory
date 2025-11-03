'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useCategories } from '@/hooks/queries/useCategories';
import { ItemFormData } from '@/types/inventory';

interface ItemFormProps {
  initialData?: Partial<ItemFormData> & { isActive?: boolean };
  onSubmit: (data: ItemFormData & { isActive?: boolean }) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  error?: string | null;
  mode: 'create' | 'edit';
}

export default function ItemForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
  error = null,
  mode,
}: ItemFormProps) {
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  const [formData, setFormData] = useState<ItemFormData & { isActive?: boolean }>({
    name: initialData?.name || '',
    nameBn: initialData?.nameBn || '',
    categoryId: initialData?.categoryId || 0,
    code: initialData?.code || '',
    description: initialData?.description || '',
    units: initialData?.units || '',
    unitPrice: initialData?.unitPrice || 0,
    quantity: initialData?.quantity || 0,
    isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        nameBn: initialData.nameBn || '',
        categoryId: initialData.categoryId || 0,
        code: initialData.code || '',
        description: initialData.description || '',
        units: initialData.units || '',
        unitPrice: initialData.unitPrice || 0,
        quantity: initialData.quantity || 0,
        isActive: initialData.isActive !== undefined ? initialData.isActive : true,
      });
    }
  }, [initialData]);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Item name is required';
    }

    if (!formData.code.trim()) {
      errors.code = 'Item code is required';
    }

    if (!formData.categoryId || formData.categoryId === 0) {
      errors.categoryId = 'Please select a category';
    }

    if (formData.unitPrice !== undefined && formData.unitPrice < 0) {
      errors.unitPrice = 'Unit price cannot be negative';
    }

    if (formData.quantity !== undefined && formData.quantity < 0) {
      errors.quantity = 'Quantity cannot be negative';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
  };

  const handleInputChange = (field: keyof (ItemFormData & { isActive?: boolean }), value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>
            {mode === 'create' ? 'Add New Item' : 'Edit Item'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-800">Error</p>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Item Name */}
            <div>
              <Label htmlFor="name" className="required">
                Item Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter item name"
                className={validationErrors.name ? 'border-red-500' : ''}
              />
              {validationErrors.name && (
                <p className="text-sm text-red-600 mt-1">{validationErrors.name}</p>
              )}
            </div>

            {/* Item Name (Bangla) */}
            <div>
              <Label htmlFor="nameBn">Item Name (Bangla)</Label>
              <Input
                id="nameBn"
                value={formData.nameBn}
                onChange={(e) => handleInputChange('nameBn', e.target.value)}
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
                value={formData.code}
                onChange={(e) => handleInputChange('code', e.target.value)}
                placeholder="e.g., ITM-001"
                className={validationErrors.code ? 'border-red-500' : ''}
                disabled={mode === 'edit'}
              />
              {validationErrors.code && (
                <p className="text-sm text-red-600 mt-1">{validationErrors.code}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <Label htmlFor="categoryId">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.categoryId?.toString()}
                onValueChange={(value) => handleInputChange('categoryId', Number(value))}
                disabled={categoriesLoading || categories.filter((cat) => cat.isActive).length === 0}
              >
                <SelectTrigger className={validationErrors.categoryId ? 'border-red-500' : ''}>
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
              {validationErrors.categoryId && (
                <p className="text-sm text-red-600 mt-1">{validationErrors.categoryId}</p>
              )}
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
                value={formData.units}
                onChange={(e) => handleInputChange('units', e.target.value)}
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
                value={formData.unitPrice}
                onChange={(e) => handleInputChange('unitPrice', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                className={validationErrors.unitPrice ? 'border-red-500' : ''}
              />
              {validationErrors.unitPrice && (
                <p className="text-sm text-red-600 mt-1">{validationErrors.unitPrice}</p>
              )}
            </div>

            {/* Quantity */}
            <div>
              <Label htmlFor="quantity">
                Initial Quantity {mode === 'create' && <span className="text-red-500">*</span>}
              </Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 0)}
                placeholder="0"
                className={validationErrors.quantity ? 'border-red-500' : ''}
                disabled={mode === 'edit'}
              />
              {validationErrors.quantity && (
                <p className="text-sm text-red-600 mt-1">{validationErrors.quantity}</p>
              )}
              {mode === 'edit' && (
                <p className="text-xs text-slate-500 mt-1">
                  Stock quantity cannot be edited directly. Use purchases or distributions to adjust stock.
                </p>
              )}
            </div>

            {/* Active Status */}
            {mode === 'edit' && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => handleInputChange('isActive', checked)}
                />
                <Label htmlFor="isActive" className="cursor-pointer">
                  Active
                </Label>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('description', e.target.value)}
              placeholder="Enter item description (optional)"
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {mode === 'create' ? 'Create Item' : 'Save Changes'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
