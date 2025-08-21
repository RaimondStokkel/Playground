import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useState, type ReactNode } from 'react';
// MSAL hooks are used in child components
import { Bot, MessageSquareText, Mic, Plus, LayoutDashboard, AppWindow, CalendarDays } from 'lucide-react';
import ChatPanel from './components/ChatPanel';
import { AuthGuard } from './components/auth/AuthGuard';
import { SignInButton } from './components/auth/SignInButton';
import StubPage from './routes/StubPage';

function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const links = [
    { to: '/', label: 'Zig365 Copilot', icon: <LayoutDashboard size={20} /> },
    { to: '/copilot', label: 'Copilot chat', icon: <MessageSquareText size={20} /> },
    { to: '/agents', label: 'Agents', icon: <Bot size={20} /> },
    { to: '/apps', label: 'Mijn apps', icon: <AppWindow size={20} /> },
    { to: '/taken', label: 'Taken', icon: <CalendarDays size={20} /> }
  ];
  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr] bg-[#f6f8fb]">
      <aside className="bg-white border-r">
        <div className="p-6 flex items-center gap-2 text-brand-700">
          <img src="/zig365-logo.svg" alt="Zig365" className="h-8" />
        </div>
        <nav aria-label="Hoofd navigatie" className="px-3">
          <ul className="space-y-1">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  aria-current={location.pathname === l.to ? 'page' : undefined}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 focus-ring hover:bg-slate-50 ${
                    location.pathname === l.to ? 'bg-slate-100 text-brand-700' : 'text-slate-700'
                  }`}
                >
                  {l.icon}
                  <span className="text-sm">{l.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-3 pt-6">
          <SignInButton />
        </div>
      </aside>
      <main className="p-6">
        {children}
      </main>
    </div>
  );
}

function Dashboard() {
  const [query, setQuery] = useState('');
  const tile = (title: string, subtitle: string, _to: string) => (
    <button onClick={() => void 0} className="text-left bg-white rounded-xl shadow-card p-4 hover:shadow-md focus-ring">
      <div className="font-medium text-slate-800">{title}</div>
      <div className="text-sm text-slate-500 mt-1">{subtitle}</div>
    </button>
  );
  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-800">Dag Jeanine, hoe kan ik je helpen?</h1>
      </header>
      <section>
        <div className="bg-white rounded-2xl shadow-card p-4">
          <label htmlFor="ask" className="sr-only">Copilot een vraag stellen</label>
          <div className="flex items-center gap-3">
            <button aria-label="Meer" className="p-2 rounded-md hover:bg-slate-100 focus-ring"><Plus /></button>
            <input id="ask" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Copilot een vraag stellen" className="flex-1 outline-none placeholder:text-slate-400" />
            <button aria-label="Microfoon" className="p-2 rounded-md hover:bg-slate-100 focus-ring"><Mic /></button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {tile('Wat is er nieuw?', 'Geef een samenvatting van recent gewijzigde kenn…', '/nieuw')}
          {tile('Inzichten', 'Geef een samenvatting van het werk van mijn team…', '/inzichten')}
          {tile('Mijn dag', '3 afspraken gepland voor vandaag…', '/mijndag')}
        </div>
      </section>
      <section>
        <h2 className="text-slate-700 text-sm font-medium mb-3">Of begin met één van je taken</h2>
        <div className="grid grid-cols-3 gap-4">
          {tile('3 advertenties aanvullen', 'Vul de laatste info aan om te kunnen publiceren', '/taken/advertenties')}
          {tile('6 klantvragen', 'Lorem ipsum', '/taken/klantvragen')}
          {tile('3 documenten controleren', 'Lorem ipsum', '/taken/documenten')}
        </div>
      </section>
    </div>
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          }
        />
        <Route
          path="/agents"
          element={
            <AuthGuard>
              <StubPage title="Agents" />
            </AuthGuard>
          }
        />
        <Route
          path="/conversations"
          element={
            <AuthGuard>
              <StubPage title="Gesprekken" />
            </AuthGuard>
          }
        />
        <Route
          path="/copilot"
          element={
            <AuthGuard>
              <ChatPanel />
            </AuthGuard>
          }
        />
        <Route path="/apps/*" element={<AuthGuard><StubPage title="Apps" /></AuthGuard>} />
        <Route path="/cards/*" element={<AuthGuard><StubPage title="Cards" /></AuthGuard>} />
        <Route path="/taken/*" element={<AuthGuard><StubPage title="Taken" /></AuthGuard>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
