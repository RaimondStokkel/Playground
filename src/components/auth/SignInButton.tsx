import { useMsal } from '@azure/msal-react';

export function SignInButton() {
  const { instance } = useMsal();
  return (
    <button
      className="px-4 py-2 rounded-md bg-brand-600 text-white hover:bg-brand-700 focus-ring"
      onClick={() => instance.loginRedirect()}
    >
      Aanmelden met Microsoft
    </button>
  );
}
