import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

beforeEach(() => {
  localStorage.clear();
});

test('renders the sign-in form', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/Shirin Tabaka/i)).toBeInTheDocument();
  expect(screen.getByText(/Elektron pochta/i)).toBeInTheDocument();
  expect(screen.getByText(/Parol/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Parol/i)).toHaveAttribute('type', 'password');
  expect(screen.getByLabelText(/Parol/i)).toHaveValue('');
  expect(screen.queryByRole('button', { name: /show password/i })).not.toBeInTheDocument();
});

test('signs in an administrator with the administrator credentials', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByRole('button', { name: 'Administrator' }));
  fireEvent.change(screen.getByLabelText(/Parol/i), { target: { value: '987654321' } });
  fireEvent.click(screen.getByRole('button', { name: 'tizimga kirish' }));

  expect(screen.getByText('Admin')).toBeInTheDocument();
});

test('signs in a user with the existing user credentials', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText(/Parol/i), { target: { value: '123456789' } });
  fireEvent.click(screen.getByRole('button', { name: 'tizimga kirish' }));

  expect(screen.getByText('User')).toBeInTheDocument();
});
