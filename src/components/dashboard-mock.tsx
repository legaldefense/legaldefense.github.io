import { RadarIcon, FolderIcon, UsersIcon, SearchIcon } from "./icons";

/**
 * Mock estilizado do painel do app (puro CSS/SVG) — dá a sensação do produto
 * no hero sem depender de um screenshot real (que exigiria login).
 */
export function DashboardMock() {
  const kpis = [
    { label: "Procedimentos ativos", value: "128", trend: "+12" },
    { label: "Prazos esta semana", value: "9", trend: "3 hoje" },
    { label: "Clientes", value: "342", trend: "+8" },
  ];

  const rows = [
    { n: "2026.1.1/0001", cliente: "Maria Oliveira", status: "Em andamento", tone: "green" },
    { n: "2026.1.1/0002", cliente: "João Pereira", status: "Concluído", tone: "navy" },
    { n: "2026.1.1/0003", cliente: "Ana Souza", status: "Arquivado", tone: "muted" },
    { n: "2026.1.2/0014", cliente: "Carlos Lima", status: "Em andamento", tone: "green" },
  ];

  const toneClass: Record<string, string> = {
    green: "bg-green-50 text-green",
    navy: "bg-navy-50 text-navy",
    muted: "bg-mist text-muted",
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-card)]">
      {/* barra do browser */}
      <div className="flex items-center gap-2 border-b border-line bg-mist/70 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-3 flex flex-1 items-center gap-2 rounded-md border border-line bg-white px-3 py-1.5 text-[11px] text-muted">
          <LockGlyph />
          app.legaldefense.com.br/painel
        </div>
      </div>

      <div className="flex">
        {/* sidebar */}
        <aside className="hidden w-44 shrink-0 flex-col gap-1 border-r border-line bg-white p-3 sm:flex">
          <div className="mb-2 flex items-center gap-2 px-2 py-1.5">
            <span className="h-6 w-6 rounded-md bg-navy/5 p-1">
              <span className="block h-full w-full rounded-sm bg-gradient-to-br from-navy to-green" />
            </span>
            <span className="text-xs font-semibold text-ink">Escritório</span>
          </div>
          {[
            { icon: ChartGlyph, label: "Painel", active: true },
            { icon: FolderIcon, label: "Procedimentos" },
            { icon: UsersIcon, label: "Clientes" },
            { icon: RadarIcon, label: "Monitoramento" },
            { icon: SearchIcon, label: "Investigação" },
          ].map(({ icon: Icon, label, active }) => (
            <div
              key={label}
              className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12.5px] ${
                active
                  ? "bg-navy-50 font-medium text-navy"
                  : "text-ink-soft"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </div>
          ))}
        </aside>

        {/* conteúdo */}
        <div className="flex-1 p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-[13px] font-semibold text-ink">Visão geral</div>
              <div className="text-[11px] text-muted">Atualizado agora</div>
            </div>
            <div className="rounded-lg bg-green px-3 py-1.5 text-[11px] font-medium text-white">
              + Novo procedimento
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-3 gap-3">
            {kpis.map((k) => (
              <div
                key={k.label}
                className="rounded-xl border border-line bg-white p-3"
              >
                <div className="text-[10.5px] leading-tight text-muted">
                  {k.label}
                </div>
                <div className="mt-1 flex items-end gap-1.5">
                  <span className="text-xl font-semibold tracking-tight text-ink">
                    {k.value}
                  </span>
                  <span className="mb-0.5 rounded bg-green-50 px-1 text-[9.5px] font-medium text-green">
                    {k.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* tabela */}
          <div className="mt-4 overflow-hidden rounded-xl border border-line">
            <div className="grid grid-cols-[1.2fr_1.4fr_1fr] bg-mist/70 px-3 py-2 text-[10px] font-medium uppercase tracking-wide text-muted">
              <span>Procedimento</span>
              <span>Cliente</span>
              <span>Status</span>
            </div>
            {rows.map((r) => (
              <div
                key={r.n}
                className="grid grid-cols-[1.2fr_1.4fr_1fr] items-center border-t border-line px-3 py-2.5 text-[11.5px]"
              >
                <span className="font-mono text-[10.5px] text-ink-soft">
                  {r.n}
                </span>
                <span className="text-ink">{r.cliente}</span>
                <span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${toneClass[r.tone]}`}
                  >
                    {r.status}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LockGlyph() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="text-green">
      <rect x="5" y="11" width="14" height="9" rx="2" fill="currentColor" opacity="0.18" />
      <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function ChartGlyph(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 4v16h16" />
      <path d="M8 15v2M12 11v6M16 7v10" />
    </svg>
  );
}
