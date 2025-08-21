import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { withMsal } from '../test-utils';

test('renders dashboard heading', () => {
  render(withMsal(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  ));
  // Heading renders for authenticated users
  expect(screen.getByText(/Dag Jeanine, hoe kan ik je helpen/i)).toBeInTheDocument();
});
