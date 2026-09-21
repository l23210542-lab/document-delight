import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Code2 } from "lucide-react";

import { LiveSyncPill, Panel, PortalShell, SectionTitle } from "@/components/portal/PortalShell";

const weeklyHours = [
  { day: "Lun", hours: 7.5, height: "h-[76%]" },
  { day: "Mar", hours: 8.0, height: "h-[82%]" },
  { day: "Mié", hours: 6.5, height: "h-[66%]" },
  { day: "Jue", hours: 9.0, height: "h-[92%]" },
  { day: "Vie", hours: 8.0, height: "h-[82%]" },
];

const timeEntries = [
  ["10 jun 2025", "billing-core", "09:12", "12:44", "3.5 h"],
  ["10 jun 2025", "api-gateway", "13:18", "17:02", "3.7 h"],
  ["11 jun 2025", "web-portal", "08:55", "12:10", "3.2 h"],
  ["11 jun 2025", "billing-core", "13:05", "17:50", "4.8 h"],
  ["12 jun 2025", "data-pipeline", "09:30", "15:58", "6.5 h"],
];

export const Route = createFileRoute("/my-time")({
  head: () => ({
    meta: [
      { title: "Mi tiempo — Nexo IT·Fin" },
      {
        name: "description",
        content: "Panel de desarrollador con horas semanales y registros automáticos por proyecto.",
      },
      { property: "og:title", content: "Mi tiempo — Nexo IT·Fin" },
      {
        property: "og:description",
        content: "Vista de horas registradas automáticamente por telemetría del IDE, sin cronómetro manual.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MyTimePage,
});

function MyTimePage() {
  return (
    <PortalShell active="/my-time" title="Mi tiempo" subtitle="Desarrollador · Semana actual">
      <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <Panel className="animate-[rise_0.5s_var(--ease)_both]">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-clay">Hola, Diego</p>
              <h2 className="mt-1 text-3xl font-bold tracking-tight">39.0 horas registradas</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                El registro se alimenta automáticamente desde la actividad del IDE y se asigna por URL de repositorio.
              </p>
            </div>
            <LiveSyncPill />
          </div>
        </Panel>

        <Panel className="animate-[rise_0.5s_var(--ease)_both] [animation-delay:80ms]">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-mint-soft text-mint">
              <Code2 className="size-5" />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Proyecto principal</p>
              <p className="text-sm font-bold">billing-core</p>
            </div>
          </div>
          <div className="mt-4 rounded-xl bg-background p-3 font-mono text-[11px] text-muted-foreground">
            github.com/nexo/billing-core
          </div>
        </Panel>
      </section>

      <Panel className="animate-[rise_0.5s_var(--ease)_both] [animation-delay:160ms]">
        <div className="flex items-center justify-between">
          <SectionTitle title="Actividad por día" subtitle="Lunes a viernes · horas efectivas" />
          <div className="flex items-center gap-2 rounded-xl border border-line bg-background px-3 py-2 font-mono text-[11px] text-muted-foreground">
            <CalendarDays className="size-4" /> Semana 24
          </div>
        </div>
        <div className="mt-6 flex h-64 items-end gap-3 sm:gap-5">
          {weeklyHours.map((item) => (
            <div key={item.day} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <span className="font-mono text-[11px] text-muted-foreground">{item.hours.toFixed(1)} h</span>
              <div className="flex h-48 w-full items-end rounded-xl bg-background p-1.5">
                <div className={`${item.height} w-full origin-bottom rounded-lg bg-clay animate-[grow_0.65s_var(--ease)_both]`} />
              </div>
              <span className="font-mono text-[11px] font-medium text-muted-foreground">{item.day}</span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="mb-16 animate-[rise_0.5s_var(--ease)_both] [animation-delay:240ms] md:mb-0">
        <SectionTitle title="Time Log" subtitle="Solo lectura · alimentado por telemetría" />
        <div className="mt-4 overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-background font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-3 py-2.5 font-medium">Fecha</th>
                <th className="px-3 py-2.5 font-medium">Proyecto</th>
                <th className="px-3 py-2.5 font-medium">Hora Inicio</th>
                <th className="px-3 py-2.5 font-medium">Hora Fin</th>
                <th className="px-3 py-2.5 text-right font-medium">Total Horas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {timeEntries.map(([date, project, start, end, total]) => (
                <tr key={`${date}-${project}-${start}`} className="hover:bg-clay-soft/40">
                  <td className="px-3 py-3 font-mono text-xs">{date}</td>
                  <td className="px-3 py-3 text-xs font-medium">{project}</td>
                  <td className="px-3 py-3 font-mono text-xs text-muted-foreground">{start}</td>
                  <td className="px-3 py-3 font-mono text-xs text-muted-foreground">{end}</td>
                  <td className="px-3 py-3 text-right font-mono text-xs font-bold">{total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </PortalShell>
  );
}
