import { render, screen } from '@testing-library/react';
import App from './App';

test('renders weiji landing page', () => {
  render(<App />);
  const nameElement = screen.getByText(/危机/i);
  expect(nameElement).toBeInTheDocument();
});

