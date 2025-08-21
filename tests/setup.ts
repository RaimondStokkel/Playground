import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock heavy chat dependencies to keep tests light
vi.mock('botframework-webchat', () => ({
	createStore: () => ({
		dispatch: () => undefined
	}),
	renderWebChat: () => undefined
}));

vi.mock('@microsoft/agents-copilotstudio-client', () => ({
	CopilotStudioClient: class {},
	CopilotStudioWebChat: { createConnection: () => ({ connectionStatus$: { subscribe: () => undefined } }) },
	getTokenAudience: () => 'https://example'
}));

// Controllable mock for MSAL React
const authState = { isAuthenticated: true };
vi.mock('@azure/msal-react', () => ({
	MsalProvider: ({ children }: any) => children,
	AuthenticatedTemplate: ({ children }: any) => (authState.isAuthenticated ? children : null),
	UnauthenticatedTemplate: ({ children }: any) => (!authState.isAuthenticated ? children : null),
	useIsAuthenticated: () => authState.isAuthenticated,
	useMsal: () => ({
		instance: {
			acquireTokenSilent: vi.fn().mockResolvedValue({ accessToken: 'fake' }),
			acquireTokenRedirect: vi.fn().mockResolvedValue({}),
			loginRedirect: vi.fn()
		},
		accounts: authState.isAuthenticated ? [{}] : []
	}),
	__setIsAuthenticated: (v: boolean) => (authState.isAuthenticated = v)
}));

// Helper to change auth in tests
// @ts-expect-error - augment global for tests
globalThis.__setIsAuthenticated = (v: boolean) => {
	authState.isAuthenticated = v;
};

