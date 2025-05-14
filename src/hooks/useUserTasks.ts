import apiClient from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { UserTask } from '@/types/userTask.types';

export const useUserTasks = (userId?: number) => {
  return useQuery({
    queryKey: ['user-tasks', userId],
    queryFn: async () => {
      const res = await apiClient.get<UserTask[]>(`/todos?userId=${userId}`);
      return res.data;
    },
    enabled: !!userId,
  });
};
