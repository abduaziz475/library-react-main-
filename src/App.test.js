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
  expect(screen.queryByText(/Google|GitHub|Royxatdan otish/i)).not.toBeInTheDocument();
});

test('sends an SMS code and signs in after the code is verified', async () => {
  global.fetch
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Tasdiqlash kodi SMS orqali yuborildi.' }),
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'signed-token', user: { role: 'user', phone: '998901234567' } }),
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: { role: 'user', phone: '998901234567' } }),
    });

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText(/Telefon raqam/i), { target: { value: '+998 90 123 45 67' } });
  fireEvent.click(screen.getByRole('button', { name: /SMS kod yuborish/i }));
  expect(await screen.findByLabelText(/SMS kod/i)).toBeInTheDocument();
  expect(global.fetch.mock.calls[0][0]).toBe('/api/auth/request-code');

  fireEvent.change(screen.getByLabelText(/SMS kod/i), { target: { value: '123456' } });
  fireEvent.click(screen.getByRole('button', { name: /Kodni tasdiqlash/i }));
  expect(await screen.findByText('Foydalanuvchi', { selector: '.user-pill' })).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledTimes(3);
});

test('sends the separate director code to the authentication API', async () => {
  global.fetch
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'director-token', user: { role: 'director' } }),
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: { role: 'director' } }),
    });

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByRole('tab', { name: 'Direktor' }));
  fireEvent.change(screen.getByLabelText(/Direktor kodi/i), { target: { value: 'ITTAT2025' } });
  fireEvent.click(screen.getByRole('button', { name: 'Kirish' }));

  expect(await screen.findByText('Direktor', { selector: '.user-pill' })).toBeInTheDocument();
  expect(global.fetch.mock.calls[0][0]).toBe('/api/auth/director');
});
