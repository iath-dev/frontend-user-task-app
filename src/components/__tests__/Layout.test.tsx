import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Layout from '../Layout';

describe('Layout Component', () => {
  it('renders children correctly', () => {
    const testText = 'Test Child';
    render(
      <Layout>
        <div>{testText}</div>
      </Layout>
    );
    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it('toggles sidebar when menu button is clicked', () => {
    render(
      <Layout>
        <div>Test</div>
      </Layout>
    );
    const menuButton = screen.getByRole('button', { name: '☰' });

    // Sidebar should be closed initially
    expect(screen.getByTestId('sidebar')).not.toHaveClass('open');

    // Click button to open
    fireEvent.click(menuButton);
    expect(screen.getByTestId('sidebar')).toHaveClass('open');

    // Click again to close
    fireEvent.click(menuButton);
    expect(screen.getByTestId('sidebar')).not.toHaveClass('open');
  });

  it('renders header with correct title', () => {
    render(
      <Layout>
        <div>Test</div>
      </Layout>
    );
    expect(
      screen.getByRole('heading', { name: 'Gestor de Tareas de Usuario' })
    ).toBeInTheDocument();
  });
});
