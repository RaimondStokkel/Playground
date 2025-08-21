import { describe, expect, it } from 'vitest';
import * as Client from '@microsoft/agents-copilotstudio-client';

describe('getTokenAudience', () => {
  it('is invoked with metadata', () => {
    const aud = Client.getTokenAudience({} as any);
    expect(aud).toContain('https://');
  });
});
