# Zig365 Copilot (React + Vite)

A pixel-close, accessible prototype of the Zig365 Copilot dashboard with MSAL sign-in and Copilot Studio chat via Microsoft 365 Agents SDK + Bot Framework Web Chat. Ready for Azure Static Web Apps.

## Tech Stack
- React + TypeScript + Vite
- Tailwind CSS, lucide-react icons
- React Router
- Auth: MSAL React (@azure/msal-react, @azure/msal-browser)
- Chat: @microsoft/agents-copilotstudio-client + botframework-webchat
- Lint/format: ESLint + Prettier
- Tests: Vitest + React Testing Library

## Getting Started
1. Install dependencies
```powershell
npm install
```
2. Set env vars. Create `.env` with:
```
VITE_COPILOT_BOT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
VITE_COPILOT_TENANT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
# Either a connection string direct URL or metadata
VITE_COPILOT_DIRECT_URL=https://.../directline/...
VITE_COPILOT_ENV_ID=...
VITE_COPILOT_SCHEMA=...
VITE_ENTRA_CLIENT_ID=your-spa-client-id
VITE_ENTRA_AUTHORITY=https://login.microsoftonline.com/your-tenant-id
```
3. Run
```powershell
npm run dev
```

## Copilot Studio and Entra Setup (one-time)
- In Copilot Studio:
  - Settings → Security → Authentication: choose Authenticate with Microsoft or Authenticate manually.
  - Channels → Web app → copy the Microsoft 365 Agents SDK connection string. Use the Direct Connect URL or the metadata (environmentId/schema) in env vars.
- In Microsoft Entra ID (App registration):
  - Add API permissions → APIs my organization uses → Power Platform API → Delegated → Copilot Studio.Copilots.Invoke. Grant admin consent.
  - Configure SPA redirect URIs for http://localhost:5173 and your production hostname.
- Token acquisition:
  - The client computes the audience using `getTokenAudience()` with your tenant ID and requests `scopes: [audience + '/.default']` via MSAL.

## Azure Static Web Apps
- This repo contains `.github/workflows/azure-static-web-apps.yml` and `staticwebapp.config.json`.
- Create a SWA in Azure, then add the deployment token as a GitHub secret named `AZURE_STATIC_WEB_APPS_API_TOKEN`.
- The workflow builds the app with `npm ci && npm run build` and deploys `dist`.

## Accessibility
- Semantic landmarks and aria-current for active nav.
- Focus-visible rings and color contrast ≥ 4.5:1.

## Tests
Run unit tests:
```powershell
npm test
```
Covers: routing, auth guard, token helper, chat connection, message send, keyboard nav.

## Notes
- ChatPanel connects using the Agents SDK client and renders Web Chat with typing indicators.
- On token failures it redirects to login and shows a friendly message.

## References
- Copilot Studio + Agents SDK: https://learn.microsoft.com/en-us/microsoft-copilot-studio/publication-integrate-web-or-native-app-m365-agents-sdk
- Agents client package: https://learn.microsoft.com/en-us/javascript/api/%40microsoft/agents-copilotstudio-client/
- MSAL React SPA: https://learn.microsoft.com/en-us/samples/azure-samples/ms-identity-ciam-javascript-tutorial/ms-identity-ciam-javascript-tutorial-1-sign-in-react/
