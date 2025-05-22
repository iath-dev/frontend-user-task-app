import React, { useState } from 'react';
import { TableRow } from './TableRow';
import { User } from '@/types/user.types';

export interface TableColumn {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
}

interface TableProps {
  data: User[];
  columns: TableColumn[];
  itemsPerPage?: number;
}

export const Table: React.FC<TableProps> = ({
  data,
  columns,
  itemsPerPage = 5,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  
  const totalPages = Math.ceil(data.length / itemsPerPage);
  
  return (
    <div className="table-container">
      <table className="table-content">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} style={{ textAlign: column.align || 'left' }}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <TableRow 
              key={`${item.id}`} 
              user={item}
            />
          ))}
        </tbody>
      </table>
      
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
                    
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};