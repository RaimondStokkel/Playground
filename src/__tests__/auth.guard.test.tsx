import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import { AuthGuard } from '../components/auth/AuthGuard';
import { withMsal } from '../test-utils';

test('renders sign-in prompt when unauthenticated (template rendered)', () => {
  // @ts-ignore test helper
  globalThis.__setIsAuthenticated(false);
  render(withMsal(<AuthGuard><div>Private</div></AuthGuard>));
  expect(screen.getByText(/Aanmelden vereist/i)).toBeInTheDocument();
});
