import { render, screen } from '@testing-library/react';
import UserList from '@/components/UserList';
import { User } from '@/types/user.types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useStore } from '@/store';

// Mock de Zustand
jest.mock('@/store', () => ({
  useStore: jest.fn(),
}));

// Mock de React Query
const queryClient = new QueryClient();

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('UserList Component', () => {
  beforeEach(() => {
    (useStore as jest.Mock).mockReturnValue({
      tasks: [],
    });
  });
  const mockUsers: User[] = [
    {
      id: 1,
      name: 'User 1',
      username: 'user1',
      email: 'user1@example.com',
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        geo: { lat: '', lng: '' }
      },
      phone: '',
      website: '',
      company: {
        name: '',
        catchPhrase: '',
        bs: ''
      },
    },
    {
      id: 2,
      name: 'User 2',
      username: 'user2',
      email: 'user2@example.com',
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        geo: { lat: '', lng: '' }
      },
      phone: '',
      website: '',
      company: {
        name: '',
        catchPhrase: '',
        bs: ''
      },
    }
  ];

  it('renders user list with correct items', () => {
    render(<UserList users={mockUsers} />, { wrapper: Wrapper });
    
    expect(screen.getByText('User 1')).toBeInTheDocument();
    expect(screen.getByText('User 2')).toBeInTheDocument();
  });

  it('shows empty state when no users', () => {
    render(<UserList users={[]} />, { wrapper: Wrapper });
    
    expect(screen.getByText(/no users/i)).toBeInTheDocument();
  });
});