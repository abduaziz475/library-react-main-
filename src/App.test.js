import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

beforeEach(() => {
  localStorage.clear();
  global.fetch = jest.fn();
});

test('renders user phone verification and separate director sign-in', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { name: 'Xush kelibsiz' })).toBeInTheDocument();
  expect(screen.getByLabelText(/Telefon raqam/i)).toHaveValue('');
  expect(screen.getByRole('tab', { name: 'Foydalanuvchi' })).toHaveAttribute('aria-selected', 'true');
  expect(screen.getByRole('status')).toHaveTextContent(/Telefon raqamingiz xato emas/i);
  expect(screen.getByRole('button', { name: /SMS kod yuborish/i })).toBeDisabled();
  expect(screen.queryByText(/Google|GitHub|Royxatdan otish/i)).not.toBeInTheDocument();
});

test('does not attempt authentication when the server URL is missing', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText(/Telefon raqam/i), { target: { value: '+998 90 123 45 67' } });
  expect(screen.getByRole('button', { name: /SMS kod yuborish/i })).toBeDisabled();
  expect(global.fetch).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('tab', { name: 'Direktor' }));
  expect(screen.getByRole('button', { name: 'Kirish' })).toBeDisabled();
});
