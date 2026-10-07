import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

const renderApp = () => render(<App />);

beforeEach(() => {
  localStorage.clear();
});

test('renders the IT TAT login with a fixed Uzbekistan prefix and remember checkbox', () => {
  renderApp();

  expect(screen.getByRole('img', { name: /IT TAT/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Xush kelibsiz' })).toBeInTheDocument();
  expect(screen.getByText('Platformaga kirish uchun ma’lumotlaringizni kiriting.')).toBeInTheDocument();
  expect(screen.getByLabelText(/Telefon raqami/i)).toHaveAttribute('aria-required', 'true');
  expect(screen.getByText('+998')).toBeInTheDocument();
  expect(screen.getByLabelText(/Meni eslab qol/i)).not.toBeChecked();
  expect(screen.queryByText(/Google|GitHub|Ro‘yxatdan o‘tish/i)).not.toBeInTheDocument();
});

test('generates a demo code and requires matching confirmation before login', () => {
  renderApp();

  fireEvent.change(screen.getByLabelText(/Telefon raqami/i), { target: { value: '901234567' } });
  fireEvent.click(screen.getByRole('button', { name: 'Kirish' }));
  const generatedCode = screen.getByText(/Demo tasdiqlash kodi:/i).textContent.match(/\d{6}/)[0];
  expect(JSON.parse(localStorage.getItem('ittat-demo-login')).generatedCode).toBe(generatedCode);

  fireEvent.change(screen.getByLabelText('Tasdiqlash kodi'), { target: { value: '111111' } });
  fireEvent.change(screen.getByLabelText('Kodni qayta kiriting'), { target: { value: '111111' } });
  fireEvent.click(screen.getByRole('button', { name: 'Kirish' }));
  expect(screen.getByRole('alert')).toHaveTextContent('Tasdiqlash kodi noto‘g‘ri');

  fireEvent.change(screen.getByLabelText('Tasdiqlash kodi'), { target: { value: generatedCode } });
  fireEvent.change(screen.getByLabelText('Kodni qayta kiriting'), { target: { value: '222222' } });
  fireEvent.click(screen.getByRole('button', { name: 'Kirish' }));
  expect(screen.getByRole('alert')).toHaveTextContent('Kodlar bir xil emas');

  fireEvent.change(screen.getByLabelText('Kodni qayta kiriting'), { target: { value: generatedCode } });
  fireEvent.click(screen.getByRole('button', { name: 'Kirish' }));
  expect(screen.getByRole('heading', { name: 'Xush kelibsiz!' })).toBeInTheDocument();
  expect(screen.getByText('IT TAT platformasiga muvaffaqiyatli kirdingiz.')).toBeInTheDocument();
});

test('remembers a successful login across reload and returns to login', () => {
  const { unmount } = renderApp();

  fireEvent.change(screen.getByLabelText(/Telefon raqami/i), { target: { value: '901234567' } });
  fireEvent.click(screen.getByRole('button', { name: 'Kirish' }));
  const generatedCode = screen.getByText(/Demo tasdiqlash kodi:/i).textContent.match(/\d{6}/)[0];
  fireEvent.click(screen.getByLabelText(/Meni eslab qol/i));
  fireEvent.change(screen.getByLabelText('Kodni qayta kiriting'), { target: { value: generatedCode } });
  fireEvent.click(screen.getByRole('button', { name: 'Kirish' }));
  expect(JSON.parse(localStorage.getItem('ittat-remembered-session')).remember).toBe(true);

  unmount();
  renderApp();
  expect(screen.getByRole('heading', { name: 'Xush kelibsiz!' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /Orqaga/i }));
  expect(screen.getByRole('heading', { name: 'Xush kelibsiz' })).toBeInTheDocument();
  expect(localStorage.getItem('ittat-remembered-session')).toBeNull();
});

test('requires the exact director code twice', () => {
  renderApp();
  fireEvent.click(screen.getByRole('tab', { name: 'Direktor / Admin' }));
  fireEvent.change(screen.getByLabelText('Direktor kodi'), { target: { value: 'ITTAT2025' } });
  fireEvent.change(screen.getByLabelText('Kodni qayta kiriting'), { target: { value: 'WRONG' } });
  fireEvent.click(screen.getByRole('button', { name: 'Direktor sifatida kirish' }));
  expect(screen.getByRole('alert')).toHaveTextContent('Kodlar bir xil emas');

  fireEvent.change(screen.getByLabelText('Kodni qayta kiriting'), { target: { value: 'ITTAT2025' } });
  fireEvent.click(screen.getByRole('button', { name: 'Direktor sifatida kirish' }));
  expect(screen.getByText('Direktor / Admin', { selector: '.welcome-eyebrow' })).toBeInTheDocument();
});

test('persists an incomplete login across reload', () => {
  const { unmount } = renderApp();

  fireEvent.change(screen.getByLabelText(/Telefon raqami/i), { target: { value: '901234567' } });
  fireEvent.click(screen.getByRole('button', { name: 'Kirish' }));
  const generatedCode = screen.getByText(/Demo tasdiqlash kodi:/i).textContent.match(/\d{6}/)[0];
  unmount();

  renderApp();
  expect(screen.getByLabelText(/Tasdiqlash kodi/i)).toHaveValue(generatedCode);
  expect(screen.getByLabelText(/Kodni qayta kiriting/i)).toHaveValue('');
  expect(JSON.parse(localStorage.getItem('ittat-demo-login')).phone).toBe('901234567');
});

test('rejects incomplete or non-numeric phone numbers', () => {
  renderApp();

  fireEvent.change(screen.getByLabelText(/Telefon raqami/i), { target: { value: 'abc123' } });
  expect(screen.getByLabelText(/Telefon raqami/i)).toHaveValue('123');
  fireEvent.click(screen.getByRole('button', { name: 'Kirish' }));

  expect(screen.getByRole('alert')).toHaveTextContent('O‘zbekiston mobil raqamini kiriting');
  expect(screen.queryByText(/Demo tasdiqlash kodi:/i)).not.toBeInTheDocument();
});

test.each(['90', '97', '93', '91', '94', '95', '99', '77', '88', '50', '33', '20'])(
  'accepts Uzbekistan mobile prefix %s',
  (prefix) => {
    renderApp();
    fireEvent.change(screen.getByLabelText(/Telefon raqami/i), {
      target: { value: `${prefix}1234567` },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Kirish' }));

    expect(screen.getByText(/Demo tasdiqlash kodi:/i)).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  }
);

test('rejects a complete phone number with an unsupported prefix', () => {
  renderApp();
  fireEvent.change(screen.getByLabelText(/Telefon raqami/i), { target: { value: '121234567' } });
  fireEvent.click(screen.getByRole('button', { name: 'Kirish' }));

  expect(screen.getByRole('alert')).toHaveTextContent('O‘zbekiston mobil raqamini kiriting');
  expect(screen.queryByText(/Demo tasdiqlash kodi:/i)).not.toBeInTheDocument();
});

test('accepts a pasted international Uzbekistan phone number', () => {
  renderApp();
  fireEvent.change(screen.getByLabelText(/Telefon raqami/i), {
    target: { value: '+998 93 123 45 67' },
  });

  expect(screen.getByLabelText(/Telefon raqami/i)).toHaveValue('931234567');
  fireEvent.click(screen.getByRole('button', { name: 'Kirish' }));
  expect(screen.getByText(/Demo tasdiqlash kodi:/i)).toBeInTheDocument();
});
