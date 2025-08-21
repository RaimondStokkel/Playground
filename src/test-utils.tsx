import { ReactNode } from 'react';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';

export function withMsal(children: ReactNode) {
  const pca = new PublicClientApplication({ auth: { clientId: 'test', authority: 'https://login.microsoftonline.com/common', redirectUri: 'http://localhost' } });
  return <MsalProvider instance={pca}>{children}</MsalProvider>;
}
