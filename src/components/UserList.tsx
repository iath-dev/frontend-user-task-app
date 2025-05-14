'use client';

import { useUsers } from '@/hooks/useUsers';
import UserItem from './UserItem';

export default function UserList() {
  const { data: users, isLoading, isError } = useUsers();

  if (isLoading) {
    return <div>Cargando...</div>;
  }
  if (isError) {
    return <div>Error al cargar los usuarios</div>;
  }

  return (
    <div>
      <ul className="user-list">
        {users!.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </ul>
    </div>
  );
}
