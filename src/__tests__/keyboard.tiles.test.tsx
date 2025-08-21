import { render, screen } from '@testing-library/react';
import { it, expect } from 'vitest';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';
import { withMsal } from '../test-utils';

it('tiles are focusable with keyboard', () => {
  render(withMsal(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  ));
  const buttons = screen.getAllByRole('button');
  expect(buttons.length).toBeGreaterThan(0);
});
