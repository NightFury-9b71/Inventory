import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Purchase, PurchaseFormData } from '@/types/inventory';

export const usePurchases = () => {
  return useQuery({
    queryKey: ['purchases'],
    queryFn: async () => {
      const response = await api.get<Purchase[]>('/purchases');
      return response.data;
    },
  });
};

export const usePurchaseById = (id: number) => {
  return useQuery({
    queryKey: ['purchases', id],
    queryFn: async () => {
      const response = await api.get<Purchase>(`/purchases/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useRecentPurchases = () => {
  return useQuery({
    queryKey: ['purchases', 'recent'],
    queryFn: async () => {
      const response = await api.get<Purchase[]>('/purchases/recent');
      return response.data;
    },
  });
};

export const useCreatePurchase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: PurchaseFormData) => {
      const response = await api.post<Purchase>('/purchases', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases'] });
      queryClient.invalidateQueries({ queryKey: ['items'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};
