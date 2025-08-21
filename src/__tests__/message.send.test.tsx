import { fireEvent, render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';
import { withMsal } from '../test-utils';

test('message composer exists and accepts typing', () => {
  // @ts-ignore test helper
  globalThis.__setIsAuthenticated(true);
  render(withMsal(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  ));
  const input = screen.getByPlaceholderText(/Copilot een vraag stellen/i) as HTMLInputElement;
  fireEvent.change(input, { target: { value: 'Hallo!' } });
  expect(input.value).toBe('Hallo!');
});
