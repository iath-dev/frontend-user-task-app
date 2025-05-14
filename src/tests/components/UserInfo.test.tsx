import { render, screen } from '@testing-library/react';
import UserInfo from '@/components/UserInfo';
import { User } from '@/types/user.types';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
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

const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/todos', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, title: 'Tarea 1', completed: false },
        { id: 2, title: 'Tarea 2', completed: true },
      ])
    );
  })
);

describe('UserInfo Component', () => {
  beforeEach(() => {
    (useStore as jest.Mock).mockReturnValue({
      tasks: [
        { id: 1, title: 'Tarea 1', completed: false },
        { id: 2, title: 'Tarea 2', completed: true },
      ],
    });
  });

  const mockUser: User = {
    id: 1,
    name: 'Test User',
    username: 'testuser',
    email: 'test@example.com',
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
    }
  };

  it('renders user information correctly', () => {
    render(<UserInfo user={mockUser} />, { wrapper: Wrapper });
    
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
  });

  it('displays the correct number of tasks', () => {
    render(<UserInfo user={mockUser} />, { wrapper: Wrapper });
    
    expect(screen.getByText(/Tasks: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Completed: 1/i)).toBeInTheDocument();
  });
});