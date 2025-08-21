import { PropsWithChildren } from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { SignInButton } from './SignInButton';

export function AuthGuard({ children }: PropsWithChildren) {
  return (
    <>
      <AuthenticatedTemplate>{children}</AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <div className="max-w-lg mx-auto mt-20 bg-white p-8 rounded-xl shadow-card text-center">
          <h2 className="text-xl font-semibold text-slate-800">Aanmelden vereist</h2>
          <p className="text-slate-600 mt-2">Meld je aan met je Microsoft-account om Zig365 Copilot te gebruiken.</p>
          <div className="mt-6 flex justify-center"><SignInButton /></div>
        </div>
      </UnauthenticatedTemplate>
    </>
  );
}
