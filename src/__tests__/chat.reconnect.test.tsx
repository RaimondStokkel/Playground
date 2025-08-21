import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import ChatPanel from '../components/ChatPanel';
import { withMsal } from '../test-utils';

test('shows status before connect', () => {
  render(withMsal(<ChatPanel />));
  expect(screen.getByText(/Status:/)).toBeInTheDocument();
});
