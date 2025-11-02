import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Item, ItemFormData } from '@/types/inventory';

export const useItems = () => {
  return useQuery({
    queryKey: ['items'],
    queryFn: async () => {
      const response = await api.get<Item[]>('/items');
      return response.data;
    },
  });
};

export const useItemById = (id: number) => {
  return useQuery({
    queryKey: ['items', id],
    queryFn: async () => {
      const response = await api.get<Item>(`/items/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useItemByCode = (code: string) => {
  return useQuery({
    queryKey: ['items', 'code', code],
    queryFn: async () => {
      const response = await api.get<Item>(`/items/code/${code}`);
      return response.data;
    },
    enabled: !!code,
  });
};

export const useSearchItems = (query: string) => {
  return useQuery({
    queryKey: ['items', 'search', query],
    queryFn: async () => {
      const response = await api.get<Item[]>(`/items/search?query=${query}`);
      return response.data;
    },
    enabled: query.length > 0,
  });
};

export const useLowStockItems = (threshold: number = 10) => {
  return useQuery({
    queryKey: ['items', 'low-stock', threshold],
    queryFn: async () => {
      const response = await api.get<Item[]>(`/items/low-stock?threshold=${threshold}`);
      return response.data;
    },
  });
};

export const useCreateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ItemFormData) => {
      const response = await api.post<Item>('/items', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
};

export const useUpdateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<ItemFormData> }) => {
      const response = await api.put<Item>(`/items/${id}`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      queryClient.invalidateQueries({ queryKey: ['items', variables.id] });
    },
  });
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/items/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
};

export const useUpdateStock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, quantity }: { id: number; quantity: number }) => {
      await api.patch(`/items/${id}/stock?quantity=${quantity}`);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      queryClient.invalidateQueries({ queryKey: ['items', variables.id] });
    },
  });
};
