import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

test('opens the admin LMS and adds a course that remains available in course management', () => {
  renderApp();

  fireEvent.click(screen.getByRole('tab', { name: 'Direktor / Admin' }));
  fireEvent.change(screen.getByLabelText('Direktor kodi'), { target: { value: 'ITTAT2025' } });
  fireEvent.change(screen.getByLabelText('Kodni qayta kiriting'), { target: { value: 'ITTAT2025' } });
  fireEvent.click(screen.getByRole('button', { name: 'Direktor sifatida kirish' }));
  fireEvent.click(screen.getByRole('button', { name: 'Kurslarni boshqarish' }));
  fireEvent.click(screen.getByRole('button', { name: /Kurs qo‘shish/i }));

  fireEvent.change(screen.getByLabelText('Kurs nomi'), { target: { value: 'Node.js asoslari' } });
  fireEvent.change(screen.getByLabelText('O‘qituvchi'), { target: { value: 'Ali Valiyev' } });
  fireEvent.click(screen.getByRole('button', { name: 'Saqlash' }));

  expect(screen.getByRole('heading', { name: 'Node.js asoslari' })).toBeInTheDocument();
  expect(JSON.parse(localStorage.getItem('ittat-platform-courses'))).toEqual(
    expect.arrayContaining([expect.objectContaining({ title: 'Node.js asoslari', teacher: 'Ali Valiyev' })])
  );
});

test('changes dashboard language and theme without leaving the current session', () => {
  renderApp();
  fireEvent.change(screen.getByLabelText(/Telefon raqami/i), { target: { value: '901234567' } });
  fireEvent.click(screen.getByRole('button', { name: 'Kirish' }));
  const generatedCode = screen.getByText(/Demo tasdiqlash kodi:/i).textContent.match(/\d{6}/)[0];
  fireEvent.change(screen.getByLabelText('Kodni qayta kiriting'), { target: { value: generatedCode } });
  fireEvent.click(screen.getByRole('button', { name: 'Kirish' }));

  fireEvent.change(screen.getByLabelText('Til'), { target: { value: 'en' } });
  expect(screen.getByRole('button', { name: 'Dashboard' })).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('Select theme'), { target: { value: 'dark' } });
  expect(document.querySelector('.lms-app')).toHaveClass('theme-dark');
  expect(localStorage.getItem('ittat-platform-language')).toBe('en');
  expect(localStorage.getItem('ittat-platform-theme')).toBe('dark');
});

test('student test answers are checked and the result persists', () => {
  renderApp();
  fireEvent.change(screen.getByLabelText(/Telefon raqami/i), { target: { value: '901234567' } });
  fireEvent.click(screen.getByRole('button', { name: 'Kirish' }));
  const code = screen.getByText(/Demo tasdiqlash kodi:/i).textContent.match(/\d{6}/)[0];
  fireEvent.change(screen.getByLabelText('Kodni qayta kiriting'), { target: { value: code } });
  fireEvent.click(screen.getByRole('button', { name: 'Kirish' }));
  fireEvent.click(screen.getByRole('button', { name: 'Testlar va imtihonlar' }));
  fireEvent.click(screen.getAllByRole('button', { name: 'Testni boshlash' })[0]);
  fireEvent.click(screen.getByLabelText('<!DOCTYPE html> va <html>'));
  fireEvent.click(screen.getByLabelText('<h1>'));
  fireEvent.click(screen.getByLabelText('color'));
  fireEvent.click(screen.getByLabelText('const'));
  fireEvent.click(screen.getByLabelText('UI elementlarini'));
  fireEvent.click(screen.getByRole('button', { name: /Javobni tekshirish/i }));

  expect(screen.getByText(/Jarayon: 100%/)).toBeInTheDocument();
  expect(JSON.parse(localStorage.getItem('ittat-workspace-tests-result')).passed).toBe(true);
});

test('students can upload and retrieve an assignment file from browser storage', async () => {
  renderApp();
  fireEvent.change(screen.getByLabelText(/Telefon raqami/i), { target: { value: '901234567' } });
  fireEvent.click(screen.getByRole('button', { name: 'Kirish' }));
  const code = screen.getByText(/Demo tasdiqlash kodi:/i).textContent.match(/\d{6}/)[0];
  fireEvent.change(screen.getByLabelText('Kodni qayta kiriting'), { target: { value: code } });
  fireEvent.click(screen.getByRole('button', { name: 'Kirish' }));
  fireEvent.click(screen.getByRole('button', { name: 'Topshiriqlar' }));
  fireEvent.click(screen.getAllByRole('button', { name: 'Topshiriq topshirish' })[0]);
  const assignment = new File(['my assignment'], 'portfolio.txt', { type: 'text/plain' });
  fireEvent.change(screen.getByLabelText(/Faylni tanlang/i), { target: { files: [assignment] } });
  fireEvent.click(screen.getByRole('button', { name: /Yuborish/i }));

  await waitFor(() => expect(screen.getByText(/portfolio.txt/)).toBeInTheDocument());
  expect(JSON.parse(localStorage.getItem('ittat-workspace-assignments-submissions'))[0].data).toContain('data:text/plain');
});

