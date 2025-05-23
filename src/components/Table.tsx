import React, { useState } from 'react';

export interface TableColumn {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn[];
  itemsPerPage?: number;
  rowComponent: (item: T) => React.ReactNode;
}

export const Table = <T,>({
  data,
  columns,
  itemsPerPage = 5,
  rowComponent,
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  
  const totalPages = Math.ceil(data.length / itemsPerPage);
  
  return (
    <div className="table-container">
      <table className="table-content">
        <thead data-testid="table-header">
          <tr>
            {columns.map((column) => (
              <th key={column.key} style={{ textAlign: column.align || 'left' }}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody data-testid='table-body'>
          {currentItems.map((item) => rowComponent(item))}
        </tbody>
      </table>
      
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            data-testid="prev-button"
          >
            Anterior
          </button>
                    
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            data-testid="next-button"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};