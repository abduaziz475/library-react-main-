import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders the sign-in form', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/Shirin Tabaka/i)).toBeInTheDocument();
  expect(screen.getByText(/Elektron pochta/i)).toBeInTheDocument();
  expect(screen.getByText(/Parol/i)).toBeInTheDocument();
});
