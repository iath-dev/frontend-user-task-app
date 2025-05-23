import React from 'react';
import { User } from '@/types/user.types';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';

/**
 * Propiedades del componente TableRow
 * @property {User} user - Objeto con los datos del usuario a mostrar
 */
interface TableRowProps {
  user: User;
}

export const TableRow: React.FC<TableRowProps> = ({ user }) => {
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();

  const handleClick = () => {
    setUser(user);
    router.push(`/${user.id}`);
  };

  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td style={{ textAlign: 'center' }}>
        <button onClick={handleClick} data-testid="view-task">
          Ver tareas
        </button>
      </td>
    </tr>
  );
};
