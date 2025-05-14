import apiClient from '@/lib/api';
import { User } from '@/types/user.types';
import { useQuery } from '@tanstack/react-query';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await apiClient.get<User[]>('/users');
      return res.data;
    },
  });
};
