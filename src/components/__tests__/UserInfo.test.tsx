import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserInfo from '../UserInfo';
import { useUserStore } from '@/store/userStore';
import { useUserTasks } from '@/hooks/useUserTasks';
import { UserTask } from '@/types/userTask.types';
import { useRouter } from 'next/navigation';

jest.mock('@/store/userStore');
jest.mock('@/hooks/useUserTasks');
jest.mock('next/navigation');

describe('UserInfo Component', () => {
  const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123456789',
    company: { name: 'Test Company' }
  };

  const mockTasks: UserTask[] = [
    { id: 1, title: 'Task 1', completed: false, userId: 1 },
    { id: 2, title: 'Task 2', completed: true, userId: 1 }
  ];

  beforeEach(() => {
    (jest.mocked(useUserStore)).mockImplementation(() => ({
      selectedUser: mockUser,
      setUser: jest.fn()
    }));

    (useUserTasks as jest.Mock).mockImplementation(() => ({
      data: mockTasks,
      isLoading: false
    }));

    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn()
    });
  });

  it('should render user information correctly', () => {
    render(<UserInfo />);
    
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(screen.getByText(mockUser.phone)).toBeInTheDocument();
    expect(screen.getByText(mockUser.company.name)).toBeInTheDocument();
    expect(screen.getByText('Tareas completadas: 1/2')).toBeInTheDocument();
  });

  it('should show loading state', () => {
    (useUserTasks as jest.Mock).mockImplementation(() => ({
      isLoading: true
    }));

    render(<UserInfo />);
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('should redirect when no user is selected', () => {
    (jest.mocked(useUserStore)).mockImplementation(() => ({
      selectedUser: null
    }));

    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock
    });

    render(<UserInfo />);
    expect(pushMock).toHaveBeenCalledWith('/');
  });

  it('should toggle task completion status', () => {
    render(<UserInfo />);
    
    const checkbox = screen.getByTestId('task-1');
    fireEvent.click(checkbox);
    
    expect(checkbox).toBeChecked();
  });

  it('should display avatar with first letter of name', () => {
    render(<UserInfo />);
    
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveTextContent(mockUser.name.slice(0, 2).toUpperCase());
  });
});