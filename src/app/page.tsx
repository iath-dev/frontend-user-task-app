'use client';

import { Table, TableColumn } from '@/components/Table';
import { TableRow } from '@/components/TableRow';
import { useUsers } from '@/hooks/useUsers';

export default function Home() {
  const { data: users, isLoading, isError } = useUsers();

  if (isLoading) {
    return <div>Cargando...</div>;
  }
  if (isError) {
    return <div>Error al cargar los usuarios</div>;
  }

  const columns: TableColumn[] = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'tasks', label: 'Tareas', align: 'center' }
  ];

  return (
    <div className="page">
      <Table data={users || []} columns={columns} rowComponent={(user) => <TableRow key={user.id} user={user} />}  />
    </div>
  );
}