test('admin can create persistent student records from the students page', () => {
  renderApp();
  fireEvent.click(screen.getByRole('tab', { name: 'Direktor / Admin' }));
  fireEvent.change(screen.getByLabelText('Direktor kodi'), { target: { value: 'ITTAT2025' } });
  fireEvent.change(screen.getByLabelText('Kodni qayta kiriting'), { target: { value: 'ITTAT2025' } });
  fireEvent.click(screen.getByRole('button', { name: 'Direktor sifatida kirish' }));
  fireEvent.click(screen.getByRole('button', { name: 'O‘quvchilar' }));
  fireEvent.click(screen.getByRole('button', { name: 'Yangi qo‘shish' }));
  fireEvent.change(screen.getByLabelText('Ism familiya'), { target: { value: 'Test Student' } });
  fireEvent.change(screen.getByLabelText('Telefon raqami'), { target: { value: '+998 90 123 45 67' } });
  fireEvent.change(screen.getByLabelText('Biriktirilgan kurs'), { target: { value: 'Frontend' } });
  fireEvent.click(screen.getByRole('button', { name: 'Saqlash' }));

  expect(screen.getByText('Test Student')).toBeInTheDocument();
  expect(JSON.parse(localStorage.getItem('ittat-workspace-students'))).toEqual(
    expect.arrayContaining([expect.objectContaining({ name: 'Test Student' })])
  );
});

test('completing a course lesson updates the matching course progress', () => {
  renderApp();
  fireEvent.change(screen.getByLabelText(/Telefon raqami/i), { target: { value: '901234567' } });
  fireEvent.click(screen.getByRole('button', { name: 'Kirish' }));
  const code = screen.getByText(/Demo tasdiqlash kodi:/i).textContent.match(/\d{6}/)[0];
  fireEvent.change(screen.getByLabelText('Kodni qayta kiriting'), { target: { value: code } });
  fireEvent.click(screen.getByRole('button', { name: 'Kirish' }));
  fireEvent.click(screen.getByRole('button', { name: 'Video darslar' }));
  fireEvent.click(screen.getAllByRole('button', { name: 'Darsni tugatish' })[0]);

  const updatedProgress = JSON.parse(localStorage.getItem('ittat-platform-progress-901234567'));
  expect(updatedProgress[1]).toBeGreaterThan(68);
  expect(screen.getByRole('button', { name: 'Tugallangan' })).toBeDisabled();
});

test('admin course assignment updates the student list and survives refresh', () => {
  renderApp();
  fireEvent.click(screen.getByRole('tab', { name: 'Direktor / Admin' }));
  fireEvent.change(screen.getByLabelText('Direktor kodi'), { target: { value: 'ITTAT2025' } });
  fireEvent.change(screen.getByLabelText('Kodni qayta kiriting'), { target: { value: 'ITTAT2025' } });
  fireEvent.click(screen.getByRole('button', { name: 'Direktor sifatida kirish' }));
  fireEvent.click(screen.getByRole('button', { name: 'O‘quvchilar' }));
  fireEvent.click(screen.getAllByRole('button', { name: 'Kurs biriktirish' })[0]);
  fireEvent.change(screen.getByLabelText('Kursni tanlang'), { target: { value: '8' } });
  fireEvent.click(screen.getByRole('button', { name: 'Saqlash' }));

  expect(JSON.parse(localStorage.getItem('ittat-workspace-students'))[0]).toEqual(
    expect.objectContaining({ detail: 'JavaScript va React', courseId: 8 })
  );
  expect(JSON.parse(localStorage.getItem('ittat-platform-enrollment-901234567'))).toContain(8);

  fireEvent.click(screen.getByRole('button', { name: 'Orqaga' }));
  fireEvent.change(screen.getByLabelText(/Telefon raqami/i), { target: { value: '901234567' } });
  fireEvent.click(screen.getByRole('button', { name: 'Kirish' }));
  const userCode = screen.getByText(/Demo tasdiqlash kodi:/i).textContent.match(/\d{6}/)[0];
  fireEvent.change(screen.getByLabelText('Kodni qayta kiriting'), { target: { value: userCode } });
  fireEvent.click(screen.getByRole('button', { name: 'Kirish' }));
  fireEvent.click(screen.getByRole('button', { name: 'Mening kurslarim' }));
  expect(screen.getByRole('heading', { name: 'JavaScript va React' })).toBeInTheDocument();
});
