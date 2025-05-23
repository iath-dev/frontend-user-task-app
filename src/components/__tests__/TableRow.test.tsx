import React from 'react';
import { mockUsers } from '@/tests/mock/user';
import { TableRow } from '../TableRow';
import { fireEvent, render, screen } from '@testing-library/react';

const pushMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe('TableRow component', () => {
  it('renders the user data in the table row', () => {
    const user = mockUsers[0];
    render(
      <table>
        <tbody>
          <TableRow user={user} />
        </tbody>
      </table>
    );

    expect(screen.getByText(user.name)).toBeInTheDocument();
  });

  it('trigger view task button', () => {
    const user = mockUsers[0];
    render(
      <table>
        <tbody>
          <TableRow user={user} />
        </tbody>
      </table>
    );
    const viewTaskButton = screen.getByTestId('view-task');
    fireEvent.click(viewTaskButton);

    expect(pushMock).toHaveBeenCalled();
  });
});
