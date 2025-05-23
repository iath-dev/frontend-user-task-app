import React from 'react';
import { render, screen } from '@testing-library/react';
import { Table, TableColumn } from '../Table';
import { mockUsers } from '@/tests/mock/user';

describe('Table component', () => {
  const columns: TableColumn[] = [
    { label: 'Nombre', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Tareas', key: 'tasks' },
  ];

  it('renders table header with correct columns', () => {
    render(
      <Table
        data={mockUsers}
        columns={columns}
        rowComponent={(item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.id}</td>
          </tr>
        )}
      />
    );
    const thead = screen.getByTestId('table-header');
    const headerCells = thead.querySelectorAll('th');

    expect(thead).toBeInTheDocument();
    expect(headerCells.length).toBe(columns.length);

    columns.forEach((column, index) => {
      expect(headerCells[index]).toHaveTextContent(column.label);
    });
  });

  it('renders table body with correct rows', () => {
    render(
      <Table
        data={mockUsers}
        columns={columns}
        itemsPerPage={7}
        rowComponent={(item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.id}</td>
          </tr>
        )}
      />
    );
    const tbody = screen.getByTestId('table-body');
    const bodyCells = tbody.querySelectorAll('tr');

    expect(tbody).toBeInTheDocument();
    expect(bodyCells.length).toBe(7);
  });

  it('renders table body with correct rows, limit data', () => {
    const sliceUsers = mockUsers.slice(0, 3);

    render(
      <Table
        data={sliceUsers}
        columns={columns}
        itemsPerPage={5}
        rowComponent={(item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.id}</td>
          </tr>
        )}
      />
    );
    const tbody = screen.getByTestId('table-body');
    const bodyCells = tbody.querySelectorAll('tr');

    expect(tbody).toBeInTheDocument();
    expect(bodyCells.length).toBe(sliceUsers.length);
  });

  it('pagination buttons disabled', () => {
    render(
      <Table
        data={mockUsers}
        columns={columns}
        rowComponent={(item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.id}</td>
          </tr>
        )}
      />
    );
    const prevButton = screen.getByTestId('prev-button');
    expect(prevButton).toBeDisabled();
  });
});
