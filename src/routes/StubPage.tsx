export default function StubPage({ title }: { title: string }) {
  return (
    <div className="bg-white rounded-xl shadow-card p-6">
      <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
      <p className="text-slate-600 mt-2">Deze pagina is een klikbare placeholder.</p>
    </div>
  );
}
