import React, { useState } from 'react';

/**
 * Define la estructura de una columna de la tabla
 * @property {string} key - Identificador único de la columna
 * @property {string} label - Texto a mostrar en el encabezado
 * @property {'left' | 'center' | 'right'} [align] - Alineación del contenido (opcional)
 */
export interface TableColumn {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
}

/**
 * Propiedades del componente Table
 * @template T - Tipo de los elementos de datos
 * @property {T[]} data - Array de datos a mostrar
 * @property {TableColumn[]} columns - Configuración de columnas
 * @property {number} [itemsPerPage=5] - Número de elementos por página (opcional)
 * @property {(item: T) => React.ReactNode} rowComponent - Componente para renderizar cada fila
 */
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