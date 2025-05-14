'use client';

import { User } from '@/types/user.types';
import { useUserStore } from '@/store/userStore';

interface UserItemProps {
  user: User;
}

export default function UserItem({ user }: UserItemProps) {
  const setUser = useUserStore((state) => state.setUser);

  return (
    <li className={`user-item`}>
      <div>
        <div>{user.name}</div>
        <div style={{ fontSize: '0.8rem', color: '#666' }}>{user.email}</div>
      </div>
      <button onClick={() => setUser(user)}>ver tareas</button>
    </li>
  );
}