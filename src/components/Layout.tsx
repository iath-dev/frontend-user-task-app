'use client';

import { ReactNode, useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout">
      <header className="header">
        <h1>Gestor de Tareas de Usuario</h1>
        <button 
          className="menu-toggle" 
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
      </header>
      <div className="main-container">
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        </aside>
        <main className="content">
          <div className="user-details">{children}</div>
        </main>
      </div>
    </div>
  );
}
