import { render } from '@testing-library/react';
import { test, expect } from 'vitest';
import ChatPanel from '../components/ChatPanel';
import { withMsal } from '../test-utils';

test('chat panel renders container', () => {
  const { container } = render(withMsal(<ChatPanel />));
  expect(container.querySelector('[aria-label="Chat met Copilot"]')).toBeTruthy();
});
