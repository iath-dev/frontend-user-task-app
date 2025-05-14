import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from '@/components/TaskItem';
import { UserTask } from '@/types/userTask.types';

describe('TaskItem Component', () => {
  const mockTask: UserTask = {
    userId: 1,
    id: 1,
    title: 'Test Task',
    completed: false
  };

  const mockOnToggle = jest.fn();

  it('renders task information correctly', () => {
    render(<TaskItem task={mockTask} onToggle={mockOnToggle} />);
    
    expect(screen.getByText(mockTask.title)).toBeInTheDocument();
  });

  it('calls onToggle when checkbox is clicked', () => {
    render(<TaskItem task={mockTask} onToggle={mockOnToggle} />);
    
    fireEvent.click(screen.getByRole('checkbox'));
    expect(mockOnToggle).toHaveBeenCalledWith(mockTask.id);
  });
});