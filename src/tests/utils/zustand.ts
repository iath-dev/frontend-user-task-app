import { act } from '@testing-library/react';
import { useUserStore } from '@/store/userStore';

export function resetUserStore() {
  act(() => {
    useUserStore.setState({ selectedUser: null });
  });
}
