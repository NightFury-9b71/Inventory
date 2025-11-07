"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type UseItemOptions<T> = {
  id?: string | number;
  crud: {
    basePath: string;
    getById?: (id: string | number) => Promise<T>;
    create?: (data: Partial<T>) => Promise<T>;
    update?: (id: string | number, data: Partial<T>) => Promise<T>;
    delete?: (id: string | number) => Promise<void>;
  };
  createMode?: boolean;
  skipFetch?: boolean;
};

export function useItem<T extends Record<string, any>>({
  id,
  crud,
  createMode = false,
  skipFetch = false,
}: UseItemOptions<T>) {
  const router = useRouter();
  const [item, setItem] = useState<T | Partial<T>>({});
  const [loading, setLoading] = useState(!createMode && !skipFetch);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch item data
  const fetchItem = async () => {
    if (!id || !crud.getById || createMode || skipFetch) return;

    setLoading(true);
    setError(null);
    try {
      const data = await crud.getById(id);
      setItem(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch item');
    } finally {
      setLoading(false);
    }
  };

  // Create item
  const createItem = async (data: Partial<T>) => {
    if (!crud.create) return;

    setSaving(true);
    setError(null);
    try {
      const newItem = await crud.create(data);
      router.push(`${crud.basePath}/${newItem.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create item');
    } finally {
      setSaving(false);
    }
  };

  // Update item
  const updateItem = async (data: Partial<T>) => {
    if (!id || !crud.update) return;

    setSaving(true);
    setError(null);
    try {
      const updatedItem = await crud.update(id, data);
      setItem(updatedItem);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update item');
    } finally {
      setSaving(false);
    }
  };

  // Delete item
  const deleteItem = async () => {
    if (!id || !crud.delete) return;

    setDeleting(true);
    setError(null);
    try {
      await crud.delete(id);
      router.push(crud.basePath);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item');
    } finally {
      setDeleting(false);
    }
  };

  // Navigation handlers
  const handleBack = () => {
    router.push(crud.basePath);
  };

  const handleEdit = () => {
    if (id) {
      router.push(`${crud.basePath}/${id}/edit`);
    }
  };

  const handleView = (itemId: string | number) => {
    router.push(`${crud.basePath}/${itemId}`);
  };

  const handleAddChild = () => {
    if (id) {
      router.push(`${crud.basePath}/${id}/add-child`);
    }
  };

  const handleNavigateToChild = (childId: number) => {
    router.push(`${crud.basePath}/${childId}`);
  };

  // Input change handler
  const handleInputChange = (field: keyof T, value: any) => {
    setItem(prev => ({ ...prev, [field]: value }));
  };

  // Form submit handlers
  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createItem(item);
  };

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateItem(item);
  };

  const handleCancel = () => {
    handleBack();
  };

  // Load data on mount
  useEffect(() => {
    fetchItem();
  }, [id]);

  return {
    // Data
    item,
    loading,
    saving,
    deleting,
    error,

    // Actions
    fetchItem,
    createItem,
    updateItem,
    deleteItem,
    handleBack,
    handleEdit,
    handleView,
    handleAddChild,
    handleNavigateToChild,
    handleInputChange,
    handleCreateSubmit,
    handleUpdateSubmit,
    handleCancel,
  };
}