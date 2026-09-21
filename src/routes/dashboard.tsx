import { createFileRoute } from "@tanstack/react-router";
import { Download, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { KpiCard, LiveSyncPill, Panel, PortalShell, SectionTitle } from "@/components/portal/PortalShell";

const repositoryRows = [
  { repo: "api-gateway", hours: "32.0 h", width: "w-4/5", tone: "bg-clay" },
  { repo: "billing-core", hours: "28.5 h", width: "w-[71%]", tone: "bg-mint" },
  { repo: "mobile-app", hours: "24.0 h", width: "w-3/5", tone: "bg-amberc" },
  { repo: "data-pipeline", hours: "18.5 h", width: "w-[46%]", tone: "bg-viol" },
];

const invoices = [
  ["FAC-2025-0142", "Grupo Andes", "Draft", "$6,400", "bg-clay-soft text-clay", "bg-clay-soft/40"],
  ["FAC-2025-0141", "Norte Digital", "Sent", "$4,150", "bg-amberc-soft text-amberc", ""],
  ["FAC-2025-0139", "Vela Labs", "Sent", "$3,800", "bg-amberc-soft text-amberc", ""],
  ["FAC-2025-0136", "Andes Cloud", "Paid", "$12,900", "bg-mint-soft text-mint", ""],
];

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard ejecutivo — Nexo IT·Fin" },
      {
        name: "description",
        content: "Métricas ejecutivas de facturación, horas pendientes, clientes activos y pre-facturas IT.",
      },
      { property: "og:title", content: "Dashboard ejecutivo — Nexo IT·Fin" },
      {
        property: "og:description",
        content: "Panel financiero para monitorear horas no facturadas y generar pre-facturas por cliente.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <PortalShell
      active="/dashboard"
      title="Dashboard ejecutivo"
      subtitle="Periodo · Semana 24 · 10–14 jun 2025"
      action={
        <>
          <Button variant="outline" size="sm">
            <Filter />
            Filtrar
          </Button>
          <Button variant="clay" size="sm">
            <Download />
            Exportar
          </Button>
        </>
      }
    >
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard label="Facturación USD" value="$48,200" detail="▲ 12.4% vs semana previa" />
        <KpiCard label="Facturación MXN" value="$964,000" detail="▲ 8.1% vs semana previa" className="[animation-delay:60ms]" />
        <KpiCard label="Horas no facturadas" value="38.5 h" detail="3 repos pendientes" tone="amber" className="[animation-delay:120ms]" />
        <KpiCard label="Clientes activos" value="14" detail="2 en onboarding" tone="muted" className="[animation-delay:180ms]" />
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Panel className="lg:col-span-2 animate-[rise_0.5s_var(--ease)_both] [animation-delay:240ms]">
          <div className="flex items-center justify-between gap-3">
            <SectionTitle title="Líneas de tiempo por repositorio" subtitle="Horas registradas · lun–vie" />
            <LiveSyncPill />
          </div>
          <div className="mt-5 space-y-3.5">
            {repositoryRows.map((row) => (
              <div key={row.repo}>
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="text-foreground/80">{row.repo}</span>
                  <span className="text-muted-foreground">{row.hours}</span>
                </div>
                <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-background">
                  <div className={`${row.width} ${row.tone} h-full rounded-full`} />
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="flex flex-col animate-[rise_0.5s_var(--ease)_both] [animation-delay:300ms]">
          <SectionTitle title="Tiempo no facturado" subtitle="Repos sin pre-factura" />
          <div className="mt-4 space-y-2.5">
            {[
              ["api-gateway", "12.5 h"],
              ["mobile-app", "9.0 h"],
              ["data-pipeline", "6.5 h"],
            ].map(([repo, hours]) => (
              <div key={repo} className="flex items-center justify-between rounded-xl bg-amberc-soft px-3 py-2.5">
                <span className="text-xs font-medium">{repo}</span>
                <span className="font-mono text-xs font-bold text-amberc">{hours}</span>
              </div>
            ))}
          </div>
          <Button variant="clay" className="mt-auto">
            Generar Pre-Facturas
          </Button>
        </Panel>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <Panel className="lg:col-span-3 animate-[rise_0.5s_var(--ease)_both] [animation-delay:360ms]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <SectionTitle title="Facturas" />
            <div className="flex gap-1.5">
              <span className="rounded-full bg-clay-soft px-2.5 py-1 font-mono text-[10px] font-medium text-clay">Draft 4</span>
              <span className="rounded-full bg-amberc-soft px-2.5 py-1 font-mono text-[10px] font-medium text-amberc">Sent 2</span>
              <span className="rounded-full bg-mint-soft px-2.5 py-1 font-mono text-[10px] font-medium text-mint">Paid 6</span>
            </div>
          </div>
          <div className="mt-4 overflow-hidden rounded-xl border border-line">
            <table className="w-full text-left text-sm">
              <thead className="bg-background font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-3 py-2.5 font-medium">Factura</th>
                  <th className="px-3 py-2.5 font-medium">Cliente</th>
                  <th className="px-3 py-2.5 font-medium">Estado</th>
                  <th className="px-3 py-2.5 text-right font-medium">Monto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {invoices.map(([id, client, status, amount, badge, row]) => (
                  <tr key={id} className={row}>
                    <td className="px-3 py-2.5 font-mono text-xs font-medium">{id}</td>
                    <td className="px-3 py-2.5 text-xs">{client}</td>
                    <td className="px-3 py-2.5">
                      <span className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-medium ${badge}`}>{status}</span>
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono text-xs font-semibold">{amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel className="lg:col-span-2 animate-[rise_0.5s_var(--ease)_both] [animation-delay:420ms]">
          <div className="flex items-center justify-between">
            <SectionTitle title="Vista previa" />
            <span className="font-mono text-[10px] text-muted-foreground">FAC-2025-0142</span>
          </div>
          <div className="mt-4 rounded-xl border border-line bg-background p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-xs font-bold">Nexo</p>
                <p className="font-mono text-[10px] text-muted-foreground">Factura de servicios</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-[10px] text-muted-foreground">Emisión</p>
                <p className="font-mono text-[10px] font-medium">14 jun 2025</p>
              </div>
            </div>
            <div className="my-3 h-px bg-line" />
            <div className="space-y-1.5 font-mono text-[11px]">
              <div className="flex justify-between"><span className="text-muted-foreground">api-gateway</span><span>$3,200</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">billing-core</span><span>$1,800</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">mobile-app</span><span>$1,400</span></div>
            </div>
            <div className="my-3 h-px bg-line" />
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-muted-foreground">Total</span>
              <span className="font-mono text-sm font-bold">$6,400</span>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" className="flex-1">Generar Cierre</Button>
            <Button variant="clay" className="flex-1">Timbrar / Cobrar</Button>
          </div>
        </Panel>
      </section>
    </PortalShell>
  );
}
