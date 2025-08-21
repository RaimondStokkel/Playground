/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COPILOT_BOT_ID?: string;
  readonly VITE_COPILOT_TENANT_ID?: string;
  readonly VITE_COPILOT_DIRECT_URL?: string;
  readonly VITE_COPILOT_ENV_ID?: string;
  readonly VITE_COPILOT_SCHEMA?: string;
  readonly VITE_ENTRA_CLIENT_ID?: string;
  readonly VITE_ENTRA_AUTHORITY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
