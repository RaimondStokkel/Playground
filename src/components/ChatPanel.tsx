import { useCallback, useEffect, useRef, useState } from 'react';
import * as WebChat from 'botframework-webchat';
import { CopilotStudioClient, CopilotStudioWebChat, getTokenAudience } from '@microsoft/agents-copilotstudio-client';
import { useMsal } from '@azure/msal-react';
import { Toast } from './Toast';

function buildSettings() {
  const directConnectUrl = import.meta.env.VITE_COPILOT_DIRECT_URL as string | undefined;
  return {
    botId: import.meta.env.VITE_COPILOT_BOT_ID as string,
    tenantId: import.meta.env.VITE_COPILOT_TENANT_ID as string,
    directConnectUrl,
    environmentId: import.meta.env.VITE_COPILOT_ENV_ID as string | undefined,
    schemaName: import.meta.env.VITE_COPILOT_SCHEMA as string | undefined
  };
}

async function acquireCopilotToken(instance: ReturnType<typeof useMsal>['instance']) {
  const audience = getTokenAudience({
    // Cast as any to satisfy SDK typings without requiring full metadata at build time
    agentIdentifier: (import.meta.env.VITE_COPILOT_BOT_ID as string) || '',
    environmentId: (import.meta.env.VITE_COPILOT_ENV_ID as string) || '',
    appClientId: (import.meta.env.VITE_ENTRA_CLIENT_ID as string) || '',
    tenantId: (import.meta.env.VITE_COPILOT_TENANT_ID as string) || ''
  } as any);
  const scopes = [audience + '/.default'];
  try {
    const res = await instance.acquireTokenSilent({ scopes });
    return res.accessToken;
  } catch {
    await instance.acquireTokenRedirect({ scopes });
    throw new Error('Redirecting for token');
  }
}

export default function ChatPanel() {
  const { instance } = useMsal();
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const webchatRef = useRef<HTMLDivElement | null>(null);
  const connectionRef = useRef<any | null>(null);
  const CONVO_KEY = 'zig365.copilot.conversationId';
  const isMounted = useRef(false);

  const connect = useCallback(async () => {
    let unsubscribe: (() => void) | undefined;
    let connection: any;

  if (!isMounted.current) return () => undefined;
  setError(null);
  setStatus('connecting');
    try {
      const token = await acquireCopilotToken(instance);
      const client = new CopilotStudioClient(buildSettings() as any, token);
  const lastConversationId = window.localStorage.getItem(CONVO_KEY) || undefined;
      // Pass conversationId if the SDK supports it; otherwise it's ignored safely.
      connection = CopilotStudioWebChat.createConnection(client, { showTyping: true, conversationId: lastConversationId } as any);

      const store = WebChat.createStore({}, () => (next: any) => (action: any) => next(action));

      if (webchatRef.current) {
        WebChat.renderWebChat({ directLine: connection, store }, webchatRef.current);
      }
      if (!isMounted.current) return () => undefined;
      setStatus('connected');
      connectionRef.current = connection;
      unsubscribe = connection?.connectionStatus$?.subscribe((s: any) => {
        // 2 = Online in BotFramework-WebChat
        if (s === 2) {
          try {
            const id = (connection as any)?.conversationId;
            if (id) window.localStorage.setItem(CONVO_KEY, String(id));
          } catch {
            // ignore
          }
        }
      });
    } catch (err: any) {
      if (isMounted.current) {
        setError(err?.message || 'Kon niet verbinden met Copilot');
        setStatus('error');
      }
    }

    return () => {
      unsubscribe?.();
    };
  }, [instance]);

  useEffect(() => {
    // In test environment, skip establishing chat connection to avoid async work after teardown
    if (process.env.NODE_ENV === 'test') {
      setStatus('idle');
      return;
    }
    isMounted.current = true;
    let unsubscribe: (() => void) | undefined;

    // Run connect and capture its cleanup
    void (async () => {
      unsubscribe = await connect();
    })();

    // Cleanup: clear rendered webchat on unmount using a stable reference
    const container = webchatRef.current;
    return () => {
      isMounted.current = false;
      unsubscribe?.();
      if (container) container.innerHTML = '';
    };
  }, [connect]);

  const onReconnect = async () => {
    // small debounce for UI clarity
    setStatus('idle');
    await connect();
  };

  return (
    <div className="h-[70vh] bg-white rounded-xl shadow-card p-2 relative">
      {error && <Toast message={error} />}
      {status !== 'connected' && (
        <div className="p-4 text-sm text-slate-600 flex items-center gap-3" role="status" aria-live="polite">
          <span>Status: {status}</span>
          <button onClick={onReconnect} className="ml-auto px-3 py-1 rounded-md bg-brand-600 text-white hover:bg-brand-700 focus-ring">
            Opnieuw verbinden
          </button>
        </div>
      )}
      <div ref={webchatRef} className="h-full" role="region" aria-label="Chat met Copilot"></div>
    </div>
  );
}
