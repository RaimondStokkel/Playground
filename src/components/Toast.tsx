import { useEffect, useState } from 'react';

export function Toast({ message }: { message: string }) {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const id = setTimeout(() => setShow(false), 4000);
    return () => clearTimeout(id);
  }, []);
  if (!show) return null;
  return (
    <div role="status" aria-live="polite" className="fixed bottom-4 right-4 bg-slate-800 text-white px-4 py-2 rounded-md shadow-lg">
      {message}
    </div>
  );
}
